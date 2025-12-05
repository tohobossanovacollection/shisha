// Trending Trips Data and Logic
(function() {
  // Trip data
  const tripsData = [
    {
      id: 1,
      from: 'Hà Nội',
      to: 'Đà Nẵng',
      fromEn: 'Hanoi',
      toEn: 'Da Nang',
      price: 450000,
      image: 'images/118897428_p0.jpg',
      description: 'Tuyến đường nổi tiếng, phong cảnh đẹp',
      descriptionEn: 'Popular route, beautiful scenery',
      region: 'north',
      duration: '14 giờ',
      durationEn: '14 hours',
      badge: 'hot'
    },
    {
      id: 2,
      from: 'TP.HCM',
      to: 'Đà Lạt',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Da Lat',
      price: 280000,
      image: 'images/83105924_p0_master1200.jpg',
      description: 'Thành phố ngàn hoa, khí hậu mát mẻ',
      descriptionEn: 'City of flowers, cool climate',
      region: 'south',
      duration: '7 giờ',
      durationEn: '7 hours',
      badge: 'hot'
    },
    {
      id: 3,
      from: 'Hà Nội',
      to: 'Hải Phòng',
      fromEn: 'Hanoi',
      toEn: 'Hai Phong',
      price: 150000,
      image: 'images/199533194_322853549478458_7024767257376436995_n.jpg',
      description: 'Tuyến ngắn, tiện lợi, giá tốt',
      descriptionEn: 'Short route, convenient, good price',
      region: 'north',
      duration: '2 giờ',
      durationEn: '2 hours',
      badge: 'new'
    },
    {
      id: 4,
      from: 'Cần Thơ',
      to: 'Cà Mau',
      fromEn: 'Can Tho',
      toEn: 'Ca Mau',
      price: 180000,
      image: 'images/bread-800.jpg',
      description: 'Miền Tây sông nước, ẩm thực phong phú',
      descriptionEn: 'Mekong Delta, rich cuisine',
      region: 'south',
      duration: '4 giờ',
      durationEn: '4 hours',
      badge: null
    },
    {
      id: 5,
      from: 'Hà Nội',
      to: 'Sa Pa',
      fromEn: 'Hanoi',
      toEn: 'Sapa',
      price: 320000,
      image: 'images/118897428_p0.jpg',
      description: 'Núi non hùng vĩ, văn hóa bản địa',
      descriptionEn: 'Majestic mountains, local culture',
      region: 'north',
      duration: '6 giờ',
      durationEn: '6 hours',
      badge: 'hot'
    },
    {
      id: 6,
      from: 'TP.HCM',
      to: 'Vũng Tàu',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Vung Tau',
      price: 120000,
      image: 'images/83105924_p0_master1200.jpg',
      description: 'Biển đẹp, gần thành phố',
      descriptionEn: 'Beautiful beach, close to city',
      region: 'south',
      duration: '2.5 giờ',
      durationEn: '2.5 hours',
      badge: 'sale'
    },
    {
      id: 7,
      from: 'Đà Nẵng',
      to: 'Hội An',
      fromEn: 'Da Nang',
      toEn: 'Hoi An',
      price: 80000,
      image: 'images/199533194_322853549478458_7024767257376436995_n.jpg',
      description: 'Phố cổ nổi tiếng, di sản văn hóa',
      descriptionEn: 'Famous ancient town, cultural heritage',
      region: 'central',
      duration: '1 giờ',
      durationEn: '1 hour',
      badge: 'hot'
    },
    {
      id: 8,
      from: 'Huế',
      to: 'Đà Nẵng',
      fromEn: 'Hue',
      toEn: 'Da Nang',
      price: 160000,
      image: 'images/bread-800.jpg',
      description: 'Đèo Hải Vân nổi tiếng',
      descriptionEn: 'Famous Hai Van Pass',
      region: 'central',
      duration: '3 giờ',
      durationEn: '3 hours',
      badge: null
    },
    {
      id: 9,
      from: 'TP.HCM',
      to: 'Nha Trang',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Nha Trang',
      price: 380000,
      image: 'images/118897428_p0.jpg',
      description: 'Thành phố biển xinh đẹp',
      descriptionEn: 'Beautiful coastal city',
      region: 'south',
      duration: '9 giờ',
      durationEn: '9 hours',
      badge: 'new'
    },
    {
      id: 10,
      from: 'Hà Nội',
      to: 'Ninh Bình',
      fromEn: 'Hanoi',
      toEn: 'Ninh Binh',
      price: 140000,
      image: 'images/83105924_p0_master1200.jpg',
      description: 'Vịnh Hạ Long trên cạn',
      descriptionEn: 'Halong Bay on land',
      region: 'north',
      duration: '2 giờ',
      durationEn: '2 hours',
      badge: 'hot'
    },
    {
      id: 11,
      from: 'TP.HCM',
      to: 'Mũi Né',
      fromEn: 'Ho Chi Minh City',
      toEn: 'Mui Ne',
      price: 220000,
      image: 'images/199533194_322853549478458_7024767257376436995_n.jpg',
      description: 'Đồi cát, biển đẹp',
      descriptionEn: 'Sand dunes, beautiful beach',
      region: 'south',
      duration: '5 giờ',
      durationEn: '5 hours',
      badge: 'sale'
    },
    {
      id: 12,
      from: 'Đà Nẵng',
      to: 'Quy Nhơn',
      fromEn: 'Da Nang',
      toEn: 'Quy Nhon',
      price: 240000,
      image: 'images/bread-800.jpg',
      description: 'Biển xanh, thanh bình',
      descriptionEn: 'Blue sea, peaceful',
      region: 'central',
      duration: '6 giờ',
      durationEn: '6 hours',
      badge: null
    }
  ];


  let currentLang = localStorage.getItem('xn.lang') || 'vi';
  const tripsGrid = document.getElementById('tripsGrid');

  // Render trips
  function renderTrips(trips) {
    // Only show the first 5 trips
    trips = trips.slice(0, 5);
    let html = '';
    // Layout: 2 columns
    html += '<div class="trending-row trending-row-featured" style="display: flex; gap: 2rem;">';
    // Column 1: Featured card
    if (trips[0]) {
      const trip = trips[0];
      const badgeHtml = trip.badge ? `<span class="trip-badge ${trip.badge}">${
        trip.badge === 'hot' ? '🔥 HOT' : 
        trip.badge === 'new' ? '✨ MỚI' : 
        '💰 SALE'
      }</span>` : '';
      const title = currentLang === 'vi' ? `${trip.from} → ${trip.to}` : `${trip.fromEn} → ${trip.toEn}`;
      const description = currentLang === 'vi' ? trip.description : trip.descriptionEn;
      const duration = currentLang === 'vi' ? trip.duration : trip.durationEn;
      const bookNowText = currentLang === 'vi' ? 'Đặt ngay' : 'Book Now';
      html += `
        <div class="trending-featured-left" style="flex: 1; min-width: 0;">
          <div class="trip-card card trending-large-card shadow-sm" data-trip-id="${trip.id}">
            ${badgeHtml}
            <img src="${trip.image}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text text-muted small">${description}</p>
              <div class="trip-meta">
                <div class="trip-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>${duration}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="text-primary fw-bold">${trip.price.toLocaleString('vi-VN')}đ</span>
                <a href="#" class="btn btn-sm btn-outline-primary">${bookNowText}</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    // Column 2: 2x2 grid of small cards
    html += '<div class="trending-featured-right" style="flex: 1; min-width: 0; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1.5rem;">';
    for (let i = 1; i <= 4; i++) {
      if (trips[i]) {
        const trip = trips[i];
        const badgeHtml = trip.badge ? `<span class="trip-badge ${trip.badge}">${
          trip.badge === 'hot' ? '🔥 HOT' : 
          trip.badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        const title = currentLang === 'vi' ? `${trip.from} → ${trip.to}` : `${trip.fromEn} → ${trip.toEn}`;
        const description = currentLang === 'vi' ? trip.description : trip.descriptionEn;
        const duration = currentLang === 'vi' ? trip.duration : trip.durationEn;
        const bookNowText = currentLang === 'vi' ? 'Đặt ngay' : 'Book Now';
        html += `
          <div class="trip-card card trending-small-card shadow-sm" data-trip-id="${trip.id}">
            ${badgeHtml}
            <img src="${trip.image}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text text-muted small">${description}</p>
              <div class="trip-meta">
                <div class="trip-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <span>${duration}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="text-primary fw-bold">${trip.price.toLocaleString('vi-VN')}đ</span>
                <a href="#" class="btn btn-sm btn-outline-primary">${bookNowText}</a>
              </div>
            </div>
          </div>
        `;
      }
    }
    html += '</div>';
    html += '</div>';
    tripsGrid.innerHTML = html;
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
