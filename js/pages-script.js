/**
 * KARTHIGEYAN R - PAGES SCRIPT
 * Additional functionality for sub-pages
 */

(function() {
  'use strict';

  // ============================================
  // SMOOTH SCROLL TO TOP
  // ============================================
  function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: rgba(212, 175, 55, 0.9);
      color: #000;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // LIGHTBOX FOR IMAGES
  // ============================================
  function initLightbox() {
    const images = document.querySelectorAll('.photo-item img, .hero-image');
    
    if (images.length === 0) return;
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 0 50px rgba(212, 175, 55, 0.3);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: rgba(212, 175, 55, 0.9);
      color: #000;
      border: none;
      border-radius: 50%;
      font-size: 36px;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Add click handlers to images
    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
    
    lightbox.addEventListener('click', closeLightbox);
    
    lightboxImg.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ============================================
  // FADE IN ANIMATIONS
  // ============================================
  function initFadeInAnimations() {
    const elements = document.querySelectorAll('.memory-card, .photo-item, .timeline-item');
    
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.style.opacity = '1');
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
    
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
      observer.observe(el);
    });
  }

  // ============================================
  // CHARACTER COUNTER FOR TEXTAREAS
  // ============================================
  function initCharacterCounter() {
    const textarea = document.getElementById('entry-message');
    if (!textarea) return;
    
    const counter = document.createElement('div');
    counter.style.cssText = `
      text-align: right;
      color: var(--color-text-subtle);
      font-size: 0.85rem;
      margin-top: 4px;
    `;
    
    textarea.parentElement.appendChild(counter);
    
    const updateCounter = () => {
      const length = textarea.value.length;
      counter.textContent = `${length} characters`;
    };
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
  }

  // ============================================
  // PRINT PAGE FUNCTIONALITY
  // ============================================
  function addPrintButton() {
    const footer = document.querySelector('.page-footer');
    if (!footer) return;
    
    const printBtn = document.createElement('button');
    printBtn.textContent = '🖨️ Print This Page';
    printBtn.className = 'btn-outline';
    printBtn.style.marginTop = 'var(--spacing-md)';
    
    printBtn.addEventListener('click', () => {
      window.print();
    });
    
    const printContainer = document.createElement('div');
    printContainer.style.textAlign = 'center';
    printContainer.appendChild(printBtn);
    
    footer.insertBefore(printContainer, footer.firstChild);
  }

  // ============================================
  // COPY LINK FUNCTIONALITY
  // ============================================
  function addCopyLinkButton() {
    const header = document.querySelector('.page-header');
    if (!header) return;
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '🔗 Copy Link';
    copyBtn.className = 'btn-secondary';
    copyBtn.style.cssText = `
      margin-top: var(--spacing-sm);
      padding: 8px 16px;
      font-size: 11px;
    `;
    
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Link Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });
    
    header.appendChild(copyBtn);
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  function init() {
    console.log('📄 Pages script initialized');
    
    addScrollToTop();
    initLightbox();
    initFadeInAnimations();
    initCharacterCounter();
    addPrintButton();
    addCopyLinkButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
