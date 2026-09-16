/**
 * SIGATAPU NV TANMAYI — PORTFOLIO JAVASCRIPT
 * Handles certificate modal, mobile menu, scroll spy, copy-to-clipboard, and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CERTIFICATES DATA & MODAL VIEWER
     ========================================================================== */
  const certificatesData = [
    {
      title: "Effective Communication Skills",
      issuer: "Skill Era",
      date: "17 October 2024",
      src: "assets/certificates/skillera-communication.png",
      certNo: "CER/NT/OCT/ECS/0335"
    },
    {
      title: "Data Science Landscape (ALM-COURSE_4058878)",
      issuer: "IBM SkillsBuild",
      date: "14 July 2026",
      src: "assets/certificates/ibm-datascience.png",
      certNo: "Adobe Learning Manager System of Record"
    },
    {
      title: "Database Management System Part-1",
      issuer: "Infosys Springboard",
      date: "14 July 2026",
      src: "assets/certificates/infosys-dbms.png",
      certNo: "Verified on verify.onwingspan.com"
    },
    {
      title: "MongoDB Basics for Students",
      issuer: "MongoDB",
      date: "08 July 2026",
      src: "assets/certificates/mongodb-basics.png",
      certNo: "credly.com/badges/721ef255-0adf-45fd-be34-3751b79273b6"
    },
    {
      title: "Top Prompt Creator – Pitch Night Edition",
      issuer: "Google Student Ambassador Program",
      date: "31 May 2026",
      src: "assets/certificates/google-prompt-creator.png",
      certNo: "Recognized for Gemini & Nano Banana Concept"
    },
    {
      title: "Game Night Edition Certificate",
      issuer: "Google Student Ambassador Program",
      date: "28 April 2026",
      src: "assets/certificates/google-gsa-gamenight.png",
      certNo: "Issued by Google Student Ambassador Community"
    },
    {
      title: "Decabyte Internship Certificate",
      issuer: "Decabyte Inc.",
      date: "5-Month Verified Duration",
      src: "assets/certificates/decabyte-internship.png",
      certNo: "Non-Technical Internship • US Client Operations"
    },
    {
      title: "Python – Basic to Advanced",
      issuer: "eTechNiketan",
      date: "July 2026",
      src: "assets/certificates/etechniketan-python.png",
      certNo: "Comprehensive Python Curriculum"
    }
  ];

  let currentCertIndex = 0;
  let currentZoom = 1.0;

  const certModal = document.getElementById('certModal');
  const modalCertImg = document.getElementById('modalCertImg');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalCertMeta = document.getElementById('modalCertMeta');
  const modalCertCounter = document.getElementById('modalCertCounter');

  window.openCertModal = function(index) {
    if (index < 0 || index >= certificatesData.length) return;
    currentCertIndex = index;
    currentZoom = 1.0;
    updateCertModalContent();
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCertModal = function() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    currentZoom = 1.0;
    if (modalCertImg) {
      modalCertImg.style.transform = `scale(1)`;
    }
  };

  window.nextCert = function() {
    currentCertIndex = (currentCertIndex + 1) % certificatesData.length;
    currentZoom = 1.0;
    updateCertModalContent();
  };

  window.prevCert = function() {
    currentCertIndex = (currentCertIndex - 1 + certificatesData.length) % certificatesData.length;
    currentZoom = 1.0;
    updateCertModalContent();
  };

  window.zoomCert = function(delta) {
    currentZoom = Math.min(Math.max(0.6, currentZoom + delta), 2.5);
    if (modalCertImg) {
      modalCertImg.style.transform = `scale(${currentZoom})`;
    }
  };

  window.resetCertZoom = function() {
    currentZoom = 1.0;
    if (modalCertImg) {
      modalCertImg.style.transform = `scale(1)`;
    }
  };

  function updateCertModalContent() {
    const cert = certificatesData[currentCertIndex];
    if (!cert) return;

    modalCertImg.src = cert.src;
    modalCertImg.alt = cert.title;
    modalCertImg.style.transform = `scale(1)`;
    modalCertTitle.textContent = cert.title;
    modalCertMeta.textContent = `${cert.issuer} • ${cert.date} • ${cert.certNo}`;
    modalCertCounter.textContent = `${currentCertIndex + 1} of ${certificatesData.length}`;
  }

  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (!certModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeCertModal();
    } else if (e.key === 'ArrowRight') {
      nextCert();
    } else if (e.key === 'ArrowLeft') {
      prevCert();
    }
  });

  // Click outside dialog to close
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeCertModal();
    }
  });


  /* ==========================================================================
     2. STICKY NAVBAR & ACTIVE SCROLL SPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active section highlighting
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ==========================================================================
     3. MOBILE NAVIGATION MENU
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('open');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close mobile nav when clicking on link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }


  /* ==========================================================================
     4. COPY TO CLIPBOARD & TOAST NOTIFICATION
     ========================================================================== */
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2800);
  }

  window.copyEmail = function(email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        fallbackCopyText(email, 'Email address copied!');
      });
    } else {
      fallbackCopyText(email, 'Email address copied!');
    }
  };

  window.copyPhone = function(phone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phone).then(() => {
        showToast('Phone number copied to clipboard!');
      }).catch(() => {
        fallbackCopyText(phone, 'Phone number copied!');
      });
    } else {
      fallbackCopyText(phone, 'Phone number copied!');
    }
  };

  function fallbackCopyText(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      showToast('Press Ctrl+C to copy: ' + text);
    }
    document.body.removeChild(textArea);
  }


  /* ==========================================================================
     5. SCROLL REVEAL (SUBTLE MOTION)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.fade-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

});
