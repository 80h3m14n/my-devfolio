// Modern search functionality with debouncing
const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".card");

// Debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced search function
function performSearch(query) {
  const searchTerm = query.trim().toLowerCase();

  cards.forEach((card, index) => {
    const text = card.innerText.toLowerCase();
    const tags = card.getAttribute("data-tags") || "";
    const isMatch = text.includes(searchTerm) || tags.includes(searchTerm);

    if (searchTerm === "" || isMatch) {
      card.style.display = "";
      card.style.animation = `fadeInUp 0.4s ease-out ${index * 0.1}s forwards`;
    } else {
      card.style.display = "none";
    }
  });
}

// Debounced search with 300ms delay
const debouncedSearch = debounce(performSearch, 300);

searchBox.addEventListener("input", function () {
  debouncedSearch(this.value);
});

// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Parallax effect for background (subtle)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  document.body.style.transform = `translateY(${rate}px)`;
});

// Add dynamic typing effect to the title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Enhanced card interactions
cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-4px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Initialize theme toggle
// createThemeToggle();

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const sidebar = document.getElementById("sidebar");

function toggleMobileMenu() {
  sidebar.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
}

function closeMobileMenu() {
  sidebar.classList.remove("active");
  mobileMenuOverlay.classList.remove("active");
}

// Event listeners for mobile menu
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);
}

// Close mobile menu when clicking on sidebar links
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  });
});

// Close mobile menu on resize if screen becomes larger
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

console.log("🚀 Modern portfolio loaded successfully!");
