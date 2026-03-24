# REST API Mahasiswa

Project ini merupakan implementasi REST API sederhana menggunakan Node.js dan Express.js dengan data dummy (array) tanpa database.

---

## ▶️ Cara Menjalankan Project

1. Buka terminal / CMD
2. Masuk ke folder project:

```
cd rest-api
```

3. Install dependency:

```
npm install
```

4. Jalankan server:

```
npm start
```

5. Server akan berjalan di:

```
http://localhost:3000
```

---

## 📸 Screenshot Menjalankan Server

![SERVER](images/server.png)


---

## 📡 Endpoint API

### 1. Home

Endpoint ini digunakan untuk memastikan bahwa server berjalan dengan baik.
Jika endpoint ini diakses, server akan memberikan response sederhana berupa pesan teks.

**GET /**
Response:

```
API Mahasiswa berjalan
```
![HOME](images/home.png)

---

### 2. GET Semua Mahasiswa

**GET /students**

Endpoint ini digunakan untuk menampilkan seluruh data mahasiswa yang tersimpan dalam array.
Data akan ditampilkan dalam format JSON.

Response:

```json
[
  {
    "id": 1,
    "nama": "Andi",
    "jurusan": "Informatika"
  },
  {
    "id": 2,
    "nama": "Budi",
    "jurusan": "Sistem Informasi"
  },
  {
    "id": 3,
    "nama": "Citra",
    "jurusan": "Teknik Komputer"
  }
]
```

![GET](images/get.png)

---

### 3. GET Mahasiswa Berdasarkan ID

**GET /students/:id**

Endpoint ini digunakan untuk mengambil data mahasiswa berdasarkan ID tertentu.
ID dikirim melalui parameter URL.

Contoh:

```
/students/1
```

Response:

```
{
    "id": 1,
    "nama": "Andi",
    "jurusan": "Informatika"
}
```

![GET ID ADA](images/get-id-ada.png)


Tampilan Response jika data tidak ada:

```
Mahasiswa tidak ditemukan
```

![GET ID TIDAK ADA](images/get-id-tidak.png)


---

### 4. POST Tambah Mahasiswa

**POST /students**

Endpoint ini digunakan untuk menambahkan data mahasiswa baru ke dalam array.
Data dikirim melalui body request dalam format JSON.

Body JSON:

```json
{
  "nama": "Dewi",
  "jurusan": "Informatika"
}
```

![POST](images/post.png)

---

### 5. PUT Update Mahasiswa

**PUT /students/:id**

Endpoint ini digunakan untuk memperbarui data mahasiswa berdasarkan ID.
Data baru dikirim melalui body request.

Body JSON:

```json
{
  "nama": "Andi Update",
  "jurusan": "Informatika"
}
```

![PUT](images/put.png)

---

### 6. DELETE Mahasiswa Berdasarkan ID

**DELETE /students/:id**

Endpoint ini digunakan untuk menghapus data mahasiswa berdasarkan ID.

Contoh:

```
DELETE /students/2
```

Jika berhasil, data akan dihapus dari array dan ditampilkan sebagai response.


![DELETE](images/delete.png)

![GET AFTER DELETE](images/get-after-delete.png)

---

## 📮 Postman Collection

Project ini juga menyediakan file Postman Collection untuk memudahkan pengujian API.

Langkah penggunaan:
1. Buka Postman
2. Klik Import
3. Pilih file `postman_collection.json`
4. Pastikan variable:
   base_url = http://localhost:3000
5. Jalankan server terlebih dahulu

## 💻 Penjelasan Kode

### 1. Import dan Inisialisasi Express

```javascript
const express = require("express");
const app = express();
const PORT = 3000;
```

Pada bagian ini, kita mengimpor framework Express.js yang digunakan untuk membuat server.
Kemudian dibuat instance aplikasi dengan express() dan menentukan port server yaitu 3000.

---

### 2. Middleware JSON

```javascript
app.use(express.json());
```

Middleware ini berfungsi untuk membaca data **JSON** dari request body, terutama saat menggunakan metode **POST** dan **PUT**.

---

### 3. Data Dummy

```javascript
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
];
```

Data mahasiswa disimpan dalam bentuk array (tanpa database).
Data ini akan digunakan untuk proses **CRUD (Create, Read, Update, Delete)**.

---

### 4. Endpoint Home

```javascript
app.get("/", (req, res) => {
  res.send("API Mahasiswa berjalan");
});
```

Endpoint ini digunakan untuk mengecek apakah server berjalan dengan baik.
Jika diakses, akan menampilkan pesan:

```
API Mahasiswa berjalan
```

---

### 5. GET Semua Mahasiswa

```javascript
app.get("/students", (req, res) => {
  res.json(students);
});
```

Endpoint ini digunakan untuk menampilkan seluruh data mahasiswa dalam format JSON.

---

### 6. GET Mahasiswa Berdasarkan ID

```javascript
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).send("Mahasiswa tidak ditemukan");
  }

  res.json(student);
});
```

* Mengambil parameter `id` dari URL
* Mencari data mahasiswa berdasarkan ID
* Jika tidak ditemukan → menampilkan pesan error
* Jika ditemukan → menampilkan data mahasiswa

---

### 7. POST (Tambah Data Mahasiswa)

```javascript
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
```

Penjelasan:

* Mengambil data nama dan jurusan dari request body
* Melakukan validasi agar tidak kosong
* Membuat ID baru secara otomatis
* Menambahkan data ke array
* Mengembalikan data yang berhasil ditambahkan dengan status 201 (Created)

---

### 8. PUT (Update Data Mahasiswa)

```javascript
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
```

Penjelasan:

* Mengambil ID dari parameter URL
* Mencari index data mahasiswa
* Jika tidak ditemukan → error 404
* Melakukan validasi input
* Memperbarui data mahasiswa
* Mengembalikan data terbaru

---

### 9. DELETE (Hapus Data Mahasiswa)

```javascript
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).send("Mahasiswa tidak ditemukan");
  }

  const deleted = students.splice(index, 1);

  res.json(deleted[0]);
});
```

Penjelasan:

* Mengambil ID dari URL
* Mencari data berdasarkan ID
* Jika tidak ditemukan → error
* Menghapus data dari array
* Mengembalikan data yang telah dihapus

---

### 10. Menjalankan Server

```javascript
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
```

Kode ini digunakan untuk menjalankan server pada port **3000**.
Jika berhasil, akan muncul pesan di terminal:

```
Server berjalan di http://localhost:3000
```

---

## 📌 Deskripsi

API ini dibuat untuk mengelola data mahasiswa dengan fitur:

* Menampilkan semua data mahasiswa
* Menampilkan data berdasarkan ID
* Menambahkan data mahasiswa
* Mengupdate data mahasiswa
* Menghapus data mahasiswa

---

## 🛠️ Teknologi

* Node.js
* Express.js

---

## 📁 Struktur Project

```
rest-api
├── images
├── app.js
├── package.json
├── package-lock.json
├── postman_collection.json
├── README.md
└── .gitignore
```

---

## Kesimpulan

Project ini berhasil membuat REST API sederhana menggunakan Express.js dengan fitur CRUD (Create, Read, Update, Delete) dan telah diuji menggunakan Postman.

---


## 👨‍💻 Author

Nama: Lita Alentina  
NIM: 23552011097  
Kelas: TIF K 23B
