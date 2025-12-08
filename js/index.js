// Simple language toggle (vi <-> en) using external locale JSON + data-i18n attributes
(function(){
  const localeCache = {};
  const root = document.documentElement;
  const langBtn = document.getElementById('lang-btn');
  let current = localStorage.getItem('xn.lang') || 'vi';

  async function loadTranslations(lang) {
    if(localeCache[lang]) return localeCache[lang];
    const res = await fetch(`js/locales/${lang}.json`, { cache: 'no-cache' });
    if(!res.ok) throw new Error(`Failed to load locale ${lang}`);
    const data = await res.json();
    localeCache[lang] = data;
    return data;
  }

  function applyTranslations(dict, lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
    // Carousel static captions (for slides without data-i18n)
    const c2Title = document.querySelector('.carousel-item:nth-child(2) .carousel-caption h5');
    const c2Sub = document.querySelector('.carousel-item:nth-child(2) .carousel-caption p');
    if(c2Title && c2Sub) {
      c2Title.textContent = dict.carousel2Title;
      c2Sub.textContent = dict.carousel2Sub;
    }
    const c3Title = document.querySelector('.carousel-item:nth-child(3) .carousel-caption h5');
    const c3Sub = document.querySelector('.carousel-item:nth-child(3) .carousel-caption p');
    if(c3Title && c3Sub) {
      c3Title.textContent = dict.carousel3Title;
      c3Sub.textContent = dict.carousel3Sub;
    }
    const c4Title = document.querySelector('.carousel-item:nth-child(4) .carousel-caption h5');
    const c4Sub = document.querySelector('.carousel-item:nth-child(4) .carousel-caption p');
    if(c4Title && c4Sub) {
      c4Title.textContent = dict.carousel4Title;
      c4Sub.textContent = dict.carousel4Sub;
    }
    const c5Title = document.querySelector('.carousel-item:nth-child(5) .carousel-caption h5');
    const c5Sub = document.querySelector('.carousel-item:nth-child(5) .carousel-caption p');
    if(c5Title && c5Sub) {
      c5Title.textContent = dict.carousel5Title;
      c5Sub.textContent = dict.carousel5Sub;
    }
    const c6Title = document.querySelector('.carousel-item:nth-child(6) .carousel-caption h5');
    const c6Sub = document.querySelector('.carousel-item:nth-child(6) .carousel-caption p');
    if(c6Title && c6Sub) {
      c6Title.textContent = dict.carousel6Title;
      c6Sub.textContent = dict.carousel6Sub;
    }
    // Booking form labels and search button
    const bookingLabels = [
      { sel: 'label[for="oneWay"]', key: 'oneWay' },
      { sel: 'label[for="roundTrip"]', key: 'roundTrip' },
      { sel: 'label[for="from"]', key: 'bookingFrom' },
      { sel: 'label[for="to"]', key: 'bookingTo' },
      { sel: 'label[for="departure"]', key: 'bookingDeparture' },
      { sel: 'label[for="returnDate"]', key: 'bookingReturn' },
      { sel: 'label[for="passengers"]', key: 'bookingPassengers' }
    ];
    bookingLabels.forEach(item => {
      const el = document.querySelector(item.sel);
      if(el && dict[item.key]) el.textContent = dict[item.key];
    });
    const searchBtn = document.querySelector('#bookingForm button[type="submit"]');
    if(searchBtn && dict.bookingSearch) searchBtn.textContent = dict.bookingSearch;
    // Update language button with flag icon
    const langFlag = document.getElementById('lang-flag');
    const langText = document.getElementById('lang-text');
    if(langFlag && langText) {
      if(lang === 'vi') {
        langFlag.src = 'images/viet-nam.png';
        langFlag.alt = 'Vietnam';
        langText.textContent = 'VI';
      } else {
        langFlag.src = 'images/united-states.png';
        langFlag.alt = 'USA';
        langText.textContent = 'EN';
      }
    }
    root.lang = lang;
    if(langBtn) {
      langBtn.setAttribute('aria-pressed', String(lang !== 'vi'));
    }
    localStorage.setItem('xn.lang', lang);
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  async function setLanguage(lang) {
    try {
      const dict = await loadTranslations(lang);
      applyTranslations(dict, lang);
      current = lang;
    } catch (err) {
      console.warn('Failed to load locale, falling back to vi', err);
      if(lang !== 'vi') {
        current = 'vi';
        try {
          const fallbackDict = await loadTranslations('vi');
          applyTranslations(fallbackDict, 'vi');
        } catch(e) {
          console.error('Fallback locale also failed', e);
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(current);
    document.querySelectorAll('.lang-select').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if(lang) setLanguage(lang);
      });
    });
  });
  // --- Carousel & video integration ---
  // Pause carousel while an HTML5 video inside a slide is playing, resume when paused/ended
  document.addEventListener('DOMContentLoaded', () => {
    const carouselEl = document.getElementById('mainCarousel');
    if(!carouselEl) return;
      const carousel = new bootstrap.Carousel(carouselEl, { interval: 3000, ride: 'carousel' });

      // Expose carousel to global scope for YouTube player callbacks
      window.__xn_carousel = carousel;

      // If the slide contains a YouTube iframe, we'll pause the carousel when it's visible
      // and resume/stop the video when leaving. The YouTube Player will be created by
      // the IFrame API (onYouTubeIframeAPIReady)
      carouselEl.addEventListener('slid.bs.carousel', (ev) => {
        const active = carouselEl.querySelector('.carousel-item.active');
        const ytIframe = active && active.querySelector('#carouselYoutube');
        if(ytIframe) {
          // Pause carousel; playback may start via user interaction or programmatically.
          carousel.pause();
          // If the YT player is ready, attempt to play (may be blocked by autoplay policy).
          if(window.__xn_ytPlayer && typeof window.__xn_ytPlayer.playVideo === 'function') {
            try { window.__xn_ytPlayer.playVideo(); } catch(e) {}
          }
        } else {
          // left the video slide: stop video if player exists and resume carousel
          if(window.__xn_ytPlayer && typeof window.__xn_ytPlayer.stopVideo === 'function') {
            try { window.__xn_ytPlayer.stopVideo(); } catch(e) {}
          }
          carousel.cycle();
        }
      });
  });
  
    // YouTube API integration: create a player and handle state changes
    // This function is called by the YouTube IFrame API when it's ready.
    window.onYouTubeIframeAPIReady = function() {
      try {
        window.__xn_ytPlayer = new YT.Player('carouselYoutube', {
          playerVars: { autoplay: 1, mute: 1, rel: 0 },
          events: {
            'onReady': function(event) {
              // Mute to comply with autoplay policies, then attempt to play
              try { event.target.mute(); } catch(e) {}
              try { event.target.playVideo(); } catch(e) {}
            },
            'onStateChange': function(event) {
              const carousel = window.__xn_carousel;
              if(!carousel) return;
              // PLAYING -> ensure carousel stays paused
              if(event.data === YT.PlayerState.PLAYING) {
                try { carousel.pause(); } catch(e) {}
              }
              // PAUSED or ENDED -> resume carousel
              if(event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                try { carousel.cycle(); } catch(e) {}
              }
            }
          }
        });
      } catch (e) {
        // ignore errors (YT API may block in some environments)
        console.warn('YouTube player init failed', e);
      }
    };
  
    // Booking form: show/hide return date when switching trip type
    document.addEventListener('DOMContentLoaded', () => {
      const oneWay = document.getElementById('oneWay');
      const roundTrip = document.getElementById('roundTrip');
      const returnGroup = document.getElementById('returnDateGroup');
      if(!oneWay || !roundTrip || !returnGroup) return;

      function updateReturn() {
        if(roundTrip.checked) {
          returnGroup.style.display = '';
        } else {
          returnGroup.style.display = 'none';
        }
      }

      oneWay.addEventListener('change', updateReturn);
      roundTrip.addEventListener('change', updateReturn);
      // initialize
      updateReturn();

      // Convert 'from' and 'to' selects behavior: prevent selecting the same place
      const fromSel = document.getElementById('from');
      const toSel = document.getElementById('to');
      if(fromSel && toSel) {
        function syncDisabled() {
          const fv = fromSel.value;
          const tv = toSel.value;

          // clear any previous disabled flags
          fromSel.querySelectorAll('option').forEach(o => o.disabled = false);
          toSel.querySelectorAll('option').forEach(o => o.disabled = false);

          // disable the selected origin in destination list
          if(fv) {
            const opt = toSel.querySelector(`option[value="${fv}"]`);
            if(opt) opt.disabled = true;
            if(toSel.value === fv) toSel.value = ""; // clear if it matched
          }

          // disable the selected destination in origin list
          if(tv) {
            const opt2 = fromSel.querySelector(`option[value="${tv}"]`);
            if(opt2) opt2.disabled = true;
            if(fromSel.value === tv) fromSel.value = "";
          }
        }

        fromSel.addEventListener('change', syncDisabled);
        toSel.addEventListener('change', syncDisabled);
        // init
        syncDisabled();
      }
    });
      // Highlight the active menu item based on the current page
      document.addEventListener("DOMContentLoaded", function () {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll(".main-nav .nav-link");

        navLinks.forEach(link => {
          if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href"))) {
            link.classList.add("active");
          }
        });
      });

      // Mobile menu toggle functionality
      document.addEventListener("DOMContentLoaded", function () {
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        const mobileNav = document.getElementById("mobile-nav");
        const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
        const mobileNavClose = document.getElementById("mobile-nav-close");

        if (mobileMenuToggle && mobileNav && mobileNavOverlay && mobileNavClose) {
          // Open mobile menu
          mobileMenuToggle.addEventListener("click", function() {
            mobileNav.classList.add("active");
            mobileNavOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
          });

          // Close mobile menu
          const closeMobileMenu = function() {
            mobileNav.classList.remove("active");
            mobileNavOverlay.classList.remove("active");
            document.body.style.overflow = "";
          };

          mobileNavClose.addEventListener("click", closeMobileMenu);
          mobileNavOverlay.addEventListener("click", closeMobileMenu);

          // Close when clicking a link
          const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
          mobileNavLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
          });
        }
      });
})();
