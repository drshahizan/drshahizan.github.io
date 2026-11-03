(() => {
  const config = window.APP_CONFIG || {};
  const ready = config.supabaseUrl && config.supabasePublishableKey &&
    !config.supabaseUrl.includes('PASTE_') && !config.supabasePublishableKey.includes('PASTE_') &&
    window.supabase?.createClient;
  const notice = document.querySelector('#appNotice');
  const enquiryForm = document.querySelector('#enquiryForm');
  const formMessage = document.querySelector('#formMessage');
  const loginForm = document.querySelector('#loginForm');
  const loginMessage = document.querySelector('#loginMessage');
  const managerPanel = document.querySelector('#managerPanel');
  const managerMessage = document.querySelector('#managerMessage');
  const rowsNode = document.querySelector('#bookingRows');
  const signOutButton = document.querySelector('#signOutButton');
  let client;

  if (!ready) {
    notice.textContent = 'Setup needed: ask your lecturer for the training project URL and publishable key, then enter them in assets/js/config.js.';
    notice.classList.add('notice-warning');
    return;
  }
  client = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey);
  notice.textContent = 'Training project connected. Use fictional values only.';

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.querySelector('[name="check_in_date"]').min = tomorrow.toISOString().slice(0, 10);

  document.querySelectorAll('.choose-package').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('[name="package_type"]').value = button.dataset.package;
      document.querySelector('#enquiry').scrollIntoView({ behavior: 'smooth' });
    });
  });

  enquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessage.textContent = 'Saving practice enquiry…';
    const form = new FormData(enquiryForm);
    const guestCount = Number(form.get('guest_count'));
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 12) {
      formMessage.textContent = 'Enter a guest count from 1 to 12.';
      return;
    }
    const { error } = await client.from('booking_requests').insert({
      check_in_date: form.get('check_in_date'),
      package_type: form.get('package_type'),
      guest_count: guestCount,
      visitor_country: form.get('visitor_country'),
      channel: 'Website',
      booking_status: 'Pending',
      booking_value_rm: null
    });
    if (error) {
      formMessage.textContent = `Could not save: ${error.message}. Ask the lecturer to check the table grants and approved RLS policy.`;
      return;
    }
    enquiryForm.reset();
    formMessage.textContent = 'Practice enquiry saved. The homestay team can now review it.';
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginMessage.textContent = 'Signing in…';
    const form = new FormData(loginForm);
    const { error } = await client.auth.signInWithPassword({
      email: form.get('email'),
      password: form.get('password')
    });
    loginMessage.textContent = error ? `Sign-in failed: ${error.message}` : 'Signed in. Loading manager records…';
  });

  client.auth.onAuthStateChange((_event, session) => {
    managerPanel.hidden = !session;
    if (session) {
      loginForm.hidden = true;
      setTimeout(loadBookings, 0);
    } else {
      loginForm.hidden = false;
      rowsNode.innerHTML = '<tr><td colspan="7">Sign in to view the practice list.</td></tr>';
    }
  });

  signOutButton.addEventListener('click', async () => {
    const { error } = await client.auth.signOut();
    managerMessage.textContent = error ? `Sign-out failed: ${error.message}` : 'Signed out.';
  });

  async function loadBookings() {
    managerMessage.textContent = 'Loading practice requests…';
    const { data, error } = await client.from('booking_requests')
      .select('id, created_at, check_in_date, package_type, guest_count, visitor_country, channel, booking_status')
      .order('created_at', { ascending: false });
    if (error) {
      rowsNode.innerHTML = '<tr><td colspan="7">Unable to load. Check the manager role claim and RLS policy with your lecturer.</td></tr>';
      managerMessage.textContent = error.message;
      return;
    }
    if (!data.length) {
      rowsNode.innerHTML = '<tr><td colspan="7">No practice requests yet. Submit one using the visitor form.</td></tr>';
      managerMessage.textContent = 'No records to display.';
      return;
    }
    managerMessage.textContent = `${data.length} practice request(s).`;
    rowsNode.innerHTML = data.map((row) => `
      <tr data-id="${escapeHtml(row.id)}">
        <td>${escapeHtml(row.check_in_date)}</td><td>${escapeHtml(row.package_type)}</td>
        <td>${escapeHtml(row.guest_count)}</td><td>${escapeHtml(row.visitor_country)}</td>
        <td>${escapeHtml(row.channel)}</td>
        <td><select class="status-select" aria-label="Status for ${escapeHtml(row.package_type)}">
          ${['Pending','Confirmed','Cancelled'].map((status) => `<option ${row.booking_status === status ? 'selected' : ''}>${status}</option>`).join('')}
        </select></td>
        <td><button class="row-action delete-row" type="button">Delete test row</button></td>
      </tr>`).join('');
    rowsNode.querySelectorAll('.status-select').forEach((select) => {
      select.addEventListener('change', async (event) => {
        const id = event.target.closest('tr').dataset.id;
        const { error: updateError } = await client.from('booking_requests')
          .update({ booking_status: event.target.value }).eq('id', id);
        managerMessage.textContent = updateError ? `Update failed: ${updateError.message}` : 'Status updated.';
      });
    });
    rowsNode.querySelectorAll('.delete-row').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const row = event.target.closest('tr');
        if (!window.confirm('Delete this fictional test row?')) return;
        const { error: deleteError } = await client.from('booking_requests').delete().eq('id', row.dataset.id);
        managerMessage.textContent = deleteError ? `Delete failed: ${deleteError.message}` : 'Test row deleted.';
        if (!deleteError) await loadBookings();
      });
    });
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }
})();
