const themeToggle = document.querySelector("#themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = theme;
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

const savedTheme = localStorage.getItem("theme");
const initialTheme =
    savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : "light";

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("sliderDots");

    let currentIndex = 0;
    let autoSlideTimer = null;
    const AUTO_DELAY = 5000; // Auto-play interval in ms

    // Render navigation dots
    slides.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (idx === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
        dot.addEventListener("click", () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlider() {
        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === currentIndex);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetTimer();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function startTimer() {
        autoSlideTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    function resetTimer() {
        clearInterval(autoSlideTimer);
        startTimer();
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    // Touch Swipe Support for Mobile
    let startX = 0;
    const sliderWrapper = document.querySelector(".hero-slider");

    sliderWrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    sliderWrapper.addEventListener("touchend", (e) => {
        const diffX = startX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) nextSlide();
            else prevSlide();
            resetTimer();
        }
    }, { passive: true });

    // Initialize Auto-slide
    startTimer();
});

console.log("Slider script loaded successfully!");

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const faq = document.querySelector(".faq");

  if (!faq) return;

  const accordion = faq.querySelector(".faq-accordion");
  const items = [...accordion.querySelectorAll(".faq-item")];

  if (!items.length) return;

  const closeItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.setAttribute("aria-expanded", "false");
    answer.style.maxHeight = "0px";
    item.classList.remove("active");
  };

  const openItem = (item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.setAttribute("aria-expanded", "true");
    item.classList.add("active");
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  };

  accordion.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-question");

    if (!button || !accordion.contains(button)) return;

    const item = button.closest(".faq-item");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Single-open accordion: close all items before toggling.
    items.forEach(closeItem);

    if (!isExpanded) {
      openItem(item);
    }
  });

  // Keep expanded answers correctly sized when the layout changes.
  const resizeObserver = new ResizeObserver(() => {
    items.forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (button.getAttribute("aria-expanded") === "true") {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  items.forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    const button = item.querySelector(".faq-question");

    // Initialize a predictable collapsed state.
    closeItem(item);

    // Observe answer content changes, such as responsive text wrapping.
    resizeObserver.observe(answer);

    // Support keyboard activation through native button behavior.
    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeItem(item);
        button.focus();
      }
    });
  });
});