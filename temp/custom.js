function initCustomLogic() {
  // --- Mobile Navigation Toggle ---
  const menuButton = document.querySelector(".menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  // --- Scroll Reveal Animations ---
  // Webflow places inline `opacity: 0` on elements inside the data-w-id containers.
  // We need to find ALL elements that are initially hidden via inline opacity.
  const allElements = document.querySelectorAll('*');
  const animatedElements = [];
  
  allElements.forEach(el => {
    if (el.style && (el.style.opacity === '0' || el.style.opacity === 0)) {
      animatedElements.push(el);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0, 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Add transition for all changing properties
        el.style.transition = "all 0.6s ease-out";
        
        // Reveal element
        el.style.opacity = "1";
        
        // Reset all transform variations that Webflow uses
        const transformReset = "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
        el.style.transform = transformReset;
        el.style.webkitTransform = transformReset;
        el.style.MozTransform = transformReset;
        el.style.msTransform = transformReset;
        
        // Stop observing once revealed
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Delay observing slightly to ensure layout is ready
  setTimeout(() => {
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }, 50);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCustomLogic);
} else {
  initCustomLogic();
}
