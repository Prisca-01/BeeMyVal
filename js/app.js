const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav__item");

/* Toggle menu */
toggle.addEventListener("click", (event) => {
  event.stopPropagation();
  links.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

/* Close when clicking outside navbar */
document.addEventListener("click", (event) => {
  if (!navbar.contains(event.target) &&
      links.classList.contains("active")) {

    links.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

/* Close when clicking a nav link */
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    links.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
