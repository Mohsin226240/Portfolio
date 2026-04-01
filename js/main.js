/* ═══════════════════════════════════════════════════════
   Mohsin Shahzad Portfolio — Main JavaScript v2
   Enhanced interactions, particles, magnetic buttons
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── AOS Init ──
  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
  });

  // ══════════════════════════════════════
  //  THEME TOGGLE
  // ══════════════════════════════════════
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    // Kill all transitions so everything switches at once
    html.classList.add("no-transition");
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
    // Force reflow then re-enable transitions
    html.offsetHeight;
    html.classList.remove("no-transition");
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }

  // ══════════════════════════════════════
  //  NAVBAR
  // ══════════════════════════════════════
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle("navbar--scrolled", scrollY > 50);

    // Hide navbar on scroll down, show on scroll up
    if (scrollY > 500) {
      if (scrollY > lastScroll + 5) {
        navbar.style.transform = "translateY(-100%)";
      } else if (scrollY < lastScroll - 5) {
        navbar.style.transform = "translateY(0)";
      }
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScroll = scrollY;
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-30% 0px -70% 0px" }
  );
  sections.forEach((s) => observerNav.observe(s));

  // ══════════════════════════════════════
  //  SMOOTH SCROLL
  // ══════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const offset = navbar.offsetHeight + 10;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ══════════════════════════════════════
  //  TYPING EFFECT
  // ══════════════════════════════════════
  const typedEl = document.getElementById("typedText");
  if (typedEl) {
    const phrases = ["Full Stack Developer", "UI/UX Designer", "React Specialist", "Creative Problem Solver"];
    let pi = 0, ci = 0, del = false;
    function typeEffect() {
      const cur = phrases[pi];
      typedEl.textContent = del ? cur.substring(0, --ci) : cur.substring(0, ++ci);
      let d = del ? 35 : 70;
      if (!del && ci === cur.length) { d = 2200; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; d = 500; }
      setTimeout(typeEffect, d);
    }
    typeEffect();
  }

  // ══════════════════════════════════════
  //  HERO PARTICLES
  // ══════════════════════════════════════
  const particlesContainer = document.getElementById("heroParticles");
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDuration = 8 + Math.random() * 12 + "s";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.width = 2 + Math.random() * 3 + "px";
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ══════════════════════════════════════
  //  MAGNETIC BUTTONS
  // ══════════════════════════════════════
  document.querySelectorAll(".btn--magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
      btn.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      setTimeout(() => { btn.style.transition = ""; }, 400);
    });
  });

  // ══════════════════════════════════════
  //  SKILL RINGS ANIMATION
  // ══════════════════════════════════════
  const circumference = 2 * Math.PI * 52; // r=52
  const skillRings = document.querySelectorAll(".skill-card__ring");
  const skillRingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ring = entry.target;
          const percent = parseInt(ring.getAttribute("data-percent"), 10);
          const fill = ring.querySelector(".skill-card__ring-fill");
          if (fill) {
            const offset = circumference - (percent / 100) * circumference;
            fill.style.strokeDashoffset = offset;
          }
          skillRingObserver.unobserve(ring);
        }
      });
    },
    { threshold: 0.2 }
  );
  skillRings.forEach((ring) => skillRingObserver.observe(ring));

  // ══════════════════════════════════════
  //  SKILL FILTER TABS
  // ══════════════════════════════════════
  const skillTabs = document.querySelectorAll(".skills__tab");
  const skillCards = document.querySelectorAll(".skill-card");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      skillTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      skillCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
          card.style.animation = "skillFadeIn 0.4s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ══════════════════════════════════════
  //  STAT COUNTER ANIMATION
  // ══════════════════════════════════════
  const statNumbers = document.querySelectorAll(".stat-card__number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-count"), 10);
          animateCounter(el, 0, target, 1800);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ══════════════════════════════════════
  //  CONTACT FORM
  // ══════════════════════════════════════
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.disabled = true;
    btn.classList.add("btn--success");
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.classList.remove("btn--success");
      contactForm.reset();
    }, 3000);
  });

  // ══════════════════════════════════════
  //  BACK TO TOP
  // ══════════════════════════════════════
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ══════════════════════════════════════
  //  BENTO CARD PARALLAX TILT
  // ══════════════════════════════════════
  document.querySelectorAll(".bento__item").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      // Move image slightly for parallax depth
      const img = card.querySelector(".bento__img");
      if (img) {
        img.style.transform = `scale(1.08) translate(${rotateY * 1.2}px, ${rotateX * -1.2}px)`;
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      const img = card.querySelector(".bento__img");
      if (img) {
        img.style.transform = "";
        img.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      }
      setTimeout(() => {
        card.style.transition = "";
        if (img) img.style.transition = "";
      }, 600);
    });
  });

  // ══════════════════════════════════════
  //  REVEAL ANIMATION ON SCROLL
  // ══════════════════════════════════════
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".service-card, .testimonial-card, .skill-card").forEach((el) => {
    revealObserver.observe(el);
  });

  // ══════════════════════════════════════
  //  HERO VISUAL — MOUSE TILT + PARALLAX
  // ══════════════════════════════════════
  const heroVisual = document.querySelector(".hero__visual");
  const heroContent = document.querySelector(".hero__content");

  if (heroVisual && window.innerWidth > 1024) {
    // Mouse tilt on visual area
    document.querySelector(".hero").addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      heroVisual.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    document.querySelector(".hero").addEventListener("mouseleave", () => {
      heroVisual.style.transition = "transform 0.6s ease";
      heroVisual.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
      setTimeout(() => { heroVisual.style.transition = ""; }, 600);
    });

    // Scroll parallax
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const rate = scrollY * 0.12;
        heroVisual.style.marginTop = `${rate}px`;
        if (heroContent) heroContent.style.transform = `translateY(${rate * 0.4}px)`;
      }
    });
  }
});
