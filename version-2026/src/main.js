import "./styles.css";

const toggle = document.querySelector("[data-nav-toggle]");
const links = document.querySelector("[data-nav-links]");

if (toggle && links) {
  const closeMenu = () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
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
