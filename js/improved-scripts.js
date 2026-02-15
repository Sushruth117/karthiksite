/**
 * KARTHIGEYAN R - IMPROVED SCRIPTS
 * Enhanced functionality for better UX
 */

(function() {
  'use strict';

  // ============================================
  // STARFIELD GENERATOR
  // ============================================
  function createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;

    const starCount = 150;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (0.5px to 3px)
      const size = Math.random() * 2.5 + 0.5;
      
      // Random opacity
      const opacity = Math.random() * 0.7 + 0.3;
      
      // Random animation duration
      const duration = Math.random() * 4 + 2;
      
      star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        --opacity: ${opacity};
        --duration: ${duration}s;
      `;
      
      fragment.appendChild(star);
    }

    starfield.appendChild(fragment);
  }

  // ============================================
  // BUTTON CONTROLS
  // ============================================
  function initControls() {
    const body = document.body;
    
    // Real Size Button
    const btnRealSize = document.getElementById('btn-real-size');
    const btnResetSize = document.getElementById('btn-reset-size');
    
    if (btnRealSize) {
      btnRealSize.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.add('real-size');
        showNotification('Real planet sizes enabled');
      });
    }
    
    if (btnResetSize) {
      btnResetSize.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.remove('real-size');
        showNotification('Planet sizes adjusted');
      });
    }
    
    // Real Orbits Button
    const btnRealOrbits = document.getElementById('btn-real-orbits');
    const btnResetOrbits = document.getElementById('btn-reset-orbits');
    
    if (btnRealOrbits) {
      btnRealOrbits.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.add('real-orbits');
        showNotification('Real orbit distances enabled');
      });
    }
    
    if (btnResetOrbits) {
      btnResetOrbits.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.remove('real-orbits');
        showNotification('Orbit distances adjusted');
      });
    }
    
    // Red Giant Button (Easter egg)
    const btnRedGiant = document.getElementById('btn-red-giant');
    
    if (btnRedGiant) {
      btnRedGiant.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.toggle('red-giant-mode');
        
        if (body.classList.contains('red-giant-mode')) {
          showNotification('☀️ The Sun has become a red giant!');
          playSound('red-giant');
        } else {
          showNotification('Sun returned to normal');
        }
      });
    }
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) {
      existing.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(0, 0, 0, 0.9);
      color: #d4af37;
      padding: 12px 24px;
      border-radius: 4px;
      border: 1px solid rgba(212, 175, 55, 0.4);
      font-family: 'Cinzel', serif;
      font-size: 14px;
      z-index: 10000;
      opacity: 0;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ============================================
  // SOUND EFFECTS (Optional)
  // ============================================
  function playSound(type) {
    // Check if user prefers reduced motion/sound
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Simple oscillator sound for red giant effect
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'red-giant') {
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
      }
    } catch (e) {
      // Audio not supported, silently fail
    }
  }

  // ============================================
  // NEWSLETTER FORM
  // ============================================
  function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const email = formData.get('email');
      const name = formData.get('name');
      
      // Basic validation
      if (!email || !name) {
        showFormMessage(errorMsg, 'Please fill in all fields');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage(errorMsg, 'Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showFormMessage(successMsg, `Thank you, ${name}! You've been subscribed.`);
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Store in localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        subscribers.push({
          name: name,
          email: email,
          date: new Date().toISOString()
        });
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(element, message) {
    if (!element) return;
    
    // Hide all messages
    document.querySelectorAll('.form-message').forEach(msg => {
      msg.classList.remove('visible');
    });
    
    // Show specific message
    element.textContent = message;
    element.classList.add('visible');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      element.classList.remove('visible');
    }, 5000);
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // NAVIGATION HIGHLIGHT ON SCROLL
  // ============================================
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }

  // ============================================
  // PARALLAX EFFECT
  // ============================================
  function initParallax() {
    const solarSystem = document.getElementById('solar-system');
    if (!solarSystem) return;
    
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.3;
          solarSystem.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Press 'R' for real orbits
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-orbits')?.click();
        } else {
          document.getElementById('btn-real-orbits')?.click();
        }
      }
      
      // Press 'S' for real size
      if (e.key === 's' || e.key === 'S') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-size')?.click();
        } else {
          document.getElementById('btn-real-size')?.click();
        }
      }
      
      // Press 'Escape' to close any modals
      if (e.key === 'Escape') {
        document.body.classList.remove('red-giant-mode');
      }
    });
  }

  // ============================================
  // VISITOR COUNTER (Simple)
  // ============================================
  function initVisitorCounter() {
    const counterKey = 'site_visits';
    let visits = parseInt(localStorage.getItem(counterKey) || '0');
    visits++;
    localStorage.setItem(counterKey, visits.toString());
    
    // Log for debugging (can be removed in production)
    console.log(`Visit count: ${visits}`);
  }

  // ============================================
  // ANIMATION ON SCROLL
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-text, .hero-images, .nav-list');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('visible'));
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Add fade-in class styles
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  function init() {
    createStarfield();
    initControls();
    initNewsletterForm();
    initSmoothScroll();
    initNavHighlight();
    initParallax();
    initLazyLoading();
    initKeyboardShortcuts();
    initVisitorCounter();
    initScrollAnimations();
    
    console.log('🌟 Karthigeyan R - Website Loaded');
    console.log('💫 Keyboard shortcuts: R (orbits), S (size), Shift+R/S (reset)');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
