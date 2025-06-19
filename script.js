// Fungsi untuk menampilkan hewan berdasarkan kategori
function loadAnimalsByCategory(category) {
    const container = document.getElementById("animals-container");
    const ref = database.ref("animals/" + category);
  
    ref.once("value", (snapshot) => {
      container.innerHTML = "";
      const data = snapshot.val();
  
      if (data) {
        Object.keys(data).forEach((key, index) => {
          const animal = data[key];
  
          const card = document.createElement("div");
          card.className = "animal-card" + (index % 2 === 0 ? "" : " dark");
          card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}" />
            <div class="animal-info">
              <h3>${animal.name}</h3>
              <p>${animal.gender}</p>
              <p>${animal.age}</p>
              <p>📍 ${animal.alamat}</p>
            </div>
          `;
          container.appendChild(card);
        });
  
        // Jalankan filter jika sedang ada input pencarian
        const keyword = document.getElementById("searchInput").value.toLowerCase();
        if (keyword) filterCards(keyword);
  
      } else {
        container.innerHTML = "<p>Tidak ada data hewan di kategori ini.</p>";
      }
    });
  }
  
  // Fungsi untuk menampilkan semua hewan dari semua kategori
  function loadAllAnimals() {
    const container = document.getElementById("animals-container");
    const allRef = database.ref("animals");
  
    allRef.once("value", (snapshot) => {
      container.innerHTML = "";
      const allCategories = snapshot.val();
  
      if (allCategories) {
        let index = 0;
  
        Object.keys(allCategories).forEach((category) => {
          const animals = allCategories[category];
          Object.keys(animals).forEach((key) => {
            const animal = animals[key];
  
            const card = document.createElement("div");
            card.className = "animal-card" + (index % 2 === 0 ? "" : " dark");
            card.innerHTML = `
              <img src="${animal.image}" alt="${animal.name}" />
              <div class="animal-info">
                <h3>${animal.name}</h3>
                <p>${animal.gender}</p>
                <p>${animal.age}</p>
                <p>📍 ${animal.alamat}</p>
              </div>
            `;
            container.appendChild(card);
            index++;
          });
        });
  
        const keyword = document.getElementById("searchInput").value.toLowerCase();
        if (keyword) filterCards(keyword);
  
      } else {
        container.innerHTML = "<p>Tidak ada data hewan ditemukan.</p>";
      }
    });
  }
  
  // Fungsi pencarian (berbasis nama, gender, umur, lokasi)
  function filterCards(keyword) {
    const cards = document.querySelectorAll(".animal-card");
    cards.forEach(card => {
      const info = card.querySelector(".animal-info");
      const name = info.querySelector("h3").textContent.toLowerCase();
      const gender = info.querySelectorAll("p")[0].textContent.toLowerCase();
      const age = info.querySelectorAll("p")[1].textContent.toLowerCase();
      const location = info.querySelectorAll("p")[2].textContent.toLowerCase();
  
      const text = `${name} ${gender} ${age} ${location}`;
      if (text.includes(keyword)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  // DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    // Default tampilkan kategori kucing
    loadAnimalsByCategory("kucing");
  
    const buttons = document.querySelectorAll("#category-buttons button");
    const searchInput = document.getElementById("searchInput");
  
    // Event: Klik kategori
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const kategori = button.textContent.toLowerCase();
  
        if (kategori === "semua") {
          loadAllAnimals();
        } else {
          loadAnimalsByCategory(kategori);
        }
  
        // Gaya aktif tombol
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });
  
    // Event: Input pencarian
    searchInput.addEventListener("input", function () {
      const keyword = searchInput.value.toLowerCase();
      filterCards(keyword);
    });
  });
  const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

// Cek preferensi awal dari localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleButton.textContent = "☀️";
}

// Toggle saat tombol diklik
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
