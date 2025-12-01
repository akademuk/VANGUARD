/* 
    VANGUARD - ART DIRECTOR EDITION
    Logic: GSAP + Lenis
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- 0. PAGE TRANSITION ---
  const transitionOverlay = document.getElementById("page-transition");

  // Animate IN (Reveal Page)
  if (transitionOverlay) {
    gsap.to(transitionOverlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.2,
    });
  }

  // Handle Links (Animate OUT)
  const links = document.querySelectorAll(
    'a:not([href^="#"]):not([href^="mailto:"]):not([target="_blank"])'
  );
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only animate if it's a valid internal link
      if (href && transitionOverlay) {
        e.preventDefault();

        gsap.set(transitionOverlay, { transformOrigin: "bottom" });
        gsap.to(transitionOverlay, {
          scaleY: 1,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            window.location.href = href;
          },
        });
      }
    });
  });

  // --- 1. LENIS SMOOTH SCROLL ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Connect Lenis to ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 3. HERO REVEAL ---
  const heroTl = gsap.timeline();

  heroTl
    .to(".hero__title .char", {
      y: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5,
    })
    .to(
      ".hero__subtitle",
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    );

  // --- 4. HORIZONTAL SCROLL (EXPERTISE) ---
  const expertiseSection = document.getElementById("expertise");
  const expertiseWrapper = document.getElementById("expertiseWrapper");
  const expertiseProgressBar = document.getElementById("expertiseProgressBar");

  if (expertiseSection && expertiseWrapper) {
    gsap.to(expertiseWrapper, {
      x: () => -(expertiseWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: expertiseSection,
        start: "top top",
        end: () => "+=1500",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (expertiseProgressBar) {
            expertiseProgressBar.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });
  }

  // --- 4.5. SERVICES TABS ---
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Show corresponding pane
      const tabId = btn.getAttribute("data-tab");
      const pane = document.getElementById(tabId);
      if (pane) {
        pane.classList.add("active");
      }
    });
  });

  // --- 5. PARALLAX IMAGES ---
  const images = document.querySelectorAll(
    "img:not(.team-modal__img):not(.empire-bg img):not(.portrait__img)"
  );
  images.forEach((img) => {
    gsap.to(img, {
      y: "10%",
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // --- 6. TEXT REVEALS (GENERAL) ---
  const splitTypes = document.querySelectorAll(".reveal-type");
  // Note: In a real scenario, we'd use SplitType library here.
  // For this demo, we'll just fade in sections.

  const sections = document.querySelectorAll("[data-scroll-section]");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );
  });

  // --- 7. PROCESS STEPS HIGHLIGHT ---
  const steps = document.querySelectorAll(".process__step");
  steps.forEach((step) => {
    gsap.to(step, {
      x: 20,
      scrollTrigger: {
        trigger: step,
        start: "top center",
        end: "bottom center",
        toggleClass: "active",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  // --- 8. STATS COUNTER ---
  const statVals = document.querySelectorAll(".stat-val");
  statVals.forEach((stat) => {
    const rawText = stat.innerText;
    // Regex to separate prefix, number, suffix
    // Matches: (non-digits)(digits)(non-digits)
    const match = rawText.match(/^([^0-9]*)([0-9]+)(.*)$/);

    if (match) {
      const prefix = match[1] || "";
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3] || "";

      // Set initial value to 0 (preserving formatting)
      stat.innerText = `${prefix}0${suffix}`;

      const counter = { val: 0 };

      gsap.to(counter, {
        val: targetVal,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          once: true, // Run only once
        },
        onUpdate: () => {
          stat.innerText = `${prefix}${Math.floor(counter.val)}${suffix}`;
        },
      });
    }
  });

  // --- 9. MOBILE MENU TOGGLE & SCROLL ---
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("nav--open");

      if (nav.classList.contains("nav--open")) {
        menuBtn.textContent = "CLOSE";
        // Optional: Lock body scroll
        document.body.style.overflow = "hidden";
      } else {
        menuBtn.textContent = "MENU";
        document.body.style.overflow = "";
      }
    });
  }

  // --- 10. FORM HANDLING ---
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate transmission delay
      const btn = form.querySelector("button[type='submit']");
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = "TRANSMITTING...";
        btn.style.opacity = "0.5";
        btn.disabled = true;
      }

      setTimeout(() => {
        // Trigger page transition
        const transitionOverlay = document.getElementById("page-transition");
        if (transitionOverlay) {
          gsap.set(transitionOverlay, { transformOrigin: "bottom" });
          gsap.to(transitionOverlay, {
            scaleY: 1,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              window.location.href = "thank-you.html";
            },
          });
        } else {
          window.location.href = "thank-you.html";
        }
      }, 1500);
    });
  });

  // --- 11. TESTIMONIALS SCROLL ---
  const testSection = document.getElementById("testimonialsSection");
  const testWrapper = document.getElementById("testimonialsWrapper");

  if (testSection && testWrapper) {
    gsap.to(testWrapper, {
      x: () => -(testWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: testSection,
        start: "top top",
        end: () => "+=1500",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // --- 12. TEAM MODAL ---
  const teamItems = document.querySelectorAll(".team-item");
  const modal = document.querySelector(".team-modal");

  if (modal && teamItems.length > 0) {
    const modalImg = modal.querySelector(".team-modal__img");
    const modalRole = modal.querySelector(".team-modal__role");
    const modalName = modal.querySelector(".team-modal__name");
    const modalBio = modal.querySelector(".team-modal__bio");
    const closeBtn = modal.querySelector(".team-modal__close");
    const overlay = modal.querySelector(".team-modal__overlay");

    const closeModal = () => {
      modal.classList.remove("active");
      lenis.start();
    };

    teamItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Get data
        const name = item.querySelector(".team-item__name").textContent;
        const role = item.querySelector(".team-item__role").textContent;
        const imgSrc = item.querySelector("img").src;
        const bio = item.getAttribute("data-bio");

        // Populate modal
        modalName.textContent = name;
        modalRole.textContent = role;
        modalImg.src = imgSrc;
        modalImg.alt = name; // Set alt text for accessibility
        modalBio.textContent = bio;

        // Show modal
        modal.classList.add("active");
        lenis.stop();
      });
    });

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
});
