/**
 * KARTHIGEYAN R - IMPROVED SCRIPTS
 * Enhanced functionality while maintaining original theme
 */

(function() {
  'use strict';

  // ============================================
  // STARFIELD GENERATOR
  // ============================================
  function createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;

    const starCount = 100;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.6 + 0.2;
      const duration = Math.random() * 3 + 2;
      
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
    const existing = document.querySelector('.notification-toast');
    if (existing) {
      existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
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
      
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      
      if (!name || !email) {
        showFormMessage(errorMsg, 'Please fill in all fields');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage(errorMsg, 'Please enter a valid email address');
        return;
      }
      
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.value;
      submitBtn.value = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate submission
      setTimeout(() => {
        showFormMessage(successMsg, `Thank you, ${name}! You've been subscribed.`);
        form.reset();
        submitBtn.value = originalText;
        submitBtn.disabled = false;
        
        // Store locally
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
    
    document.querySelectorAll('.form-message').forEach(msg => {
      msg.classList.remove('visible');
    });
    
    element.textContent = message;
    element.classList.add('visible');
    
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
  // PARALLAX EFFECT
  // ============================================
  function initParallax() {
    const solarSystem = document.getElementById('solar-system');
    if (!solarSystem) return;
    
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.2;
          solarSystem.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-split, .main-nav, .newsletter-section');
    
    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach(el => el.style.opacity = '1');
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
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

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-orbits')?.click();
        } else {
          document.getElementById('btn-real-orbits')?.click();
        }
      }
      
      if (e.key === 's' || e.key === 'S') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-size')?.click();
        } else {
          document.getElementById('btn-real-size')?.click();
        }
      }
      
      if (e.key === 'Escape') {
        document.body.classList.remove('red-giant-mode');
      }
    });
  }

  // ============================================
  // INITIALIZE
  // ============================================
  function init() {
    createStarfield();
    initControls();
    initNewsletterForm();
    initSmoothScroll();
    initParallax();
    initScrollAnimations();
    initKeyboardShortcuts();
    
    console.log('🌟 Karthigeyan R - Website Loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
