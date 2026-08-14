tailwind.config = {
  theme: {
    extend: {
      // Nama warna khusus ini dapat dipakai sebagai class Tailwind,
      // misalnya bg-magenta, text-cyan, atau border-line.
      colors: {
        ink: "#090909",
        navy: "#1B1B1B",
        cyan: "#55C3D8",
        magenta: "#EE0A6B",
        green: "#57B947",
        paper: "#F7F7F7",
        line: "#E2E2E2",
        muted: "#626262"
      },
      fontFamily: {
        // Browser memakai Inter jika tersedia, lalu beralih ke font sistem.
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        // Bayangan lembut untuk kartu dan tombol agar tetap ringan di latar terang.
        soft: "0 18px 55px rgba(9, 9, 9, 0.10)"
      }
    }
  }
};
