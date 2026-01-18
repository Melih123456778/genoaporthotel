/* ===============================
   FADE-IN & TITLE ANIMATIONS
   =============================== */

const fadeElements = document.querySelectorAll(".fade-in, .fade-title");

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

fadeElements.forEach(el => fadeObserver.observe(el));

/* ===============================
   NAVBAR + SCROLL EFFECTS
   =============================== */

const navbar = document.querySelector(".navbar");
const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[data-section]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* Navbar background */
  if (navbar) {
    navbar.classList.toggle("scrolled", scrollY > 80);
  }

  /* Back to top button */
  if (backToTop) {
    backToTop.classList.toggle("show", scrollY > 400);
  }

  /* Active nav link */
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.section === current
    );
  });
});

/* ===============================
   BACK TO TOP CLICK
   =============================== */

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ===============================
   GALLERY LIGHTBOX
   =============================== */

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.dataset.full;
      lightbox.classList.add("show");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });
}

/* ===============================
   MOBILE MENU (SAFE)
   =============================== */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const body = document.body;

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    body.classList.toggle("no-scroll", isOpen);
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      body.classList.remove("no-scroll");
    });
  });
}
