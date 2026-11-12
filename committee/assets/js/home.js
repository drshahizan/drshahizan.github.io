(function () {
  const { C, esc } = window.Portal;
  document.getElementById("statConfs").textContent = C.conferences.length;
  document.getElementById("statDates").innerHTML = C.conferences.map((c) => `${esc(c.date)} · ${esc(c.city)}`).join("<br>");
  Portal.fillRole();

  Portal.loadStats((stats) => {
    let total = 0, open = 0;
    C.conferences.forEach((cf) => cf.positions.forEach((p) => {
      total += p.slots; open += Portal.open(stats, cf.id, p.role, p.slots).open;
    }));
    document.getElementById("statTotal").textContent = total;
    document.getElementById("statOpen").textContent = open;
    document.getElementById("confCards").innerHTML = C.conferences.map((cf) => Portal.confCard(cf, stats)).join("");
  });
})();
