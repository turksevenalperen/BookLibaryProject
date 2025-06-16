# Book Library Project

A modern, full-featured CRUD application for managing your personal book collection. The project consists of a Next.js & TypeScript frontend, a RESTful backend written in Go, and a PostgreSQL database. It also includes a special URL cleanup and redirection service.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project-Structure](#project-structure)
- [Installation](#installation)
- [Tests](#tests)
- [API-Endpoints](#api-endpoints)
- [Swagger](#swagger)
- [Screenshots](#screenshots)
- [Notes](#notes)

---

## Features

- Add, edit, delete, and view book details (CRUD)
- Modern, user-friendly interface (Next.js + shadcn/ui)
- Modal forms, client-side validation, search & filter
- Grid and list view, badge, alert, skeleton loading animations
- Global state management with Context API
- Error and success notifications (sonner)
- Interactive API documentation with Swagger/OpenAPI
- Advanced logging and error handling
- URL cleanup & redirection service (POST /process-url)
- Persistent data storage with PostgreSQL
- Comprehensive backend and service tests

---

## Technologies

### Frontend
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)  
  Components used:  
  `Alert`, `Badge`, `Button`, `Card`, `Input`, `Label`, `Select`, `Skeleton`, `Textarea`
- [sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- [lucide-react](https://lucide.dev/) (Icons)
- Context API (global state)
- Fetch API

### Backend
- [Go (Golang)](https://go.dev/)
- [Gin](https://gin-gonic.com/) (REST API)
- [sqlx](https://jmoiron.github.io/sqlx/) (PostgreSQL connection)
- [Swagger (swaggo)](https://github.com/swaggo/gin-swagger) (API docs)
- [godotenv](https://github.com/joho/godotenv) (.env management)
- [PostgreSQL](https://www.postgresql.org/) (database ,Railway)
- Unit tests (Go test framework)

---

## Project-Structure

```
BookLibraryProject/
│
├── backend/
│   ├── db/
│   ├── handler/
│   ├── models/
│   ├── routes/
│   ├── docs/
│   ├── main.go
│   ├── go.mod
│   └── .env
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── app/
│   ├── utils/
│   ├── public/
│   ├── styles/
│   └── package.json 
│   ├── lib/
└── README.md
└── setup.bat
└── setup.sh


```

---

## Installation

### 1. Database Setup

Create the table in PostgreSQL:

```sql
CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    detail TEXT
);
```

### 2. Backend (Go) Setup

```bash
cd backend
cp .env.example .env   # or edit .env directly
go mod tidy
go run main.go
```
- API runs at `http://localhost:8080/books`
- Swagger docs: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)
![Ekran görüntüsü 2025-06-15 092842](https://github.com/user-attachments/assets/bcc5afad-e851-4109-9e1f-b474a6941f36)


  




### 3. Frontend (Next.js) Setup

```bash
cd frontend
npm install
npm run dev
```
- App runs at `http://localhost:3000`
- API URL is set as `http://localhost:8080/books` in `.env.local` or directly in code.

---

## Tests

### Backend Tests

```bash
cd backend
go test ./...
```
- Includes unit tests for CRUD endpoints and URL service.
- Tests use the database specified in `.env`.

---

## API-Endpoints

### Book CRUD

| Method | URL            | Description           |
|--------|----------------|----------------------|
| GET    | `/books`       | Get all books        |
| POST   | `/books`       | Add a new book       |
| GET    | `/books/{id}`  | Get book by ID       |
| PUT    | `/books/{id}`  | Update book by ID    |
| DELETE | `/books/{id}`  | Delete book by ID    |

#### Example: Add Book

```json
POST /books
{
  "title": "Les Misérables",
  "author": "Victor Hugo",
  "year": 1862,
  "detail": "A masterpiece of French literature."
}
```

#### Example: Response

```json
{
  "id": 1,
  "title": "Les Misérables",
  "author": "Victor Hugo",
  "year": 1862,
  "detail": "A masterpiece of French literature."
}
```
![Ekran görüntüsü 2025-06-15 093215](https://github.com/user-attachments/assets/bde1d34a-5185-4939-8210-ccb415e6f7f0)
![Ekran görüntüsü 2025-06-15 093256](https://github.com/user-attachments/assets/9bec8a4a-07b2-4844-bba6-2efc11bf469a)





### URL Cleanup & Redirection Service

| Method | URL            | Description                   |
|--------|----------------|------------------------------|
| POST   | `/process-url` | URL cleanup/redirection      |

#### Example Request

```json
POST /process-url
{
  "url": "https://BYFOOD.com/food-EXPeriences?query=abc/",
  "operation": "all"
}
```

#### Example Response

```json
{
  "processed_url": "https://www.byfood.com/food-experiences"
}
```

---
![Ekran görüntüsü 2025-06-15 093550](https://github.com/user-attachments/assets/3de8687f-67bd-48de-8b8c-baa87c6196a4)
![Ekran görüntüsü 2025-06-15 093626](https://github.com/user-attachments/assets/7cc4aabf-1695-445e-9bb2-7c873aa1d5da)



## Swagger

- Interactive API documentation:  
  [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

---

## Screenshots
-VIEW OF THE PAGE AND BACKEND VİEW WHEN THERE IS NO BOOK 

![Ekran görüntüsü 2025-06-15 093834](https://github.com/user-attachments/assets/5d1c8a06-9ad2-4d81-9338-0862ba8cafd6)
![Ekran görüntüsü 2025-06-15 093923](https://github.com/user-attachments/assets/02dd23cc-d562-4e01-8255-2d2a902d3cfa)


-ADD NEW BOOK
![Ekran görüntüsü 2025-06-15 094133](https://github.com/user-attachments/assets/c10bb3c7-27fa-41ce-b90f-0143a5e0d05d)
![Ekran görüntüsü 2025-06-15 094152](https://github.com/user-attachments/assets/0236b17d-dcb9-40d3-931d-4690b3830291)
![Ekran görüntüsü 2025-06-15 094255](https://github.com/user-attachments/assets/30f11909-e9bc-4d0b-8c36-a5b138fb1f4b)
![Ekran görüntüsü 2025-06-15 094440](https://github.com/user-attachments/assets/bba62304-77ec-4d72-885f-0fd9f20bbdfb)
![Ekran görüntüsü 2025-06-15 094506](https://github.com/user-attachments/assets/51c1f576-e3d5-428c-a0c0-141eeb45756a)
![Ekran görüntüsü 2025-06-15 094541](https://github.com/user-attachments/assets/91a95f73-74fc-4e9c-9a3b-23df4768b1f0)

-BOOK/[ID]PAGE.TSX DYNAMICALLY GOES TO THE DETAİLS OF THE BOOK

![Ekran görüntüsü 2025-06-15 094723](https://github.com/user-attachments/assets/2ef46d2d-1b40-4c90-8dc2-e48fdc52fd5b)

-EDIT BOOK

Before

![Ekran görüntüsü 2025-06-15 094944](https://github.com/user-attachments/assets/aa25e462-ba40-44f9-94f2-8b1946c00704)
![Ekran görüntüsü 2025-06-15 095032](https://github.com/user-attachments/assets/bb0307f9-d4f9-4a6e-bb99-5ba990a865cf)


After

DELETE THE DETAİL PART

![Ekran görüntüsü 2025-06-15 095144](https://github.com/user-attachments/assets/d8f0a4c3-a01a-4054-8f52-bef8cefe09bf)
![Ekran görüntüsü 2025-06-15 095227](https://github.com/user-attachments/assets/0e4293de-24b4-4776-ada2-33fa163d20c9)

DELETE BOOK

Before

![Ekran görüntüsü 2025-06-15 095314](https://github.com/user-attachments/assets/5c8d2da7-a5ba-4aa5-9336-732d2c3c9bfd)
![Ekran görüntüsü 2025-06-15 095334](https://github.com/user-attachments/assets/d48437db-4438-44e1-a488-17c980e4af88)

After

![Ekran görüntüsü 2025-06-15 095415](https://github.com/user-attachments/assets/42407146-a6cb-402f-8b12-e73f9a57bd53)


![Ekran görüntüsü 2025-06-15 101818](https://github.com/user-attachments/assets/15df59af-6229-4060-b972-4a55f825077d)



-TEST RESULTS

![Ekran görüntüsü 2025-06-15 101923](https://github.com/user-attachments/assets/b6013b08-14e1-4418-b4b3-25342154204a)





















---

