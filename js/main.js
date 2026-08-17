document.addEventListener("DOMContentLoaded", () => {
  // Semua kode di dalam blok ini dijalankan setelah struktur HTML selesai dibaca.

  // ---------------------------------------------------------------------------
  // Menu navigasi mobile
  // ---------------------------------------------------------------------------
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "false");
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const willOpen = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuButton.setAttribute("aria-expanded", String(willOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Tahun footer selalu mengikuti tahun pada perangkat pengunjung.
  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  // ---------------------------------------------------------------------------
  // Slider katalog produk Insight
  // Slider hanya dijalankan pada halaman yang memiliki data-product-slider.
  // ---------------------------------------------------------------------------
  const productSlider = document.querySelector("[data-product-slider]");
  if (productSlider) {
    // Setiap data berisi [nomor halaman PDF, nama produk].
    // Nomor halaman juga dipakai untuk menentukan nama file gambar.
    const products = [
      [2, "LED Videotron Indoor"],
      [3, "LED Videotron Outdoor"],
      [4, "LED Videowall"],
      [5, "Fine Pixel Pitch LED Display"],
      [6, "Wallmount Digital Signage"],
      [7, "LED Banner"],
      [8, "LED Transparent"],
      [9, "Standing Kiosk"],
      [10, "Table Kiosk"],
      [11, "PTZ Video Camera Conference"],
      [12, "Conference Webcam"],
      [13, "Wireless Mic Conference"],
      [14, "LED All in One"],
      [15, "Interactive Flat Panel"],
      [16, "Smart Podium"],
      [17, "Mesin Antrian"],
      [18, "Video Processor"],
      [19, "Speaker"],
      [20, "HDMI Extender"],
      [21, "HDMI Cable"],
      [22, "Mini PC & OPS"],
      [23, "Bracket"]
    ];
    // Ambil elemen-elemen slider menggunakan atribut data-* dari produk.html.
    const image = productSlider.querySelector("[data-product-image]");
    const link = productSlider.querySelector("[data-product-link]");
    const title = productSlider.querySelector("[data-product-title]");
    const indexLabel = productSlider.querySelector("[data-product-index]");
    const progress = productSlider.querySelector("[data-product-progress]");
    const previous = productSlider.querySelector("[data-product-prev]");
    const next = productSlider.querySelector("[data-product-next]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeIndex = 0;
    let autoPlay;
    let transitionTimer;
    let touchStartX = 0;

    // Memuat gambar berikutnya lebih awal agar perpindahan slide terasa cepat.
    const preloadNext = () => {
      const [page] = products[(activeIndex + 1) % products.length];
      const preload = new Image();
      preload.src = `assets/images/insight/insight-product-${String(page).padStart(2, "0")}.jpg`;
    };

    // Mengganti gambar, judul, tautan PDF, nomor slide, dan progress bar.
    const renderProduct = (newIndex) => {
      activeIndex = (newIndex + products.length) % products.length;
      const targetIndex = activeIndex;
      const [page, productName] = products[targetIndex];
      window.clearTimeout(transitionTimer);
      image.classList.add("opacity-0");

      transitionTimer = window.setTimeout(() => {
        image.src = `assets/images/insight/insight-product-${String(page).padStart(2, "0")}.jpg`;
        image.alt = `${productName} Insight`;
        link.href = `INSIGHT%20Product%20%23Katalog%20%23Rev_02.pdf#page=${page}`;
        link.setAttribute("aria-label", `Buka ${productName} di katalog Insight`);
        title.textContent = productName;
        indexLabel.textContent = `${String(targetIndex + 1).padStart(2, "0")} / ${products.length}`;
        progress.style.transform = `scaleX(${(targetIndex + 1) / products.length})`;
        image.classList.remove("opacity-0");
        preloadNext();
      }, prefersReducedMotion ? 0 : 160);
    };

    // Autoplay dimatikan jika pengguna memilih "reduce motion" di perangkatnya.
    const stopAutoPlay = () => window.clearInterval(autoPlay);
    const startAutoPlay = () => {
      stopAutoPlay();
      if (!prefersReducedMotion) autoPlay = window.setInterval(() => renderProduct(activeIndex + 1), 5000);
    };
    const move = (direction) => {
      renderProduct(activeIndex + direction);
      startAutoPlay();
    };

    // Dukungan tombol, keyboard, mouse, fokus, dan gestur geser pada layar sentuh.
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    productSlider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    });
    productSlider.addEventListener("mouseenter", stopAutoPlay);
    productSlider.addEventListener("mouseleave", startAutoPlay);
    productSlider.addEventListener("focusin", stopAutoPlay);
    productSlider.addEventListener("focusout", startAutoPlay);
    productSlider.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
      stopAutoPlay();
    }, { passive: true });
    productSlider.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
      else startAutoPlay();
    }, { passive: true });

    preloadNext();
    startAutoPlay();
  }

});
