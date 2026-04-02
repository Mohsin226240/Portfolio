/* ═══════════════════════════════════════════════════════
   Mohsin Shahzad Portfolio — Main JavaScript v2
   Enhanced interactions, particles, magnetic buttons
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── AOS Init (hero, about, skills only) ──
  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
    offset: 20,
  });

  // ── Custom Reveal (services, reviews, contact) ──
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
  revealEls.forEach((el) => revealIO.observe(el));

  // ── Project section reveal — triggers 200px before entering viewport ──
  const projEls = document.querySelectorAll(".proj-reveal");
  const projIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        projIO.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: "0px 0px 200px 0px" });
  projEls.forEach((el) => projIO.observe(el));

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
  const navSlider = document.getElementById("navSlider");
  const allNavLinks = navLinks.querySelectorAll(".nav-link");

  // ── Slider position ──
  function moveSlider() {
    const active = navLinks.querySelector(".nav-link.active");
    if (active && navSlider && window.innerWidth > 768) {
      const pillRect = navLinks.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      navSlider.style.left = (linkRect.left - pillRect.left) + "px";
      navSlider.style.width = linkRect.width + "px";
    }
  }

  // Init slider after fonts load
  if (document.fonts) {
    document.fonts.ready.then(() => requestAnimationFrame(moveSlider));
  } else {
    requestAnimationFrame(moveSlider);
  }
  window.addEventListener("resize", moveSlider);

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("navbar--scrolled", window.scrollY > 50);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  });

  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Immediately set active + move slider
      allNavLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      moveSlider();

      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Active nav link on scroll + move slider
  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          allNavLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
          moveSlider();
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
  const skillDots = document.querySelectorAll(".skills__dot");
  const skillCards = document.querySelectorAll(".skill-card");
  const prevArrow = document.querySelector(".skills__arrow--prev");
  const nextArrow = document.querySelector(".skills__arrow--next");
  const categories = ["frontend", "backend", "design", "tools"];
  let currentCategoryIndex = 0;

  function filterSkills(filter) {
    currentCategoryIndex = categories.indexOf(filter);

    skillTabs.forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-filter") === filter);
    });
    skillDots.forEach((d) => {
      d.classList.toggle("active", d.getAttribute("data-filter") === filter);
    });
    skillCards.forEach((card) => {
      if (card.getAttribute("data-category") === filter) {
        card.classList.remove("hidden");
        card.style.animation = "skillFadeIn 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  }

  // Initialize with frontend
  filterSkills("frontend");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterSkills(tab.getAttribute("data-filter"));
    });
  });

  skillDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      filterSkills(dot.getAttribute("data-filter"));
    });
  });

  // Prev / Next arrows
  prevArrow.addEventListener("click", () => {
    currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    filterSkills(categories[currentCategoryIndex]);
  });

  nextArrow.addEventListener("click", () => {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    filterSkills(categories[currentCategoryIndex]);
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

  document.querySelectorAll(".service-card, .skill-card").forEach((el) => {
    revealObserver.observe(el);
  });

  // ══════════════════════════════════════
  //  PROJECT MARQUEE — duplicate cards for seamless infinite loop
  // ══════════════════════════════════════
  const projTrack = document.querySelector(".proj-track");
  if (projTrack) {
    const cards = projTrack.querySelectorAll(".proj-card");
    cards.forEach((card) => projTrack.appendChild(card.cloneNode(true)));
  }

  // ══════════════════════════════════════
  //  TESTIMONIALS — 3-CARD GSAP
  // ══════════════════════════════════════
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const rvCards = document.querySelectorAll(".rv__card");
    const rvDots = document.querySelectorAll(".rv__dot");
    const rvPrev = document.querySelector(".rv__arrow--prev");
    const rvNext = document.querySelector(".rv__arrow--next");
    const rvWrapper = document.querySelector(".rv__wrapper");
    let rvCenter = 1;
    let rvAnimating = false;

    // Order: [left, center, right] — center is highlighted
    function rvSetPositions(animate) {
      const order = [
        (rvCenter - 1 + rvCards.length) % rvCards.length,
        rvCenter,
        (rvCenter + 1) % rvCards.length
      ];

      rvCards.forEach((card, i) => {
        const pos = order.indexOf(i);
        const isCenter = pos === 1;
        const isVisible = pos !== -1;

        if (animate && typeof gsap !== "undefined") {
          gsap.to(card, {
            scale: isCenter ? 1 : 0.93,
            opacity: isCenter ? 1 : 0.4,
            filter: isCenter ? "blur(0px) saturate(1)" : "blur(1.5px) saturate(0.5)",
            duration: 0.5,
            ease: "power3.out"
          });

          // Glow
          gsap.to(card.querySelector(".rv__glow"), {
            opacity: isCenter ? 1 : 0,
            duration: 0.5,
            ease: "power2.out"
          });

          // Shimmer line
          const innerEl = card.querySelector(".rv__inner");
          if (isCenter) {
            innerEl.style.borderColor = "rgba(139,92,246,0.3)";
            innerEl.style.boxShadow = "0 8px 40px rgba(139,92,246,0.1)";
          } else {
            innerEl.style.borderColor = "rgba(139,92,246,0.12)";
            innerEl.style.boxShadow = "none";
          }

          // Stagger content of new center card
          if (isCenter) {
            const inner = card.querySelector(".rv__inner");
            gsap.from(inner.querySelector(".rv__top"), { y: -8, opacity: 0, duration: 0.35, ease: "power2.out", delay: 0.1 });
            gsap.from(inner.querySelector(".rv__quote"), { y: 10, opacity: 0, duration: 0.4, ease: "power2.out", delay: 0.15 });
            gsap.from(inner.querySelector(".rv__who"), { y: 8, opacity: 0, duration: 0.35, ease: "power2.out", delay: 0.22 });
          }
        }

        // Toggle CSS class
        card.classList.toggle("rv__card--center", isCenter);

        // Reorder in grid
        if (isVisible) {
          card.style.order = pos;
          card.style.display = "";
        }
      });

      // Update dots
      rvDots.forEach((d, i) => {
        d.classList.toggle("rv__dot--active", i === rvCenter);
        if (animate) {
          gsap.to(d, {
            width: i === rvCenter ? 24 : 8,
            duration: 0.35,
            ease: "power2.out"
          });
        }
      });
    }

    function rvGoTo(newCenter) {
      if (newCenter === rvCenter || rvAnimating) return;
      rvAnimating = true;
      rvCenter = newCenter;
      rvSetPositions(true);
      setTimeout(() => { rvAnimating = false; }, 500);
    }

    // Init
    rvSetPositions(false);

    // Arrows
    if (rvNext) rvNext.addEventListener("click", () => rvGoTo((rvCenter + 1) % rvCards.length));
    if (rvPrev) rvPrev.addEventListener("click", () => rvGoTo((rvCenter - 1 + rvCards.length) % rvCards.length));

    // Dots
    rvDots.forEach((dot, i) => dot.addEventListener("click", () => rvGoTo(i)));

    // Auto-play
    let rvAuto = setInterval(() => rvGoTo((rvCenter + 1) % rvCards.length), 3500);

    if (rvWrapper) {
      rvWrapper.addEventListener("mouseenter", () => clearInterval(rvAuto));
      rvWrapper.addEventListener("mouseleave", () => {
        rvAuto = setInterval(() => rvGoTo((rvCenter + 1) % rvCards.length), 3500);
      });
    }

    // 3D tilt on each card hover
    if (window.innerWidth > 768) {
      rvCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 5,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800
          });
          gsap.to(card.querySelector(".rv__glow"), {
            x: x * 20, y: y * 15,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            transformPerspective: 800
          });
          const isCtr = card.classList.contains("rv__card--center");
          gsap.to(card.querySelector(".rv__glow"), {
            x: 0, y: 0,
            opacity: isCtr ? 1 : 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });

      // Magnetic arrows
      document.querySelectorAll(".rv__arrow").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - rect.left - rect.width / 2) * 0.3,
            y: (e.clientY - rect.top - rect.height / 2) * 0.3,
            duration: 0.25, ease: "power2.out"
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
        });
      });
    }

    // No scroll entrance delay — instant visible

    // Touch swipe
    if (rvWrapper) {
      let startX = 0;
      rvWrapper.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
      rvWrapper.addEventListener("touchend", (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) rvGoTo((rvCenter + (diff < 0 ? 1 : -1) + rvCards.length) % rvCards.length);
      }, { passive: true });
    }
  }

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
