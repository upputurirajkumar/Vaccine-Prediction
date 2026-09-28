/**
 * VACCINE INTELLIGENCE PLATFORM - NAVIGATION & COMMAND PALETTE
 * Controls sticky navigation, hierarchical active states, theme toggling, search, and keyboard shortcuts.
 */

window.VaxNavigation = {
  theme: 'dark',

  init() {
    this.initTheme();
    this.initOSShortcut();
    this.initStickyNav();
    this.initDropdowns();
    this.initCommandPalette();
    this.initMobileNav();
    this.initSmoothScroll();
  },

  initOSShortcut() {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
    const kbdEl = document.getElementById('vax-search-kbd');
    if (kbdEl) {
      kbdEl.textContent = isMac ? '⌘K' : 'Ctrl K';
    }
  },

  initTheme() {
    const savedTheme = localStorage.getItem('vax_theme') || 'dark';
    this.setTheme(savedTheme);

    const toggleBtn = document.getElementById('vax-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme);
      });
    }
  },

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vax_theme', theme);

    const darkSvg = document.getElementById('vax-theme-icon-dark');
    const lightSvg = document.getElementById('vax-theme-icon-light');

    if (darkSvg && lightSvg) {
      if (theme === 'dark') {
        darkSvg.style.display = 'block';
        lightSvg.style.display = 'none';
      } else {
        darkSvg.style.display = 'none';
        lightSvg.style.display = 'block';
      }
    }
  },

  initDropdowns() {
    const dropdownGroups = document.querySelectorAll('.vax-nav-dropdown-group');

    dropdownGroups.forEach(group => {
      const trigger = group.querySelector('.vax-dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = group.classList.contains('open');

        // Close other dropdowns
        dropdownGroups.forEach(g => {
          if (g !== group) {
            g.classList.remove('open');
            g.querySelector('.vax-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          group.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          group.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.vax-nav-dropdown-group')) {
        dropdownGroups.forEach(g => {
          g.classList.remove('open');
          g.querySelector('.vax-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownGroups.forEach(g => {
          g.classList.remove('open');
          g.querySelector('.vax-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
        });
      }
    });
  },

  initStickyNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.vax-nav-item, .vax-dropdown-link, .vax-mobile-link');
    const dropdownGroups = document.querySelectorAll('.vax-nav-dropdown-group');

    // Section to parent group mapping
    const sectionToGroupMap = {
      'overview': 'overview',
      'data-intelligence': 'data',
      'eda': 'eda',
      'statistical-evidence': 'eda',
      'features': 'eda',
      'model-lab': 'models',
      'roc-lab': 'models',
      'confusion-matrix': 'models',
      'optimization': 'models',
      'simulator': 'prediction',
      'policy': 'insights',
      'methodology': 'methods'
    };

    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const parentGroup = sectionToGroupMap[id] || id;

            // Highlight top nav items
            navItems.forEach(item => {
              const href = item.getAttribute('href');
              const targetSection = item.getAttribute('data-nav-section');

              if (href === `#${id}` || targetSection === id) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });

            // Highlight parent dropdown group trigger
            dropdownGroups.forEach(group => {
              const groupName = group.getAttribute('data-nav-group');
              const trigger = group.querySelector('.vax-dropdown-trigger');
              if (trigger) {
                if (groupName === parentGroup) {
                  trigger.classList.add('active');
                } else {
                  trigger.classList.remove('active');
                }
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px' });

      sections.forEach(sec => observer.observe(sec));
    }
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close any open dropdowns
          document.querySelectorAll('.vax-nav-dropdown-group').forEach(g => {
            g.classList.remove('open');
            g.querySelector('.vax-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
          });

          // Close mobile drawer if open
          const mobileDrawer = document.getElementById('vax-mobile-drawer');
          if (mobileDrawer) {
            mobileDrawer.classList.remove('active');
            document.body.classList.remove('vax-modal-open');
          }
        }
      });
    });
  },

  initMobileNav() {
    const toggleBtn = document.getElementById('vax-mobile-toggle');
    const drawer = document.getElementById('vax-mobile-drawer');
    const closeBtn = document.getElementById('vax-mobile-close');
    const mobileCmdBtn = document.getElementById('vax-mobile-cmd-trigger');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.add('active');
        document.body.classList.add('vax-modal-open');
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.classList.remove('vax-modal-open');
      });
    }

    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
          drawer.classList.remove('active');
          document.body.classList.remove('vax-modal-open');
        }
      });
    }

    if (mobileCmdBtn) {
      mobileCmdBtn.addEventListener('click', () => {
        if (drawer) {
          drawer.classList.remove('active');
          document.body.classList.remove('vax-modal-open');
        }
        const cmdTrigger = document.getElementById('vax-cmd-trigger');
        if (cmdTrigger) cmdTrigger.click();
      });
    }
  },

  initCommandPalette() {
    const paletteBackdrop = document.getElementById('vax-cmd-palette');
    const input = document.getElementById('vax-cmd-input');
    const resultsContainer = document.getElementById('vax-cmd-results');
    const triggerBtn = document.getElementById('vax-cmd-trigger');

    if (!paletteBackdrop || !input || !resultsContainer) return;

    // Search index
    const searchItems = [
      { title: "Executive Overview & KPIs", section: "overview", category: "Navigation", desc: "Top-level dataset stats, models evaluated, and champion ROC-AUC." },
      { title: "Data Intelligence & Cleaning Story", section: "data-intelligence", category: "Data", desc: "Missing value imputation, class imbalance, and preprocessing pipeline." },
      { title: "Exploratory Data Analysis (EDA)", section: "eda", category: "Analysis", desc: "Demographic, behavioral, and clinical vaccination uptake patterns." },
      { title: "Statistical Evidence & Chi-Square", section: "statistical-evidence", category: "Statistics", desc: "Correlation heatmap and chi-square significance testing." },
      { title: "Feature Importance & Signal", section: "features", category: "ML Insights", desc: "XGBoost feature rankings, doctor recommendation weight, and risk belief." },
      { title: "Model Intelligence Lab", section: "model-lab", category: "Models", desc: "Benchmark comparison of 9 classification algorithms." },
      { title: "ROC Curve Analysis Lab", section: "roc-lab", category: "Evaluation", desc: "Interactive ROC curves comparing all 9 models with threshold inspection." },
      { title: "Confusion Matrix Inspector", section: "confusion-matrix", category: "Evaluation", desc: "Test set confusion matrix for the winning Tuned XGBoost." },
      { title: "Hyperparameter Optimization", section: "optimization", category: "Tuning", desc: "RandomizedSearchCV parameter tuning workflow and best parameters." },
      { title: "Reliability & Cross-Validation", section: "validation", category: "Validation", desc: "5-Fold stratified cross-validation performance." },
      { title: "Vaccine Prediction Simulator", section: "simulator", category: "Tool", desc: "Interactive multi-step vaccination likelihood demonstration." },
      { title: "Public Health Strategy & Herd Immunity", section: "policy", category: "Policy", desc: "Intervention blueprint and community transmission simulation." },
      { title: "Technical Methodology", section: "methodology", category: "Methods", desc: "End-to-end data science architecture and challenge solutions." },
      { title: "Tuned XGBoost Champion", model: "tuned-xgboost", category: "Model", desc: "Best model: 83.88% Accuracy, 0.8351 ROC-AUC, 0.5532 F1 Score." },
      { title: "CatBoost Classifier", model: "catboost", category: "Model", desc: "Highest raw test accuracy (84.09%) with native categorical encoding." },
      { title: "Random Forest Classifier", model: "random-forest", category: "Model", desc: "Highest test precision (71.52%) with conservative decision splits." }
    ];

    const openPalette = () => {
      paletteBackdrop.classList.add('active');
      input.value = '';
      renderResults(searchItems);
      setTimeout(() => input.focus(), 50);
      document.body.classList.add('vax-modal-open');
    };

    const closePalette = () => {
      paletteBackdrop.classList.remove('active');
      document.body.classList.remove('vax-modal-open');
    };

    const renderResults = (items) => {
      if (items.length === 0) {
        resultsContainer.innerHTML = `<div class="vax-cmd-empty">No matching intelligence found.</div>`;
        return;
      }

      let html = '';
      items.forEach((item, idx) => {
        html += `
          <div class="vax-cmd-item ${idx === 0 ? 'selected' : ''}" data-section="${item.section || ''}" data-model="${item.model || ''}">
            <div class="vax-cmd-item-left">
              <span class="vax-cmd-item-title">${item.title}</span>
              <span class="vax-cmd-item-desc">${item.desc}</span>
            </div>
            <span class="vax-cmd-item-cat">${item.category}</span>
          </div>
        `;
      });

      resultsContainer.innerHTML = html;

      resultsContainer.querySelectorAll('.vax-cmd-item').forEach(itemEl => {
        itemEl.addEventListener('click', () => {
          const sec = itemEl.getAttribute('data-section');
          const mod = itemEl.getAttribute('data-model');
          closePalette();

          if (sec) {
            const el = document.getElementById(sec);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (mod) {
            window.VaxComponents.openModelModal(mod);
          }
        });
      });
    };

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderResults(searchItems);
        return;
      }
      const filtered = searchItems.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });

    // Keyboard shortcut (Ctrl+K / Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (paletteBackdrop.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape') {
        closePalette();
        window.VaxComponents.closeModals();
      }
    });

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openPalette);
    }

    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });
  }
};
