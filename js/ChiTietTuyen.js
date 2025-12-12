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

// Chuẩn hóa text (bỏ dấu, khoảng trắng, chuẩn TP.HCM -> tphcm)
function normalizeText(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/tp\.?\s*hcm|tp\.?\s*ho\s*chi\s*minh|thanh\s*pho\s*ho\s*chi\s*minh/gi, 'tphcm')
        .replace(/\s+/g, ' ')
        .trim();
}

// Tạo slug từ tuyến: "Hà Nội → Đà Nẵng" -> "danang" (chỉ lấy điểm đến)
function makeRouteSlug(route) {
    if (!route) return '';
    const parts = String(route).split('→');
    if (parts.length < 2) return normalizeText(route).replace(/\s+/g, '-');
    const to = normalizeText(parts[1]).replace(/\s+/g, '');
    return to;
}

// Đặt ảnh minh họa theo tuyến, thử theo thứ tự jpg -> png -> webp, fallback mặc định
function setRouteThumb(route) {
    const img = document.getElementById('routeThumbImg') || document.querySelector('.route-thumb img');
    if (!img) return;
    const slug = makeRouteSlug(route);
    const fallback = 'images/Screenshot (5).png';
    const candidates = slug ? [
        `images/routes/${slug}.jpg`,
        `images/routes/${slug}.png`,
        `images/routes/${slug}.webp`
    ] : [];

    let idx = 0;
    const tryNext = () => {
        if (idx < candidates.length) {
            img.onerror = tryNext;
            img.src = candidates[idx++];
        } else {
            img.onerror = null;
            img.src = fallback;
        }
    };
    tryNext();
    img.alt = `Ảnh minh họa tuyến ${route || ''}`.trim();
}

// Lấy thông tin từ URL
function getRouteInfoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from') || '';
    const to = urlParams.get('to') || '';
    const seatsRequested = parseInt(urlParams.get('seats') || '1', 10) || 1;
    return {
        route: urlParams.get('route') || '',
        type: urlParams.get('type') || '',
        distance: urlParams.get('distance') || '',
        duration: urlParams.get('duration') || '',
        departDate: urlParams.get('departDate') || '',
        returnDate: urlParams.get('returnDate') || '',
        tripType: urlParams.get('tripType') || 'oneway',
        from,
        to,
        seatsRequested
    };
}

function normalizeRouteInfo(raw) {
    const info = { ...raw };
    // Rebuild route string from from/to if missing
    if (!info.route && info.from && info.to) info.route = `${info.from} → ${info.to}`;
    if (!info.route) info.route = 'Tuyến xe';
    // Smart defaults when metadata missing (direct booking without LichTrinh)
    if (!info.distance || parseDistanceKm(info.distance) === 0) {
        info.distance = '350 km';
    }
    if (!info.duration || parseDurationToMinutes(info.duration) === 0) {
        info.duration = '8 giờ';
    }
    // Type không cần set - mỗi tuyến sẽ có đa dạng loại xe được tạo tự động
    return info;
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

// ===== Randomization & time helpers =====
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max) { return Math.random() * (max - min) + min; }

function parseDurationToMinutes(text) {
    if (!text) return 0;
    const hoursMatch = text.match(/(\d+)\s*gi(?:o|ờ)/i);
    const minsMatch = text.match(/(\d+)\s*(?:ph|phut|phút)/i);
    const h = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const m = minsMatch ? parseInt(minsMatch[1], 10) : 0;
    return h * 60 + m;
}

function minutesToHHMM(total) {
    total = ((total % (24 * 60)) + (24 * 60)) % (24 * 60);
    const hh = String(Math.floor(total / 60)).padStart(2, '0');
    const mm = String(total % 60).padStart(2, '0');
    return `${hh}:${mm}`;
}

function formatMinutesVi(total) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    const hText = h > 0 ? `${h} giờ` : '';
    const mText = m > 0 ? `${m} phút` : (h > 0 ? '' : '0 phút');
    return `${hText}${hText && mText ? ' ' : ''}${mText}`.trim();
}

function addMinutesToTimeStr(timeStr, delta) {
    const m = String(timeStr || '').match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return timeStr || '00:00';
    const base = parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    return minutesToHHMM(base + delta);
}

function randomDepartureTime() {
    // From 05:00 (300) to 21:00 (1260)
    return minutesToHHMM(randInt(300, 1260));
}

function getRandomBusNameByType(busType) {
    const type = (busType || '').toLowerCase();
    const namesSleeper = ['Xe Giường Nằm 01', 'Giường Nằm VIP', 'Sleeper Plus', 'Nightliner'];
    const namesLimo = ['Xe Limousine 01', 'Limousine VIP', 'Sky Limo', 'Comfort Limo'];
    const namesSeat = ['Xe Standard 01', 'Express 32', 'CityLine', 'Comfort Seat'];
    if (type.includes('limousine')) return namesLimo[randInt(0, namesLimo.length - 1)];
    if (type.includes('giường nằm')) return namesSleeper[randInt(0, namesSleeper.length - 1)];
    return namesSeat[randInt(0, namesSeat.length - 1)];
}

function getRandomAmenitiesByType(busType) {
    const common = ['WiFi', 'Điều hòa', 'Nước uống', 'Khăn lạnh', 'Cổng sạc', 'TV'];
    const sleeper = ['Chăn gối', 'Giường nằm', 'Màn che riêng tư'];
    const limo = ['Ghế massage', 'Rộng rãi', 'Cửa USB'];
    const type = (busType || '').toLowerCase();
    let pool = [...common];
    if (type.includes('giường nằm')) pool = pool.concat(sleeper);
    if (type.includes('limousine')) pool = pool.concat(limo);
    const count = randInt(3, Math.min(6, pool.length));
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return Array.from(new Set(shuffled.slice(0, count)));
}

// Seeded variants
function pickNameByType(busType, rng) {
    const type = (busType || '').toLowerCase();
    const namesSleeper = ['Xe Giường Nằm 01', 'Giường Nằm VIP', 'Sleeper Plus', 'Nightliner'];
    const namesLimo = ['Xe Limousine 01', 'Limousine VIP', 'Sky Limo', 'Comfort Limo'];
    const namesSeat = ['Xe Standard 01', 'Express 32', 'CityLine', 'Comfort Seat'];
    if (type.includes('limousine')) return namesLimo[rng.int(0, namesLimo.length - 1)];
    if (type.includes('giường nằm')) return namesSleeper[rng.int(0, namesSleeper.length - 1)];
    return namesSeat[rng.int(0, namesSeat.length - 1)];
}

function pickAmenitiesByType(busType, rng) {
    const common = ['WiFi', 'Điều hòa', 'Nước uống', 'Khăn lạnh', 'Cổng sạc', 'TV'];
    const sleeper = ['Chăn gối', 'Giường nằm', 'Màn che riêng tư'];
    const limo = ['Ghế massage', 'Rộng rãi', 'Cửa USB'];
    const type = (busType || '').toLowerCase();
    let pool = [...common];
    if (type.includes('giường nằm')) pool = pool.concat(sleeper);
    if (type.includes('limousine')) pool = pool.concat(limo);
    const count = Math.min(6, Math.max(3, rng.int(3, Math.min(6, pool.length))));
    // simple seeded shuffle by swapping
    for (let i = pool.length - 1; i > 0; i--) {
        const j = rng.int(0, i);
        const tmp = pool[i];
        pool[i] = pool[j];
        pool[j] = tmp;
    }
    const picked = pool.slice(0, count);
    return Array.from(new Set(picked));
}

function getRandomPriceNearby(baseNumber) {
    // keep variation under 30% -> use ±25% to be safe
    const factor = randFloat(0.85, 1.25);
    return Math.max(0, Math.round(baseNumber * factor));
}

// ===== Seeded RNG to keep lists stable =====
function createSeededRng(seedStr) {
    let h = 2166136261 >>> 0; // FNV-1a
    for (let i = 0; i < seedStr.length; i++) {
        h ^= seedStr.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    let state = h >>> 0;
    const next = () => {
        // xorshift* style
        state += 0x6D2B79F5;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return {
        int(min, max) { return Math.floor(next() * (max - min + 1)) + min; },
        float(min, max) { return next() * (max - min) + min; }
    };
}

function getStableSeedForRouteMonth(routeInfo) {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    // Chuẩn hóa route để đảm bảo cùng tuyến luôn cho cùng danh sách
    const normalizedRoute = normalizeText(routeInfo.route);
    const normalizedDist = normalizeText(routeInfo.distance);
    const normalizedDur = normalizeText(routeInfo.duration);
    return `${normalizedRoute}|${normalizedDist}|${normalizedDur}|${monthKey}`;
}

// Hiển thị thông tin tuyến
function displayRouteInfo(routeInfo) {
    document.getElementById('routeName').textContent = routeInfo.route;
    document.getElementById('distance').textContent = routeInfo.distance || 'Đang cập nhật';
    document.getElementById('duration').textContent = routeInfo.duration || 'Đang cập nhật';
}

// Tạo card cho mỗi chuyến xe
function createBusCard(bus, routeInfo) {
    // Compute travel duration between departure and arrival for display
    const depMatch = String(bus.departure || '').match(/^(\d{1,2}):(\d{2})$/);
    const arrMatch = String(bus.arrival || '').match(/^(\d{1,2}):(\d{2})$/);
    let travelMinutes = 0;
    if (depMatch && arrMatch) {
        const depMin = parseInt(depMatch[1], 10) * 60 + parseInt(depMatch[2], 10);
        const arrMin = parseInt(arrMatch[1], 10) * 60 + parseInt(arrMatch[2], 10);
        // handle overnight arrival
        travelMinutes = ((arrMin - depMin) + 24 * 60) % (24 * 60);
    } else {
        travelMinutes = parseDurationToMinutes(routeInfo.duration);
    }
    const travelText = formatMinutesVi(travelMinutes);
    const imgTag = getBusTypeImageTag(bus.type);
    return `
        <div class="bus-card">
            <div class="bus-header">
                <div class="bus-name">
                    <span class="bus-thumb-wrap">${imgTag}</span>
                    <span class="bus-name-text">${bus.name}</span>
                    <span class="bus-rating-inline">★ ${Number(bus.rating || 0).toFixed(1)}/5</span>
                </div>
                <div class="bus-price-rating">
                    <div class="bus-price">${bus.price} ₫</div>
                    <div class="seat-badge" title="Số ghế trống">${bus.availableSeats}/${bus.seats} ghế</div>
                </div>
            </div>
            
            <div class="bus-details">
                <div class="bus-detail-item">
                    <span class="bus-detail-label">Ngày khởi hành</span>
                    <span class="bus-detail-value">${bus.dateText}</span>
                </div>
                <div class="bus-detail-item journey">
                    <span class="bus-detail-label">Hành trình</span>
                    <span class="bus-detail-value journey-line">
                        <span class="journey-node time">${bus.departure}</span>
                        <span class="journey-arrow" aria-hidden="true"></span>
                        <span class="duration-pill">${travelText}</span>
                        <span class="journey-arrow" aria-hidden="true"></span>
                        <span class="journey-node time">${bus.arrival}</span>
                    </span>
                </div>
                
            </div>
            
            <div class="bus-amenities">
                ${renderAmenityIcons(bus.amenities)}
            </div>
            
            <div class="bus-actions">
                <button class="btn btn-book" onclick="openBookingDrawer('${routeInfo.route}', '${bus.name}', '${bus.departure}', '${bus.price}', '${bus.dateISO}', '${bus.type}')">
                    Chọn chuyến
                </button>
            </div>
        </div>
    `;
}
// Trả về thẻ <img> PNG nhỏ đại diện loại xe (dùng data URI placeholder, có thể thay bằng file thật trong thư mục images/bus)
function getBusTypeImageTag(busType) {
    const t = (busType || '').toLowerCase();
    // Placeholder PNG 1x1 (màu khác nhau) để fallback nếu ảnh thật không tồn tại.
    const pngSeat      = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='; // xanh lá
    const pngLimousine = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AAAAMBAQDJ1KzGAAAAAElFTkSuQmCC'; // xanh dương
    const pngSleeper   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAOj6lXcAAAAASUVORK5CYII='; // hồng

    // Ảnh thật dự kiến nằm trong thư mục images/bus
    // Base tên file theo loại
    let baseName = 'ghe-ngoi';
    let fallback = pngSeat;
    if (t.includes('limousine')) { baseName = 'limousine'; fallback = pngLimousine; }
    else if (t.includes('giường nằm')) { baseName = 'giuong-nam'; fallback = pngSleeper; }
    // Danh sách thử lần lượt: png, jpg, webp
    const candidates = [
        `images/bus/${baseName}.png`,
        `images/bus/${baseName}.jpg`,
        `images/bus/${baseName}.webp`
    ];
    const first = candidates[0];
    const alt = `Ảnh xe ${busType}`.trim();
    // Nếu tất cả hỏng -> fallback base64 màu
    return `<img src="${first}" alt="${alt}" class="bus-thumb-img" loading="lazy" data-candidates="${candidates.join(',')}" data-fallback="${fallback}" onerror="busThumbOnError(this)">`;
}

// ===== Amenity Icons Mapping =====
const amenityIconSvgs = {
    'WiFi': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M4 8c4.418-4 11.582-4 16 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M7 12c3-3 7-3 10 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M10.5 16c1.38-1.5 3.62-1.5 5 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>`,
    'Điều hòa': `<svg viewBox="0 0 24 24" class="amenity-svg"><rect x="3" y="7" width="18" height="6" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M6 16h2m4 0h2m4 0h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    'Nước uống': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M8 3h8l-1.5 16.5a2 2 0 0 1-2 1.5h-1a2 2 0 0 1-2-1.5L8 3z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 7h8" stroke="currentColor" stroke-width="2"/></svg>`,
    'Khăn lạnh': `<svg viewBox="0 0 24 24" class="amenity-svg"><rect x="5" y="6" width="14" height="12" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 10h6M9 14h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    'Cổng sạc': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M13 2 6 15h5l-2 7 7-13h-5l2-7z" fill="currentColor"/></svg>`,
    'TV': `<svg viewBox="0 0 24 24" class="amenity-svg"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 21h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    'Chăn gối': `<svg viewBox="0 0 24 24" class="amenity-svg"><rect x="4" y="7" width="16" height="10" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 11h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    'Giường nằm': `<svg viewBox="0 0 24 24" class="amenity-svg"><rect x="3" y="10" width="18" height="7" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 10v-2h6a3 3 0 0 1 3 3v1" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    'Màn che riêng tư': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M4 4h16v14H4z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M10 4v14M14 4v14" stroke="currentColor" stroke-width="2"/></svg>`,
    'Ghế massage': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M7 12h10l1 7H6l1-7z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 8a3 3 0 0 1 6 0v4H9V8z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    'Rộng rãi': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M4 12h16M12 4v16" stroke="currentColor" stroke-width="2"/><path d="M4 4h6v6H4zM14 14h6v6h-6z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    'Cửa USB': `<svg viewBox="0 0 24 24" class="amenity-svg"><path d="M10 3h4v6h-4z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 9v9m-4 0h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
};

function renderAmenityIcons(list) {
    if (!Array.isArray(list)) return '';
    return list.map(a => {
        const svg = amenityIconSvgs[a] || `<svg viewBox='0 0 24 24' class='amenity-svg'><circle cx='12' cy='12' r='10' fill='currentColor'/></svg>`;
        return `<span class="amenity-icon" title="${a}">${svg}</span>`;
    }).join('');
}

// Thêm icon vào nhãn bộ lọc tiện ích
function enhanceAmenityFilterIcons() {
    const ids = [
        'amenWifi','amenAC','amenWater','amenTowel','amenCharge','amenTV','amenBlanket','amenSleeper','amenCurtain','amenMassage','amenSpacious','amenUSB'
    ];
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        const label = document.querySelector(`label[for='${id}']`);
        if (!label || label.querySelector('.amenity-svg')) return; // tránh lặp
        const amenName = label.textContent.trim();
        const svg = amenityIconSvgs[amenName];
        if (svg) {
            label.innerHTML = `<span class='amenity-icon amenity-icon-inline' title='${amenName}'>${svg}</span><span>${amenName}</span>`;
        }
    });
}

// Handler toàn cục: thử lần lượt các candidates, cuối cùng fallback placeholder
function busThumbOnError(img) {
    const candStr = img.getAttribute('data-candidates') || '';
    const fallback = img.getAttribute('data-fallback');
    const triedStr = img.getAttribute('data-tried') || '';
    const candidates = candStr.split(',').map(s => s.trim()).filter(Boolean);
    const tried = new Set(triedStr.split(',').filter(Boolean));
    const next = candidates.find(c => !tried.has(c));
    if (next) {
        tried.add(next);
        img.setAttribute('data-tried', Array.from(tried).join(','));
        console.warn('Image missing, trying next:', next);
        img.onerror = function(){ busThumbOnError(img); };
        img.src = next;
    } else {
        console.warn('All image candidates failed, using fallback placeholder');
        img.onerror = null;
        img.src = fallback;
    }
}
// Biến toàn cục để lưu danh sách xe
let allBuses = [];
let currentRouteInfo = null;
let currentSortOption = 'default';
let preferredSeats = 1;
let currentFilters = {
    timeMin: null,
    timeMax: null,
    types: new Set(),
    priceMin: null,
    priceMax: null,
    amenities: new Set(),
    minRating: null,
};

// Hiển thị danh sách xe
function displayBusList(routeInfo, filterDate = null, sortOption = 'default') {
    const busListContainer = document.getElementById('busList');
    
    // Lấy dữ liệu xe cho tuyến này hoặc dùng dữ liệu mặc định
    let buses = busSchedules[routeInfo.route] || busSchedules['default'];
    
    // Cập nhật số chỗ ngồi cho tất cả xe dựa trên loại xe từ tuyến
    const totalSeats = getSeatsByType(routeInfo.type);
    // Tính giá theo km và loại xe (fallback 350km khi không có metadata)
    const kmParsed = parseDistanceKm(routeInfo.distance);
    const km = kmParsed > 0 ? kmParsed : 350;
    const rate = getRateByType(routeInfo.type);
    const basePriceNumber = km * rate;
    const template = buses && buses.length > 0 ? buses[0] : {
        name: 'Xe Tuyến',
        departure: '08:00',
        arrival: '12:00',
        price: '200,000',
        seats: totalSeats,
        availableSeats: Math.min(10, totalSeats),
        amenities: ['WiFi', 'Điều hòa', 'Nước uống']
    };

    // Tạo danh sách ngày 01-30/12/2025 và mỗi ngày 0-3 chuyến
    const days = Array.from({ length: 30 }, (_, i) => i + 1); // 1..30
    allBuses = [];
    // Duration for schedule arrival calculation (fallback 8h if no metadata)
    const routeDurationMin = parseDurationToMinutes(routeInfo.duration);
    const durationMin = routeDurationMin > 0 ? routeDurationMin : 8 * 60;
    // Build or load stable list per route & month
    const monthSeed = getStableSeedForRouteMonth(routeInfo);
    const rng = createSeededRng(monthSeed);
    const cacheKey = `lobibus:schedule:${monthSeed}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        try {
            allBuses = JSON.parse(cached) || [];
        } catch {
            allBuses = [];
        }
    }

    if (!allBuses || allBuses.length === 0) {
        const built = [];
        days.forEach(day => {
            const dd = String(day).padStart(2, '0');
            const dateISO = `2025-12-${dd}`;
            const dateText = `${dd}/12/2025`;
            const tripsToday = rng.int(0, 3);
            for (let i = 0; i < tripsToday; i++) {
                const departMinutes = rng.int(300, 1260);
                const depart = minutesToHHMM(departMinutes);
                const dur = durationMin || rng.int(60, 14 * 60);
                const arrive = addMinutesToTimeStr(depart, dur);
                // Chọn loại xe cho từng chuyến (đa dạng theo tuyến)
                const typePool = ['ghế ngồi', 'giường nằm', 'limousine'];
                // Ưu tiên loại xe của tuyến xuất hiện nhiều hơn
                const routeType = (routeInfo.type || '').toLowerCase();
                // Phân phối đều vì mọi tuyến đều có đủ loại xe
                const allTypes = ['ghế ngồi','giường nằm','limousine'];
                const pickIdx = rng.int(0, allTypes.length - 1);
                const busType = allTypes[pickIdx];
                const seatsForType = getSeatsByType(busType);
                const rateForType = getRateByType(busType);
                const randPriceNumber = Math.max(0, Math.round((km * rateForType) * rng.float(0.85, 1.25)));
                const rating = Math.round(rng.float(3.5, 5.0) * 10) / 10;
                const amenitiesPool = pickAmenitiesByType(busType, rng);
                built.push({
                    ...template,
                    name: pickNameByType(busType, rng),
                    seats: seatsForType,
                    price: formatVND(randPriceNumber),
                    departure: depart,
                    arrival: arrive,
                    availableSeats: Math.max(6, rng.int(6, seatsForType)),
                    amenities: amenitiesPool,
                    rating,
                    type: busType,
                    dateISO,
                    dateText
                });
            }
        });
        allBuses = built;
        try { localStorage.setItem(cacheKey, JSON.stringify(allBuses)); } catch {}
    }
    
    // Lọc theo ngày nếu có
    let displayBuses = allBuses;
    if (filterDate) {
        displayBuses = allBuses.filter(bus => bus.dateISO === filterDate);
    }

    // Áp dụng bộ lọc nâng cao
    const toMinutes = (t) => {
        const m = String(t || '').match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return null;
        return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    };
    const priceNum = (p) => parseInt(String(p || '0').replace(/[^0-9]/g, ''), 10) || 0;
    const hasAllAmenities = (busAmens, requiredSet) => {
        if (!requiredSet || requiredSet.size === 0) return true;
        const s = new Set(busAmens || []);
        for (const a of requiredSet) { if (!s.has(a)) return false; }
        return true;
    };

    displayBuses = displayBuses.filter(bus => {
        // time range
        const dm = toMinutes(bus.departure);
        if (dm == null) return false;
        if (currentFilters.timeMin != null && dm < currentFilters.timeMin) return false;
        if (currentFilters.timeMax != null && dm > currentFilters.timeMax) return false;
        // bus name filter (tên xe)
        if (currentFilters.types.size) {
            const busName = bus.name || '';
            const match = currentFilters.types.has(busName);
            if (!match) return false;
        }
        // price range
        const pn = priceNum(bus.price);
        if (currentFilters.priceMin != null && pn < currentFilters.priceMin) return false;
        if (currentFilters.priceMax != null && pn > currentFilters.priceMax) return false;
        // amenities must include all selected
        if (!hasAllAmenities(bus.amenities, currentFilters.amenities)) return false;
        // rating min
        if (currentFilters.minRating != null) {
            if ((bus.rating || 0) < currentFilters.minRating) return false;
        }
        return true;
    });
    
    // Sắp xếp theo tùy chọn
    const parseTimeToMinutes = (t) => {
        const m = String(t || '').match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return 0;
        return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    };
    const priceToNumber = (p) => parseInt(String(p || '0').replace(/[^0-9]/g, ''), 10) || 0;
    // Sort helpers: always prioritize by date first for time-based sorts
    const cmpByDateAsc = (a, b) => String(a.dateISO).localeCompare(String(b.dateISO));
    const cmpByTimeAsc = (a, b) => parseTimeToMinutes(a.departure) - parseTimeToMinutes(b.departure);
    const cmpByTimeDesc = (a, b) => parseTimeToMinutes(b.departure) - parseTimeToMinutes(a.departure);

    const sorted = displayBuses.slice();
    switch (sortOption) {
        case 'early':
            if (filterDate) {
                // With date filter: earliest departure within that date
                sorted.sort((a, b) => cmpByTimeAsc(a, b));
            } else {
                // No date filter: pure earliest across all trips (ignore date grouping)
                sorted.sort((a, b) => cmpByTimeAsc(a, b));
            }
            break;
        case 'late':
            if (filterDate) {
                sorted.sort((a, b) => cmpByTimeDesc(a, b));
            } else {
                // No date filter: pure latest across all trips
                sorted.sort((a, b) => cmpByTimeDesc(a, b));
            }
            break;
        case 'rating':
            if (filterDate) {
                sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            } else {
                // No date filter: highest rating overall
                sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            }
            break;
        case 'priceAsc':
            if (filterDate) {
                sorted.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
            } else {
                // No date filter: lowest price overall
                sorted.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
            }
            break;
        case 'priceDesc':
            if (filterDate) {
                sorted.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
            } else {
                // No date filter: highest price overall
                sorted.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
            }
            break;
        case 'default':
        default:
            // Default:
            // - With date filter: natural order by time asc within that date
            // - Without date filter: natural order by date asc then time asc
            if (filterDate) {
                sorted.sort((a, b) => cmpByTimeAsc(a, b));
            } else {
                sorted.sort((a, b) => {
                    const d = cmpByDateAsc(a, b);
                    if (d !== 0) return d;
                    return cmpByTimeAsc(a, b);
                });
            }
            break;
    }
    
    if (sorted && sorted.length > 0) {
        busListContainer.innerHTML = sorted.map(bus => createBusCard(bus, routeInfo)).join('');
    } else {
        busListContainer.innerHTML = `
            <div class="empty-message">
                <div style="font-size: 3rem;">😔</div>
                <h4>Không tìm thấy chuyến xe phù hợp</h4>
                <p>Không có chuyến xe nào vào ngày ${filterDate ? new Date(filterDate).toLocaleDateString('vi-VN') : 'này'}. Vui lòng chọn ngày khác.</p>
            </div>
        `;
    }

    // Sau khi hiển thị lần đầu, tạo checkbox tên xe từ danh sách hiện có
    const typeGroup = document.getElementById('filterTypeGroup');
    if (typeGroup && allBuses && allBuses.length) {
        const busNames = Array.from(new Set(allBuses.map(b => b.name).filter(Boolean))).sort();
        typeGroup.innerHTML = busNames.map(name => {
            const id = `busname-${name.replace(/\s+/g,'-')}`;
            return `<div class="form-check">
                <input class="form-check-input busname-filter" type="checkbox" value="${name}" id="${id}">
                <label class="form-check-label" for="${id}">${name}</label>
            </div>`;
        }).join('');
        // Gắn sự kiện cho checkbox mới tạo
        const nameBoxes = Array.from(typeGroup.querySelectorAll('.busname-filter'));
        // Khôi phục trạng thái đã chọn
        nameBoxes.forEach(cb => { if (currentFilters.types.has(cb.value)) cb.checked = true; });
        nameBoxes.forEach(el => {
            const handler = () => {
                const namesSel = new Set();
                nameBoxes.forEach(cb => { if (cb.checked) namesSel.add(cb.value); });
                currentFilters.types = namesSel;
                const selectedDate = (document.getElementById('dateFilter')?.value) || null;
                displayBusList(currentRouteInfo, selectedDate, currentSortOption);
            };
            el.addEventListener('change', handler);
        });
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

// Mở ngăn chọn vé (drawer) và điền thông tin chuyến được chọn
function openBookingDrawer(route, busName, departure, price, dateISO, busType) {
    try {
        const overlay = document.getElementById('bookingOverlay');
        const drawer = document.getElementById('bookingDrawer');
        const bdRoute = document.getElementById('bdRoute');
        const bdBusName = document.getElementById('bdBusName');
        const bdDeparture = document.getElementById('bdDeparture');
        const bdPrice = document.getElementById('bdPrice');
        const bdRemaining = document.getElementById('bdRemaining');
        const bdQty = document.getElementById('bdQty');
        const bdConfirm = document.getElementById('bdConfirm');

        bdRoute.textContent = route || '-';
        bdBusName.textContent = busName || '-';
        bdDeparture.textContent = departure || '-';
        bdPrice.textContent = (price ? (String(price) + ' ₫') : '-');

        // Tìm chuyến tương ứng trong allBuses để lấy số ghế còn lại
        let remaining = null;
        if (Array.isArray(allBuses)) {
            const match = allBuses.find(b => b.name === busName && b.dateISO === dateISO && b.departure === departure);
            if (match) remaining = Number(match.availableSeats || 0);
        }
        bdRemaining.textContent = (remaining !== null) ? (remaining + ' ghế') : 'N/A';

        // Cài giới hạn cho input số vé và ưu tiên số ghế người dùng chọn từ trang trước
        // Max luôn là 5 cho mọi xe
        const desired = Math.max(1, preferredSeats || 1);
        const maxAllowed = remaining !== null ? Math.min(5, Math.max(1, Number(remaining))) : 5;
        const initialQty = Math.max(1, Math.min(desired, maxAllowed));
        bdQty.value = initialQty;
        if (remaining !== null) {
            bdQty.max = String(maxAllowed);
            bdQty.min = '1';
            bdQty.disabled = false;
        } else {
            bdQty.max = '5';
            bdQty.min = '1';
            bdQty.disabled = true;
        }

        // Khi người dùng nhập: cho phép xóa '1' khi focus (để trống),
        // cho phép nhập 0/giá trị tạm thời khi gõ; nhưng khi hoàn tất
        // (onchange hoặc Enter) sẽ ép giá trị cuối cùng vào [1, min(5, remaining)]
        const clampQtyFinal = () => {
            if (!bdQty) return;
            const minV = 1;
            const maxV = remaining !== null ? Math.min(5, Math.max(1, Number(remaining))) : 5;
            let raw = bdQty.value == null ? '' : String(bdQty.value).trim();
            let v = parseInt(raw, 10);
            if (isNaN(v) || v < minV) v = minV;
            if (v > maxV) v = maxV;
            bdQty.value = String(v);
        };

        // Khi focus: không tự động xóa giá trị (giữ 1) — người dùng có thể xóa thủ công nếu muốn
        // (Tránh tự động xóa để không làm mất dữ liệu vô tình)

        // Khi nhập (typing): cho phép để trống; nếu nhập số > max thì hạ xuống max (giữ trải nghiệm realtime)
        bdQty.oninput = () => {
            if (!bdQty) return;
            const txt = String(bdQty.value || '').trim();
            if (txt === '') return; // allow empty while typing
            const maxV = remaining !== null ? Math.min(5, Math.max(1, Number(remaining))) : 5;
            let v = parseInt(txt, 10);
            if (isNaN(v)) return;
            if (maxV !== null && v > maxV) v = maxV;
            if (v < 0) v = 0; // allow 0 while typing; will be fixed on finalize
            bdQty.value = String(v);
        };

        // Khi rời trường hoặc thay đổi hoàn tất: clamp và blur để remove cursor
        bdQty.onchange = () => { clampQtyFinal(); bdQty.blur(); };
        bdQty.onkeydown = (e) => { if (e.key === 'Enter') { clampQtyFinal(); bdQty.blur(); } };

        // Lưu dữ liệu tạm lên nút xác nhận để dùng khi xác nhận
        if (bdConfirm) {
            bdConfirm.dataset.route = route || '';
            bdConfirm.dataset.bus = busName || '';
            bdConfirm.dataset.departure = departure || '';
            bdConfirm.dataset.price = price || '';
            bdConfirm.dataset.date = dateISO || '';
            bdConfirm.dataset.remaining = remaining !== null ? String(remaining) : '0';
            bdConfirm.dataset.type = busType || '';
        }

        if (overlay) overlay.classList.add('open');
        if (drawer) drawer.classList.add('open');
    } catch (e) {
        console.error('openBookingDrawer error', e);
    }
}

function closeBookingDrawer() {
    const overlay = document.getElementById('bookingOverlay');
    const drawer = document.getElementById('bookingDrawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
}

function confirmBooking() {
    const btn = document.getElementById('bdConfirm');
    if (!btn) return;
    const route = btn.dataset.route || '';
    const bus = btn.dataset.bus || '';
    const departure = btn.dataset.departure || '';
    const price = btn.dataset.price || '';
    const date = btn.dataset.date || '';
    const busType = btn.dataset.type || '';
    const remaining = parseInt(btn.dataset.remaining || '0', 10) || 0;
    const qtyInput = document.getElementById('bdQty');
    let qty = 1;
    if (qtyInput) qty = parseInt(qtyInput.value || '1', 10) || 1;
    if (qty < 1) qty = 1;
    
    // Giới hạn tối đa 5 vé cho mọi xe
    const maxAllowed = Math.min(5, remaining);
    if (qty > maxAllowed) {
        alert('Số vé vượt quá giới hạn. Vui lòng nhập số từ 1 đến ' + maxAllowed + ' vé.');
        return;
    }

    // Xác định trang chuyển hướng dựa trên loại xe
    let targetPage = 'xe32cho.html'; // mặc định
    const typeNorm = (busType || '').toLowerCase();
    if (typeNorm.includes('limousine')) {
        targetPage = 'xelimousine.html';
    } else if (typeNorm.includes('giường nằm') || typeNorm.includes('giuong nam')) {
        targetPage = 'xegiuongnam.html';
    } else {
        targetPage = 'xe32cho.html';
    }

    // Chuyển sang trang xe với tham số số lượng
    const params = new URLSearchParams({ route, bus, departure, price: String(price), date, qty: String(qty) });
    window.location.href = `${targetPage}?${params.toString()}`;
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    let routeInfo = normalizeRouteInfo(getRouteInfoFromURL());
    
    if (!routeInfo.route) {
        // Nếu không có thông tin tuyến, quay về trang lịch trình
        window.location.href = 'LichTrinh.html';
        return;
    }

    preferredSeats = Math.max(1, routeInfo.seatsRequested || 1);
    currentRouteInfo = routeInfo;
    displayRouteInfo(routeInfo);
    // Cập nhật ảnh minh họa theo tuyến
    setRouteThumb(routeInfo.route);

    // Xử lý sự kiện chọn ngày
    const btnFilterDate = document.getElementById('btnFilterDate');
    const btnClearDate = document.getElementById('btnClearDate');
    const dateFilter = document.getElementById('dateFilter');
    const sortRadios = document.querySelectorAll('input[name="sortOption"]');
    const initialDate = routeInfo.departDate || '';
    if (dateFilter && initialDate) {
        dateFilter.value = initialDate;
    }
    const initialFilterDate = dateFilter ? (dateFilter.value || null) : null;
    // Khởi tạo danh sách với sắp xếp mặc định và ngày được chọn từ form
    displayBusList(routeInfo, initialFilterDate, currentSortOption);
    // Filter controls
    const timeMinEl = document.getElementById('filterTimeMin');
    const timeMaxEl = document.getElementById('filterTimeMax');
    const timeMinInputEl = document.getElementById('filterTimeMinInput');
    const timeMaxInputEl = document.getElementById('filterTimeMaxInput');
    const timeBadgeEl = document.getElementById('filterTimeBadge');
    const typeGroupEl = document.getElementById('filterTypeGroup');
    const priceMinEl = document.getElementById('filterPriceMin');
    const priceMaxEl = document.getElementById('filterPriceMax');
    const priceMinValEl = document.getElementById('filterPriceMinValue');
    const priceMaxValEl = document.getElementById('filterPriceMaxValue');
    const priceBadgeEl = document.getElementById('filterPriceBadge');
    const minRatingEl = document.getElementById('filterMinRating');
    const minRatingValEl = document.getElementById('filterMinRatingValue');
    const clearFiltersLink = document.getElementById('filterClearLink');
        // Thiết lập giá trị mặc định an toàn cho bộ lọc để tránh lọc hết
        if (timeMinEl && timeMinEl.min) timeMinEl.value = timeMinEl.min;
        if (timeMaxEl && timeMaxEl.max) timeMaxEl.value = timeMaxEl.max;
        if (priceMinEl && priceMinEl.min) priceMinEl.value = priceMinEl.min;
        if (priceMaxEl && priceMaxEl.max) priceMaxEl.value = priceMaxEl.max;
        if (minRatingEl) minRatingEl.value = 0;

        // Đồng bộ nội bộ lần đầu
        (function initSync() {
            const types = new Set();
            currentFilters = {
                timeMin: timeMinEl ? parseInt(timeMinEl.value, 10) : null,
                timeMax: timeMaxEl ? parseInt(timeMaxEl.value, 10) : null,
                types,
                priceMin: priceMinEl ? parseInt(priceMinEl.value, 10) : null,
                priceMax: priceMaxEl ? parseInt(priceMaxEl.value, 10) : null,
                amenities: new Set(),
                minRating: minRatingEl ? parseFloat(minRatingEl.value) : null,
            };
            // Update displays initially
            updateTimeDisplays();
            updateDualRangeTrack();
            updatePriceDisplays();
            if (minRatingValEl && currentFilters.minRating != null) {
                minRatingValEl.textContent = currentFilters.minRating.toFixed(1);
            }
        })();

    const amenEls = [
        document.getElementById('amenWifi'),
        document.getElementById('amenAC'),
        document.getElementById('amenWater'),
        document.getElementById('amenTowel'),
        document.getElementById('amenCharge'),
        document.getElementById('amenTV'),
        document.getElementById('amenBlanket'),
        document.getElementById('amenSleeper'),
        document.getElementById('amenCurtain'),
        document.getElementById('amenMassage'),
        document.getElementById('amenSpacious'),
        document.getElementById('amenUSB'),
    ].filter(Boolean);
    
    if (btnFilterDate) {
        btnFilterDate.addEventListener('click', function() {
            const selectedDate = dateFilter.value;
            if (selectedDate) {
                displayBusList(currentRouteInfo, selectedDate, currentSortOption);
            }
        });
    }
    
    if (btnClearDate) {
        btnClearDate.addEventListener('click', function() {
            dateFilter.value = '';
            displayBusList(currentRouteInfo, null, currentSortOption);
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

    // Thay đổi sắp xếp
    if (sortRadios && sortRadios.length) {
        sortRadios.forEach(r => {
            r.addEventListener('change', () => {
                currentSortOption = r.value;
                const selectedDate = dateFilter.value || null;
                displayBusList(currentRouteInfo, selectedDate, currentSortOption);
            });
        });
    }

    function syncFilters() {
        currentFilters.timeMin = timeMinEl ? parseInt(timeMinEl.value, 10) : null;
        currentFilters.timeMax = timeMaxEl ? parseInt(timeMaxEl.value, 10) : null;
        const types = new Set();
        if (typeGroupEl) Array.from(typeGroupEl.querySelectorAll('.busname-filter')).forEach(cb => { if (cb.checked) types.add(cb.value); });
        currentFilters.types = types;
        currentFilters.priceMin = priceMinEl ? parseInt(priceMinEl.value, 10) : null;
        currentFilters.priceMax = priceMaxEl ? parseInt(priceMaxEl.value, 10) : null;
        const amenSet = new Set();
        amenEls.forEach(el => { if (el.checked) amenSet.add(el.value); });
        currentFilters.amenities = amenSet;
        currentFilters.minRating = minRatingEl ? parseFloat(minRatingEl.value) : null;
        // Update displays on change
        updateTimeDisplays();
        // Prevent crossing: keep min <= max
        if (timeMinEl && timeMaxEl) {
            const minv = parseInt(timeMinEl.value, 10) || 0;
            const maxv = parseInt(timeMaxEl.value, 10) || 0;
            if (minv > maxv) {
                // If min exceeded, snap max to min
                timeMaxEl.value = String(minv);
                currentFilters.timeMax = minv;
            }
        }
        updateDualRangeTrack();
        updatePriceDisplays();
        if (minRatingValEl && currentFilters.minRating != null) {
            minRatingValEl.textContent = currentFilters.minRating.toFixed(1);
        }
        updateRatingBadge();
    }

    // Auto-apply filters
    [timeMinEl, timeMaxEl, priceMinEl, priceMaxEl, minRatingEl, ...amenEls].forEach(el => {
        if (!el) return;
        const handler = () => {
            syncFilters();
            const selectedDate = dateFilter.value || null;
            displayBusList(currentRouteInfo, selectedDate, currentSortOption);
        };
        el.addEventListener('input', handler);
        el.addEventListener('change', handler);
    });

    if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', () => {
            if (timeMinEl) timeMinEl.value = timeMinEl.min;
            if (timeMaxEl) timeMaxEl.value = timeMaxEl.max;
            if (typeGroupEl) Array.from(typeGroupEl.querySelectorAll('.busname-filter')).forEach(cb => cb.checked = false);
            if (priceMinEl) priceMinEl.value = priceMinEl.min;
            if (priceMaxEl) priceMaxEl.value = priceMaxEl.max;
            if (minRatingEl) minRatingEl.value = 0;
            amenEls.forEach(el => el.checked = false);
            syncFilters();
            const selectedDate = dateFilter.value || null;
            displayBusList(currentRouteInfo, selectedDate, currentSortOption);
        });
    }

    // Rating option buttons
    const ratingBtns = document.querySelectorAll('.rating-option-btn');
    ratingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseFloat(btn.dataset.rating) || 0;
            if (minRatingEl) {
                minRatingEl.value = rating;
                syncFilters();
                const selectedDate = dateFilter.value || null;
                displayBusList(currentRouteInfo, selectedDate, currentSortOption);
            }
        });
    });

    // Update rating badge display
    function updateRatingBadge() {
        const ratingBadge = document.getElementById('filterRatingBadge');
        if (!ratingBadge || !minRatingEl) return;
        const val = parseFloat(minRatingEl.value) || 0;
        if (val >= 5) {
            ratingBadge.textContent = '5 sao';
        } else if (val >= 4.5) {
            ratingBadge.textContent = '4.5 sao trở lên';
        } else if (val >= 4) {
            ratingBadge.textContent = '4 sao trở lên';
        } else if (val >= 3.5) {
            ratingBadge.textContent = '3.5 sao trở lên';
        } else if (val >= 3) {
            ratingBadge.textContent = '3 sao trở lên';
        } else if (val >= 2) {
            ratingBadge.textContent = '2 sao trở lên';
        } else if (val > 0) {
            ratingBadge.textContent = val.toFixed(1) + ' sao trở lên';
        } else {
            ratingBadge.textContent = 'Tất cả';
        }
    }
    // Update price badges and min/max labels
    function updatePriceDisplays() {
        if (!priceMinEl || !priceMaxEl) return;
        const pmin = parseInt(priceMinEl.value || '0', 10);
        const pmax = parseInt(priceMaxEl.value || '0', 10);
        const textMin = formatVND(pmin) + ' ₫';
        const textMax = formatVND(pmax) + ' ₫';
        if (priceMinValEl) priceMinValEl.textContent = textMin;
        if (priceMaxValEl) priceMaxValEl.textContent = textMax;
        if (priceBadgeEl) priceBadgeEl.textContent = `${textMin} - ${textMax}`;
        // prevent crossing
        if (pmin > pmax) {
            priceMaxEl.value = String(pmin);
            currentFilters.priceMax = pmin;
        }
        // update track
        const wrap = priceMinEl.closest('.range-dual');
        const track = wrap ? wrap.querySelector('.range-track') : null;
        if (wrap && track) {
            const min = parseInt(priceMinEl.min || '0', 10);
            const max = parseInt(priceMinEl.max || '2000000', 10);
            const start = Math.min(Math.max(pmin, min), max);
            const end = Math.min(Math.max(pmax, min), max);
            const pctStart = ((start - min) / (max - min)) * 100;
            const pctEnd = ((end - min) / (max - min)) * 100;
            wrap.classList.add('fill-ready');
            track.style.setProperty('--fill-start', pctStart + '%');
            track.style.setProperty('--fill-end', pctEnd + '%');
        }
    }

    // Update visual track fill between min and max
    function updateDualRangeTrack() {
        const wrap = document.querySelector('.range-dual');
        const track = wrap ? wrap.querySelector('.range-track') : null;
        if (!wrap || !track || !timeMinEl || !timeMaxEl) return;
        const min = parseInt(timeMinEl.min || '0', 10);
        const max = parseInt(timeMinEl.max || '1439', 10);
        const v1 = Math.min(Math.max(parseInt(timeMinEl.value || '0', 10), min), max);
        const v2 = Math.min(Math.max(parseInt(timeMaxEl.value || '0', 10), min), max);
        const start = Math.min(v1, v2);
        const end = Math.max(v1, v2);
        const pctStart = ((start - min) / (max - min)) * 100;
        const pctEnd = ((end - min) / (max - min)) * 100;
        wrap.classList.add('fill-ready');
        track.style.setProperty('--fill-start', pctStart + '%');
        track.style.setProperty('--fill-end', pctEnd + '%');
    }

    // Update From/To inputs and badge display
    function updateTimeDisplays() {
        if (!timeMinEl || !timeMaxEl) return;
        const mins = parseInt(timeMinEl.value, 10) || 0;
        const maxs = parseInt(timeMaxEl.value, 10) || 1439;
        const fmtMin = minutesToHHMM(mins);
        // Show 24:00 when max is 1439 to match design
        const fmtMax = (maxs >= 1439) ? '24:00' : minutesToHHMM(maxs);
        if (timeMinInputEl) timeMinInputEl.value = fmtMin;
        if (timeMaxInputEl) timeMaxInputEl.value = fmtMax;
        if (timeBadgeEl) timeBadgeEl.textContent = `${fmtMin} - ${fmtMax}`;
    }
    // Khởi tạo icon tiện ích cho nhóm bộ lọc
    enhanceAmenityFilterIcons();
});
