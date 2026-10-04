const API = parent.JalanCareAPI || window.JalanCareAPI;
const esc = value => String(value ?? '').replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

function date(value, withTime = false) {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('ms-MY', withTime
      ? { dateStyle: 'medium', timeStyle: 'short' }
      : { dateStyle: 'medium' }).format(new Date(value));
  } catch {
    return String(value);
  }
}

async function loadComplaintList() {
  const body = document.querySelector('#complaintRows');
  const notice = document.querySelector('#dataNotice');
  try {
    const response = await API.complaints();
    body.innerHTML = response.items.map(item => `<tr>
      <td><a href="butiran.html?ref=${encodeURIComponent(item.reference)}"><b>${esc(item.reference)}</b></a></td>
      <td>${date(item.createdAt)}</td><td>${esc(item.category)}</td><td>${esc(item.location)}</td>
      <td><span class="status ${item.priority === 'Kritikal' || item.priority === 'Tinggi' ? 'red' : 'orange'}">${esc(item.priority)}</span></td>
      <td><span class="status blue">${esc(item.status)}</span></td>
    </tr>`).join('');
    notice.hidden = true;
    filterRows();
  } catch (error) {
    notice.textContent = error.message;
    notice.className = 'data-notice error';
  }
}

function filterRows() {
  const query = (document.querySelector('#search')?.value || '').toLowerCase();
  const status = document.querySelector('#status')?.value || '';
  document.querySelectorAll('#complaintRows tr').forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query) || (status && !row.textContent.includes(status));
  });
}

async function loadStats() {
  const notice = document.querySelector('#dataNotice');
  try {
    const response = await API.stats();
    Object.entries(response.stats).forEach(([key, value]) => {
      const element = document.querySelector(`[data-stat="${key}"]`);
      if (element) element.textContent = value;
    });
    notice.hidden = true;
  } catch (error) {
    notice.textContent = error.message;
    notice.className = 'data-notice error';
  }
}

async function loadComplaintDetail() {
  const notice = document.querySelector('#dataNotice');
  const reference = new URLSearchParams(location.search).get('ref');
  if (!reference) {
    notice.textContent = 'Pilih satu aduan daripada halaman Senarai Aduan.';
    notice.className = 'data-notice error';
    return;
  }
  try {
    const response = await API.complaint(reference);
    const complaint = response.complaint;
    document.querySelector('#detailReference').textContent = complaint.reference;
    document.querySelector('#detailTitle').textContent = complaint.title;
    document.querySelector('#detailDate').textContent = `Diterima pada ${date(complaint.createdAt, true)}.`;
    document.querySelector('#detailPriority').textContent = complaint.priority;
    document.querySelector('#detailStatus').textContent = complaint.status;
    document.querySelector('#detailDescription').textContent = complaint.description || '—';
    document.querySelector('#detailCategory').textContent = complaint.category || '—';
    document.querySelector('#detailLocation').textContent = complaint.location || '—';
    document.querySelector('#detailCoordinates').textContent = complaint.latitude && complaint.longitude
      ? `${complaint.latitude}, ${complaint.longitude}` : 'Tidak dinyatakan';
    document.querySelector('#detailReporter').textContent = `${complaint.name || '—'} · ${complaint.phone || '—'}`;
    document.querySelector('#statusSelect').value = complaint.status;
    document.querySelector('#publicNote').value = complaint.publicNote || '';
    document.querySelector('#internalNote').value = complaint.internalNote || '';
    document.querySelector('#timeline').innerHTML = (response.actions || []).map(action => `<li class="done">
      <b>${esc(action.Jenis_Tindakan || action.Status_Baharu || 'Tindakan')}</b>
      <span>${date(action.Tarikh_Masa, true)} · ${esc(action.Catatan_Awam || '')}</span>
    </li>`).join('') || '<li><b>Tiada tindakan direkodkan</b></li>';
    notice.hidden = true;
    document.querySelector('#detailContent').hidden = false;
  } catch (error) {
    notice.textContent = error.message;
    notice.className = 'data-notice error';
  }
}

async function saveComplaintStatus(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('#updateMessage');
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sedang menyimpan…';
  try {
    const reference = new URLSearchParams(location.search).get('ref');
    const response = await API.updateStatus({
      reference,
      status: form.status.value,
      publicNote: form.publicNote.value,
      internalNote: form.internalNote.value
    });
    message.textContent = response.message;
    message.className = 'form-message info';
    await loadComplaintDetail();
  } catch (error) {
    message.textContent = error.message;
    message.className = 'form-message error';
  } finally {
    button.disabled = false;
    button.textContent = 'Simpan Kemas Kini';
  }
}

async function loadTasks() {
  const body = document.querySelector('#taskRows');
  const notice = document.querySelector('#dataNotice');
  try {
    const response = await API.tasks();
    body.innerHTML = response.items.map(item => `<tr><td><b>${esc(item.ID_Tugasan)}</b></td>
      <td>${esc(item.No_Rujukan)}</td><td>${esc(item.Pasukan)}</td><td>${date(item.Tarikh_Akhir)}</td>
      <td>${esc(item.Kemajuan_Peratus)}%</td><td><span class="status blue">${esc(item.Status_Tugasan)}</span></td></tr>`).join('');
    notice.hidden = true;
  } catch (error) {
    notice.textContent = error.message;
    notice.className = 'data-notice error';
  }
}

async function loadUsers() {
  const body = document.querySelector('#userRows');
  const notice = document.querySelector('#dataNotice');
  try {
    const response = await API.users();
    body.innerHTML = response.items.map(item => `<tr><td><b>${esc(item.name)}</b><small>${esc(item.email)}</small></td>
      <td>${esc(item.username)}</td><td>${esc(item.role)}</td><td>${esc(item.department)}</td>
      <td><span class="status green">${esc(item.status)}</span></td></tr>`).join('');
    notice.hidden = true;
  } catch (error) {
    notice.textContent = error.message;
    notice.className = 'data-notice error';
  }
}
