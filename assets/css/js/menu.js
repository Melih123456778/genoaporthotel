document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("navMenu");

  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    menu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
});


/* 🔥 MOBİL GERİ TUŞU & STATE TEMİZLEME */
window.addEventListener("pageshow", function () {
  const menu = document.getElementById("navMenu");
  if (menu) menu.classList.remove("active");
  document.body.classList.remove("menu-open");
});
