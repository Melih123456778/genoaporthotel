


document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .left");
  const nextBtn = document.querySelector(".lightbox .right");

  let currentIndex = 0;
  const images = [];

  items.forEach((item, index) => {
    images.push(item.getAttribute("href"));

    item.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    // 🔥 BODY ALTINA TAŞI – KESİN ÇÖZÜM
    if (lightbox.parentElement !== document.body) {
      document.body.appendChild(lightbox);
    }

    lightboxImg.src = images[currentIndex];
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

});
