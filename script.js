const API_URL = "https://68df73c6898434f41357bc21.mockapi.io/Reviews";
const carouselInner = document.getElementById("carouselContent");

// ======================== CHỨC NĂNG 1: TẢI REVIEWS (Tối ưu) ========================
async function loadReviews() {
  // Hiển thị trạng thái loading tạm thời (sử dụng class Bootstrap)
  carouselInner.innerHTML = `
    <div class="carousel-item active">
        <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Đang tải đánh giá...</p>
        </div>
    </div>
  `; 

  try {
    const res = await fetch(API_URL);
    
    // Xử lý lỗi HTTP
    if (!res.ok) {
        throw new Error(`Lỗi HTTP: ${res.status}`);
    }

    const data = await res.json();

    // Dùng map() và join('') để xây dựng HTML hiệu quả hơn
    const htmlContent = data.map((item, index) => {
      const activeClass = index === 0 ? 'active' : '';

      return `
        <div class="carousel-item ${activeClass}">
          <div class="review-item">
            <img src="${item.avatar}" alt="${item.name}">
            <h5>${item.name}</h5>
            <p>"${item.comment}"</p>
          </div>
        </div>
      `;
    }).join(''); 

    // Cập nhật DOM chỉ 1 lần duy nhất
    carouselInner.innerHTML = htmlContent;

  } catch (err) {
    console.error("Lỗi tải dữ liệu hoặc xử lý:", err);
    // Hiển thị thông báo lỗi thân thiện sử dụng class Bootstrap
    carouselInner.innerHTML = `
        <div class="carousel-item active">
            <div class="text-center p-5">
                <p style="color: red;"> Không thể tải bình luận. Vui lòng kiểm tra API hoặc kết nối mạng.</p>
                <small class="text-muted">Chi tiết lỗi: ${err.message}</small>
            </div>
        </div>
    `;
  }
}

// ======================== CHỨC NĂNG 2: XỬ LÝ TƯƠNG TÁC OUR STORY ========================
function handleOurStoryInteractions() {
    // 1. Nút Explore
    const exploreButton = document.querySelector('.explore-button-wrapper');
    if (exploreButton) {
        exploreButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chuyển hướng đến trang Khám phá sản phẩm...');
            console.log('Explore button clicked.');
        });
    }

    // 2. Nút Play Video
    const playVideoButton = document.querySelector('.play-video-button');
    if (playVideoButton) {
        playVideoButton.addEventListener('click', () => {
            alert('Đang phát video giới thiệu!');
            console.log('Play Video button clicked.');
        });
    }

    // 3. Social Icons
    document.getElementById('socialTwitter')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Mở trang Twitter...');
    });
    document.getElementById('socialVimeo')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Mở trang Vimeo...');
    });
    document.getElementById('socialLinkedIn')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Mở trang LinkedIn...');
    });
}

// ======================== CHỨC NĂNG 3: XỬ LÝ SỰ KIỆN SẢN PHẨM ========================
function handleProductInteractions() {
    // 1. Xử lý chọn Size
    document.querySelectorAll('.product-button-size button').forEach(button => {
        button.addEventListener('click', function() {
            const sizeContainer = this.closest('.product-button-size');
            
            // Xóa class 'selected' khỏi tất cả các nút
            sizeContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Thêm class 'selected' vào nút được nhấn
            this.classList.add('selected');

            const selectedSize = this.getAttribute('data-size');
            console.log(`Đã chọn size: ${selectedSize}`);
        });
    });

    // 2. Xử lý nút Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productSection = this.closest('.product-section');
            const selectedSizeElement = productSection.querySelector('.product-button-size button.selected');
            
            if (!selectedSizeElement) {
                alert('Vui lòng chọn kích cỡ sản phẩm trước khi thêm vào giỏ hàng!');
                return;
            }

            const selectedSize = selectedSizeElement.getAttribute('data-size');
            const productName = productSection.querySelector('h2').textContent;

            alert(`Đã thêm "${productName}" (Size: ${selectedSize}) vào giỏ hàng!`);
            console.log(`Thêm vào giỏ: ${productName}, Size ${selectedSize}`);
        });
    });
}

// ======================== CHỨC NĂNG 4: XỬ LÝ TƯƠNG TÁC FOOTER MỚI ========================
function handleFooterInteractions() {
    // Xử lý click trên các icon mạng xã hội ở footer
    document.querySelectorAll('.social-footer-icons .social-icon-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const iconClass = e.currentTarget.querySelector('i').classList[1]; // Lấy class icon (e.g., bi-facebook)
            alert(`Mở liên kết xã hội: ${iconClass.replace('bi-', '')} (Footer)`);
            console.log(`Social icon clicked in footer: ${iconClass}`);
        });
    });

    // Xử lý sự kiện nhấn Enter trong ô tìm kiếm ở cột Resources
    const searchInput = document.querySelector('.search-input-footer');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Ngăn chặn form submit
                alert(`Đang tìm kiếm trong Resources: ${this.value}`);
                console.log(`Footer search input: ${this.value}`);
            }
        });
    }
}


// ======================== KHỞI TẠO ========================
loadReviews();
// Gọi tất cả các hàm xử lý tương tác sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    handleOurStoryInteractions();
    handleProductInteractions();
    handleFooterInteractions(); // Thêm hàm xử lý footer
});