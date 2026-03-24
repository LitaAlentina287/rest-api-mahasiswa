const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Data dummy
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
];

// 1. Home
app.get("/", (req, res) => {
  res.send("API Mahasiswa berjalan");
});

// 2. GET semua
app.get("/students", (req, res) => {
  res.json(students);
});

// 3. GET by ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).send("Mahasiswa tidak ditemukan");
  }

  res.json(student);
});

// 4. POST
app.post("/students", (req, res) => {
  const { nama, jurusan } = req.body;

  if (!nama || !jurusan) {
    return res.status(400).send("Nama dan jurusan wajib diisi");
  }

  const newId =
    students.length > 0 ? students[students.length - 1].id + 1 : 1;

  const newStudent = {
    id: newId,
    nama,
    jurusan,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// 5. PUT
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, jurusan } = req.body;

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).send("Mahasiswa tidak ditemukan");
  }

  if (!nama || !jurusan) {
    return res.status(400).send("Nama dan jurusan wajib diisi");
  }

  students[index] = { id, nama, jurusan };

  res.json(students[index]);
});

// 6. DELETE
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).send("Mahasiswa tidak ditemukan");
  }

  const deleted = students.splice(index, 1);

  res.json(deleted[0]);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});