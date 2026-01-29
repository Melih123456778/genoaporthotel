

/* ===============================
   HELPERS (SAFE)
   =============================== */
   const qs = (sel, root = document) => root.querySelector(sel);
   const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
   
   /* ===============================
      DOM READY
      =============================== */
   document.addEventListener("DOMContentLoaded", () => {
     /* ===============================
        FADE-IN & TITLE ANIMATIONS
        =============================== */
     const fadeElements = qsa(".fade-in, .fade-title");
     if (fadeElements.length && "IntersectionObserver" in window) {
       const fadeObserver = new IntersectionObserver(
         (entries, observer) => {
           entries.forEach((entry) => {
             if (entry.isIntersecting) {
               entry.target.classList.add("show");
               observer.unobserve(entry.target);
             }
           });
         },
         { threshold: 0.25 }
       );
   
       fadeElements.forEach((el) => fadeObserver.observe(el));
     }
   
     /* ===============================
        NAVBAR + BACK TO TOP + ACTIVE LINK
        =============================== */
     const siteNavbar = qs(".navbar");
     const backToTop = qs("#backToTop");
   
     const sections = qsa("section[id]");
     const navLinks = qsa("nav a");
   
     // scroll handler (tek)
     const onScroll = () => {
       const scrollY = window.scrollY;
   
       if (siteNavbar) siteNavbar.classList.toggle("scrolled", scrollY > 80);
       if (backToTop) backToTop.classList.toggle("show", scrollY > 400);
   
       // Active nav link (data-section kullananlar için)
       if (sections.length && navLinks.length) {
         let current = "";
         sections.forEach((section) => {
           const sectionTop = section.offsetTop - 140;
           if (scrollY >= sectionTop) current = section.getAttribute("id");
         });
   
         navLinks.forEach((link) => {
           const sectionName = link.dataset.section;
           if (!sectionName) return;
           link.classList.toggle("active", sectionName === current);
         });
       }
     };
   
     window.addEventListener("scroll", onScroll);
     onScroll(); // sayfa ilk açılınca da uygula
   
     // Smooth scroll: SADECE href="#..." ise
     navLinks.forEach((link) => {
       link.addEventListener("click", (e) => {
         const href = link.getAttribute("href");
         if (!href || !href.startsWith("#")) return; // başka sayfaya gidiyorsa engelleme
         e.preventDefault();
   
         const target = qs(href);
         if (target) target.scrollIntoView({ behavior: "smooth" });
       });
     });
   
     // Back to top
     if (backToTop) {
       backToTop.addEventListener("click", () => {
         window.scrollTo({ top: 0, behavior: "smooth" });
       });
     }
   
     /* ===============================
        GALLERY LIGHTBOX (grid)
        =============================== */
     const lightbox = qs("#lightbox");
     if (lightbox) {
       const lightboxImg = qs("img", lightbox);
   
       qsa(".gallery-item img").forEach((img) => {
         img.addEventListener("click", () => {
           if (!lightboxImg) return;
           lightboxImg.src = img.dataset.full || img.src;
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
     const hamburger = qs("#hamburger");
     const navMenu = qs("#navMenu");
     const body = document.body;
   
     if (hamburger && navMenu) {
       hamburger.addEventListener("click", () => {
         const isOpen = navMenu.classList.toggle("open");
         body.classList.toggle("no-scroll", isOpen);
       });
   
       qsa(".nav-menu a").forEach((link) => {
         link.addEventListener("click", () => {
           navMenu.classList.remove("open");
           body.classList.remove("no-scroll");
         });
       });
     }
   
     /* ===============================
        ROOM LIGHTBOX (IMAGE CLICK ONLY)
        =============================== */
     const cards = qsa(".room-card");
     const roomLightbox = qs("#roomLightbox");
     const roomImgEl = qs("#roomLightboxImg");
   
     if (cards.length && roomLightbox && roomImgEl) {
       const closeBtn = qs(".room-close", roomLightbox);
       const prevBtn = qs(".room-prev", roomLightbox);
       const nextBtn = qs(".room-next", roomLightbox);
       const overlay = qs(".room-overlay", roomLightbox);
   
       let images = [];
       let idx = 0;
   
       const show = () => {
         if (!images.length) return;
         roomImgEl.src = images[idx];
         roomLightbox.classList.add("show");
         document.body.classList.add("no-scroll");
       };
   
       const close = () => {
         roomLightbox.classList.remove("show");
         document.body.classList.remove("no-scroll");
       };
   
       const next = () => {
         if (!images.length) return;
         idx = (idx + 1) % images.length;
         roomImgEl.src = images[idx];
       };
   
       const prev = () => {
         if (!images.length) return;
         idx = (idx - 1 + images.length) % images.length;
         roomImgEl.src = images[idx];
       };
   
       cards.forEach((card) => {
         const img = qs("img", card);
         if (!img) return;
   
         img.style.cursor = "zoom-in";
         img.addEventListener("click", (e) => {
           e.stopPropagation();
           const data = card.dataset.images;
           if (!data) return;
   
           try {
             images = JSON.parse(data);
           } catch {
             images = [];
           }
   
           idx = 0;
           show();
         });
       });
   
       if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); next(); });
       if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
       if (closeBtn) closeBtn.addEventListener("click", close);
       if (overlay) overlay.addEventListener("click", close);
   
       document.addEventListener("keydown", (e) => {
         if (!roomLightbox.classList.contains("show")) return;
         if (e.key === "Escape") close();
         if (e.key === "ArrowRight") next();
         if (e.key === "ArrowLeft") prev();
       });
     }
   
     /* ===============================
        GALLERY TRACK SLIDER (arrows + autoplay) - SADECE varsa çalışır
        =============================== */
     const track = qs(".gallery-track");
     const trackSlides = qsa(".gallery-track img");
   
     const leftArrow = qs(".gallery-arrow.left");
     const rightArrow = qs(".gallery-arrow.right");
   
     if (track && trackSlides.length && leftArrow && rightArrow) {
       let galleryIndex = 0;
       const slidesPerView = 4;
       const intervalTime = 2500;
   
       const slideGallery = (direction = 1) => {
         if (!trackSlides.length) return;
   
         const first = trackSlides[0];
         if (!first) return;
   
         const slideWidth = first.offsetWidth + 24; // gap dahil
         galleryIndex += direction;
   
         const maxIndex = Math.max(0, trackSlides.length - slidesPerView);
         if (galleryIndex > maxIndex) galleryIndex = 0;
         if (galleryIndex < 0) galleryIndex = maxIndex;
   
         track.style.transform = `translateX(-${galleryIndex * slideWidth}px)`;
       };
   
       let sliderInterval = setInterval(() => slideGallery(1), intervalTime);
   
       leftArrow.addEventListener("click", () => slideGallery(-1));
       rightArrow.addEventListener("click", () => slideGallery(1));
   
       track.addEventListener("mouseenter", () => clearInterval(sliderInterval));
       track.addEventListener("mouseleave", () => {
         sliderInterval = setInterval(() => slideGallery(1), intervalTime);
       });
     }
   
     /* ===============================
        ROOM CARD AUTO SLIDESHOW (SAFE)
        =============================== */
     const roomIntervals = new Map();
   
     cards.forEach((card) => {
       const img = qs("img", card);
       if (!img) return;
   
       let images = [];
       try {
         images = card.dataset.images ? JSON.parse(card.dataset.images) : [];
       } catch {
         images = [];
       }
       if (!images.length) return;
   
       let i = 0;
   
       const tick = () => {
         // fade-out
         img.classList.remove("fade-in");
         img.classList.add("fade-out");
   
         setTimeout(() => {
           i = (i + 1) % images.length;
           img.src = images[i];
   
           img.classList.remove("fade-out");
           img.classList.add("fade-in");
         }, 400);
       };
   
       // başlangıç sınıfı
       img.classList.add("fade-in");
   
       const start = () => {
         stop();
         const id = setInterval(tick, 2600);
         roomIntervals.set(card, id);
       };
   
       const stop = () => {
         const id = roomIntervals.get(card);
         if (id) clearInterval(id);
         roomIntervals.delete(card);
       };
   
       start();
   
       card.addEventListener("mouseenter", stop);
       card.addEventListener("mouseleave", start);
     });
   
     /* ===============================
        WELCOME SLIDER (SAFE)
        =============================== */
     const welcomeSlides = qsa(".welcome-slider img");
     if (welcomeSlides.length) {
       let currentSlide = 0;
   
       // ilkini aktif yap (eğer hiç active yoksa)
       if (!welcomeSlides.some((s) => s.classList.contains("active"))) {
         welcomeSlides[0].classList.add("active");
       }
   
       setInterval(() => {
         welcomeSlides[currentSlide].classList.remove("active");
         currentSlide = (currentSlide + 1) % welcomeSlides.length;
         welcomeSlides[currentSlide].classList.add("active");
       }, 2000);
     }
   });
   
   