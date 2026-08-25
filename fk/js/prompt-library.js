document.addEventListener("DOMContentLoaded", () => {
  const source = document.getElementById("prompt-data");
  const grid = document.getElementById("prompt-grid");
  const search = document.getElementById("prompt-search");
  const count = document.getElementById("prompt-count");
  const empty = document.getElementById("prompt-empty");
  const scopeButtons = [...document.querySelectorAll(".filter")];
  const domainButtons = [...document.querySelectorAll(".domain-filter")];
  const toast = document.querySelector(".toast");
  if (!source || !grid) return;
  let prompts = [];
  try {
    prompts = JSON.parse(source.textContent);
  } catch (error) {
    grid.innerHTML = '<p class="notice">Data prompt tidak dapat dibaca.</p>';
    return;
  }
  const domainOf = (item) =>
    item.l.startsWith("Sumber Manusia")
      ? "hr"
      : item.l.startsWith("Sokongan Teknikal")
        ? "teknikal"
        : item.l.startsWith("Akademik")
          ? "akademik"
          : "umum";
  const requested = new URLSearchParams(location.search).get("domain");
  let activeDomain = ["hr", "teknikal", "akademik"].includes(requested)
    ? requested
    : "semua";
  let activeScope = "semua";
  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1700);
    }
  };
  const syncButtons = () => {
    domainButtons.forEach((button) => {
      const selected = button.dataset.domain === activeDomain;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    scopeButtons.forEach((button) => {
      const selected = button.dataset.filter === activeScope;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };
  const render = () => {
    const q = (search?.value || "").trim().toLocaleLowerCase("ms");
    const items = prompts.filter(
      (item) =>
        (activeDomain === "semua" || domainOf(item) === activeDomain) &&
        (activeScope === "semua" || item.c === activeScope) &&
        `${item.t} ${item.p} ${item.l}`.toLocaleLowerCase("ms").includes(q),
    );
    grid.replaceChildren(
      ...items.map((item) => {
        const card = document.createElement("article");
        card.className = "card prompt-card";
        const label = document.createElement("span");
        label.className = "prompt-label";
        label.textContent = item.l;
        const title = document.createElement("h3");
        title.textContent = item.t;
        const body = document.createElement("p");
        body.className = "prompt-text";
        body.textContent = item.p;
        const button = document.createElement("button");
        button.className = "button copy-prompt";
        button.type = "button";
        button.textContent = "Salin Prompt";
        button.addEventListener("click", () => copy(item.p));
        card.append(label, title, body, button);
        return card;
      }),
    );
    count.textContent = `${items.length} daripada ${prompts.length} prompt dipaparkan`;
    empty.hidden = items.length !== 0;
  };
  domainButtons.forEach((button) =>
    button.addEventListener("click", () => {
      activeDomain = button.dataset.domain;
      activeScope = "semua";
      syncButtons();
      render();
    }),
  );
  scopeButtons.forEach((button) =>
    button.addEventListener("click", () => {
      activeScope = button.dataset.filter;
      syncButtons();
      render();
    }),
  );
  search?.addEventListener("input", render);
  syncButtons();
  render();
});
