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

// ROOM SLIDER (IMAGE CLICK ONLY)

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".room-card");
  const lightbox = document.getElementById("roomLightbox");
  const imgEl = document.getElementById("roomLightboxImg");

  if (!cards.length || !lightbox || !imgEl) return;

  const closeBtn = lightbox.querySelector(".room-close");
  const prevBtn = lightbox.querySelector(".room-prev");
  const nextBtn = lightbox.querySelector(".room-next");
  const overlay = lightbox.querySelector(".room-overlay");

  let images = [];
  let index = 0;

  cards.forEach(card => {
    const img = card.querySelector("img");
    if (!img) return;

    img.style.cursor = "zoom-in";

    img.addEventListener("click", e => {
      e.stopPropagation();

      const data = card.dataset.images;
      if (!data) return;

      images = JSON.parse(data);
      index = 0;

      imgEl.src = images[index];
      lightbox.classList.add("show");
      document.body.classList.add("no-scroll");
    });
  });

  function close() {
    lightbox.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }

  function next() {
    index = (index + 1) % images.length;
    imgEl.src = images[index];
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    imgEl.src = images[index];
  }

  nextBtn.addEventListener("click", e => { e.stopPropagation(); next(); });
  prevBtn.addEventListener("click", e => { e.stopPropagation(); prev(); });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


const track = document.querySelector(".gallery-track");
const slides = document.querySelectorAll(".gallery-track img");

let index = 0;
const slidesPerView = 4;
const intervalTime = 2500;

function slideGallery() {
  const slideWidth = slides[0].offsetWidth + 24; // gap dahil
  index++;

  if (index > slides.length - slidesPerView) {
    index = 0;
  }

  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

let sliderInterval = setInterval(slideGallery, intervalTime);

document.querySelector(".gallery-arrow.left").addEventListener("click", () => {
  index--;
  if (index < 0) index = slides.length - slidesPerView;
  slideGallery();
});

document.querySelector(".gallery-arrow.right").addEventListener("click", () => {
  slideGallery();
});

track.addEventListener("mouseenter", () => {
  clearInterval(sliderInterval);
});

track.addEventListener("mouseleave", () => {
  sliderInterval = setInterval(slideGallery, intervalTime);
});

document.querySelectorAll(".room-card").forEach(card => {
  const img = card.querySelector("img");
  const images = JSON.parse(card.dataset.images);

  let index = 0;

  img.classList.add("fade-in");

  setInterval(() => {
    // hemen fade-out başlasın
    img.classList.remove("fade-in");
    img.classList.add("fade-out");

    // fade sürerken foto değişsin (bekleme az!)
    setTimeout(() => {
      index = (index + 1) % images.length;
      img.src = images[index];

      img.classList.remove("fade-out");
      img.classList.add("fade-in");
    }, 400); // ⬅️ BURASI KRİTİK (eskiden 700)

  }, 2600); // ⬅️ daha kısa döngü
});

card.addEventListener("mouseenter", () => clearInterval(interval));
card.addEventListener("mouseleave", () => startInterval());

navbar.classList.toggle("scrolled", scrollY > 80);

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".welcome-slider img");
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 2000);
});
