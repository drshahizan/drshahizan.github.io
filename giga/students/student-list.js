(() => {
  const rows = document.getElementById('student-rows');
  const search = document.getElementById('student-search');
  const institution = document.getElementById('institution-filter');
  const status = document.getElementById('student-status');
  const empty = document.getElementById('student-empty');
  const stats = document.getElementById('student-stats');
  const students = Array.isArray(window.WORKSHOP_STUDENTS) ? window.WORKSHOP_STUDENTS : [];

  const linkedCount = students.filter((student) => Boolean(student.url)).length;
  const institutionCount = new Set(students.map((student) => student.institution)).size;
  [
    [students.length, 'Students'],
    [institutionCount, 'Institutions'],
    [linkedCount, 'GitHub Pages links']
  ].forEach(([value, label]) => {
    const card = document.createElement('div');
    card.className = 'student-stat';
    const number = document.createElement('strong');
    number.textContent = value;
    const caption = document.createElement('span');
    caption.textContent = label;
    card.append(number, caption);
    stats.append(card);
  });

  const render = () => {
    const term = search.value.trim().toLocaleLowerCase();
    const selectedInstitution = institution.value;
    const matches = students.filter((student) => {
      const matchesTerm = !term || student.name.toLocaleLowerCase().includes(term) || student.institution.toLocaleLowerCase().includes(term);
      const matchesInstitution = !selectedInstitution || student.institution === selectedInstitution;
      return matchesTerm && matchesInstitution;
    });

    rows.replaceChildren();
    matches.forEach((student) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('th');
      nameCell.scope = 'row';
      nameCell.textContent = student.name;
      const institutionCell = document.createElement('td');
      institutionCell.textContent = student.institution;
      const linkCell = document.createElement('td');
      if (student.url) {
        const link = document.createElement('a');
        link.className = 'student-site-link';
        link.href = student.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Open website';
        linkCell.append(link);
      } else {
        const pending = document.createElement('span');
        pending.className = 'student-link-pending';
        pending.textContent = 'Not provided';
        linkCell.append(pending);
      }
      row.append(nameCell, institutionCell, linkCell);
      rows.append(row);
    });
    empty.hidden = matches.length > 0;
    status.textContent = `${matches.length} of ${students.length} students shown`;
  };

  search.addEventListener('input', render);
  institution.addEventListener('change', render);
  render();
})();
