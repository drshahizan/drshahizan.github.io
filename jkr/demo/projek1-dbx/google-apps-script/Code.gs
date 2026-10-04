/**
 * JalanCare Projek 1 DB — Google Apps Script Web App
 * Sambungkan skrip ini kepada Google Sheets templat yang disediakan.
 * Deploy > New deployment > Web app > Execute as Me > Anyone.
 */

const SHEETS = {
  SETTINGS: 'TETAPAN', USERS: 'PENGGUNA', COMPLAINTS: 'ADUAN',
  ACTIONS: 'TINDAKAN', TASKS: 'TUGASAN', CATEGORIES: 'KATEGORI',
  SESSIONS: 'SESI', AUDIT: 'LOG_AKTIVITI'
};

function doGet(e) {
  return handleRequest_(e && e.parameter ? e.parameter : {});
}

function doPost(e) {
  let payload = {};
  try {
    payload = e && e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : (e.parameter || {});
  } catch (err) {
    return response_({ ok: false, message: 'Format permintaan tidak sah.' });
  }
  return handleRequest_(payload);
}

function handleRequest_(p) {
  try {
    const action = String(p.action || 'ping');
    if (action === 'ping') return response_({ ok: true, message: 'JalanCare API aktif', version: '2.0' });
    if (action === 'createComplaint') return response_(createComplaint_(p));
    if (action === 'checkStatus') return response_(checkStatus_(p));
    if (action === 'login') return response_(login_(p));
    if (action === 'logout') return response_(logout_(p));

    const session = validateSession_(p.token);
    if (!session.ok) return response_(session);
    if (action === 'stats') return response_(stats_(session));
    if (action === 'listComplaints') return response_(listComplaints_(p, session));
    if (action === 'getComplaint') return response_(getComplaint_(p, session));
    if (action === 'updateStatus') return response_(updateStatus_(p, session));
    if (action === 'listTasks') return response_(listTasks_(p, session));
    if (action === 'listUsers') return response_(listUsers_(session));

    return response_({ ok: false, message: 'Tindakan API tidak dikenali.' });
  } catch (err) {
    logAudit_('', '', '', 'Ralat sistem', 'API', '', '', '', 'Gagal', err.message);
    return response_({ ok: false, message: 'Ralat pelayan.', detail: err.message });
  }
}

function createComplaint_(p) {
  const required = ['nama', 'telefon', 'kategori', 'tahap', 'tajuk', 'keterangan', 'lokasi'];
  const missing = required.filter(k => !String(p[k] || '').trim());
  if (missing.length) return { ok: false, message: 'Sila lengkapkan semua medan wajib.', fields: missing };

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_(SHEETS.COMPLAINTS);
    const next = Math.max(1, sheet.getLastRow() - 4);
    const year = new Date().getFullYear();
    const ref = 'JCR-' + year + '-' + String(next).padStart(5, '0');
    const complaintId = 'ADU-' + String(next).padStart(5, '0');
    const code = String(Math.floor(1000 + Math.random() * 9000));
    const now = new Date();
    const coords = String(p.koordinat || '').split(',').map(x => x.trim());
    const row = [
      now, complaintId, ref, code, clean_(p.nama), clean_(p.telefon), clean_(p.emel),
      p.rahsia ? 'Ya' : 'Tidak', clean_(p.kategori), clean_(p.tahap), clean_(p.tajuk),
      clean_(p.keterangan), clean_(p.lokasi), Number(coords[0]) || '', Number(coords[1]) || '',
      clean_(p.noLaluan), p.tarikhKejadian ? new Date(p.tarikhKejadian) : '', 'Baharu',
      clean_(p.tahap), '', addDays_(now, findSlaDays_(p.kategori)), 'Aduan telah diterima.',
      'Menunggu semakan pegawai.', now, 'system'
    ];
    sheet.appendRow(row);
    getSheet_(SHEETS.ACTIONS).appendRow([
      nextId_(SHEETS.ACTIONS, 'ACT'), ref, now, '', 'Baharu', 'Aduan diterima',
      'Aduan berjaya diterima.', 'Rekod automatik.', 'SYSTEM', 'Sistem', '', row[13], row[14]
    ]);
    logAudit_('SYSTEM', 'public', 'Awam', 'Aduan baharu', 'Aduan', ref, '', 'Baharu', 'Berjaya', 'Borang awam');
    return { ok: true, message: 'Aduan berjaya dihantar.', reference: ref, code: code, createdAt: now.toISOString() };
  } finally {
    lock.releaseLock();
  }
}

function checkStatus_(p) {
  const ref = clean_(p.reference).toUpperCase();
  const code = clean_(p.code);
  if (!ref || !code) return { ok: false, message: 'Masukkan nombor rujukan dan kod semakan.' };
  const records = rowsAsObjects_(SHEETS.COMPLAINTS);
  const c = records.find(r => String(r.No_Rujukan).toUpperCase() === ref && String(r.Kod_Semakan) === code);
  if (!c) return { ok: false, message: 'Rekod tidak ditemui. Semak nombor rujukan dan kod semakan.' };
  const actions = rowsAsObjects_(SHEETS.ACTIONS)
    .filter(r => String(r.No_Rujukan).toUpperCase() === ref)
    .map(r => ({ date: r.Tarikh_Masa, status: r.Status_Baharu, action: r.Jenis_Tindakan, note: r.Catatan_Awam }));
  return { ok: true, complaint: publicComplaint_(c), actions: actions };
}

function login_(p) {
  const username = clean_(p.username).toLowerCase();
  const password = String(p.password || '');
  const users = rowsAsObjects_(SHEETS.USERS);
  const user = users.find(u => String(u.Nama_Pengguna).toLowerCase() === username);
  if (!user || String(user.Status_Akaun) !== 'Aktif') {
    logAudit_('', username, '', 'Login gagal', 'Autentikasi', '', '', '', 'Gagal', 'Akaun tidak ditemui atau tidak aktif');
    return { ok: false, message: 'Nama pengguna atau kata laluan tidak sah.' };
  }
  const hash = sha256_(String(user.Salt) + password);
  if (hash !== String(user.Kata_Laluan_Hash).toUpperCase()) {
    logAudit_(user.ID_Pengguna, username, user.Peranan, 'Login gagal', 'Autentikasi', '', '', '', 'Gagal', 'Kata laluan tidak sepadan');
    return { ok: false, message: 'Nama pengguna atau kata laluan tidak sah.' };
  }
  const token = Utilities.getUuid() + Utilities.getUuid();
  const minutes = Number(getSetting_('TEMPOH_SESI_MINIT')) || 60;
  const now = new Date();
  const expires = new Date(now.getTime() + minutes * 60000);
  getSheet_(SHEETS.SESSIONS).appendRow([token, user.ID_Pengguna, user.Nama_Pengguna, user.Peranan, now, expires, 'Aktif', '', clean_(p.device)]);
  updateUserLogin_(user._row);
  logAudit_(user.ID_Pengguna, username, user.Peranan, 'Login berjaya', 'Autentikasi', '', '', '', 'Berjaya', '');
  return { ok: true, token: token, expiresAt: expires.toISOString(), user: { id: user.ID_Pengguna, name: user.Nama, username: user.Nama_Pengguna, role: user.Peranan, department: user.Bahagian } };
}

function logout_(p) {
  const session = validateSession_(p.token);
  if (session.ok) {
    getSheet_(SHEETS.SESSIONS).getRange(session._row, 7).setValue('Logout');
    logAudit_(session.user.id, session.user.username, session.user.role, 'Logout', 'Autentikasi', '', '', '', 'Berjaya', '');
  }
  return { ok: true, message: 'Sesi telah ditamatkan.' };
}

function validateSession_(token) {
  if (!token) return { ok: false, code: 'AUTH_REQUIRED', message: 'Sila log masuk.' };
  const sessions = rowsAsObjects_(SHEETS.SESSIONS);
  const s = sessions.find(r => String(r.Token_Sesi) === String(token));
  if (!s || String(s.Status) !== 'Aktif' || new Date(s.Tarikh_Tamat) <= new Date()) {
    return { ok: false, code: 'SESSION_EXPIRED', message: 'Sesi telah tamat. Sila log masuk semula.' };
  }
  const users = rowsAsObjects_(SHEETS.USERS);
  const u = users.find(r => String(r.ID_Pengguna) === String(s.ID_Pengguna) && String(r.Status_Akaun) === 'Aktif');
  if (!u) return { ok: false, code: 'ACCOUNT_INACTIVE', message: 'Akaun tidak aktif.' };
  return { ok: true, _row: s._row, user: { id: u.ID_Pengguna, name: u.Nama, username: u.Nama_Pengguna, role: u.Peranan, department: u.Bahagian } };
}

function stats_(session) {
  const all = rowsAsObjects_(SHEETS.COMPLAINTS);
  const count = value => all.filter(r => String(r.Status) === value).length;
  const priority = value => all.filter(r => String(r.Keutamaan) === value).length;
  return { ok: true, stats: { total: all.length, new: count('Baharu'), review: count('Dalam semakan'), active: count('Dalam tindakan'), completed: count('Selesai'), critical: priority('Kritikal') }, user: session.user };
}

function listComplaints_(p, session) {
  let rows = rowsAsObjects_(SHEETS.COMPLAINTS).map(internalComplaint_);
  const q = clean_(p.query).toLowerCase();
  const status = clean_(p.status);
  if (q) rows = rows.filter(r => JSON.stringify(r).toLowerCase().indexOf(q) >= 0);
  if (status) rows = rows.filter(r => r.status === status);
  return { ok: true, items: rows.slice(-200).reverse(), user: session.user };
}

function getComplaint_(p, session) {
  const ref = clean_(p.reference).toUpperCase();
  const c = rowsAsObjects_(SHEETS.COMPLAINTS).find(r => String(r.No_Rujukan).toUpperCase() === ref);
  if (!c) return { ok: false, message: 'Aduan tidak ditemui.' };
  const actions = rowsAsObjects_(SHEETS.ACTIONS).filter(r => String(r.No_Rujukan).toUpperCase() === ref);
  const tasks = rowsAsObjects_(SHEETS.TASKS).filter(r => String(r.No_Rujukan).toUpperCase() === ref);
  return { ok: true, complaint: internalComplaint_(c), actions: actions, tasks: tasks, user: session.user };
}

function updateStatus_(p, session) {
  requireRole_(session, ['Pentadbir', 'Pegawai Aduan', 'Penyelia']);
  const ref = clean_(p.reference).toUpperCase();
  const status = clean_(p.status);
  const sheet = getSheet_(SHEETS.COMPLAINTS);
  const records = rowsAsObjects_(SHEETS.COMPLAINTS);
  const c = records.find(r => String(r.No_Rujukan).toUpperCase() === ref);
  if (!c) return { ok: false, message: 'Aduan tidak ditemui.' };
  const old = c.Status;
  sheet.getRange(c._row, 18).setValue(status);
  sheet.getRange(c._row, 22).setValue(clean_(p.publicNote));
  sheet.getRange(c._row, 23).setValue(clean_(p.internalNote));
  sheet.getRange(c._row, 24).setValue(new Date());
  sheet.getRange(c._row, 25).setValue(session.user.username);
  getSheet_(SHEETS.ACTIONS).appendRow([nextId_(SHEETS.ACTIONS, 'ACT'), ref, new Date(), old, status, 'Kemas kini status', clean_(p.publicNote), clean_(p.internalNote), session.user.id, session.user.name, '', c.Latitude, c.Longitude]);
  logAudit_(session.user.id, session.user.username, session.user.role, 'Status dikemas kini', 'Aduan', ref, old, status, 'Berjaya', '');
  return { ok: true, message: 'Status berjaya dikemas kini.' };
}

function listTasks_(p, session) {
  let tasks = rowsAsObjects_(SHEETS.TASKS);
  if (['Pasukan Lapangan', 'Kontraktor'].indexOf(session.user.role) >= 0) {
    tasks = tasks.filter(t => String(t.ID_Pegawai) === String(session.user.id));
  }
  return { ok: true, items: tasks.slice(-200).reverse(), user: session.user };
}

function listUsers_(session) {
  requireRole_(session, ['Pentadbir']);
  const users = rowsAsObjects_(SHEETS.USERS).map(u => ({ id: u.ID_Pengguna, name: u.Nama, username: u.Nama_Pengguna, email: u.Emel, role: u.Peranan, department: u.Bahagian, status: u.Status_Akaun, lastLogin: u.Login_Terakhir }));
  return { ok: true, items: users };
}

function publicComplaint_(c) {
  return { reference: c.No_Rujukan, category: c.Kategori, title: c.Tajuk, location: c.Lokasi, status: c.Status, priority: c.Keutamaan, publicNote: c.Catatan_Awam, createdAt: c.Timestamp, updatedAt: c.Tarikh_Kemas_Kini };
}

function internalComplaint_(c) {
  return { id: c.ID_Aduan, reference: c.No_Rujukan, name: c.Nama_Pengadu, phone: c.Telefon, email: c.Emel, category: c.Kategori, danger: c.Tahap_Bahaya, title: c.Tajuk, description: c.Keterangan, location: c.Lokasi, latitude: c.Latitude, longitude: c.Longitude, route: c.No_Laluan, status: c.Status, priority: c.Keutamaan, officer: c.Pegawai_Bertanggungjawab, sla: c.Tarikh_SLA, publicNote: c.Catatan_Awam, internalNote: c.Catatan_Dalaman, createdAt: c.Timestamp, updatedAt: c.Tarikh_Kemas_Kini };
}

function rowsAsObjects_(name) {
  const sheet = getSheet_(name);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow < 6) return [];
  const headers = sheet.getRange(5, 1, 1, lastCol).getValues()[0];
  const values = sheet.getRange(6, 1, lastRow - 5, lastCol).getValues();
  return values.filter(r => r.some(v => v !== '')).map((row, index) => {
    const o = { _row: index + 6 };
    headers.forEach((h, i) => { if (h) o[h] = row[i]; });
    return o;
  });
}

function getSheet_(name) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sheet) throw new Error('Tab ' + name + ' tidak ditemui.');
  return sheet;
}

function getSetting_(key) {
  const rows = getSheet_(SHEETS.SETTINGS).getRange('A6:B50').getValues();
  const found = rows.find(r => String(r[0]) === key);
  return found ? found[1] : '';
}

function findSlaDays_(category) {
  const rows = getSheet_(SHEETS.CATEGORIES).getRange('B6:C50').getValues();
  const found = rows.find(r => String(r[0]) === String(category));
  return found ? Number(found[1]) || 3 : 3;
}

function nextId_(sheetName, prefix) {
  const n = Math.max(1, getSheet_(sheetName).getLastRow() - 4);
  return prefix + '-' + String(n).padStart(5, '0');
}

function updateUserLogin_(row) {
  const sheet = getSheet_(SHEETS.USERS);
  sheet.getRange(row, 10).setValue(0);
  sheet.getRange(row, 11).setValue(new Date());
}

function logAudit_(id, username, role, activity, module, ref, oldData, newData, result, note) {
  try {
    const sheet = getSheet_(SHEETS.AUDIT);
    sheet.appendRow([new Date(), nextId_(SHEETS.AUDIT, 'LOG'), id, username, role, activity, module, ref, oldData, newData, result, note]);
  } catch (err) {}
}

function requireRole_(session, roles) {
  if (roles.indexOf(session.user.role) < 0) throw new Error('Akses tidak dibenarkan untuk peranan ini.');
}

function response_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(value) {
  return String(value == null ? '' : value).trim().replace(/[<>]/g, '');
}

function addDays_(date, days) {
  const d = new Date(date); d.setDate(d.getDate() + Number(days || 0)); return d;
}

function sha256_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8);
  return bytes.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** Jalankan sekali jika PENGGUNA masih mengandungi kata laluan biasa pada kolum E. */
function hashDemoPasswords() {
  const passwords = { admin: 'Admin@123', pegawai: 'Pegawai@123', penyelia: 'Penyelia@123', lapangan: 'Lapangan@123', kontraktor: 'Kontraktor@123', pengurusan: 'Laporan@123' };
  const sheet = getSheet_(SHEETS.USERS);
  const users = rowsAsObjects_(SHEETS.USERS);
  users.forEach(u => {
    const password = passwords[String(u.Nama_Pengguna).toLowerCase()];
    if (password) sheet.getRange(u._row, 5).setValue(sha256_(String(u.Salt) + password));
  });
}
