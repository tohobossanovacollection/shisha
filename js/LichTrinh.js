// Hàm chuẩn hóa tên địa điểm để so sánh
function normalizeName(name) {
    if (!name) return '';
    
    return name.trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .replace(/đ/g, 'd')
        .replace(/tp\.hcm/gi, 'tphcm')
        .replace(/tp\s*hcm/gi, 'tphcm')
        .replace(/tp\s*ho\s*chi\s*minh/gi, 'tphcm')
        .replace(/thanh\s*pho\s*ho\s*chi\s*minh/gi, 'tphcm')
        .replace(/\s+/g, '');
}

// Hàm lọc chuyến đi
function filterTrips() {
    const fromInput = document.getElementById('from').value.trim();
    const toInput = document.getElementById('to').value.trim();
    
    const fromValue = normalizeName(fromInput);
    const toValue = normalizeName(toInput);
    
    const tripItems = document.querySelectorAll('.trip-item');
    let foundCount = 0;
    
    // ẨN TẤT CẢ CHUYẾN ĐI TRƯỚC
    tripItems.forEach(item => {
        item.style.display = 'none';
        item.style.visibility = 'hidden';
        item.classList.add('hidden');
    });
    
    // CHỈ HIỆN CHUYẾN ĐI KHỚP
    tripItems.forEach(item => {
        const routeText = item.querySelector('.trip-route').textContent;
        const parts = routeText.split('→');
        
        if (parts.length === 2) {
            const fromRoute = normalizeName(parts[0]);
            const toRoute = normalizeName(parts[1]);
            
            if (!fromValue && !toValue) {
                item.style.display = 'flex';
                item.style.visibility = 'visible';
                item.classList.remove('hidden');
                foundCount++;
                return;
            }
            
            // Kiểm tra điều kiện khớp
            const matchesFrom = !fromValue || fromRoute.includes(fromValue) || fromValue.includes(fromRoute);
            const matchesTo = !toValue || toRoute.includes(toValue) || toValue.includes(toRoute);
            
            if (matchesFrom && matchesTo) {
                item.style.display = 'flex';
                item.style.visibility = 'visible';
                item.classList.remove('hidden');
                foundCount++;
                console.log('✓ Hiển thị:', routeText);
            } else {
                console.log('✗ Ẩn:', routeText);
            }
        }
    });
    
    // Hiển thị kết quả
    console.log('================');
    console.log('Tìm kiếm:', fromInput || '(tất cả)', '→', toInput || '(tất cả)');
    console.log('Tìm thấy:', foundCount, 'chuyến đi');
    console.log('================');
}

// Xử lý khi click vào nút "Đặt vé"
function handleBookTicket(event) {
    const button = event.target;
    const tripItem = button.closest('.trip-item');
    
    if (tripItem) {
        const route = tripItem.querySelector('.trip-route').textContent.trim();
        const type = tripItem.querySelector('.trip-type').textContent.trim();
        const distance = tripItem.querySelector('.trip-distance').textContent.trim();
        const duration = tripItem.querySelector('.trip-duration').textContent.trim();
        
        // Chuyển sang trang chi tiết với thông tin tuyến
        const params = new URLSearchParams({
            route: route,
            type: type,
            distance: distance,
            duration: duration
        });
        
        window.location.href = `ChiTietTuyen.html?${params.toString()}`;
    }
}

// Xử lý sự kiện khi submit form
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    // Chỉ lọc khi submit form (bấm nút Tìm kiếm)
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted - Bắt đầu tìm kiếm...');
            filterTrips();
        });
    }
    
    // Hiển thị tất cả chuyến đi khi tải trang
    const tripItems = document.querySelectorAll('.trip-item');
    tripItems.forEach(item => {
        item.style.display = 'flex';
    });
    console.log('Đã tải', tripItems.length, 'chuyến đi');
    
    // Gắn sự kiện cho tất cả nút "Đặt vé"
    const bookButtons = document.querySelectorAll('.trip-action .btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', handleBookTicket);
    });
    console.log('Đã gắn sự kiện cho', bookButtons.length, 'nút đặt vé');
});