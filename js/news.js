// News Page JavaScript
(function() {
  'use strict';

  // DOM Elements
  const categoryLinks = document.querySelectorAll('.category-link');
  const newsGrid = document.getElementById('newsGrid');
  const paginationContainer = document.querySelector('.pagination');
  
  let currentCategory = 'all';
  let currentPage = 1;
  const itemsPerPage = 6;

  // All news data (simulated) - với ID và nội dung chi tiết
  const allNews = [
    // Page 1
    { 
      id: 1,
      category: 'promotion', 
      badge: 'Khuyến mãi', 
      badgeClass: 'bg-danger', 
      title: 'Giảm giá 30% các tuyến đường miền Bắc', 
      date: '01/12/2025', 
      desc: 'Chương trình ưu đãi đặc biệt cho khách hàng đặt vé trước dịp Tết Nguyên Đán. Áp dụng từ nay đến hết tháng 12.', 
      img: 'images/news/30discount.png',
      views: 1234
    },
    { 
      id: 2,
      category: 'news', 
      badge: 'Tin công ty', 
      badgeClass: 'bg-primary', 
      title: 'Khai trương tuyến mới Hà Nội - Sapa', 
      date: '28/11/2025', 
      desc: 'LobiBus chính thức khai trương tuyến xe Hà Nội - Sapa với chất lượng dịch vụ cao cấp, giường nằm hiện đại.', 
      img: 'images/routes/laocai.jpg',
      views: 892
    },
    { 
      id: 3,
      category: 'guide', 
      badge: 'Hướng dẫn', 
      badgeClass: 'bg-success', 
      title: 'Cách đặt vé xe online nhanh chóng', 
      date: '25/11/2025', 
      desc: 'Hướng dẫn chi tiết từng bước để đặt vé xe trực tuyến trên website và ứng dụng di động một cách dễ dàng.', 
      img: 'images/news/datve.png',
      views: 2156
    },
    { 
      id: 4,
      category: 'travel', 
      badge: 'Cẩm nang', 
      badgeClass: 'bg-warning text-dark', 
      title: 'Top 10 địa điểm du lịch đẹp nhất miền Trung', 
      date: '20/11/2025', 
      desc: 'Khám phá những điểm đến tuyệt vời tại miền Trung Việt Nam với cảnh đẹp thiên nhiên và văn hóa độc đáo.', 
      img: 'images/routes/hue.jpg',
      views: 3421
    },
    { 
      id: 5,
      category: 'promotion', 
      badge: 'Khuyến mãi', 
      badgeClass: 'bg-danger', 
      title: 'Ưu đãi sinh viên: Giảm 20% tất cả tuyến', 
      date: '15/11/2025', 
      desc: 'Chương trình ưu đãi đặc biệt dành cho sinh viên với giá vé giảm 20% khi xuất trình thẻ sinh viên.', 
      img: 'images/news/sinhvien.jpg',
      views: 1567
    },
    { 
      id: 6,
      category: 'news', 
      badge: 'Tin công ty', 
      badgeClass: 'bg-primary', 
      title: 'Ra mắt xe giường nằm cao cấp 5 sao', 
      date: '10/11/2025', 
      desc: 'LobiBus tự hào giới thiệu dòng xe giường nằm 5 sao với tiện nghi hiện đại, mang lại trải nghiệm tốt nhất.', 
      img: 'images/bus/limousine.jpg',
      views: 987
    },
    
    // Page 2
    { 
      id: 7,
      category: 'travel', 
      badge: 'Cẩm nang', 
      badgeClass: 'bg-warning text-dark', 
      title: 'Khám phá đảo Phú Quốc cuối tuần', 
      date: '05/11/2025', 
      desc: 'Gợi ý lịch trình du lịch Phú Quốc 3 ngày 2 đêm hoàn hảo cho chuyến đi cuối tuần.', 
      img: 'images/routes/kiengiang.jpg',
      views: 2341
    },
    { 
      id: 8,
      category: 'promotion', 
      badge: 'Khuyến mãi', 
      badgeClass: 'bg-danger', 
      title: 'Flash sale giảm 50% vé xe Sài Gòn - Đà Lạt', 
      date: '02/11/2025', 
      desc: 'Nhanh tay đặt vé trong 24h để nhận ưu đãi khủng giảm 50% cho tuyến Sài Gòn - Đà Lạt.', 
      img: 'images/news/sale.jpg',
      views: 4532
    },
    { 
      id: 9,
      category: 'guide', 
      badge: 'Hướng dẫn', 
      badgeClass: 'bg-success', 
      title: 'Quy trình đổi trả vé dễ dàng', 
      date: '30/10/2025', 
      desc: 'Hướng dẫn chi tiết các bước đổi trả vé xe khách trực tuyến nhanh chóng và tiện lợi.', 
      img: 'images/news/ticket.jpg',
      views: 1876
    },
    { 
      id: 10,
      category: 'news', 
      badge: 'Tin công ty', 
      badgeClass: 'bg-primary', 
      title: 'LobiBus đạt giải thưởng dịch vụ xuất sắc', 
      date: '28/10/2025', 
      desc: 'Vinh dự nhận giải thưởng "Dịch vụ vận tải hành khách xuất sắc nhất năm 2025".', 
      img: 'images/news/buscompany.png',
      views: 756
    },
    { 
      id: 11,
      category: 'travel', 
      badge: 'Cẩm nang', 
      badgeClass: 'bg-warning text-dark', 
      title: 'Những món ăn đặc sản miền Tây', 
      date: '25/10/2025', 
      desc: 'Điểm qua những món ăn đặc sản không thể bỏ qua khi du lịch miền Tây Nam Bộ.', 
      img: 'images/news/westsidefood.jpg',
      views: 2987
    },
    { 
      id: 12,
      category: 'promotion', 
      badge: 'Khuyến mãi', 
      badgeClass: 'bg-danger', 
      title: 'Tặng voucher 100k cho khách hàng mới', 
      date: '20/10/2025', 
      desc: 'Khách hàng đăng ký mới nhận ngay voucher 100.000đ cho chuyến đi đầu tiên.', 
      img: 'images/news/coupon.png',
      views: 3654
    },

    // Page 3
    { 
      id: 13,
      category: 'guide', 
      badge: 'Hướng dẫn', 
      badgeClass: 'bg-success', 
      title: 'Cách chọn ghế ngồi ưng ý', 
      date: '18/10/2025', 
      desc: 'Bí quyết chọn vị trí ghế ngồi tốt nhất trên xe khách để có chuyến đi thoải mái.', 
      img: 'images/news/seat.jpg',
      views: 1432
    },
    { 
      id: 14,
      category: 'news', 
      badge: 'Tin công ty', 
      badgeClass: 'bg-primary', 
      title: 'Khai trương bến xe mới tại Cần Thơ', 
      date: '15/10/2025', 
      desc: 'Chính thức đưa vào hoạt động bến xe hiện đại tại trung tâm thành phố Cần Thơ.', 
      img: 'images/news/news.jpg',
      views: 654
    },
    { 
      id: 15,
      category: 'travel', 
      badge: 'Cẩm nang', 
      badgeClass: 'bg-warning text-dark', 
      title: 'Lịch trình khám phá Đà Nẵng 2 ngày 1 đêm', 
      date: '12/10/2025', 
      desc: 'Gợi ý lịch trình du lịch Đà Nẵng ngắn ngày với chi phí tiết kiệm.', 
      img: 'images/routes/danang.jpg',
      views: 2876
    },
    { 
      id: 16,
      category: 'promotion', 
      badge: 'Khuyến mãi', 
      badgeClass: 'bg-danger', 
      title: 'Giảm 15% cho đoàn từ 10 người', 
      date: '08/10/2025', 
      desc: 'Ưu đãi đặc biệt dành cho các đoàn du lịch, công ty đặt vé từ 10 người trở lên.', 
      img: 'images/news/coupon.png',
      views: 1123
    },
    { 
      id: 17,
      category: 'guide', 
      badge: 'Hướng dẫn', 
      badgeClass: 'bg-success', 
      title: 'An toàn khi đi xe khách đường dài', 
      date: '05/10/2025', 
      desc: 'Những lưu ý quan trọng để đảm bảo an toàn cho chuyến đi đường dài bằng xe khách.', 
      img: 'images/bus/limousine.jpg',
      views: 1987
    },
    { 
      id: 18,
      category: 'news', 
      badge: 'Tin công ty', 
      badgeClass: 'bg-primary', 
      title: 'Ký kết hợp tác với các hãng xe uy tín', 
      date: '01/10/2025', 
      desc: 'Mở rộng mạng lưới đối tác với 50+ hãng xe uy tín trên toàn quốc.', 
      img: 'images/bus/giuong-nam.png',
      views: 543
    }
  ];

  // Lưu dữ liệu vào localStorage để trang detail có thể truy cập
  localStorage.setItem('newsData', JSON.stringify(allNews));

  // Filter news by category
  function getFilteredNews() {
    if (currentCategory === 'all') {
      return allNews;
    }
    return allNews.filter(item => item.category === currentCategory);
  }

  // Render news for current page
  function renderNews() {
    const filteredNews = getFilteredNews();
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newsToShow = filteredNews.slice(startIndex, endIndex);

    // Render news cards
    newsGrid.innerHTML = newsToShow.map(item => `
      <div class="col-12 col-md-6" data-category="${item.category}">
        <a href="news-detail.html?id=${item.id}" class="text-decoration-none">
          <article class="card h-100 shadow-sm news-item">
            <img src="${item.img}" class="card-img-top" alt="${item.badge}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <span class="badge ${item.badgeClass} mb-2">${item.badge}</span>
              <h5 class="card-title">${item.title}</h5>
              <p class="text-muted small mb-2">
                <i class="bi bi-calendar"></i> ${item.date}
              </p>
              <p class="card-text">${item.desc}</p>
              <span class="btn btn-outline-primary btn-sm">Xem chi tiết →</span>
            </div>
          </article>
        </a>
      </div>
    `).join('');

    // Update pagination
    renderPagination(totalPages);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render pagination
  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      paginationContainer.parentElement.style.display = 'none';
      return;
    }

    paginationContainer.parentElement.style.display = 'block';

    let paginationHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}" tabindex="-1">‹ Trước</a>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    paginationHTML += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">Sau ›</a>
      </li>
    `;

    paginationContainer.innerHTML = paginationHTML;

    // Add click events to pagination links
    paginationContainer.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        if (!this.parentElement.classList.contains('disabled')) {
          currentPage = parseInt(this.getAttribute('data-page'));
          renderNews();
        }
      });
    });
  }

  // Event Listeners for Category Links
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      categoryLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Get category and reset to page 1
      currentCategory = this.getAttribute('data-category');
      currentPage = 1;
      renderNews();
    });
  });

  // Listen for language changes
  document.addEventListener('languageChanged', (e) => {
    console.log('Language changed to:', e.detail.lang);
  });

  // Initial render
  renderNews();

})();
