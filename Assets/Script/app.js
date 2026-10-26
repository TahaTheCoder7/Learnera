/**
 * LEARNERA - Course Evaluation & Tech Education Portal
 * Master Client Application Script
 * Powered by BYTEHEX TECH
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Dynamic Footer Year ---
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // --- 2. Toast Notification System ---
  const toastContainer = document.getElementById("toastContainer") || createToastContainer();

  function createToastContainer() {
    const el = document.createElement("div");
    el.id = "toastContainer";
    el.className = "toast-container";
    document.body.appendChild(el);
    return el;
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "fa-circle-check" : "fa-circle-info";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // --- 3. Sticky Navbar & Scroll Spy ---
  const siteHeader = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    // Header background toggle
    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    // ScrollSpy active link
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Back-to-top button visibility
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  // Back to top click
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 4. Mobile Navigation Drawer ---
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.querySelector(".mobile-nav-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileNav() {
    if (mobileNav) {
      mobileNav.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileNav);
  }

  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // --- 5. Course Filtering ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      courseCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // --- 6. FAQ Accordion ---
  const faqAccordion = document.querySelector(".faq-accordion");
  if (faqAccordion) {
    const faqItems = [...faqAccordion.querySelectorAll(".faq-item")];

    const closeFaq = (item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!button || !answer) return;

      button.setAttribute("aria-expanded", "false");
      answer.style.maxHeight = "0px";
      item.classList.remove("active");
    };

    const openFaq = (item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!button || !answer) return;

      button.setAttribute("aria-expanded", "true");
      item.classList.add("active");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    };

    faqAccordion.addEventListener("click", (e) => {
      const button = e.target.closest(".faq-question");
      if (!button) return;

      const item = button.closest(".faq-item");
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Accordion single open
      faqItems.forEach(closeFaq);

      if (!isExpanded) {
        openFaq(item);
      }
    });

    // Handle window resize dynamically for expanded items
    window.addEventListener("resize", () => {
      faqItems.forEach((item) => {
        if (item.classList.contains("active")) {
          const answer = item.querySelector(".faq-answer");
          if (answer) {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
          }
        }
      });
    });
  }

  // --- 7. Modals (Enrollment & Course Details) ---
  const enrollModal = document.getElementById("enrollModal");
  const courseDetailsModal = document.getElementById("courseDetailsModal");
  const modalOverlays = document.querySelectorAll(".modal-overlay");
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

  function openModal(modal) {
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalOverlays.forEach(closeModal);
      closeMobileNav();
    }
  });

  // Open Enroll Modal Triggers
  const enrollTriggers = document.querySelectorAll(".open-enroll-modal");
  const courseSelectDropdown = document.getElementById("enrollCourseSelect");

  enrollTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute("data-course");
      if (courseSelectDropdown && courseName) {
        courseSelectDropdown.value = courseName;
      }
      openModal(enrollModal);
    });
  });

  // Course Details Data
  const courseData = {
    webdev: {
      title: "Modern Web & App Development (MERN Stack)",
      duration: "1 Year Full Program (Live Cohort)",
      level: "Zero to Hero (Industry Standard)",
      mentor: "Sir Muhammad Taha (CEO @ ByteHex Tech)",
      description: "Master industry-standard web engineering from fundamental HTML5/CSS3 and modern JavaScript (ES6+) through React.js, Node.js, Express, and MongoDB. Includes microservices architecture, real-world REST API design, JWT auth, and deployment on Vercel and AWS.",
      modules: [
        "Phase 1: Semantic HTML5, Modern Responsive CSS, Flexbox & Grid Masterclass",
        "Phase 2: Modern JavaScript (ES6+), Asynchronous Programming & DOM Manipulation",
        "Phase 3: React.js, State Management, Hooks, Custom Routing & Next.js Basics",
        "Phase 4: Node.js, Express.js REST APIs, MongoDB Aggregation & Mongoose",
        "Phase 5: Full-Stack Capstone Production Projects & Job-Ready Internship"
      ]
    },
    python: {
      title: "Python Programming & System Automation",
      duration: "12 Months Comprehensive Track",
      level: "Beginner to Advanced",
      mentor: "Sir Muhammad Mubeen (COO @ ByteHex Tech)",
      description: "A comprehensive journey from Python foundations and data structures to object-oriented programming (OOP), file systems, web scraping, and production automation pipelines.",
      modules: [
        "Phase 1: Python Basics, Data Types, Control Structures & Algorithmic Logic",
        "Phase 2: Object-Oriented Programming (OOP), Classes, Modules & Clean Architecture",
        "Phase 3: Working with Files, APIs, JSON parsing & Automation Scripts",
        "Phase 4: Database Integration with SQLite / PostgreSQL & Web Frameworks",
        "Phase 5: Real-World Industry Automation Capstones & Certification"
      ]
    },
    aiml: {
      title: "Machine Learning & Artificial Intelligence",
      duration: "4 Weeks Intensive Bootcamp Track",
      level: "Intermediate & Practical",
      mentor: "Sir Muhammad Taha & AI Specialist Team",
      description: "Learn foundational mathematics, data wrangling with NumPy and Pandas, exploratory data analysis, classical machine learning algorithms with Scikit-Learn, and introductory deep neural networks.",
      modules: [
        "Module 1: Mathematics for ML & Data Preprocessing with NumPy/Pandas",
        "Module 2: Supervised vs Unsupervised Learning, Regression & Classification",
        "Module 3: Model Evaluation, Hyperparameter Tuning & Scikit-Learn Pipelines",
        "Module 4: Neural Networks Fundamentals & Intro to LLM Fine-Tuning"
      ]
    },
    git: {
      title: "Git, GitHub & DevOps Team Collaboration",
      duration: "2 Weeks Practical Sprint",
      level: "Beginner Friendly & Essential",
      mentor: "Sir Muhammad Taha & Sir Muhammad Mubeen",
      description: "Master the industry standard for code versioning, branch management, pull requests, resolving merge conflicts, and automated GitHub Actions CI/CD pipelines.",
      modules: [
        "Day 1-3: Git Internals, Commits, Staging & Repository Architecture",
        "Day 4-7: Branching Strategies (GitFlow), Merges, Rebase & Conflict Resolution",
        "Day 8-11: GitHub Team Collaboration, PR Reviews & Open-Source Workflows",
        "Day 12-14: GitHub Actions, CI/CD Pipeline Automation & Production Deployment"
      ]
    }
  };

  // Open Course Details Modal
  const detailTriggers = document.querySelectorAll(".open-course-details");
  detailTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const courseKey = btn.getAttribute("data-course-key");
      const data = courseData[courseKey];

      if (data && courseDetailsModal) {
        document.getElementById("modalCourseTitle").textContent = data.title;
        document.getElementById("modalCourseDuration").textContent = data.duration;
        document.getElementById("modalCourseLevel").textContent = data.level;
        document.getElementById("modalCourseMentor").textContent = data.mentor;
        document.getElementById("modalCourseDesc").textContent = data.description;

        const modulesList = document.getElementById("modalCourseModules");
        if (modulesList) {
          modulesList.innerHTML = data.modules
            .map((mod) => `<li><i class="fa-solid fa-circle-check text-primary"></i> <span>${mod}</span></li>`)
            .join("");
        }

        const modalEnrollBtn = document.getElementById("modalEnrollBtn");
        if (modalEnrollBtn) {
          modalEnrollBtn.setAttribute("data-course", data.title);
        }

        openModal(courseDetailsModal);
      }
    });
  });

  // Modal direct enroll button
  const modalEnrollBtn = document.getElementById("modalEnrollBtn");
  if (modalEnrollBtn) {
    modalEnrollBtn.addEventListener("click", () => {
      const targetCourse = modalEnrollBtn.getAttribute("data-course");
      closeModal(courseDetailsModal);
      if (courseSelectDropdown && targetCourse) {
        courseSelectDropdown.value = targetCourse;
      }
      setTimeout(() => openModal(enrollModal), 250);
    });
  }

  // --- 8. Forms Handling & Validations ---

  // Enrollment Form Submission
  const enrollmentForm = document.getElementById("enrollmentForm");
  if (enrollmentForm) {
    enrollmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("enrollName")?.value || "Student";
      const course = document.getElementById("enrollCourseSelect")?.value;

      closeModal(enrollModal);
      enrollmentForm.reset();

      showToast(`🎉 Congratulations ${name}! Your seat for "${course}" has been reserved. Our admissions team will reach out via WhatsApp!`, "success");
    });
  }

  // FAQ Question Submission Form
  const faqForm = document.getElementById("faqForm");
  if (faqForm) {
    faqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = faqForm.querySelector("input");
      if (input && input.value.trim()) {
        const query = input.value.trim();
        input.value = "";
        showToast("✅ Thank you! Your inquiry has been submitted. A mentor will reply within 2 hours.", "success");
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      if (input && input.value.trim()) {
        input.value = "";
        showToast("📬 Subscribed successfully! You'll receive live cohort updates and tech newsletters.", "success");
      }
    });
  }

  // Platform Tour / Video Demo
  const openDemoBtn = document.getElementById("openDemoBtn");
  if (openDemoBtn) {
    openDemoBtn.addEventListener("click", () => {
      showToast("🎥 Welcome to Learnera! Explore courses below or click 'Lock Your Seat' to join the live cohort.", "info");
      const target = document.getElementById("overview");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
