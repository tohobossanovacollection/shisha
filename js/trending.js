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
      image: 'images/routes/danang.jpg',
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
      image: 'images/routes/dalat.jpg',
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
      image: 'images/routes/haiphong.webp',
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
      image: 'images/routes/camau.png',
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
      image: 'images/routes/laocai.jpg',
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
      image: 'images/routes/vungtau.jpg',
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
      image: 'images/routes/hoian.jpg',
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
      image: 'images/routes/danang.jpg',
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
      image: 'images/routes/nhatrang.jpg',
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
      image: 'images/routes/ninhbinh.jpg',
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
      image: 'images/routes/phanthiet.jpg',
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
      image: 'images/routes/binhdinh.jpg',
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
    // Show at least 7 trips for layout
    trips = trips.slice(0, 7);
    let html = '';
    // Row 1: 1 large left, 2 small right (xếp ngang)
    html += '<div class="trending-row trending-row-featured mb-4" style="display: flex; gap: 2rem;">';
    // Card lớn
    html += '<div class="trending-featured-left" style="flex: 1 1 50%; min-width: 0;">';
    if (trips[0]) {
      const trip = trips[0];
      const badgeHtml = trip.badge ? `<span class=\"trip-badge ${trip.badge}\">${
        trip.badge === 'hot' ? '🔥 HOT' : 
        trip.badge === 'new' ? '✨ MỚI' : 
        '💰 SALE'
      }</span>` : '';
      html += `
        <div class="trip-card card trending-large-card shadow-sm" data-trip-id="${trip.id}">
          <div style="position:relative;">
            <img src="${trip.image}" class="card-img-top" alt="${trip.from}" style="height:300px;object-fit:cover;">
            ${badgeHtml}
            <div class="fw-bold text-white" style="font-size:2rem;position:absolute;left:0;bottom:0;width:100%;background:linear-gradient(transparent,rgba(0,0,0,0.7));padding:0.5rem 1rem;">Tuyến xe từ ${trip.from}</div>
          </div>
          <div class="card-body p-0">
            <div class="p-3 pb-2">
              <div class="text-white" style="opacity:1;">${trip.description}</div>
            </div>
            <div class="list-group list-group-flush">
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-bold" style="color:#27ae60;">${trips[1]?.to || ''}</div>
                  <div class="small text-muted">310km - 8 giờ - 07/12/2025</div>
                </div>
                <div class="fw-bold" style="font-size:1.1rem;">260.000đ</div>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-bold" style="color:#27ae60;">${trips[2]?.to || ''}</div>
                  <div class="small text-muted">172km - 5 giờ - 07/12/2025</div>
                </div>
                <div class="fw-bold" style="font-size:1.1rem;">165.000đ</div>
              </div>
              <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-bold" style="color:#27ae60;">Long Xuyên</div>
                  <div class="small text-muted">209km - 5 giờ - 07/12/2025</div>
                </div>
                <div class="fw-bold" style="font-size:1.1rem;">200.000đ</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    html += '</div>';
    // 2 card nhỏ bên phải
    html += '<div class="trending-featured-right" style="flex: 1 1 50%; min-width: 0; display: flex; gap: 1.5rem;">';
    for (let i = 1; i <= 2; i++) {
      if (trips[i]) {
        const badgeHtml = trips[i].badge ? `<span class=\"trip-badge ${trips[i].badge}\">${
          trips[i].badge === 'hot' ? '🔥 HOT' : 
          trips[i].badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        html += `
          <div class="trip-card card trending-small-card shadow-sm" data-trip-id="${trips[i].id}" style="flex: 1;">
            <div style="position:relative;">
              <img src="${trips[i].image}" class="card-img-top" alt="${trips[i].from}" style="height:180px;object-fit:cover;">
              ${badgeHtml}
              <div class="fw-bold text-white" style="font-size:1.3rem;position:absolute;left:0;bottom:0;width:100%;background:linear-gradient(transparent,rgba(0,0,0,0.7));padding:0.3rem 0.7rem;">Tuyến xe từ ${trips[i].from}</div>
            </div>
            <div class="card-body p-0">
              <div class="p-3 pb-2">
                <div class="text-white" style="opacity:0.85;">${trips[i].description}</div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">${trips[i+1]?.to || ''}</div>
                    <div class="small text-muted">300km - 8 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">260.000đ</div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">${trips[i+2]?.to || ''}</div>
                    <div class="small text-muted">700km - 14 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">430.000đ</div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">Cần Thơ</div>
                    <div class="small text-muted">464km - 11 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">445.000đ</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
    html += '</div>';
    html += '</div>';
    // Row 2: 4 small cards xếp ngang
    html += '<div class="trending-row trending-row-small mt-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">';
    for (let i = 3; i <= 6; i++) {
      if (trips[i]) {
        const badgeHtml = trips[i].badge ? `<span class=\"trip-badge ${trips[i].badge}\">${
          trips[i].badge === 'hot' ? '🔥 HOT' : 
          trips[i].badge === 'new' ? '✨ MỚI' : 
          '💰 SALE'
        }</span>` : '';
        html += `
          <div class="trip-card card trending-small-card shadow-sm" data-trip-id="${trips[i].id}">
            <div style="position:relative;">
              <img src="${trips[i].image}" class="card-img-top" alt="${trips[i].from}" style="height:140px;object-fit:cover;">
              ${badgeHtml}
              <div class="fw-bold text-white" style="font-size:1.1rem;position:absolute;left:0;bottom:0;width:100%;background:linear-gradient(transparent,rgba(0,0,0,0.7));padding:0.2rem 0.5rem;">Tuyến xe từ ${trips[i].from}</div>
            </div>
            <div class="card-body p-0">
              <div class="p-3 pb-2">
                <div class="text-white" style="opacity:0.85;">${trips[i].description}</div>
              </div>
              <div class="list-group list-group-flush">
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">${trips[i].to}</div>
                    <div class="small text-muted">550km - 10 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">380.000đ</div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">BX An Sương</div>
                    <div class="small text-muted">990km - 20 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">495.000đ</div>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <div class="fw-bold" style="color:#27ae60;">Nha Trang</div>
                    <div class="small text-muted">550km - 10 giờ - 07/12/2025</div>
                  </div>
                  <div class="fw-bold" style="font-size:1.1rem;">380.000đ</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
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
