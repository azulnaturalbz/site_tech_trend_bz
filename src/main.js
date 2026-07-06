const yearTargets = document.querySelectorAll("[data-current-year]");
for (const target of yearTargets) {
  target.textContent = String(new Date().getFullYear());
}

for (const card of document.querySelectorAll(".product-card")) {
  card.addEventListener("mouseenter", () => {
    card.dataset.hovered = "true";
  });
  card.addEventListener("mouseleave", () => {
    delete card.dataset.hovered;
  });
}
