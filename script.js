document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("is-open", !open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
filters.forEach((button) => button.addEventListener("click", () => {
  const category = button.dataset.filter;
  filters.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  cards.forEach((card) => { card.hidden = category !== "all" && card.dataset.category !== category; });
}));

const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else revealItems.forEach((item) => item.classList.add("is-visible"));

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      const current = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("is-current", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }), { rootMargin: "-25% 0px -65% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
document.querySelector("#current-year").textContent = new Date().getFullYear();