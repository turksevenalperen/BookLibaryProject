# Book Library Project

## Proje Hakkında

Bu proje, küçük bir kitap kütüphanesini yönetmek için geliştirilmiş tam kapsamlı bir CRUD uygulamasıdır.  
Frontend Next.js (React & TypeScript) ile, backend ise Golang ve PostgreSQL ile yazılmıştır.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Endpointleri](#api-endpointleri)
- [URL Cleanup Servisi](#url-cleanup-servisi)
- [Testler](#testler)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Proje Yapısı](#proje-yapısı)

---

## Özellikler

- Kitapları listeleme, ekleme, düzenleme, silme
- Kitap detaylarını görüntüleme (dinamik routing)
- Modal formlar ile kullanıcı dostu arayüz
- Context API ile global state yönetimi
- Form validasyonu ve hata mesajları
- Swagger/OpenAPI ile API dokümantasyonu
- URL cleanup & redirection servisi (backend)
- Unit testler (backend)
- Otomatik kurulum scriptleri (Windows & Linux)
- Tailwind CSS ile modern ve responsive arayüz

---

## Kurulum

### 1. Depoyu Klonla

```bash
git clone <repo-url>
cd BookLibraryProject
```

### 2. Otomatik Kurulum (Tavsiye Edilen)

#### Windows:

```powershell
.\setup.bat
```

#### Linux/Mac:

```bash
chmod +x setup.sh
./setup.sh
```

### 3. Veritabanı Kurulumu

- PostgreSQL kurulu olmalı.
- `backendFile/.env` dosyasındaki bilgileri kendi veritabanına göre düzenle.
- Örnek tablo oluşturma:
  ```sql
  CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL
  );
  ```

---

## Kullanım

### Backend’i Başlat

```bash
cd backendFile
go run main.go
```

### Frontend’i Başlat

```bash
cd frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8080](http://localhost:8080)
- Swagger API: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

---

## API Endpointleri

### Kitap CRUD

| Yöntem | Endpoint    | Açıklama            |
| ------ | ----------- | ------------------- |
| GET    | /books      | Tüm kitapları getir |
| POST   | /books      | Yeni kitap ekle     |
| GET    | /books/{id} | ID ile kitap getir  |
| PUT    | /books/{id} | Kitap güncelle      |
| DELETE | /books/{id} | Kitap sil           |

#### Örnek POST /books

```json
{
  "title": "Sefiller",
  "author": "Victor Hugo",
  "year": 1862
}
```

---

## URL Cleanup Servisi

| Yöntem | Endpoint     | Açıklama               |
| ------ | ------------ | ---------------------- |
| POST   | /process-url | URL temizleme/redirect |

#### Örnek İstek

```json
{
  "url": "https://BYFOOD.com/food-EXPeriences?query=abc/",
  "operation": "all"
}
```

#### Örnek Yanıt

```json
{
  "processed_url": "https://www.byfood.com/food-experiences"
}
```

---

## Testler

### Backend Testleri

```bash
cd backendFile
go test ./handler
```

### Frontend Testleri

> (Varsa eklediyseniz buraya ekleyin.)

---

## Ekran Görüntüleri

Aşağıda uygulamanın bazı ekran görüntüleri yer almaktadır:

> ![Dashboard](./screenshots/dashboard.png) > ![Kitap Ekle Modal](./screenshots/add-book-modal.png) > ![Kitap Detay](./screenshots/book-detail.png)

---

## Proje Yapısı

```
BookLibraryProject/
├── backendFile/
│   ├── handler/
│   ├── models/
│   ├── db/
│   ├── docs/
│   ├── main.go
│   ├── go.mod
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── app/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── setup.bat
├── setup.sh
├── README.md
└── screenshots/
```

---

## Katkı ve Lisans

- Katkıda bulunmak için PR gönderebilirsiniz.
- Lisans: MIT

---

Herhangi bir sorunda veya katkı için iletişime geçebilirsiniz!
