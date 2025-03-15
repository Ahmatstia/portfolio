tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "accent-1": "#333",
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
  },
};

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Update smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });

    // Update active class
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
    });
    this.classList.add("active");
  });
});
// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Initialize theme
const savedTheme = localStorage.getItem("theme") || "dark";
html.classList.add(savedTheme);
updateTheme(savedTheme);

function updateTheme(theme) {
  const isDark = theme === "dark";
  const sunIcon = document.querySelector("#theme-toggle .bx-sun");
  const moonIcon = document.querySelector("#theme-toggle .bx-moon");

  if (isDark) {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    moonIcon.classList.add("block");
  } else {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    sunIcon.classList.add("block");
  }
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  updateTheme(theme);
});

// Preloader
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// Update Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }
);

document.querySelectorAll(".card-hover").forEach((el) => {
  el.classList.add("opacity-0", "translate-y-20");
  observer.observe(el);
});

// DOWNLOAD CV
document.getElementById("download-cv").addEventListener("click", function () {
  // Ganti URL berikut dengan lokasi file CV yang benar
  const cvUrl = "CV Ahmat Setiadi.pdf";

  // Buat elemen <a> secara dinamis
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "Ahmat_Setiadi_CV.pdf"; // Nama file yang akan diunduh
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
