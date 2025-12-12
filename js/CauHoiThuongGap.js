const faqData = [
  {
    question: "Làm thế nào để đặt vé xe khách?",
    answer: `<div class="answer-title">Làm thế nào để đặt vé xe khách?</div>
      <div class="answer-text">
        <p>Để đặt vé xe khách trên LobiBus, bạn thực hiện theo các bước sau:</p>
        <ol>
          <li>Truy cập vào trang chủ LobiBus hoặc ứng dụng di động</li>
          <li>Nhập nơi đi, nơi đến, ngày đi và nhấn "Tìm chuyến"</li>
          <li>Chọn chuyến xe phù hợp với nhu cầu của bạn</li>
          <li>Chọn vị trí ghế ngồi mong muốn</li>
          <li>Khai báo thông tin liên hệ và hành khách</li>
          <li>Chọn phương thức thanh toán và hoàn tất đặt vé</li>
          <li>Bạn sẽ nhận được email và tin nhắn SMS xác nhận</li>
        </ol>
        <p><strong>Lưu ý:</strong> Vé chỉ được xác nhận sau khi thanh toán thành công. Bạn phải thanh toán trong thời gian quy định để giữ chỗ.</p>
      </div>`
  },
  {
    question: "Tôi có thể đổi hoặc hủy vé không?",
    answer: `<div class="answer-title">Tôi có thể đổi hoặc hủy vé không?</div>
      <div class="answer-text">
        <p>Có, bạn có thể đổi hoặc hủy vé thông qua LobiBus. Tuy nhiên, chính sách đổi/hủy vé phụ thuộc vào từng hãng xe.</p>
        <p><strong>Để hủy vé:</strong></p>
        <ul>
          <li>Đăng nhập vào tài khoản của bạn hoặc sử dụng mã đặt vé</li>
          <li>Vào phần "Quản lý đơn hàng" và chọn chuyến cần hủy</li>
          <li>Nhấn nút "Hủy đơn hàng" và chọn lý do hủy</li>
          <li>Gửi yêu cầu cho hệ thống xử lý</li>
        </ul>
        <p><strong>Để đổi vé:</strong></p>
        <ul>
          <li>Liên hệ trực tiếp với bộ phận hỗ trợ khách hàng</li>
          <li>Hoặc gọi hotline: 0936 363 363</li>
          <li>Cung cấp mã đặt vé và thông tin chuyến đi mới mong muốn</li>
        </ul>
      </div>`
  },
  {
    question: "Phí hủy vé là bao nhiêu?",
    answer: `<div class="answer-title">Phí hủy vé là bao nhiêu?</div>
      <div class="answer-text">
        <p>Phí hủy vé thay đổi tùy theo từng hãng xe và thời gian hủy. Thông thường:</p>
        <ul>
          <li><strong>Hủy trước 24 giờ:</strong> Phí hủy thấp (thường 5-10%)</li>
          <li><strong>Hủy từ 12-24 giờ:</strong> Phí hủy trung bình (thường 10-15%)</li>
          <li><strong>Hủy dưới 12 giờ:</strong> Phí hủy cao (thường 15-20%)</li>
          <li><strong>Không đến lên xe:</strong> Không hoàn tiền</li>
        </ul>
        <p><strong>Công thức tính hoàn tiền:</strong></p>
        <p>Tiền hoàn = Tổng tiền thanh toán - Phí hủy - Phí chuyển khoản (nếu có)</p>
        <p>Bạn có thể xem chính sách hủy cụ thể của từng hãng xe khi chọn chuyến đi.</p>
      </div>`
  },
  {
    question: "Tôi sẽ nhận hoàn tiền khi nào?",
    answer: `<div class="answer-title">Tôi sẽ nhận hoàn tiền khi nào?</div>
      <div class="answer-text">
        <p>Quy trình hoàn tiền của LobiBus diễn ra như sau:</p>
        <ul>
          <li><strong>Ngay lập tức:</strong> Hệ thống xử lý hoàn tiền tự động khi bạn gửi yêu cầu hủy</li>
          <li><strong>1-3 ngày làm việc:</strong> Tiền được chuyển đến ngân hàng/ví của bạn</li>
          <li><strong>3-7 ngày làm việc:</strong> Tiền được ghi có vào tài khoản của bạn (tùy vào ngân hàng)</li>
        </ul>
        <p><strong>Lưu ý quan trọng:</strong></p>
        <ul>
          <li>Thời gian nhận tiền phụ thuộc vào ngân hàng hoặc dịch vụ ví điện tử của bạn</li>
          <li>Nếu không nhận được tiền trong 14 ngày, hãy liên hệ: cskh@lobibus.com</li>
          <li>Hãng xe không chịu trách nhiệm về độ trễ của ngân hàng</li>
        </ul>
      </div>`
  },
  {
    question: "Những phương thức thanh toán nào được chấp nhận?",
    answer: `<div class="answer-title">Những phương thức thanh toán nào được chấp nhận?</div>
      <div class="answer-text">
        <p>LobiBus chấp nhận nhiều phương thức thanh toán để thuận tiện cho bạn:</p>
        <ul>
          <li><strong>Thẻ tín dụng:</strong> Visa, Mastercard, JCB</li>
          <li><strong>Thẻ ATM nội địa:</strong> Internet Banking các ngân hàng Việt Nam</li>
          <li><strong>Ví điện tử:</strong> MoMo, ZaloPay, ShopeePay, SmartPay</li>
          <li><strong>Chuyển khoản:</strong> Ngân hàng trực tiếp (một số trường hợp)</li>
        </ul>
        <p><strong>Lợi ích:</strong></p>
        <ul>
          <li>An toàn và bảo mật tuyệt đối</li>
          <li>Xử lý ngay lập tức khi thanh toán thành công</li>
          <li>Hỗ trợ các chương trình khuyến mãi và giảm giá</li>
        </ul>
      </div>`
  },
  {
    question: "Tôi có thể sử dụng mã giảm giá không?",
    answer: `<div class="answer-title">Tôi có thể sử dụng mã giảm giá không?</div>
      <div class="answer-text">
        <p>Có, LobiBus thường xuyên cung cấp các mã giảm giá và voucher cho khách hàng.</p>
        <p><strong>Cách sử dụng mã giảm giá:</strong></p>
        <ul>
          <li>Tại bước thanh toán, bạn sẽ thấy ô nhập "Mã giảm giá"</li>
          <li>Nhập mã giảm giá của bạn vào ô này</li>
          <li>Hệ thống sẽ tự động tính toán số tiền giảm</li>
          <li>Nhấn "Thanh toán" để hoàn tất</li>
        </ul>
        <p><strong>Quy tắc áp dụng:</strong></p>
        <ul>
          <li>Chỉ được sử dụng <strong>một</strong> mã giảm giá cho mỗi lần đặt vé</li>
          <li>Mã giảm giá có thể có điều kiện sử dụng (ví dụ: tuyến đường cụ thể, thời gian cụ thể)</li>
          <li>Mã giảm giá có hạn sử dụng, kiểm tra ngày hết hạn</li>
        </ul>
      </div>`
  },
  {
    question: "Làm thế nào để tra cứu mã đặt vé?",
    answer: `<div class="answer-title">Làm thế nào để tra cứu mã đặt vé?</div>
      <div class="answer-text">
        <p>Bạn có thể tra cứu mã đặt vé thông qua các cách sau:</p>
        <ol>
          <li><strong>Trên website:</strong> Vào LobiBus.com → "Tra cứu mã đặt vé" → Nhập mã hoặc số điện thoại/email</li>
          <li><strong>Trên ứng dụng mobile:</strong> Mở ứng dụng → Mục "Quản lý đơn hàng" → Tìm chuyến đã đặt</li>
          <li><strong>Email xác nhận:</strong> Kiểm tra email khi đặt vé, mã sẽ được gửi kèm</li>
          <li><strong>Tin nhắn SMS:</strong> Bạn sẽ nhận SMS chứa mã xác nhận sau khi thanh toán thành công</li>
        </ol>
        <p><strong>Thông tin hiển thị:</strong></p>
        <ul>
          <li>Mã đặt vé / Booking ID</li>
          <li>Thông tin hành khách</li>
          <li>Chi tiết chuyến đi (tuyến, thời gian, nhà xe)</li>
          <li>Số ghế ngồi</li>
          <li>Điểm đón / Điểm trả</li>
        </ul>
      </div>`
  },
  {
    question: "Cần phải có tài khoản để đặt vé không?",
    answer: `<div class="answer-title">Cần phải có tài khoản để đặt vé không?</div>
      <div class="answer-text">
        <p><strong>Không, bạn không cần tài khoản để đặt vé trên LobiBus.</strong></p>
        <p>LobiBus cho phép bạn đặt vé mà không cần đăng ký tài khoản. Bạn chỉ cần cung cấp:</p>
        <ul>
          <li>Tên đầy đủ</li>
          <li>Số điện thoại</li>
          <li>Email</li>
        </ul>
        <p><strong>Lợi ích:</strong></p>
        <ul>
          <li>Tiết kiệm thời gian đăng ký</li>
          <li>Đặt vé nhanh chóng và dễ dàng</li>
          <li>Vẫn nhận email và SMS xác nhận</li>
        </ul>
        <p><strong>Lưu ý:</strong> Bạn vẫn có thể tạo tài khoản để quản lý lịch sử đặt vé của mình.</p>
      </div>`
  },
  {
    question: "Tôi phải đến bến xe bao giờ?",
    answer: `<div class="answer-title">Tôi phải đến bến xe bao giờ?</div>
      <div class="answer-text">
        <p><strong>Nguyên tắc chung:</strong> Bạn phải đến ít nhất <strong>30 phút</strong> trước giờ khởi hành.</p>
        <p><strong>Trong các trường hợp đặc biệt:</strong></p>
        <ul>
          <li><strong>Ngày lễ, Tết:</strong> Đến ít nhất <strong>60 phút</strong> trước giờ khởi hành</li>
          <li><strong>Đặt chỗ từ xa:</strong> Kiểm tra yêu cầu cụ thể của hãng xe</li>
        </ul>
        <p><strong>Hậu quả khi trễ:</strong></p>
        <ul>
          <li>Xe sẽ khởi hành đúng giờ, không chờ đợi</li>
          <li>Nếu bạn trễ, bạn sẽ mất vé (không hoàn tiền)</li>
          <li>Hãng xe không chịu trách nhiệm nếu bạn không lên được xe</li>
        </ul>
        <p><strong>Ghi chú:</strong> Hãy đến địa điểm đón theo thông tin trên email/SMS xác nhận.</p>
      </div>`
  },
  {
    question: "Nếu xe bị hủy chuyến thì sao?",
    answer: `<div class="answer-title">Nếu xe bị hủy chuyến thì sao?</div>
      <div class="answer-text">
        <p>Trong trường hợp hãng xe hủy chuyến, LobiBus sẽ hỗ trợ bạn theo cách sau:</p>
        <p><strong>Quy trình hỗ trợ:</strong></p>
        <ul>
          <li>LobiBus sẽ thông báo cho bạn qua email và SMS</li>
          <li>LobiBus sẽ cố gắng sắp xếp xe khác cho bạn trong vòng 18 giờ (sớm hơn hoặc muộn hơn)</li>
          <li>Nếu không tìm được xe thay thế, LobiBus sẽ hoàn lại 100% giá tiền vé</li>
        </ul>
        <p><strong>Cam kết của LobiBus:</strong></p>
        <ul>
          <li><strong>Hoàn đến 150% giá vé</strong> trong trường hợp không tìm được xe thay thế</li>
          <li>Bao gồm: 100% tiền vé + voucher giảm 50% cho lần đặt tiếp theo</li>
          <li>Voucher có hạn sử dụng 2 tháng</li>
        </ul>
        <p><strong>Ngoại lệ:</strong> Hãng xe hủy do sự kiện bất khả kháng (thiên tai, dịch bệnh, v.v.) thì LobiBus sẽ có chính sách hỗ trợ khác.</p>
      </div>`
  },
  {
    question: "Điểm đón/trả có thể thay đổi được không?",
    answer: `<div class="answer-title">Điểm đón/trả có thể thay đổi được không?</div>
      <div class="answer-text">
        <p>Có, bạn có thể yêu cầu thay đổi điểm đón/trả, nhưng phải tuân theo quy định:</p>
        <p><strong>Quy tắc thay đổi:</strong></p>
        <ul>
          <li>Thay đổi phải được hãng xe chấp thuận và ghi trên hoá đơn</li>
          <li>Thay đổi phải phù hợp với lịch trình tuyến đường</li>
          <li>Bạn có thể phải trả thêm phí nếu điểm mới có phí cao hơn</li>
        </ul>
        <p><strong>Cách thay đổi:</strong></p>
        <ul>
          <li>Liên hệ trực tiếp hãng xe hoặc LobiBus</li>
          <li>Cung cấp mã đặt vé của bạn</li>
          <li>Nêu rõ điểm đón/trả mới mong muốn</li>
          <li>Chờ xác nhận từ hãng xe</li>
        </ul>
        <p><strong>Lưu ý:</strong> Thay đổi phải được thực hiện trước ngày khởi hành ít nhất 24 giờ.</p>
      </div>`
  },
  {
    question: "Tôi cần giấy tờ gì khi lên xe?",
    answer: `<div class="answer-title">Tôi cần giấy tờ gì khi lên xe?</div>
      <div class="answer-text">
        <p>Khi lên xe, bạn cần chuẩn bị các giấy tờ sau:</p>
        <p><strong>Bắt buộc:</strong></p>
        <ul>
          <li><strong>Chứng minh thư nhân dân / Căn cước công dân</strong></li>
          <li>Hoặc: Hộ chiếu, giấy phép lái xe (các giấy tờ tùy thân có ảnh)</li>
          <li><strong>Email hoặc SMS xác nhận</strong> từ LobiBus (có thể in hoặc lưu trên điện thoại)</li>
        </ul>
        <p><strong>Nên chuẩn bị:</strong></p>
        <ul>
          <li>In hoặc lưu lại mã đặt vé</li>
          <li>Ghi lại số điện thoại liên hệ</li>
          <li>Kiểm tra lại thông tin khách sạn / điểm dừng</li>
        </ul>
        <p><strong>Lưu ý quan trọng:</strong></p>
        <ul>
          <li>Nếu không có giấy tờ tuỳ thân, bạn sẽ bị từ chối lên xe</li>
          <li>Tên trên giấy tờ phải khớp với tên đặt vé</li>
          <li>Nếu bạn lên thay cho người khác, người đó phải có giấy tờ</li>
        </ul>
      </div>`
  },
  {
    question: "Tôi không nhận được email xác nhận thì sao?",
    answer: `<div class="answer-title">Tôi không nhận được email xác nhận thì sao?</div>
      <div class="answer-text">
        <p><strong>Trước tiên, hãy kiểm tra:</strong></p>
        <ul>
          <li>Hộp thư spam / Thư rác (email có thể bị chuyển hướng)</li>
          <li>Hộp thư khác (các tài khoản email thường có nhiều hộp)</li>
          <li>Xác nhận số điện thoại - có thể SMS tới nước ngoài chậm</li>
        </ul>
        <p><strong>Nếu vẫn không nhận được:</strong></p>
        <ul>
          <li>Truy cập LobiBus.com → "Tra cứu mã đặt vé"</li>
          <li>Nhập mã đặt vé hoặc số điện thoại/email</li>
          <li>Xem thông tin chuyến và in hoặc tải xuống</li>
        </ul>
        <p><strong>Hoặc liên hệ LobiBus:</strong></p>
        <ul>
          <li>Email: cskh@lobibus.com</li>
          <li>Hotline: 0936 363 363</li>
          <li>Cung cấp: Tên, số điện thoại, ngày khởi hành</li>
        </ul>
        <p><strong>Lưu ý:</strong> LobiBus sẽ gửi lại email/SMS xác nhận miễn phí.</p>
      </div>`
  },
  {
    question: "Có thể đặt vé cho người khác không?",
    answer: `<div class="answer-title">Có thể đặt vé cho người khác không?</div>
      <div class="answer-text">
        <p><strong>Có, bạn có thể đặt vé hộ người khác.</strong></p>
        <p><strong>Quy trình đặt vé cho người khác:</strong></p>
        <ul>
          <li>Chọn chuyến xe và ghế như bình thường</li>
          <li>Ở bước khai báo hành khách, nhập <strong>tên người sẽ lên xe</strong></li>
          <li>Nhập số điện thoại của chính bạn (người đặt vé)</li>
          <li>Email có thể là của bạn hoặc người được đặt vé</li>
          <li>Thanh toán và hoàn tất</li>
        </ul>
        <p><strong>Điều quan trọng:</strong></p>
        <ul>
          <li>Tên trên vé phải khớp với tên trên giấy tờ tuỳ thân của hành khách</li>
          <li>Người lên xe phải có giấy tờ tuỳ thân (chứng minh, hộ chiếu, v.v.)</li>
          <li>LobiBus khuyến khích ghi đúng tên để tránh rắc rối khi lên xe</li>
        </ul>
        <p><strong>Ghi chú:</strong> Hãng xe sẽ kiểm tra tên trên vé với tên trên giấy tờ, nếu không khớp bạn sẽ không được lên xe.</p>
      </div>`
  },
  {
    question: "Chính sách bảo mật thông tin của LobiBus là gì?",
    answer: `<div class="answer-title">Chính sách bảo mật thông tin của LobiBus là gì?</div>
      <div class="answer-text">
        <p>LobiBus cam kết bảo vệ thông tin cá nhân của bạn một cách tuyệt đối.</p>
        <p><strong>Thông tin được bảo mật:</strong></p>
        <ul>
          <li>Tên, số điện thoại, email</li>
          <li>Địa chỉ</li>
          <li>Thông tin thanh toán (không lưu trữ chi tiết thẻ)</li>
          <li>Lịch sử đặt vé</li>
        </ul>
        <p><strong>Cam kết của LobiBus:</strong></p>
        <ul>
          <li>Thông tin được mã hóa và bảo vệ trên máy chủ an toàn</li>
          <li>Không bao giờ chia sẻ với bên thứ ba ngoài hãng xe (để cung cấp dịch vụ)</li>
          <li>Chỉ cung cấp cho cơ quan pháp luật khi có yêu cầu chính thức</li>
          <li>Có chính sách bảo mật chi tiết trên website</li>
        </ul>
        <p><strong>Để xem chi tiết:</strong> Vào LobiBus.com → "Chính sách bảo mật"</p>
      </div>`
  },
  {
    question: "Vé được giữ bao lâu nếu tôi không thanh toán?",
    answer: `<div class="answer-title">Vé được giữ bao lâu nếu tôi không thanh toán?</div>
      <div class="answer-text">
        <p>Thời gian giữ vé phụ thuộc vào chính sách của từng hãng xe, thường như sau:</p>
        <p><strong>Thời gian giữ chỗ tiêu chuẩn:</strong></p>
        <ul>
          <li><strong>Vé một chiều:</strong> Được giữ tối đa 10 phút khi bạn chỉ đặt giữ chỗ</li>
          <li><strong>Vé khứ hồi:</strong> Được giữ tối đa 20 phút (10 phút chiều đi, 10 phút chiều về)</li>
        </ul>
        <p><strong>Sau thời gian này:</strong></p>
        <ul>
          <li>Hệ thống sẽ tự động hủy chỗ</li>
          <li>Chỗ sẽ được mở bán cho hành khách khác</li>
          <li>Bạn phải đặt lại từ đầu nếu muốn</li>
        </ul>
        <p><strong>Để giữ chỗ lâu hơn:</strong></p>
        <ul>
          <li>Bạn phải hoàn tất thanh toán trước khi hết thời gian giữ chỗ</li>
          <li>Sau thanh toán, vé được xác nhận và giữ lâu (đến ngày khởi hành)</li>
        </ul>
      </div>`
  },
  {
    question: "LobiBus có bảo đảm chất lượng dịch vụ không?",
    answer: `<div class="answer-title">LobiBus có bảo đảm chất lượng dịch vụ không?</div>
      <div class="answer-text">
        <p><strong>Có, LobiBus cam kết bảo đảm chất lượng dịch vụ.</strong></p>
        <p><strong>Cam kết của LobiBus:</strong></p>
        <ul>
          <li>Chỉ hợp tác với các hãng xe uy tín và có đầy đủ giấy phép</li>
          <li>Thông tin về hãng xe được cập nhật chính xác và đầy đủ</li>
          <li>Xử lý khiếu nại nhanh chóng (trong 24 giờ)</li>
          <li>Bồi hoàn thỏa đáng nếu dịch vụ không đảm bảo</li>
        </ul>
        <p><strong>Nếu dịch vụ không đảm bảo:</strong></p>
        <ul>
          <li>Xe không đón hoặc hết chỗ</li>
          <li>Nhà xe không cung cấp dịch vụ như đã cam kết</li>
          <li>Vé bị sai hoặc giả mạo</li>
        </ul>
        <p><strong>Hành động của LobiBus:</strong></p>
        <ul>
          <li>Sắp xếp xe thay thế trong 18 giờ</li>
          <li>Hoàn tiền hoặc hoàn tiền + voucher giảm giá</li>
          <li>Có thể hoàn tới 150% giá vé trong một số trường hợp</li>
        </ul>
      </div>`
  },
  {
    question: "Tôi có thể thay đổi thông tin hành khách không?",
    answer: `<div class="answer-title">Tôi có thể thay đổi thông tin hành khách không?</div>
      <div class="answer-text">
        <p><strong>Có, nhưng phải thực hiện trước ngày khởi hành.</strong></p>
        <p><strong>Thông tin có thể thay đổi:</strong></p>
        <ul>
          <li>Tên hành khách</li>
          <li>Số điện thoại liên hệ</li>
          <li>Email</li>
        </ul>
        <p><strong>Cách thay đổi:</strong></p>
        <ul>
          <li>Vào LobiBus.com → "Quản lý đơn hàng"</li>
          <li>Nhập mã đặt vé và thông tin xác nhận</li>
          <li>Chọn chuyến cần thay đổi → "Sửa thông tin"</li>
          <li>Cập nhật thông tin mới</li>
          <li>Lưu và xác nhận thay đổi</li>
        </ul>
        <p><strong>Hoặc:</strong></p>
        <ul>
          <li>Liên hệ LobiBus: cskh@lobibus.com hoặc 0936 363 363</li>
          <li>Cung cấp mã đặt vé và thông tin mới</li>
        </ul>
        <p><strong>Lưu ý:</strong> Thay đổi tên phải được thực hiện trước ngày khởi hành ít nhất 24 giờ.</p>
      </div>`
  },
  {
    question: "Nếu tôi bị nhà xe từ chối lên xe thì sao?",
    answer: `<div class="answer-title">Nếu tôi bị nhà xe từ chối lên xe thì sao?</div>
      <div class="answer-text">
        <p>Nếu bạn bị nhà xe từ chối lên xe, hãy thực hiện các bước sau:</p>
        <p><strong>Ngay lập tức:</strong></p>
        <ul>
          <li>Hỏi rõ lý do từ chối (phải có lý do chính đáng)</li>
          <li>Yêu cầu nhà xe cung cấp bằng chứng hoặc giải thích</li>
          <li>Ghi chép tên nhân viên, thời gian, nơi xảy ra</li>
        </ul>
        <p><strong>Liên hệ LobiBus:</strong></p>
        <ul>
          <li>Gọi hotline: 0936 363 363 (ưu tiên)</li>
          <li>Email: cskh@lobibus.com</li>
          <li>Cung cấp: Mã đặt vé, thời gian, lý do từ chối</li>
        </ul>
        <p><strong>Quyền của bạn:</strong></p>
        <ul>
          <li>Được lên chuyến xe tiếp theo hoặc hoàn tiền 100%</li>
          <li>Được bồi thường nếu bị tổn hại</li>
          <li>LobiBus sẽ điều tra và xử lý nhà xe nếu cần</li>
        </ul>
        <p><strong>Lý do chính đáng từ chối:</strong></p>
        <ul>
          <li>Tên trên vé không khớp với giấy tờ tuỳ thân</li>
          <li>Mang theo hành lý cồng kềnh vượt quá quy định</li>
          <li>Vi phạm quy định về an toàn</li>
        </ul>
      </div>`
  },
  {
    question: "Làm thế nào để liên hệ với LobiBus?",
    answer: `<div class="answer-title">Làm thế nào để liên hệ với LobiBus?</div>
      <div class="answer-text">
        <p><strong>Thông tin liên hệ LobiBus:</strong></p>
        <p><strong>Hotline:</strong></p>
        <ul>
          <li><strong>Điện thoại:</strong> 0936 363 363</li>
          <li><strong>Giờ làm việc:</strong> 6:00 - 22:00 hàng ngày</li>
          <li><strong>Ưu tiên:</strong> Các vấn đề cần xử lý ngay (hủy vé, thay đổi chuyến)</li>
        </ul>
        <p><strong>Email:</strong></p>
        <ul>
          <li><strong>Địa chỉ:</strong> cskh@lobibus.com</li>
          <li><strong>Thời gian phản hồi:</strong> Trong 24 giờ làm việc</li>
          <li><strong>Phù hợp cho:</strong> Câu hỏi, khiếu nại, yêu cầu thông tin</li>
        </ul>
        <p><strong>Website:</strong></p>
        <ul>
          <li><strong>Địa chỉ:</strong> LobiBus.com</li>
          <li><strong>Tính năng:</strong> Đặt vé, tra cứu, quản lý đơn hàng</li>
        </ul>
        <p><strong>Địa chỉ văn phòng:</strong></p>
        <ul>
          <li><strong>Địa chỉ:</strong> Số 12, Phố Chùa Bộc, Phường Kim Liên, Hà Nội, Việt Nam</li>
        </ul>
        <p><strong>Mạng xã hộ:</strong></p>
        <ul>
          <li>Facebook: LobiBus</li>
          <li>Instagram: @lobibus_vn</li>
          <li>YouTube: LobiBus Channel</li>
        </ul>
      </div>`
  }
];

function displayFAQ(index) {
  const container = document.getElementById("answer-container");
  container.innerHTML = faqData[index].answer;
}

function activateItem(item) {
  document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));
  item.classList.add("active");
}

function handleSearch() {
  const searchInput = document.getElementById("faq-search");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const items = Array.from(document.querySelectorAll(".faq-item"));

  let firstVisible = null;

  items.forEach(item => {
    const match = item.textContent.toLowerCase().includes(query);
    item.style.display = match ? "block" : "none";
    if (match && !firstVisible) {
      firstVisible = item;
    }
  });

  if (firstVisible) {
    activateItem(firstVisible);
    displayFAQ(firstVisible.getAttribute("data-faq"));
  } else {
    const container = document.getElementById("answer-container");
    container.innerHTML = '<div class="no-selection">Không tìm thấy câu hỏi phù hợp</div>';
  }
}

function setupInteractions() {
  const items = Array.from(document.querySelectorAll(".faq-item"));
  items.forEach(item => {
    item.addEventListener("click", function () {
      const faqIndex = this.getAttribute("data-faq");
      activateItem(this);
      displayFAQ(faqIndex);
    });
  });

  const searchInput = document.getElementById("faq-search");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
}

// Init
displayFAQ(0);
setupInteractions();
handleSearch();
