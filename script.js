const navToggle = document.querySelector(".nav-toggle");
const siteMenu = document.querySelector(".site-menu");
const navLinks = Array.from(document.querySelectorAll(".site-menu a"));
const topLinks = Array.from(document.querySelectorAll('a[href="#home"]'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

navToggle.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    siteMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  });
});

const setActiveLink = () => {
  const offset = window.innerHeight * 0.35;
  let activeId = "home";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= offset) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = encodeURIComponent(`Portfolio message from ${name || "website visitor"}`);
  const body = encodeURIComponent(
    [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n")
  );

  const mailtoUrl = `mailto:mariamb.3232@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, "_blank");
  status.textContent = "Opening your email app to send the message to Mariam.";
  form.reset();
});
