document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Navigation Toggle ---
  const menuButton = document.querySelector(".menu-button");
  const navMenu = document.querySelector(".nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });
  }

  // --- Scroll Reveal Animations ---
  // Select all elements that have inline styles setting opacity to 0
  // and have a data-w-id attribute.
  const animatedElements = document.querySelectorAll('[data-w-id]');

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a class that we will define in CSS, or apply styles directly
        const el = entry.target;
        
        // Add transition for smooth animation
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        
        // Reveal element
        el.style.opacity = "1";
        el.style.transform = "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
        
        // Stop observing once revealed
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    // Only observe elements that are hidden
    if (el.style.opacity === "0" || el.style.opacity === 0) {
      observer.observe(el);
    }
  });
});
