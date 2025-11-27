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
      heroSub: 'Tìm chuyến, đặt vé, nhận thông báo — tất cả trong một.',
      carousel1Title: 'Đặt vé xe nhanh chóng',
      carousel1Sub: 'Tìm chuyến, đặt vé, nhận thông báo — tất cả trong một.',
      carousel2Title: 'Đặt vé dễ dàng, mọi lúc mọi nơi',
      carousel2Sub: 'Chỉ với vài thao tác đơn giản, bạn có thể đặt vé xe khách trực tuyến 24/7. Giao diện thân thiện, hỗ trợ nhiều phương thức thanh toán, giúp bạn chủ động lên kế hoạch di chuyển.',
      carousel3Title: 'So sánh giá, chọn chuyến phù hợp',
      carousel3Sub: 'Hệ thống tự động so sánh giá vé, hãng xe, giờ xuất phát và các tiện ích đi kèm. Bạn dễ dàng chọn chuyến đi phù hợp nhất với nhu cầu và ngân sách của mình.',
      carousel4Title: 'Hỗ trợ khách hàng nhanh chóng',
      carousel4Sub: 'Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn trước, trong và sau chuyến đi. Nhận thông báo thời gian xe đến, hướng dẫn lên xe, và giải đáp mọi thắc mắc qua hotline hoặc chat trực tuyến.',
      carousel5Title: 'Ưu đãi hấp dẫn',
      carousel5Sub: 'Giảm giá cho nhiều tuyến đường.',
      carousel6Title: 'Video giới thiệu',
      carousel6Sub: 'Xem video ngắn về dịch vụ.',
      bookingFrom: 'Điểm đi',
      bookingTo: 'Điểm đến',
      bookingDeparture: 'Ngày đi',
      bookingReturn: 'Ngày về',
      bookingPassengers: 'Hành khách',
      bookingSearch: 'Tìm kiếm',
      oneWay: 'Một chiều',
      roundtrip: 'Khứ hồi',
      search: 'Tìm kiếm',
      trendingTitle: 'Chuyến đi hot trend',
      trip1Title: 'Hà Nội → Đà Nẵng',
      trip1Desc: 'Tuyến đường nổi tiếng, phong cảnh đẹp',
      trip2Title: 'TP.HCM → Đà Lạt',
      trip2Desc: 'Thành phố ngàn hoa, khí hậu mát mẻ',
      trip3Title: 'Hà Nội → Hải Phòng',
      trip3Desc: 'Tuyến ngắn, tiện lợi, giá tốt',
      trip4Title: 'Cần Thơ → Cà Mau',
      trip4Desc: 'Miền Tây sông nước, ẩm thực phong phú',
      bookNow: 'Đặt ngay',
      testimonialsTitle: 'Khách hàng nói gì về Vexere',
          testi1Name: 'Anh Nguyễn Tuấn Quỳnh',
          testi1Role: 'CEO Saigon Books',
          testi1Text: 'Lần trước tôi có việc gấp phải đi công tác, lên mạng tìm đặt vé xe thì tình cờ tìm thấy Vexere. Sau khi tham khảo, tôi quyết định đặt vé và thanh toán.',
          testi2Name: 'Shark Phi',
          testi2Role: 'Giám đốc BSSC',
          testi2Text: 'Các đối tác của Vexere đều là những hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm khi lựa chọn đặt vé cho bản thân và gia đình.',
          testi3Name: 'Lê Thị Mai',
          testi3Role: 'Nhân viên văn phòng',
          testi3Text: 'Tôi rất hài lòng với trải nghiệm đặt vé: giao diện rõ ràng, thao tác nhanh. Hệ thống thông báo chính xác thời gian xe đến.',
          testi4Name: 'Nguyễn Văn An',
          testi4Role: 'Freelancer',
          testi4Text: 'Giá vé hợp lý, dễ so sánh giữa các hãng. Tôi tìm thấy chuyến phù hợp trong vài phút và nhận vé điện tử ngay lập tức.',
          platformTitle: 'Nền tảng kết nối người dùng và nhà xe',
          platform1Title: '2000+ nhà xe chất lượng cao',
          platform1Text: '5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.',
          platform2Title: 'Đặt vé dễ dàng',
          platform2Text: 'Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.',
          platform3Title: 'Chắc chắn có chỗ',
          platform3Text: 'Hoàn ngay 150% nếu nhà xe không cung cấp dịch vụ vận chuyển.',
          platform4Title: 'Nhiều ưu đãi',
          platform4Text: 'Hàng ngàn ưu đãi cực chất độc quyền tại Vexere.'
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
      heroSub: 'Search routes, book seats, get notifications — all in one.',
      carousel1Title: 'Book bus tickets fast',
      carousel1Sub: 'Search routes, book seats, get notifications — all in one.',
      carousel2Title: 'Easy booking, anytime, anywhere',
      carousel2Sub: 'Just a few simple steps to book bus tickets online 24/7. Friendly interface, multiple payment methods, helping you plan your trip proactively.',
      carousel3Title: 'Compare prices, choose your trip',
      carousel3Sub: 'Automatically compare ticket prices, bus companies, departure times, and amenities. Easily select the best trip for your needs and budget.',
      carousel4Title: 'Fast customer support',
      carousel4Sub: 'Our support team is ready to assist you before, during, and after your trip. Get bus arrival notifications, boarding instructions, and answers to all questions via hotline or live chat.',
      carousel5Title: 'Attractive promotions',
      carousel5Sub: 'Discounts on many routes.',
      carousel6Title: 'Intro video',
      carousel6Sub: 'Watch a short video about our service.',
      bookingFrom: 'From',
      bookingTo: 'To',
      bookingDeparture: 'Departure Date',
      bookingReturn: 'Return Date',
      bookingPassengers: 'Passengers',
      bookingSearch: 'Search',
      oneWay: 'One Way',  
      roundtrip: 'Round Trip',
      search: 'Search',
      trendingTitle: 'Hot Trending Trips',
      trip1Title: 'Hanoi → Da Nang',
      trip1Desc: 'Popular route, beautiful scenery',
      trip2Title: 'Ho Chi Minh City → Da Lat',
      trip2Desc: 'City of flowers, cool climate',
      trip3Title: 'Hanoi → Hai Phong',
      trip3Desc: 'Short route, convenient, good price',
      trip4Title: 'Can Tho → Ca Mau',
      trip4Desc: 'Mekong Delta, rich cuisine',
      bookNow: 'Book Now',
      testimonialsTitle: 'What customers say about Vexere',
          testi1Name: 'Nguyen Tuan Quynh',
          testi1Role: 'CEO Saigon Books',
          testi1Text: 'Last time I had an urgent business trip, I searched online for bus tickets and found Vexere by chance. After checking, I decided to book and pay online.',
          testi2Name: 'Shark Phi',
          testi2Role: 'Director of BSSC',
          testi2Text: 'Vexere partners are all reputable bus companies, so I feel completely secure booking tickets for myself and my family.',
          testi3Name: 'Le Thi Mai',
          testi3Role: 'Office staff',
          testi3Text: 'I am very satisfied with the booking experience: clear interface, quick operation. The system accurately notifies bus arrival time.',
          testi4Name: 'Nguyen Van An',
          testi4Role: 'Freelancer',
          testi4Text: 'Reasonable ticket prices, easy to compare between companies. I found a suitable trip in minutes and received my e-ticket instantly.',
          platformTitle: 'Platform connecting users and bus operators',
          platform1Title: '2000+ high-quality bus companies',
          platform1Text: '5000+ routes nationwide, flexible and diverse choices.',
          platform2Title: 'Easy ticket booking',
          platform2Text: 'Book tickets in just 60 seconds. Quickly choose your favorite bus.',
          platform3Title: 'Guaranteed seats',
          platform3Text: '150% refund if the bus company does not provide transportation.',
          platform4Title: 'Many promotions',
          platform4Text: 'Thousands of exclusive promotions at Vexere.'
    }
  };

  const root = document.documentElement;
  const langBtn = document.getElementById('lang-btn');
  let current = localStorage.getItem('xn.lang') || 'vi';

  function apply(lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    // Carousel static captions (for slides without data-i18n)
    // Slide 2
    const c2Title = document.querySelector('.carousel-item:nth-child(2) .carousel-caption h5');
    const c2Sub = document.querySelector('.carousel-item:nth-child(2) .carousel-caption p');
    if(c2Title && c2Sub) {
      c2Title.textContent = translations[lang].carousel2Title;
      c2Sub.textContent = translations[lang].carousel2Sub;
    }
    // Slide 3
    const c3Title = document.querySelector('.carousel-item:nth-child(3) .carousel-caption h5');
    const c3Sub = document.querySelector('.carousel-item:nth-child(3) .carousel-caption p');
    if(c3Title && c3Sub) {
      c3Title.textContent = translations[lang].carousel3Title;
      c3Sub.textContent = translations[lang].carousel3Sub;
    }
    // Slide 4
    const c4Title = document.querySelector('.carousel-item:nth-child(4) .carousel-caption h5');
    const c4Sub = document.querySelector('.carousel-item:nth-child(4) .carousel-caption p');
    if(c4Title && c4Sub) {
      c4Title.textContent = translations[lang].carousel4Title;
      c4Sub.textContent = translations[lang].carousel4Sub;
    }
    // Slide 5
    const c5Title = document.querySelector('.carousel-item:nth-child(5) .carousel-caption h5');
    const c5Sub = document.querySelector('.carousel-item:nth-child(5) .carousel-caption p');
    if(c5Title && c5Sub) {
      c5Title.textContent = translations[lang].carousel5Title;
      c5Sub.textContent = translations[lang].carousel5Sub;
    }
    // Slide 6 (video)
    const c6Title = document.querySelector('.carousel-item:nth-child(6) .carousel-caption h5');
    const c6Sub = document.querySelector('.carousel-item:nth-child(6) .carousel-caption p');
    if(c6Title && c6Sub) {
      c6Title.textContent = translations[lang].carousel6Title;
      c6Sub.textContent = translations[lang].carousel6Sub;
    }
    // Booking form labels
    const bookingLabels = [
      { sel: 'label[for="oneWay"]', key: 'oneWay' },
      { sel: 'label[for="roundTrip"]', key: 'roundtrip' },
      { sel: 'label[for="from"]', key: 'bookingFrom' },
      { sel: 'label[for="to"]', key: 'bookingTo' },
      { sel: 'label[for="departure"]', key: 'bookingDeparture' },
      { sel: 'label[for="returnDate"]', key: 'bookingReturn' },
      { sel: 'label[for="passengers"]', key: 'bookingPassengers' }
    ];
    bookingLabels.forEach(item => {
      const el = document.querySelector(item.sel);
      if(el && translations[lang][item.key]) el.textContent = translations[lang][item.key];
    });
    // Booking form search button
    const searchBtn = document.querySelector('#bookingForm button[type="submit"]');
    if(searchBtn) searchBtn.textContent = translations[lang].bookingSearch;
    
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
    // update the language button label
    if(langBtn) {
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
