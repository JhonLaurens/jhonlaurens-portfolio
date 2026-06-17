import "./styles.css";

const toggle = document.querySelector("[data-nav-toggle]");
const links = document.querySelector("[data-nav-links]");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = new URL(link.getAttribute("href"), window.location.origin).pathname.replace(/\/$/, "") || "/";
  if (href === currentPath) link.setAttribute("aria-current", "page");
});

document.querySelectorAll("img.protected-image").forEach((image) => {
  image.addEventListener("contextmenu", (event) => event.preventDefault());
  image.addEventListener("dragstart", (event) => event.preventDefault());
});
