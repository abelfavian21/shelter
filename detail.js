const data = JSON.parse(localStorage.getItem("selectedAnimal"));

if (data) {
  document.getElementById("animalImage").src = data.image;
  document.getElementById("animalName").textContent = data.name;
  document.getElementById("animalGender").textContent = data.gender;
  document.getElementById("animalAge").textContent = data.age;
  document.getElementById("animalWeight").textContent = data.weight || "-";
  document.getElementById("animalLocation").textContent = `📍 ${data.alamat || "-"}`;
  document.getElementById("animalDescription").textContent = data.deskripsi || "Tidak ada deskripsi.";
} else {
  document.body.innerHTML = "<p style='text-align:center;'>Data hewan tidak ditemukan.</p>";
}

// Tombol kembali
document.getElementById("backButton").addEventListener("click", () => {
  window.history.back();
});

// Dark mode toggle
const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

// Load preferensi dari localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleButton.textContent = "☀️";
}

// Toggle saat klik
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleButton.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleButton.textContent = "🌙";
  }
});
const waButton = document.getElementById("waAdoptBtn");

if (data && waButton) {
  const phone = data.nomor || "628000000000"; // fallback jika tidak ada
  const message = `Halo, saya tertarik mengadopsi hewan bernama ${data.name}. Bisa minta informasi lebih lanjut?`;

  const encodedMessage = encodeURIComponent(message);
  const waLink = `https://wa.me/${phone}?text=${encodedMessage}`;
  
  waButton.href = waLink;
}

