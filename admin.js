const db = firebase.database();
const form = document.getElementById("animalForm");
const list = document.getElementById("animalList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: form.name.value,
    age: form.age.value,
    gender: form.gender.value,
    weight: form.weight.value,
    alamat: form.alamat.value,
    image: form.image.value,
    deskripsi: form.deskripsi.value,
    nomor: form.nomor.value
  };

  const category = form.category.value;
  const id = form.animalId.value;

  db.ref(`animals/${category}/${id}`).set(data).then(() => {
    alert("Data berhasil disimpan!");
    form.reset();
    loadAnimals();
  });
});

function loadAnimals() {
  list.innerHTML = "";
  db.ref("animals").once("value", (snapshot) => {
    const data = snapshot.val();
    for (const category in data) {
      for (const id in data[category]) {
        const animal = data[category][id];
        const item = document.createElement("div");
        item.className = "animal-item";
        item.innerHTML = `
          <strong>${animal.name}</strong> (${category}/${id})<br>
          ${animal.gender}, ${animal.age}, ${animal.weight}<br>
          📍 ${animal.alamat}<br>
          <div class="actions">
            <button onclick="editAnimal('${category}', '${id}')">Edit</button>
            <button onclick="deleteAnimal('${category}', '${id}')">Hapus</button>
          </div>
        `;
        list.appendChild(item);
      }
    }
  });
}

function editAnimal(category, id) {
  db.ref(`animals/${category}/${id}`).once("value", (snapshot) => {
    const data = snapshot.val();
    form.category.value = category;
    form.animalId.value = id;
    form.name.value = data.name || "";
    form.age.value = data.age || "";
    form.gender.value = data.gender || "";
    form.weight.value = data.weight || "";
    form.alamat.value = data.alamat || "";
    form.image.value = data.image || "";
    form.deskripsi.value = data.deskripsi || "";
    form.nomor.value = data.nomor || "";
  });
}

function deleteAnimal(category, id) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    db.ref(`animals/${category}/${id}`).remove().then(() => {
      alert("Data berhasil dihapus!");
      loadAnimals();
    });
  }
}

document.addEventListener("DOMContentLoaded", loadAnimals);
