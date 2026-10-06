(function () {
  const root = new URL('../', document.currentScript.src);
  const currentUrl = new URL(location.href);
  const token = sessionStorage.getItem('jcrToken');
  const user = JSON.parse(sessionStorage.getItem('jcrUser') || 'null');

  if (!token || !user) {
    location.replace(new URL('login.html', root).href);
    return;
  }

  const allRoles = ['Pentadbir', 'Pegawai Aduan', 'Penyelia', 'Pasukan Lapangan', 'Kontraktor', 'Pengurusan'];
  const menus = [
    { group: 'UTAMA', label: 'Papan Pemuka', icon: '▦', path: 'dashboard.html', roles: allRoles },
    { group: 'ADUAN', label: 'Senarai Aduan', icon: '☷', path: 'aduan/senarai.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia'] },
    { group: 'ADUAN', label: 'Pengesahan Aduan', icon: '◇', path: 'aduan/pengesahan.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia'] },
    { group: 'ADUAN', label: 'Peta Aduan', icon: '⌖', path: 'peta/index.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia'] },
    { group: 'OPERASI', label: 'Tugasan', icon: '✓', path: 'tugasan/index.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia', 'Pasukan Lapangan', 'Kontraktor'] },
    { group: 'OPERASI', label: 'Pemeriksaan Tapak', icon: '⌕', path: 'lapangan/pemeriksaan.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia', 'Pasukan Lapangan', 'Kontraktor'] },
    { group: 'OPERASI', label: 'Bukti Kerja', icon: '▧', path: 'lapangan/bukti-kerja.html', roles: ['Pentadbir', 'Penyelia', 'Pasukan Lapangan', 'Kontraktor'] },
    { group: 'OPERASI', label: 'Pemantauan SLA', icon: '◷', path: 'sla/index.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Penyelia', 'Pengurusan'] },
    { group: 'PENGURUSAN', label: 'Laporan', icon: '▥', path: 'laporan/index.html', roles: ['Pentadbir', 'Pegawai Aduan', 'Pengurusan'] },
    { group: 'PENGURUSAN', label: 'Prestasi', icon: '▤', path: 'laporan/prestasi.html', roles: ['Pentadbir', 'Pengurusan'] },
    { group: 'PENGURUSAN', label: 'Pengguna', icon: '♙', path: 'pengguna/index.html', roles: ['Pentadbir'] },
    { group: 'PENGURUSAN', label: 'Kategori', icon: '⚙', path: 'konfigurasi/kategori.html', roles: ['Pentadbir'] }
  ];

  const allowed = menus.filter(item => item.roles.includes(user.role));
  const currentPath = decodeURIComponent(currentUrl.pathname);
  const isDetail = currentPath.endsWith('/aduan/butiran.html');
  const currentMenu = isDetail
    ? menus.find(item => item.path === 'aduan/senarai.html')
    : menus.find(item => currentPath.endsWith('/' + item.path));

  if (isDetail && !currentMenu.roles.includes(user.role)) {
    location.replace(new URL('dashboard.html', root).href);
    return;
  }
  if (!isDetail && currentMenu && !currentMenu.roles.includes(user.role)) {
    location.replace(new URL('dashboard.html', root).href);
    return;
  }

  function menuHtml() {
    let group = '';
    return allowed.map(item => {
      const groupLabel = item.group !== group ? `<div class="nav-label">${item.group}</div>` : '';
      group = item.group;
      const active = currentMenu && item.path === currentMenu.path ? 'active' : '';
      return `${groupLabel}<a class="${active}" href="${new URL(item.path, root).href}"><span class="nav-icon">${item.icon}</span><span class="nav-text">${item.label}</span></a>`;
    }).join('');
  }

  function buildLayout() {
    const content = document.querySelector('main.content');
    const footer = document.querySelector('footer.site-footer');
    if (!content) return;

    const title = isDetail ? 'Butiran Aduan' : (currentMenu?.label || document.querySelector('h1')?.textContent || 'JalanCare DB');
    const initials = String(user.name || 'P').split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
    const shell = document.createElement('div');
    shell.className = 'dashboard';
    shell.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-head"><span class="brand-mark">JKR</span><span class="side-brand"><b>JalanCare DB</b><span>Google Sheets Edition</span></span><button id="collapse" class="collapse" aria-label="Kecilkan sidebar">«</button></div>
        <nav class="side-nav">${menuHtml()}</nav>
        <div class="side-user"><span class="avatar">${initials}</span><span class="user-copy"><b></b><span></span></span></div>
      </aside>
      <div class="dashboard-main">
        <header class="topbar"><button class="mobile-toggle" id="mobileToggle" aria-label="Buka menu">☰</button><div><h1 id="viewTitle"></h1><small id="currentDate"></small></div><div class="top-actions"><span class="api-pill">Google Sheets</span><a class="secondary portal-link" href="${new URL('index.html', root).href}">Portal Awam</a><button class="secondary logout-button" id="logout">Log Keluar</button></div></header>
      </div>`;

    const dashboardMain = shell.querySelector('.dashboard-main');
    content.remove();
    if (footer) footer.remove();
    dashboardMain.append(content);
    if (footer) dashboardMain.append(footer);
    document.body.replaceChildren(shell);
    document.body.className = 'dashboard-page';

    shell.querySelector('#viewTitle').textContent = title;
    shell.querySelector('#currentDate').textContent = new Intl.DateTimeFormat('ms-MY', { dateStyle: 'full' }).format(new Date());
    shell.querySelector('.user-copy b').textContent = user.name;
    shell.querySelector('.user-copy span').textContent = user.role;
    content.querySelectorAll('[data-roles]').forEach(element => {
      if (!element.dataset.roles.split('|').includes(user.role)) element.remove();
    });
    if (localStorage.getItem('jcrSidebar') === 'collapsed') shell.classList.add('collapsed');
    shell.querySelector('#collapse').addEventListener('click', () => {
      shell.classList.toggle('collapsed');
      localStorage.setItem('jcrSidebar', shell.classList.contains('collapsed') ? 'collapsed' : 'open');
    });
    shell.querySelector('#mobileToggle').addEventListener('click', () => shell.classList.toggle('menu-open'));
    shell.querySelector('#logout').addEventListener('click', async () => {
      try { await JalanCareAPI.logout(); } catch {}
      sessionStorage.removeItem('jcrToken');
      sessionStorage.removeItem('jcrUser');
      location.href = new URL('login.html', root).href;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildLayout);
  else buildLayout();
})();
