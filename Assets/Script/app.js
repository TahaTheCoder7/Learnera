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