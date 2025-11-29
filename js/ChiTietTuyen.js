// Dữ liệu mẫu các chuyến xe cho mỗi tuyến
const busSchedules = {
    'Hà Nội → Đà Nẵng': [
        {
            name: 'Xe Hà Nội Express 01',
            departure: '06:00',
            arrival: '20:00',
            price: '450,000',
            seats: 20,
            availableSeats: 20,
            amenities: ['WiFi', 'Điều hòa', 'Giường nằm', 'Nước uống', 'Khăn lạnh']
        }
    ],
    'TP.HCM → Đà Lạt': [
        {
            name: 'Limousine Đà Lạt 01',
            departure: '07:00',
            arrival: '14:00',
            price: '280,000',
            seats: 8,
            availableSeats: 8,
            amenities: ['WiFi', 'Điều hòa', 'Ghế massage', 'Nước uống', 'Khăn lạnh']
        }
    ],
    // Thêm dữ liệu mặc định cho các tuyến khác
    'default': [
        {
            name: 'Xe Standard 01',
            departure: '06:00',
            arrival: '12:00',
            price: '200,000',
            seats: 32,
            availableSeats: 32,
            amenities: ['WiFi', 'Điều hòa', 'Nước uống']
        }
    ]
};

// Lấy thông tin từ URL
function getRouteInfoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        route: urlParams.get('route') || '',
        type: urlParams.get('type') || '',
        distance: urlParams.get('distance') || '',
        duration: urlParams.get('duration') || ''
    };
}

// Lấy số chỗ ngồi dựa trên loại xe
function getSeatsByType(busType) {
    const type = busType.toLowerCase().trim();
    if (type.includes('giường nằm')) {
        return 20;
    } else if (type.includes('ghế ngồi')) {
        return 32;
    } else if (type.includes('limousine')) {
        return 8;
    }
    return 30; // Mặc định
}

// Random số ghế trống, đảm bảo > 5 và <= tổng số ghế
function randomAvailable(totalSeats) {
    const min = Math.min(6, totalSeats); // đề phòng tổng ghế < 6
    const max = totalSeats;
    if (max < min) return max; // fallback an toàn
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Lấy tên xe hiển thị theo loại xe
function getBusNameByType(busType) {
    const type = (busType || '').toLowerCase().trim();
    if (type.includes('giường nằm')) return 'Xe Giường Nằm 01';
    if (type.includes('limousine')) return 'Xe Limousine 01';
    if (type.includes('ghế ngồi')) return 'Xe Standard 01';
    return 'Xe Standard 01';
}

// Tính giá theo loại xe và quãng đường
function getRateByType(busType) {
    const type = (busType || '').toLowerCase();
    if (type.includes('giường nằm')) return 2500; // đ/km
    if (type.includes('limousine')) return 4000;  // đ/km
    if (type.includes('ghế ngồi') || type.includes('standard')) return 1500; // đ/km
    return 1500;
}

function parseDistanceKm(distanceText) {
    if (!distanceText) return 0;
    // Lấy số km từ chuỗi như "1,200 km" hoặc "765 km"
    const digits = distanceText.replace(/[^0-9]/g, '');
    return digits ? parseInt(digits, 10) : 0;
}

function formatVND(amount) {
    try {
        return Number(amount).toLocaleString('vi-VN');
    } catch (e) {
        // Fallback đơn giản nếu môi trường không hỗ trợ locale
        return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// Hiển thị thông tin tuyến
function displayRouteInfo(routeInfo) {
    document.getElementById('routeName').textContent = routeInfo.route;
    document.getElementById('busType').textContent = routeInfo.type;
    document.getElementById('distance').textContent = routeInfo.distance;
    document.getElementById('duration').textContent = routeInfo.duration;
}

// Tạo card cho mỗi chuyến xe
function createBusCard(bus, routeInfo) {
    return `
        <div class="bus-card">
            <div class="bus-header">
                <div class="bus-name">${bus.name}</div>
                <div class="bus-price">${bus.price} ₫</div>
            </div>
            
            <div class="bus-details">
                <div class="bus-detail-item">
                    <span class="bus-detail-label">Ngày khởi hành</span>
                    <span class="bus-detail-value">${bus.dateText}</span>
                </div>
                <div class="bus-detail-item">
                    <span class="bus-detail-label">Giờ xuất bến</span>
                    <span class="bus-detail-value">${bus.departure}</span>
                </div>
                <div class="bus-detail-item">
                    <span class="bus-detail-label">Giờ đến dự kiến</span>
                    <span class="bus-detail-value">${bus.arrival}</span>
                </div>
                <div class="bus-detail-item">
                    <span class="bus-detail-label">Số ghế trống</span>
                    <span class="bus-detail-value">${bus.availableSeats}/${bus.seats} ghế</span>
                </div>
            </div>
            
            <div class="bus-amenities">
                ${bus.amenities.map(amenity => `<span class="amenity-badge">${amenity}</span>`).join('')}
            </div>
            
            <div class="bus-actions">
                <button class="btn btn-book" onclick="bookTicket('${routeInfo.route}', '${bus.name}', '${bus.departure}', '${bus.price}', '${bus.dateISO}')">
                    Đặt vé ngay
                </button>
            </div>
        </div>
    `;
}

// Biến toàn cục để lưu danh sách xe
let allBuses = [];
let currentRouteInfo = null;

// Hiển thị danh sách xe
function displayBusList(routeInfo, filterDate = null) {
    const busListContainer = document.getElementById('busList');
    
    // Lấy dữ liệu xe cho tuyến này hoặc dùng dữ liệu mặc định
    let buses = busSchedules[routeInfo.route] || busSchedules['default'];
    
    // Cập nhật số chỗ ngồi cho tất cả xe dựa trên loại xe từ tuyến
    const totalSeats = getSeatsByType(routeInfo.type);
    // Tính giá theo km và loại xe
    const km = parseDistanceKm(routeInfo.distance);
    const rate = getRateByType(routeInfo.type);
    const pricePerTrip = formatVND(km * rate);
    const template = buses && buses.length > 0 ? buses[0] : {
        name: 'Xe Tuyến',
        departure: '08:00',
        arrival: '12:00',
        price: '200,000',
        seats: totalSeats,
        availableSeats: Math.min(10, totalSeats),
        amenities: ['WiFi', 'Điều hòa', 'Nước uống']
    };

    // Tạo danh sách ngày 01-30/12/2025
    const days = Array.from({ length: 30 }, (_, i) => i + 1); // 1..30
    allBuses = days.map(day => {
        const dd = String(day).padStart(2, '0');
        const dateISO = `2025-12-${dd}`;
        const dateText = `${dd}/12/2025`;
        return {
            ...template,
            // Đổi tên xe để dễ phân biệt theo ngày (tùy chọn)
            name: getBusNameByType(routeInfo.type),
            seats: totalSeats,
            price: pricePerTrip,
            availableSeats: randomAvailable(totalSeats),
            dateISO,
            dateText
        };
    });
    
    // Lọc theo ngày nếu có
    let displayBuses = allBuses;
    if (filterDate) {
        displayBuses = allBuses.filter(bus => bus.dateISO === filterDate);
    }
    
    if (displayBuses && displayBuses.length > 0) {
        busListContainer.innerHTML = displayBuses.map(bus => createBusCard(bus, routeInfo)).join('');
    } else {
        busListContainer.innerHTML = `
            <div class="empty-message">
                <div style="font-size: 3rem;">😔</div>
                <h4>Không tìm thấy chuyến xe phù hợp</h4>
                <p>Không có chuyến xe nào vào ngày ${filterDate ? new Date(filterDate).toLocaleDateString('vi-VN') : 'này'}. Vui lòng chọn ngày khác.</p>
            </div>
        `;
    }
}

// Xử lý đặt vé
function bookTicket(route, busName, departure, price, dateISO) {
    // Chuyển sang trang đặt vé với thông tin chi tiết (mã hóa an toàn)
    const params = new URLSearchParams({
        route: route,
        bus: busName,
        departure: departure,
        price: String(price),
        date: dateISO
    });
    window.location.href = `DatVe.html?${params.toString()}`;
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    const routeInfo = getRouteInfoFromURL();
    
    if (!routeInfo.route) {
        // Nếu không có thông tin tuyến, quay về trang lịch trình
        window.location.href = 'LichTrinh.html';
        return;
    }
    
    currentRouteInfo = routeInfo;
    displayRouteInfo(routeInfo);
    displayBusList(routeInfo);
    
    // Xử lý sự kiện chọn ngày
    const btnFilterDate = document.getElementById('btnFilterDate');
    const btnClearDate = document.getElementById('btnClearDate');
    const dateFilter = document.getElementById('dateFilter');
    
    if (btnFilterDate) {
        btnFilterDate.addEventListener('click', function() {
            const selectedDate = dateFilter.value;
            if (selectedDate) {
                displayBusList(currentRouteInfo, selectedDate);
            }
        });
    }
    
    if (btnClearDate) {
        btnClearDate.addEventListener('click', function() {
            dateFilter.value = '';
            displayBusList(currentRouteInfo);
        });
    }
    
    // Cho phép enter để tìm
    if (dateFilter) {
        dateFilter.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                btnFilterDate.click();
            }
        });
    }
});
