(() => {
  const rows = document.getElementById('student-rows');
  const search = document.getElementById('student-search');
  const institution = document.getElementById('institution-filter');
  const status = document.getElementById('student-status');
  const empty = document.getElementById('student-empty');
  const stats = document.getElementById('student-stats');
  const students = Array.isArray(window.WORKSHOP_STUDENTS) ? window.WORKSHOP_STUDENTS : [];

  const summaries = [
    [students.length, 'Students'],
    [new Set(students.map((student) => student.institution)).size, 'Institutions'],
    [students.filter((student) => Boolean(student.pagesUrl)).length, 'GitHub Pages'],
    [students.filter((student) => Boolean(student.githubUrl)).length, 'GitHub profiles']
  ];
  summaries.forEach(([value, label]) => {
    const card = document.createElement('div');
    card.className = 'student-stat';
    const number = document.createElement('strong');
    number.textContent = value;
    const caption = document.createElement('span');
    caption.textContent = label;
    card.append(number, caption);
    stats.append(card);
  });

  const makeLinkCell = (url, label, studentName, className) => {
    const cell = document.createElement('td');
    if (!url) {
      const pending = document.createElement('span');
      pending.className = 'student-link-pending';
      pending.textContent = 'Not provided';
      cell.append(pending);
      return cell;
    }
    const link = document.createElement('a');
    link.className = className;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    link.setAttribute('aria-label', `${label} for ${studentName} (opens in a new tab)`);
    cell.append(link);
    return cell;
  };

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
      row.append(
        nameCell,
        institutionCell,
        makeLinkCell(student.pagesUrl, 'Open portfolio', student.name, 'student-site-link'),
        makeLinkCell(student.githubUrl, 'View profile', student.name, 'student-github-link')
      );
      rows.append(row);
    });
    empty.hidden = matches.length > 0;
    status.textContent = `${matches.length} of ${students.length} students shown`;
  };

  search.addEventListener('input', render);
  institution.addEventListener('change', render);
  render();
})();
