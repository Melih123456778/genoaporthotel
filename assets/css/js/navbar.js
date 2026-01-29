document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const overlay = document.getElementById("menuOverlay");
    const body = document.body;
  
    if (!hamburger || !navMenu) return;
  
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      body.classList.toggle("no-scroll", isOpen);
  
      if (overlay) {
        overlay.classList.toggle("open", isOpen);
      }
    });
  
    // Menü linkine basınca kapat
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.classList.remove("no-scroll");
        if (overlay) overlay.classList.remove("open");
      });
    });
  
    // Overlay tıklanınca kapat
    if (overlay) {
      overlay.addEventListener("click", () => {
        navMenu.classList.remove("open");
        body.classList.remove("no-scroll");
        overlay.classList.remove("open");
      });
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
  
    console.log("hamburger:", hamburger);
    console.log("navMenu:", navMenu);
  
    if (!hamburger || !navMenu) return;
  
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  });
  
  
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
  
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  