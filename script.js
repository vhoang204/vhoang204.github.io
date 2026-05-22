/* =============================================
   1. LOADER
   Ẩn màn hình loading sau khi trang tải xong
============================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});


/* =============================================
   2. CUSTOM CURSOR
   Con trỏ chuột tùy chỉnh phát sáng
============================================= */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;   // vị trí thực của chuột
let ringX  = 0, ringY  = 0;   // vị trí "lag" của vòng ring

// Cập nhật vị trí dot ngay lập tức
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Ring chạy chậm hơn để tạo hiệu ứng mượt
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Phóng to cursor khi hover vào link/button
document.querySelectorAll('a, button, .skill-card, .project-card, .stat-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursorRing.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursorRing.classList.remove('active');
  });
});


/* =============================================
   3. DARK / LIGHT THEME TOGGLE
============================================= */
let isLight = false;

function toggleTheme() {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);

  // Cập nhật icon desktop
  document.getElementById('themeToggle').innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  // Cập nhật icon mobile
  document.getElementById('mobileTheme').textContent = isLight ? '☀️' : '🌙';
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('mobileTheme').addEventListener('click', toggleTheme);


/* =============================================
   4. NAVBAR  —  SCROLL & ACTIVE LINK
============================================= */
const navbar = document.getElementById('navbar');

// Thu nhỏ navbar khi cuộn xuống
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Đánh dấu link active theo section đang hiển thị
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(
        `.nav-links a[data-section="${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));


/* =============================================
   5. SECTION REVEAL ON SCROLL
   Hiệu ứng hiện section khi cuộn tới
============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => revealObserver.observe(s));


/* =============================================
   6. TYPING EFFECT
   Hiệu ứng gõ chữ trong hero
============================================= */
const roles = [
  'Fullstack Developer',
  'IT Student @ HUS',
  'Backend Developer',
  'Tech Enthusiast',
  'Software Engineer'
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed');

function typeEffect() {
  if (!typedEl) return;

  // Quay lại đầu danh sách nếu hết
  if (roleIndex >= roles.length) roleIndex = 0;

  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    // Đang gõ thêm chữ
    typedEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex >= currentWord.length) {
      // Gõ xong một từ → dừng 1.4s rồi xóa
      isDeleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    // Đang xóa chữ
    typedEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex <= 0) {
      // Xóa xong → sang từ tiếp theo
      isDeleting = false;
      roleIndex++;
    }
  }

  setTimeout(typeEffect, isDeleting ? 45 : 90);
}

typeEffect();


/* =============================================
   7. COUNTER ANIMATION
   Đếm số lên trong hero stats
============================================= */
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 30);

  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + '+';
    if (current >= target) clearInterval(interval);
  }, 40);
}

// Chỉ chạy khi hero stats hiện trên màn hình
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count));
        });
        counterObserver.disconnect(); // chỉ chạy 1 lần
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(statsEl);
}