/* =========================================
   LOADER
========================================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("out");
    setTimeout(() => loader.remove(), 500);
  }, 700);
});

/* =========================================
   THEME TOGGLE
========================================= */
const html     = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeIco = document.getElementById("themeIcon");

function applyTheme(t) {
  html.setAttribute("data-theme", t);
  localStorage.setItem("nvh-theme", t);
  themeIco.className = t === "dark" ? "fas fa-moon" : "fas fa-sun";
}

applyTheme(localStorage.getItem("nvh-theme") || "light");

themeBtn.addEventListener("click", () => {
  applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* =========================================
   HAMBURGER MENU
========================================= */
const ham     = document.getElementById("ham");
const mobMenu = document.getElementById("mobMenu");
const mobLinks = mobMenu.querySelectorAll("a");

function closeMenu() {
  ham.classList.remove("on");
  mobMenu.classList.remove("open");
}

ham.addEventListener("click", (e) => {
  e.stopPropagation();
  ham.classList.toggle("on");
  mobMenu.classList.toggle("open");
});

mobLinks.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  if (!ham.contains(e.target) && !mobMenu.contains(e.target)) {
    closeMenu();
  }
});

/* =========================================
   TYPING EFFECT
========================================= */
const typedEl = document.getElementById("typed");
const roles   = ["Backend Developer", "IT Student", "Tech Enthusiast", "Software Engineer"];

let ri = 0, ci = 0, deleting = false;

function typeLoop() {
  if (!typedEl) return;

  const word = roles[ri];

  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci > word.length) {
      deleting = true;
      return setTimeout(typeLoop, 1900);
    }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      return setTimeout(typeLoop, 380);
    }
  }

  setTimeout(typeLoop, deleting ? 42 : 88);
}

typeLoop();

/* =========================================
   SCROLL REVEAL
========================================= */
const revealEls = document.querySelectorAll(".reveal");

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });

revealEls.forEach(el => revealObs.observe(el));

/* =========================================
   ACTIVE NAV LINK ON SCROLL
========================================= */
const sections  = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActive() {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) {
      current = sec.getAttribute("id");
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", updateActive, { passive: true });

/* =========================================
   CONTACT FORM
========================================= */
document.getElementById("sendBtn").addEventListener("click", () => {
  const name  = document.getElementById("fName").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const msg   = document.getElementById("fMsg").value.trim();
  const out   = document.getElementById("formMsg");

  if (!name || !email || !msg) {
    out.style.color = "#e07050";
    out.textContent = "Vui lòng điền đầy đủ họ tên, email và tin nhắn.";
    return;
  }

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    out.style.color = "#e07050";
    out.textContent = "Địa chỉ email chưa hợp lệ.";
    return;
  }

  out.style.color = "var(--accent)";
  out.textContent = `Cảm ơn ${name}! Mình sẽ phản hồi sớm nhất có thể. 🙏`;

  document.getElementById("fName").value    = "";
  document.getElementById("fEmail").value   = "";
  document.getElementById("fSubject").value = "";
  document.getElementById("fMsg").value     = "";

  setTimeout(() => { out.textContent = ""; }, 5000);
});