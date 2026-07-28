import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Effect in Hero Section
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = ["Flutter Developer.", "Mobile Engineer.", "UI/UX Enthusiast.", "Love A Life"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    }
    else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    }
    else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // 2. Scroll Reveal Animation & Progress Bar Fill
  const revealElements = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // If it's the skills section, animate progress bars
        if (entry.target.classList.contains('skill-category') || entry.target.closest('#skills')) {
          const bars = entry.target.querySelectorAll('.progress');
          bars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });
        }

        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Progress bars specifically for the skills grid (in case they weren't caught by reveal)
  progressBars.forEach(bar => {
    revealObserver.observe(bar.closest('.skill-category'));
  });

  // 3. Navbar background effect on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'var(--glass-bg)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 4. Form submission dummy handling
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--green)';
        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.opacity = '1';
        }, 3000);
      }, 1500);
    });
  }

  // 5. Dynamic Experience Calculation (from September 2014)
  const startYear = 2015;
  const startMonth = 8; // September is index 8 in JS (0-11)
  const currentDate = new Date();

  let experience = currentDate.getFullYear() - startYear;
  if (currentDate.getMonth() < startMonth || (currentDate.getMonth() === startMonth && currentDate.getDate() < 1)) {
    experience--;
  }

  const expElements = document.querySelectorAll('.dynamic-experience');
  expElements.forEach(el => {
    el.textContent = experience;
  });

  // 6. Dynamic Projects Count
  const projectCards = document.querySelectorAll('.project-card');
  const projectCount = projectCards.length;

  const projElements = document.querySelectorAll('.dynamic-projects');
  projElements.forEach(el => {
    // We display the actual count, or if none found, we can default to 0
    el.textContent = projectCount;
  });

  // 7. Dynamic Clients Count
  const clientLogos = document.querySelectorAll('.client-logo');
  const clientCount = clientLogos.length;

  const clientElements = document.querySelectorAll('.dynamic-clients');
  clientElements.forEach(el => {
    el.textContent = clientCount > 0 ? clientCount + "+" : '18';
  });
});
