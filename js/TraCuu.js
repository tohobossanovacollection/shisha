// TraCuu.js - Hiển thị thông tin đặt vé từ localStorage

document.addEventListener('DOMContentLoaded', function() {
  const lookupResult = document.getElementById('lookupResult');
  
  // DỮ LIỆU MẪU - Xóa dòng này khi đã tích hợp thật
  localStorage.setItem('bookingData', JSON.stringify({
    bookingCode: 'LB2025120301',
    fullName: 'Nguyễn Văn An',
    passengers: 3,
    seats: 'A1, A2, A3',
    departureTime: '08:30',
    departureDate: '15/12/2025',
    from: 'Hà Nội',
    to: 'TP. Hồ Chí Minh',
    plateNumber: '29B-12345',
    gate: '05',
    tripStatus: 'Đúng giờ'
  }));
  
  // Lấy thông tin đặt vé từ localStorage
  const bookingData = localStorage.getItem('bookingData');
  
  if (bookingData) {
    const booking = JSON.parse(bookingData);
    
    // Tạo badge tình trạng chuyến
    let statusBadge = '';
    if (booking.tripStatus === 'Đúng giờ') {
      statusBadge = '<span class="badge bg-success">Đúng giờ</span>';
    } else if (booking.tripStatus && booking.tripStatus.includes('Muộn')) {
      statusBadge = `<span class="badge bg-warning text-dark">${booking.tripStatus}</span>`;
    } else {
      statusBadge = '<span class="badge bg-secondary">Chưa xác định</span>';
    }
    
    // Hiển thị thông tin
    lookupResult.innerHTML = `
      <div class="ticket-result border rounded-3 p-3" style="background: white;">
        <div class="d-flex align-items-center mb-3 pb-2 border-bottom">
          <img src="images/logo.svg" alt="LobiBus" style="width: 40px; height: 40px;">
          <h5 class="ms-2 mb-0">LobiBus</h5>
          <div class="ms-auto text-end">
            <small class="text-muted d-block" style="font-size: 0.7rem;">MÃ ĐẶT VÉ / BOOKING CODE</small>
            <strong style="font-size: 1.1rem;">${booking.bookingCode || '-'}</strong>
          </div>
        </div>
        
        <div class="row g-3 mb-2">
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">HỌ TÊN / NAME</small>
            <strong style="font-size: 0.95rem;">${booking.fullName || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">NGÀY / DATE</small>
            <strong style="font-size: 0.95rem;">${booking.departureDate || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">GIỜ KHỞI HÀNH / TIME</small>
            <strong style="font-size: 0.95rem;">${booking.departureTime || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">CỬA / GATE</small>
            <strong style="font-size: 0.95rem;">${booking.gate || '-'}</strong>
          </div>
        </div>
        
        <div class="row g-3 mb-2 pb-3 border-bottom">
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">NƠI ĐI / FROM</small>
            <strong style="font-size: 0.95rem;">${booking.from || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">NƠI ĐẾN / TO</small>
            <strong style="font-size: 0.95rem;">${booking.to || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">BIỂN SỐ XE / BUS NO</small>
            <strong style="font-size: 0.95rem;">${booking.plateNumber || '-'}</strong>
          </div>
          <div class="col-3 text-end">
            <img src="images/Micro_QR_Example.svg" alt="QR Code" style="width: 80px; height: 80px;">
            <div class="text-muted mt-1" style="font-size: 0.65rem;">SCAN QR CODE</div>
          </div>
        </div>
        
        <div class="row g-3 align-items-center mb-3">
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">SỐ KHÁCH</small>
            <strong style="font-size: 0.95rem;">${booking.passengers || '-'} người</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">SỐ GHẾ / SEAT</small>
            <strong style="font-size: 0.95rem;">${booking.seats || '-'}</strong>
          </div>
          <div class="col-3">
            <small class="text-muted d-block mb-1" style="font-size: 0.7rem;">TÌNH TRẠNG</small>
            ${statusBadge}
          </div>
          <div class="col-3 text-center">
            <button class="btn btn-success btn-sm px-3 mb-2 w-100" onclick="window.print()">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="me-1" viewBox="0 0 16 16">
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
              </svg>
              In vé
            </button>
            <button class="btn btn-outline-danger btn-sm px-3 w-100" data-bs-toggle="modal" data-bs-target="#cancelModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="me-1" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              Hủy vé
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Hủy Vé -->
      <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="cancelModalLabel">Xác nhận hủy vé</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#dc3545" class="mb-3" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              <h5 class="mb-3">Bạn có chắc muốn hủy vé này?</h5>
              <p class="text-muted mb-0">Mã đặt vé: <strong>${booking.bookingCode}</strong></p>
              <p class="text-muted">Hành động này không thể hoàn tác.</p>
            </div>
            <div class="modal-footer border-0 justify-content-center">
              <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Không</button>
              <button type="button" class="btn btn-danger px-4" onclick="handleCancelTicket()">Có, hủy vé</button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Không có dữ liệu đặt vé
    lookupResult.innerHTML = `
      <div class="alert alert-warning text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle mb-3" viewBox="0 0 16 16">
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
        <h5>Không tìm thấy thông tin đặt vé</h5>
        <p class="mb-3">Bạn chưa có vé nào được đặt trong phiên làm việc này.</p>
        <a href="index.html" class="btn btn-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-1" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          Đặt vé ngay
        </a>
      </div>
    `;
  }
});

// Hàm xử lý hủy vé
function handleCancelTicket() {
  // Xóa dữ liệu vé khỏi localStorage
  localStorage.removeItem('bookingData');
  
  // Đóng modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
  modal.hide();
  
  // Hiển thị thông báo thành công
  setTimeout(() => {
    document.getElementById('lookupResult').innerHTML = `
      <div class="alert alert-success text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="mb-3" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.97 10.03a.75.75 0 0 0 1.08.022l3.992-4.99a.75.75 0 0 0-1.071-1.05L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06l2.646 2.647z"/>
        </svg>
        <h5>Đã hủy vé thành công!</h5>
        <p class="mb-3">Vé của bạn đã được hủy. Chúng tôi sẽ xử lý hoàn tiền trong vòng 3-5 ngày làm việc.</p>
        <a href="index.html" class="btn btn-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-1" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          Đặt vé mới
        </a>
      </div>
    `;
  }, 300);
}
