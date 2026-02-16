/**
 * KARTHIGEYAN R - MEMORIAL WEBSITE
 * Main JavaScript - Complete Functionality
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
  // CONTROL BUTTONS
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
    
    // Red Giant Button
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
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) {
      existing.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
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
  // PARALLAX EFFECT (Desktop only)
  // ============================================
  function initParallax() {
    const solarSystem = document.getElementById('solar-system');
    if (!solarSystem) return;
    
    // Skip on touch devices
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
    const animatedElements = document.querySelectorAll('.hero-split, .nav-card, .highlight-card');
    
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
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // 'R' for Real Orbits, 'Shift+R' for Reset Orbits
      if (e.key === 'r' || e.key === 'R') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-orbits')?.click();
        } else {
          document.getElementById('btn-real-orbits')?.click();
        }
      }
      
      // 'S' for Real Size, 'Shift+S' for Reset Size
      if (e.key === 's' || e.key === 'S') {
        if (e.shiftKey) {
          document.getElementById('btn-reset-size')?.click();
        } else {
          document.getElementById('btn-real-size')?.click();
        }
      }
      
      // 'Escape' to reset everything
      if (e.key === 'Escape') {
        document.body.classList.remove('red-giant-mode', 'real-size', 'real-orbits');
        showNotification('All modes reset');
      }
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      return; // Browser supports native lazy loading
    }
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback: load all images immediately
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }
  }

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  function logPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          console.log(`🌟 Page loaded in ${pageLoadTime}ms`);
        }, 0);
      });
    }
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  function init() {
    console.log('🌟 Karthigeyan R Memorial - Initializing...');
    
    createStarfield();
    initControls();
    initSmoothScroll();
    initParallax();
    initScrollAnimations();
    initKeyboardShortcuts();
    initLazyLoading();
    logPerformance();
    
    console.log('✨ Website loaded successfully');
    console.log('Keyboard shortcuts: R (orbits), S (sizes), ESC (reset)');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
