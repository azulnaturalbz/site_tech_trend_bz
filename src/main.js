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

const siteUrl = "https://techtrend.silvatech.bz/";

for (const button of document.querySelectorAll("[data-copy-link]")) {
  const defaultLabel = button.textContent;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      button.textContent = "Copied";
      button.dataset.copied = "true";
      setTimeout(() => {
        button.textContent = defaultLabel;
        delete button.dataset.copied;
      }, 1800);
    } catch (error) {
      window.prompt("Copy this site link:", siteUrl);
    }
  });
}
