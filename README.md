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

**GET /**
Response:

```
API Mahasiswa berjalan
```
![SERVER](images/home.png)

---

### 2. GET Semua Mahasiswa

**GET /students**

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

Body JSON:

```json
{
  "nama": "Andi Update",
  "jurusan": "Informatika"
}
```

![PUT](images/put.png)

---

### 6. DELETE Mahasiswa

**DELETE /students/:id**

Contoh:

```
DELETE /students/2
```

![DELETE](images/delete.png)

![GET AFTER DELETE](images/get-after-delete.png)

---

## 💻 Penjelasan Kode

### 1. Import dan Setup

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
```

Digunakan untuk mengaktifkan Express dan membaca data JSON.

---

### 2. Data Dummy

```javascript
let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" }
];
```

Data disimpan dalam array tanpa database.

---

### 3. Routing

Contoh GET:

```javascript
app.get("/students", (req, res) => {
  res.json(students);
});
```

Digunakan untuk mengambil semua data mahasiswa.

---

### 4. POST

Menambahkan data baru ke array.

---

### 5. PUT

Mengupdate data berdasarkan ID.

---

### 6. DELETE

Menghapus data dari array berdasarkan ID.

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
├── README.md
└── .gitignore
```

---

## Kesimpulan

Project ini berhasil membuat REST API sederhana menggunakan Express.js dengan fitur CRUD (Create, Read, Update, Delete) dan telah diuji menggunakan Postman.

---


Lita Alentina
23552011097
TIF K 23B
