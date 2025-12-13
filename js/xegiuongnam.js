// Xử lý trang xe giường nằm - Chọn ghế
let bookingData = {
    route: '',
    bus: '',
    departure: '',
    price: 0,
    date: '',
    requiredQty: 1,
    selectedSeats: []
};

// Dữ liệu ghế (20 ghế, từ A01-A10, B01-B10)
// Tầng 1: 10 giường (A01-A10) - 2 cột, 5 hàng
// Tầng 2: 10 giường (B01-B10) - 2 cột, 5 hàng
let seatData = [];
let currentFloor = 'floor1';

document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const rawPrice = urlParams.get('price');
    const normalizedPrice = rawPrice ? parseInt(String(rawPrice).replace(/[^0-9]/g, '')) : 0;
    bookingData = {
        route: urlParams.get('route') || '',
        bus: urlParams.get('bus') || '',
        departure: urlParams.get('departure') || '',
        price: normalizedPrice || 0,
        date: urlParams.get('date') || '',
        requiredQty: parseInt(urlParams.get('qty')) || 1,
        selectedSeats: []
    };

    // Khởi tạo dữ liệu ghế (20 ghế)
    initializeSeats();
    
    // Hiển thị thông tin chuyến xe
    displayBookingInfo();
    
    // Vẽ sơ đồ ghế
    renderSeatMap();
    
    // Cập nhật tổng tiền
    updateTotalPrice();

    // Xử lý nút Hủy
    document.querySelector('.btn-cancel')?.addEventListener('click', function() {
        window.location.href = 'ChiTietTuyen.html';
    });

    // Xử lý nút Thanh toán
    document.querySelector('.btn-pay')?.addEventListener('click', function() {
        // Kiểm tra đã chọn đủ ghế
        if (bookingData.selectedSeats.length !== bookingData.requiredQty) {
            showNotificationModal(`Xin hãy chọn đủ ${bookingData.requiredQty} chỗ!`);
            return;
        }

        // Kiểm tra thông tin khách hàng
        const customerName = document.getElementById('customerName')?.value.trim();
        const customerPhone = document.getElementById('customerPhone')?.value.trim();
        const customerEmail = document.getElementById('customerEmail')?.value.trim();

        if (!customerName || !customerPhone || !customerEmail) {
            showNotificationModal('Xin hãy điền đầy đủ thông tin!');
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            showNotificationModal('Vui lòng nhập email hợp lệ!');
            return;
        }

        // Kiểm tra số điện thoại
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(customerPhone)) {
            showNotificationModal('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)!');
            return;
        }

        showThankYouModal();
    });
});

function initializeSeats() {
    seatData = [];
    
    // Tầng 1: A01-A10
    const floors = [
        { prefix: 'A', count: 10, floorId: 'floor1' },
        { prefix: 'B', count: 10, floorId: 'floor2' }
    ];
    
    floors.forEach(floor => {
        for (let i = 1; i <= floor.count; i++) {
            const seatCode = floor.prefix + String(i).padStart(2, '0');
            seatData.push({
                code: seatCode,
                floorId: floor.floorId,
                occupied: false,
                selected: false
            });
        }
    });
    
    // Ngẫu nhiên một số ghế bị chiếm (20% ghế)
    const occupiedCount = Math.floor(seatData.length * 0.2);
    for (let i = 0; i < occupiedCount; i++) {
        const randomIdx = Math.floor(Math.random() * seatData.length);
        seatData[randomIdx].occupied = true;
    }
}

function switchFloor(floorId) {
    currentFloor = floorId;
    
    // Cập nhật nút active
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Vẽ lại sơ đồ ghế
    renderSeatMap();
}

function renderSeatMap() {
    const container = document.getElementById('seat-map-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Lọc ghế của tầng hiện tại
    const floorSeats = seatData.filter(seat => seat.floorId === currentFloor);
    
    // Chia thành 2 cột, mỗi cột 5 ghế
    const seatsPerColumn = 5;
    const columns = [[], []];
    
    floorSeats.forEach((seat, idx) => {
        const columnIdx = idx % 2;
        columns[columnIdx].push(seat);
    });
    
    // Vẽ 2 cột
    columns.forEach((columnSeats) => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'seat-column';
        
        columnSeats.forEach((seat) => {
            const seatBtn = document.createElement('button');
            seatBtn.className = 'seat';
            seatBtn.textContent = seat.code;
            seatBtn.dataset.code = seat.code;
            
            if (seat.occupied) {
                seatBtn.classList.add('occupied');
                seatBtn.disabled = true;
            } else if (seat.selected) {
                seatBtn.classList.add('selected');
            }
            
            seatBtn.addEventListener('click', () => toggleSeat(seatBtn, seat));
            columnDiv.appendChild(seatBtn);
        });
        
        container.appendChild(columnDiv);
    });
}

function toggleSeat(seatBtn, seat) {
    if (seat.occupied) return; // Không thể chọn ghế bị chiếm
    
    const seatCode = seat.code;
    
    if (seat.selected) {
        // Deselect
        seat.selected = false;
        seatBtn.classList.remove('selected');
        bookingData.selectedSeats = bookingData.selectedSeats.filter(s => s !== seatCode);
    } else {
        // Check nếu đã đủ số ghế
        if (bookingData.selectedSeats.length >= bookingData.requiredQty) {
            alert(`Bạn chỉ có thể chọn ${bookingData.requiredQty} ghế. Vui lòng bỏ chọn ghế khác trước.`);
            return;
        }
        
        // Select
        seat.selected = true;
        seatBtn.classList.add('selected');
        bookingData.selectedSeats.push(seatCode);
    }
    
    updateSelectedSeatsDisplay();
    updateTotalPrice();
    updateContinueButton();
}

function updateSelectedSeatsDisplay() {
    const selectedList = document.getElementById('selected-seats-list');
    const quantityDisplay = document.getElementById('quantity-display');
    
    if (!selectedList) return;
    
    if (bookingData.selectedSeats.length === 0) {
        selectedList.innerHTML = '';
        const label = document.querySelector('.seat-list-label');
        if (label) label.textContent = 'Chưa chọn ghế';
    } else {
        // Hiển thị trực tiếp danh sách ghế trong label để tránh lặp
        const label = document.querySelector('.seat-list-label');
        if (label) label.textContent = bookingData.selectedSeats.sort().join(', ');
        // Xóa phần danh sách chi tiết để không bị lặp lại
        selectedList.innerHTML = '';
    }
    
    if (quantityDisplay) {
        quantityDisplay.textContent = `${bookingData.selectedSeats.length}/${bookingData.requiredQty} ghế`;
    }
}

function updateTotalPrice() {
    const pricePerSeat = bookingData.price || 0;
    // Tổng tiền là số cố định dựa trên số ghế đã chọn ở trang trước
    const totalPrice = pricePerSeat * (bookingData.requiredQty || 0);
    const totalPriceDisplay = document.getElementById('total-price');
    
    if (totalPriceDisplay) {
        totalPriceDisplay.textContent = totalPrice.toLocaleString('vi-VN') + ' ₫';
    }
}

function updateContinueButton() {
    const btn = document.getElementById('btn-continue');
    if (!btn) return;
    
    const isComplete = bookingData.selectedSeats.length === bookingData.requiredQty;
    btn.disabled = !isComplete;
}

function displayBookingInfo() {
    const routeDisplay = document.getElementById('route-display');
    const departureDisplay = document.getElementById('departure-display');
    const dateDisplay = document.getElementById('date-display');
    
    if (routeDisplay) routeDisplay.textContent = bookingData.route || '-';
    if (departureDisplay) departureDisplay.textContent = bookingData.departure || '-';
    if (dateDisplay) dateDisplay.textContent = formatDate(bookingData.date) || '-';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    // Giả sử dateStr là ISO format (YYYY-MM-DD)
    try {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch {
        return dateStr;
    }
}

function continueBooking() {
    if (bookingData.selectedSeats.length !== bookingData.requiredQty) {
        alert('Vui lòng chọn đầy đủ ghế!');
        return;
    }
    
    // Chuyển sang trang thanh toán với thông tin ghế đã chọn
    const params = new URLSearchParams({
        route: bookingData.route,
        bus: bookingData.bus,
        departure: bookingData.departure,
        price: bookingData.price,
        date: bookingData.date,
        seats: bookingData.selectedSeats.join(','),
        qty: bookingData.selectedSeats.length
    });
    
    // Chuyển sang trang đặt vé/thanh toán
    window.location.href = `DatVe.html?${params.toString()}`;
}

// Hiển thị modal thông báo
function showNotificationModal(message) {
    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Tạo modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 2.5rem 3rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        max-width: 400px;
    `;

    modal.innerHTML = `
        <div style="font-size: 2.5rem; color: #e74c3c; margin-bottom: 1rem;">⚠</div>
        <p style="color: #333; font-size: 1.1rem; margin: 0;">${message}</p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Đóng modal khi click vào overlay
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    // Tự động đóng sau 3 giây
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    }, 3000);
}

// Hiển thị modal cảm ơn
function showThankYouModal() {
    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Tạo modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 3rem 4rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="font-size: 3rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
        <h2 style="font-size: 1.5rem; color: #1a1a1a; margin-bottom: 0.5rem;">Cảm ơn quý khách!</h2>
        <p style="color: #666; font-size: 1rem;">Chúc quý khách có chuyến đi vừa ý</p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Chuyển về trang index sau 2 giây
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}
