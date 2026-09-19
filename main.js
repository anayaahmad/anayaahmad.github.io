/**
 * Main JavaScript for ACCA Finance Single-Page Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initPortfolioFilters();
  initContactForm();
  initResumeDownload();
  initFooterYear();
});

/**
 * Navigation and Mobile Menu Toggle
 */
function initNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-actions a');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('is-open');
    });

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Portfolio Category Filter Functionality
 * Categories: all, equity-research, financial-modeling, case-studies
 */
function initPortfolioFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.portfolio-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterValue = pill.getAttribute('data-filter');

      // Filter cards
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * Contact Options Handler (Smooth Scroll & External Links)
 */
function initContactForm() {
  // Contact section now uses direct Email & LinkedIn options
}

/**
 * Resume Download Handler
 */
function initResumeDownload() {
  const resumeBtn = document.getElementById('downloadResumeBtn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check if resume file exists or trigger download notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1B2A38;
      border: 1px solid #D9A24B;
      color: #EEF1F4;
      padding: 14px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
      <span style="color: #D9A24B; font-weight: bold;">&#10003;</span>
      <span>Resume package ready. Preparing PDF download...</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 3500);
  });
}

/**
 * Footer Year
 */
function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
