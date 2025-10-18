// Castro & Silva Advocacia - JavaScript Functions

// Initialize Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar(); // Call once to set initial state
}

// Initialize EmailJS
function initEmailJS() {
  emailjs.init("8Gj59XzNcTjvQvYL8");
}

// Initialize Hero Animation
function initHeroAnimation() {
  const heroTitle = document.getElementById("hero-title");

  if (heroTitle) {
    heroTitle.classList.add("hero-float");
  }
}

// Initialize Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        setTimeout(() => {
          mobileMenu.classList.remove("opacity-0", "translate-y-[-10px]");
          mobileMenu.classList.add("opacity-100", "translate-y-0");
        }, 10);
      } else {
        mobileMenu.classList.add("opacity-0", "translate-y-[-10px]");
        mobileMenu.classList.remove("opacity-100", "translate-y-0");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("opacity-0", "translate-y-[-10px]");
        mobileMenu.classList.remove("opacity-100", "translate-y-0");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      });
    });
  }
}

// Initialize Tailwind Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Remove initial invisible states and add visible states
        element.classList.remove(
          "opacity-0",
          "translate-y-12",
          "translate-y-8",
          "translate-y-[-20px]",
          "translate-x-[-50px]",
          "translate-x-[50px]",
          "translate-x-[-30px]",
          "translate-x-[30px]",
          "scale-95"
        );

        element.classList.add(
          "opacity-100",
          "translate-y-0",
          "translate-x-0",
          "scale-100"
        );

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all elements with data-scroll-animate attribute
  const animatedElements = document.querySelectorAll("[data-scroll-animate]");
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const contactButton = document.getElementById("contact-button");
  const contactMessage = document.getElementById("contact-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      contactButton.disabled = true;
      contactButton.textContent = "Enviando...";
      contactMessage.textContent = "";

      const formData = new FormData(this);
      const templateParams = {
        user_name: formData.get("user_name"),
        user_lastname: formData.get("user_lastname"),
        user_email: formData.get("user_email"),
        message: formData.get("message"),
      };

      emailjs
        .send("service_xn4zxbc", "template_dhr8h3k", templateParams)
        .then(() => {
          contactMessage.style.color = "green";
          contactMessage.textContent = "Mensagem enviada com sucesso!";
          contactForm.reset();
        })
        .catch(() => {
          contactMessage.style.color = "red";
          contactMessage.textContent =
            "Erro ao enviar mensagem. Tente novamente.";
        })
        .finally(() => {
          contactButton.disabled = false;
          contactButton.textContent = "Enviar";
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 5000);
        });
    });
  }
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById("ano-atual");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initHeroAnimation();
  initNavbarScroll();
  initEmailJS();
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  setCurrentYear();
});
