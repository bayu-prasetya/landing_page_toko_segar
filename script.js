// ---------- Data produk ----------
const produkList = [
  { nama: "Jeruk Medan", emoji: "🍊", kategori: "lokal", harga: 25000, unit: "/ kg" },
  { nama: "Mangga Harum Manis", emoji: "🥭", kategori: "lokal", harga: 32000, unit: "/ kg" },
  { nama: "Anggur Muscat", emoji: "🍇", kategori: "import", harga: 68000, unit: "/ 500g" },
  { nama: "Nanas Madu", emoji: "🍍", kategori: "musiman", harga: 15000, unit: "/ buah" },
  { nama: "Strawberry Lembang", emoji: "🍓", kategori: "lokal", harga: 24000, unit: "/ box" },
  { nama: "Apel Fuji", emoji: "🍎", kategori: "import", harga: 42000, unit: "/ kg" },
  { nama: "Pepaya California", emoji: "🍈", kategori: "lokal", harga: 12000, unit: "/ buah" },
  { nama: "Duren Musang King", emoji: "🥭", kategori: "musiman", harga: 95000, unit: "/ kg" },
];

const formatRupiah = (n) =>
  "Rp" + n.toLocaleString("id-ID");

function renderProduk(filter = "semua") {
  const grid = document.getElementById("produkGrid");
  grid.innerHTML = "";

  produkList.forEach((p) => {
    const cocok = filter === "semua" || p.kategori === filter;
    const card = document.createElement("article");
    card.className = "produk-card" + (cocok ? "" : " hidden");
    card.innerHTML = `
      <div class="produk-emoji" aria-hidden="true">${p.emoji}</div>
      <span class="produk-tag">${p.kategori}</span>
      <h3>${p.nama}</h3>
      <div class="produk-price-board">
        <span class="price">${formatRupiah(p.harga)}</span>
        <span class="unit">${p.unit}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---------- Filter kategori ----------
document.getElementById("produkFilter").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  renderProduk(btn.dataset.filter);
});

renderProduk();

// ---------- Nav mobile toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tutup menu mobile setelah klik link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Form pesan (simulasi, tanpa backend) ----------
const pesanForm = document.getElementById("pesanForm");
const pesanNote = document.getElementById("pesanNote");

pesanForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomor = document.getElementById("nomorWA").value.trim();

  if (nomor.length < 8) {
    pesanNote.textContent = "Nomor WhatsApp sepertinya belum lengkap.";
    pesanNote.className = "pesan-note err";
    return;
  }

  pesanNote.textContent = `Dicatat! Kami kabari ke ${nomor} kalau area kamu sudah bisa kirim hari ini. (Ini simulasi untuk contoh belajar)`;
  pesanNote.className = "pesan-note ok";
  pesanForm.reset();
});

// ---------- Angka statistik naik saat halaman dibuka ----------
function animateCount(el, target, suffix = "") {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 30);
}

window.addEventListener("DOMContentLoaded", () => {
  animateCount(document.getElementById("statPetani"), 40, "+");
  animateCount(document.getElementById("statKota"), 6);
});
