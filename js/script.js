// Simple language toggle (vi <-> en) using data-i18n attributes
(function(){
  const translations = {
    vi: {
      book: 'Đặt chuyến',
      lookup: 'Tra cứu chuyến',
      available: 'Chuyến đi có sẵn',
      trending: 'Chuyến đi đang trend',
      help: 'Trợ giúp',
      news: 'Tin tức',
      contact: 'Liên hệ',
      heroTitle: 'Đặt vé xe nhanh chóng',
      heroSub: 'Tìm chuyến, đặt vé, nhận thông báo — tất cả trong một.'
    },
    en: {
      book: 'Book trip',
      lookup: 'Lookup trip',
      available: 'Available trips',
      trending: 'Trending trips',
      help: 'Help',
      news: 'News',
      contact: 'Contact',
      heroTitle: 'Book bus tickets fast',
      heroSub: 'Search routes, book seats, get notifications — all in one.'
    }
  };

  const root = document.documentElement;
  const langBtn = document.getElementById('lang-btn');
  let current = localStorage.getItem('xn.lang') || 'vi';

  function apply(lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
    root.lang = lang;
    // update the language button label
    if(langBtn) {
      langBtn.textContent = (lang === 'vi') ? 'Tiếng Việt' : 'English';
      langBtn.setAttribute('aria-pressed', String(lang !== 'vi'));
    }
    localStorage.setItem('xn.lang', lang);
  }


  // Initialize on load
  apply(current);
  // Attach language menu item handlers (buttons inside dropdown)
  document.querySelectorAll('.lang-select').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const lang = btn.getAttribute('data-lang');
      if(lang) {
        current = lang;
        apply(current);
      }
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
})();
