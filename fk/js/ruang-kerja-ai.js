document.addEventListener("DOMContentLoaded", () => {
  const reset = document.querySelector("#reset-checklist");
  reset?.addEventListener("click", () =>
    document
      .querySelectorAll('#kualiti input[type="checkbox"]')
      .forEach((box) => (box.checked = false)),
  );
});
