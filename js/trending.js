// Trending Trips Data and Logic
(function() {
  // Trip data
  const tripsData = [
    // 0-2: FROM HÀ NỘI
    {
      id: 0,
      from: 'Hà Nội',
      to: 'Đà Nẵng',
      fromEn: 'Hanoi',
      toEn: 'Da Nang',
      price: 450000,
      image: 'images/routes/danang.jpg',
      description: 'Tuyến đường nổi tiếng, phong cảnh đẹp',
      descriptionEn: 'Famous route with beautiful scenery',
      region: 'north',
      distance: '765 km',
      duration: '14 giờ',
      durationEn: '14 hours',
      badge: 'hot'
    },
    {
      id: 1,
      from: 'Hà Nội',
      to: 'Hải Phòng',
      fromEn: 'Hanoi',
      toEn: 'Haiphong',
      price: 150000,
      image: 'images/routes/haiphong.webp',
      description: 'Tuyến ngắn, tiện lợi, giá tốt',
      descriptionEn: 'Short, convenient route, good price',
      region: 'north',
      distance: '120 km',
      duration: '2 giờ 30 phút',
      durationEn: '2.5 hours',
      badge: 'new'
    },
    {
      id: 2,
      from: 'Hà Nội',
      to: 'Huế',
      fromEn: 'Hanoi',
      toEn: 'Hue',
      price: 420000,
      image: 'images/routes/hue.jpg',
      description: 'Cố đô, lăng tẩm, ẩm thực cung đình',
      descriptionEn: 'Ancient capital, royal tombs and cuisine',
      region: 'north',
      distance: '670 km',
      duration: '12 giờ',
      durationEn: '12 hours',
      badge: 'sale'
    },

    // 3-5: FROM TP.HCM
    {
      id: 3,
      from: 'TP.HCM',
      to: 'Đà Lạt',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Da Lat',
      price: 280000,
      image: 'images/routes/dalat.jpg',
      description: 'Thành phố ngàn hoa, khí hậu mát mẻ',
      descriptionEn: 'City of thousands of flowers, cool weather',
      region: 'south',
      distance: '308 km',
      duration: '7 giờ',
      durationEn: '7 hours',
      badge: 'hot'
    },
    {
      id: 4,
      from: 'TP.HCM',
      to: 'Vũng Tàu',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Vung Tau',
      price: 120000,
      image: 'images/routes/vungtau.jpg',
      description: 'Biển đẹp, gần thành phố, đi về trong ngày',
      descriptionEn: 'Nice beach, close to city, good for day trip',
      region: 'south',
      distance: '120 km',
      duration: '2 giờ 30 phút',
      durationEn: '2.5 hours',
      badge: 'sale'
    },
    {
      id: 5,
      from: 'TP.HCM',
      to: 'Nha Trang',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Nha Trang',
      price: 380000,
      image: 'images/routes/nhatrang.jpg',
      description: 'Thành phố biển sôi động, nhiều khu vui chơi',
      descriptionEn: 'Lively beach city with many attractions',
      region: 'south',
      distance: '430 km',
      duration: '9 giờ',
      durationEn: '9 hours',
      badge: 'new'
    },

    // 6-8: FROM ĐÀ NẴNG
    {
      id: 6,
      from: 'Đà Nẵng',
      to: 'Hội An',
      fromEn: 'Da Nang',
      toEn: 'Hoi An',
      price: 80000,
      image: 'images/routes/hoian.jpg',
      description: 'Phố cổ lung linh đèn lồng, di sản văn hóa',
      descriptionEn: 'Ancient town with lanterns, cultural heritage',
      region: 'central',
      distance: '30 km',
      duration: '1 giờ',
      durationEn: '1 hour',
      badge: 'hot'
    },
    {
      id: 7,
      from: 'Đà Nẵng',
      to: 'Tam Kỳ',
      fromEn: 'Da Nang',
      toEn: 'Tam Ky',
      price: 100000,
      image: 'images/routes/tamky.webp',
      description: 'Cổng vào miền Trung, yên bình',
      descriptionEn: 'Gateway to Central Vietnam, peaceful',
      region: 'central',
      distance: '70 km',
      duration: '1 giờ 30 phút',
      durationEn: '1.5 hours',
      badge: null
    },
    {
      id: 8,
      from: 'Đà Nẵng',
      to: 'Quảng Ngãi',
      fromEn: 'Da Nang',
      toEn: 'Quang Ngai',
      price: 150000,
      image: 'images/routes/quangngai.jpg',
      description: 'Tuyến ven biển miền Trung, cảnh đẹp',
      descriptionEn: 'Central coast route with beautiful scenery',
      region: 'central',
      distance: '130 km',
      duration: '3 giờ',
      durationEn: '3 hours',
      badge: 'new'
    },

    // 9-11: FROM HUẾ
    {
      id: 9,
      from: 'Huế',
      to: 'Quảng Trị',
      fromEn: 'Hue',
      toEn: 'Quang Tri',
      price: 100000,
      image: 'images/routes/quangtri.jpg',
      description: 'Vùng đất lửa lịch sử, di tích chiến tranh',
      descriptionEn: 'Historic battleground with war relics',
      region: 'central',
      distance: '100 km',
      duration: '2 giờ',
      durationEn: '2 hours',
      badge: 'hot'
    },
    {
      id: 10,
      from: 'Hà Nội',
      to: 'Thanh Hóa',
      fromEn: 'Hanoi',
      toEn: 'Thanh Hoa',
      price: 200000,
      image: 'images/routes/thanhhoa.webp',
      description: 'Về miền Thanh Hóa, quê hương Bác',
      descriptionEn: 'To Thanh Hoa, birthplace of Uncle Ho',
      region: 'north',
      distance: '150 km',
      duration: '3 giờ',
      durationEn: '3 hours',
      badge: 'sale'
    },
    {
      id: 11,
      from: 'TP.HCM',
      to: 'Tây Ninh',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Tay Ninh',
      price: 120000,
      image: 'images/routes/tayninh.jpg',
      description: 'Về Tây Ninh tham quan Tòa Thánh Cao Đài',
      descriptionEn: 'Visit Cao Dai Holy See in Tay Ninh',
      region: 'south',
      distance: '90 km',
      duration: '2 giờ',
      durationEn: '2 hours',
      badge: null
    },

    // 12-14: FROM TP.HCM
    {
      id: 12,
      from: 'TP.HCM',
      to: 'Phan Thiết',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Phan Thiet',
      price: 180000,
      image: 'images/routes/phanthiet.jpg',
      description: 'Biển Mũi Né, đồi cát bay, hải sản tươi',
      descriptionEn: 'Mui Ne beach, sand dunes, fresh seafood',
      region: 'south',
      distance: '200 km',
      duration: '4 giờ',
      durationEn: '4 hours',
      badge: 'new'
    },
    {
      id: 13,
      from: 'TP.HCM',
      to: 'Biên Hòa',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Bien Hoa',
      price: 50000,
      image: 'images/routes/bienhoa.jpg',
      description: 'Tuyến ngắn đến Biên Hòa - Đồng Nai',
      descriptionEn: 'Short route to Bien Hoa - Dong Nai',
      region: 'south',
      distance: '30 km',
      duration: '1 giờ',
      durationEn: '1 hour',
      badge: 'hot'
    },
    {
      id: 14,
      from: 'Hà Nội',
      to: 'Lào Cai',
      fromEn: 'Hanoi',
      toEn: 'Lao Cai',
      price: 350000,
      image: 'images/routes/laocai.jpg',
      description: 'Lên Sapa ngắm tuyết, ruộng bậc thang',
      descriptionEn: 'To Sapa for snow and terraced fields',
      region: 'north',
      distance: '300 km',
      duration: '6 giờ',
      durationEn: '6 hours',
      badge: 'sale'
    },

    // 15-17: FROM CẦN THƠ
    {
      id: 15,
      from: 'Cần Thơ',
      to: 'TP.HCM',
      fromEn: 'Can Tho',
      toEn: 'Ho Chi Minh City',
      price: 150000,
      image: 'images/routes/hochiminh.jpg',
      description: 'Tuyến đi nhanh giữa miền Tây và Sài Gòn',
      descriptionEn: 'Fast route between Mekong Delta and Saigon',
      region: 'south',
      distance: '170 km',
      duration: '3 giờ 30 phút',
      durationEn: '3.5 hours',
      badge: null
    },
    {
      id: 16,
      from: 'Cần Thơ',
      to: 'Sóc Trăng',
      fromEn: 'Can Tho',
      toEn: 'Soc Trang',
      price: 120000,
      image: 'images/routes/soctrang.jpg',
      description: 'Chùa Dơi nổi tiếng, văn hóa Khmer',
      descriptionEn: 'Famous Bat Pagoda, Khmer culture',
      region: 'south',
      distance: '60 km',
      duration: '1 giờ 15 phút',
      durationEn: '1.25 hours',
      badge: 'new'
    },
    {
      id: 17,
      from: 'Cần Thơ',
      to: 'Cà Mau',
      fromEn: 'Can Tho',
      toEn: 'Ca Mau',
      price: 260000,
      image: 'images/routes/camau.png',
      description: 'Hành trình về cực Nam của Tổ quốc',
      descriptionEn: 'Journey to the southernmost point of Vietnam',
      region: 'south',
      distance: '180 km',
      duration: '4 giờ',
      durationEn: '4 hours',
      badge: 'hot'
    },

    // 18-20: FROM HẢI PHÒNG
    {
      id: 18,
      from: 'Hải Phòng',
      to: 'Thái Bình',
      fromEn: 'Haiphong',
      toEn: 'Thai Binh',
      price: 100000,
      image: 'images/routes/thaibinh.jpg',
      description: 'Quê lúa miền Bắc, ẩm thực đồng quê',
      descriptionEn: 'Northern rice fields, rural cuisine',
      region: 'north',
      distance: '70 km',
      duration: '1 giờ 30 phút',
      durationEn: '1.5 hours',
      badge: 'sale'
    },
    {
      id: 19,
      from: 'Đà Nẵng',
      to: 'Bình Định',
      fromEn: 'Da Nang',
      toEn: 'Binh Dinh',
      price: 200000,
      image: 'images/routes/binhdinh.jpg',
      description: 'Tháp Bánh Ít, võ thuật Bình Định',
      descriptionEn: 'Banh It Towers, Binh Dinh martial arts',
      region: 'central',
      distance: '250 km',
      duration: '5 giờ',
      durationEn: '5 hours',
      badge: 'hot'
    },
    {
      id: 20,
      from: 'Đà Nẵng',
      to: 'Phú Yên',
      fromEn: 'Da Nang',
      toEn: 'Phu Yen',
      price: 250000,
      image: 'images/routes/phuyen.jpg',
      description: 'Gành Đá Đĩa độc đáo, biển xanh trong',
      descriptionEn: 'Unique Ganh Da Dia, crystal clear sea',
      region: 'central',
      distance: '300 km',
      duration: '6 giờ',
      durationEn: '7 hours',
      badge: null
    }
  ];


  let currentLang = localStorage.getItem('xn.lang') || 'vi';
  const tripsGrid = document.getElementById('tripsGrid');

  // Render trips with new grid layout
  function renderTrips(trips) {
    // Use first 15 trips for the new layout (3 + 4 + 8)
    trips = trips.slice(0, 15);
    let html = '';
    
    // Container for both rows
    html += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; auto-rows: auto;">';
    
    // ROW 1: 1 large card (2 cols) + 2 small cards (1 col each, stacked vertically)
    // Large card (trip 0) - spans 2 columns and 2 rows
    if (trips[0]) {
      const trip0 = trips[0];
      const badgeHtml = trip0.badge ? `<span class=\"trip-badge ${trip0.badge}\">${
        trip0.badge === 'hot' ? '🔥 HOT' : 
        trip0.badge === 'new' ? '✨ MỚI' : 
        '💰 SALE'
      }</span>` : '';
      
      html += `
        <div class="trip-card card shadow-sm" data-trip-id="${trip0.id}" 
             style="display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; 
                    grid-column: span 2; grid-row: span 2; cursor: pointer;">
          <div style="position: relative; height: 100%; flex: 1; min-height: 400px; background: #f0f0f0;">
            <img src="${trip0.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${trip0.from}">
            ${badgeHtml}
            
            <!-- Overlay content at bottom -->
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%); 
                        padding: 2rem 1.5rem; color: white;">
              <div class="fw-bold" style="font-size: 1.3rem; margin-bottom: 0.3rem;">${trip0.from} → ${trip0.to}</div>
              <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">${trip0.description}</div>
              <div class="fw-bold" style="font-size: 1.1rem; color: #4edc89;">Từ ${(trip0.price).toLocaleString('vi-VN')}đ</div>
            </div>
            <button class="trip-cta" aria-label="Xem chi tiết">→</button>
          </div>
        </div>
      `;
    }
    
    // Small cards on the right (trips 1-2) - each spans 1 column, 1 row, stacked
    for (let i = 1; i <= 2; i++) {
      if (trips[i]) {
        const trip = trips[i];
        const badgeHtml = trip.badge ? `<span class=\"trip-badge ${trip.badge}\">${
          trip.badge === 'hot' ? '🔥 HOT' : 
          trip.badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        
        html += `
          <div class="trip-card card shadow-sm" data-trip-id="${trip.id}" 
               style="display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; 
                      cursor: pointer; grid-column: span 2;">
            <div style="position: relative; height: 180px; background: #f0f0f0;">
              <img src="${trip.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${trip.from}">
              ${badgeHtml}
              <button class="trip-cta" aria-label="Xem chi tiết">→</button>
            </div>
            
            <div style="flex: 1; display: flex; flex-direction: column; padding: 1rem;">
              <div class="fw-bold" style="font-size: 0.95rem; margin-bottom: 0.3rem;">${trip.from} → ${trip.to}</div>
              <div style="color: #666; font-size: 0.8rem; margin-bottom: 0.5rem; flex: 1;">${trip.description}</div>
              <div class="fw-bold" style="font-size: 0.9rem; color: #27ae60;">Từ ${(trip.price).toLocaleString('vi-VN')}đ</div>
              <div class="small text-muted">${trip.duration}</div>
            </div>
          </div>
        `;
      }
    }
    
    // ROW 2: 4 cards spanning 1 column each
    for (let i = 3; i <= 6; i++) {
      if (trips[i]) {
        const trip = trips[i];
        const badgeHtml = trip.badge ? `<span class=\"trip-badge ${trip.badge}\">${
          trip.badge === 'hot' ? '🔥 HOT' : 
          trip.badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        
        html += `
          <div class="trip-card card shadow-sm" data-trip-id="${trip.id}" 
               style="display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; 
                      cursor: pointer; grid-column: span 1;">
            <div style="position: relative; height: 200px; background: #f0f0f0;">
              <img src="${trip.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${trip.from}">
              ${badgeHtml}
              <button class="trip-cta" aria-label="Xem chi tiết">→</button>
            </div>
            
            <div style="flex: 1; display: flex; flex-direction: column; padding: 1rem;">
              <div class="fw-bold" style="font-size: 0.95rem; margin-bottom: 0.3rem;">${trip.from} → ${trip.to}</div>
              <div style="color: #666; font-size: 0.8rem; margin-bottom: 0.5rem; flex: 1;">${trip.description}</div>
              <div class="fw-bold" style="font-size: 0.9rem; color: #27ae60;">Từ ${(trip.price).toLocaleString('vi-VN')}đ</div>
              <div class="small text-muted">${trip.duration}</div>
            </div>
          </div>
        `;
      }
    }
    
    // Add remaining cards (7-14) - 2 rows x 4 columns (rows 3-4)
    for (let i = 7; i <= 14; i++) {
      if (trips[i]) {
        const trip = trips[i];
        const badgeHtml = trip.badge ? `<span class=\"trip-badge ${trip.badge}\">${
          trip.badge === 'hot' ? '🔥 HOT' : 
          trip.badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        
        html += `
          <div class="trip-card card shadow-sm" data-trip-id="${trip.id}" 
               style="display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; 
                      cursor: pointer; grid-column: span 1;">
            <div style="position: relative; height: 200px; background: #f0f0f0;">
              <img src="${trip.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${trip.from}">
              ${badgeHtml}
              <button class="trip-cta" aria-label="Xem chi tiết">→</button>
            </div>
            
            <div style="flex: 1; display: flex; flex-direction: column; padding: 1rem;">
              <div class="fw-bold" style="font-size: 0.95rem; margin-bottom: 0.3rem;">${trip.from} → ${trip.to}</div>
              <div style="color: #666; font-size: 0.8rem; margin-bottom: 0.5rem; flex: 1;">${trip.description}</div>
              <div class="fw-bold" style="font-size: 0.9rem; color: #27ae60;">Từ ${(trip.price).toLocaleString('vi-VN')}đ</div>
              <div class="small text-muted">${trip.duration}</div>
            </div>
          </div>
        `;
      }
    }
    
    html += '</div>';
    tripsGrid.innerHTML = html;
    
    // Add click handlers to trip cards
    addTripCardClickHandlers();
  }

  // Add click handlers to navigate to ChiTietTuyen.html
  function addTripCardClickHandlers() {
    // Click handler for main trip cards
    document.querySelectorAll('.trip-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // If clicking on a list item with data-route-trip, use that
        if (e.target.closest('[data-route-trip]')) {
          return; // Let the list item handler take over
        }
        
        const tripId = card.getAttribute('data-trip-id');
        const trip = tripsData.find(t => t.id == tripId);
        if (trip) {
          navigateToRoute(trip.from, trip.to, trip.duration);
        }
      });
    });

    // Click handler for individual list items
    document.querySelectorAll('[data-route-trip]').forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const routeString = item.getAttribute('data-route-trip');
        const [from, to] = routeString.split(' → ').map(s => s.trim());
        navigateToRoute(from, to, '10 giờ');
      });
    });
  }

  // Helper function to navigate to ChiTietTuyen.html
  function navigateToRoute(from, to, duration) {
    const routeString = `${from} → ${to}`;
    // Find matching trip data for accurate distance
    const trip = tripsData.find(t => t.from === from && t.to === to);
    const distance = trip ? trip.distance : '350 km';
    const tripDuration = duration || (trip ? trip.duration : '8 giờ');
    const params = new URLSearchParams({
      route: routeString,
      distance: distance,
      duration: tripDuration
    });
    window.location.href = `ChiTietTuyen.html?${params.toString()}`;
  }

  // Listen for language changes
  document.addEventListener('languageChanged', (e) => {
    currentLang = e.detail.lang;
    renderTrips(tripsData);
  });

  // Initial render
  renderTrips(tripsData);

  // Expose for external use
  window.trendingTrips = {
    data: tripsData,
    render: renderTrips,
    filter: filterTrips
  };
})();
