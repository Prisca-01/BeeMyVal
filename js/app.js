const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__item");

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    links.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
