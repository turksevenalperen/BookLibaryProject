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
- [License](#license)

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
- [PostgreSQL](https://www.postgresql.org/) (database)
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
│   ├── pages/ or app/
│   ├── utils/
│   ├── public/
│   ├── styles/
│   └── package.json
│
└── README.md
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

- API runs at `http://localhost:8080`
- Swagger docs: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)
- ![image](https://github.com/user-attachments/assets/70ea31f1-969f-475c-9574-61b3f1b206fb)

### 3. Frontend (Next.js) Setup

```bash
cd frontend
npm install
npm run dev
```

- App runs at `http://localhost:3000`
- API URL is set as `http://localhost:8080` in `.env.local` or directly in code.

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

| Method | URL           | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/books`      | Get all books     |
| POST   | `/books`      | Add a new book    |
| GET    | `/books/{id}` | Get book by ID    |
| PUT    | `/books/{id}` | Update book by ID |
| DELETE | `/books/{id}` | Delete book by ID |

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

![image](https://github.com/user-attachments/assets/0c58033b-4deb-41fd-93aa-6f790845e004)
![image](https://github.com/user-attachments/assets/3054410b-b966-474b-99cb-ca7c4537ee9b)

### URL Cleanup & Redirection Service

| Method | URL            | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/process-url` | URL cleanup/redirection |

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

![image](https://github.com/user-attachments/assets/322cc2e3-3f98-42e4-a1ed-aa542318021b)
![image](https://github.com/user-attachments/assets/2e65dba2-7420-4695-979b-d548d61fd7d6)

## Swagger

- Interactive API documentation:  
  [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

---

## Screenshots

-no book and backhand view
![image](https://github.com/user-attachments/assets/da3e87fa-6c41-4de1-af7f-bc149c4ea21f)
![image](https://github.com/user-attachments/assets/dfb6957c-2298-4047-9cb8-4a143f9aac6a)

-Add New Book
![image](https://github.com/user-attachments/assets/a7b4607f-9808-4f8f-8bbd-f2d376295a51)
![image](https://github.com/user-attachments/assets/61bf1701-a073-42c9-8318-1325740993fe)
![image](https://github.com/user-attachments/assets/e1909c92-77c9-4427-b653-f010731fb29c)
![image](https://github.com/user-attachments/assets/560b9413-c2f8-442b-8ed7-b01533344b5a)
![image](https://github.com/user-attachments/assets/eab41f57-1399-4719-87bb-552550bdc72e)
![image](https://github.com/user-attachments/assets/b5d9ef88-2085-4a8a-85a6-05dd147d9f77)

-Book/[id]/page.tsx dynamically goes to the details of the book

![image](https://github.com/user-attachments/assets/b43c9704-f8d1-426b-bd89-e698bec9b3a7)

-Edit Book

Before

![image](https://github.com/user-attachments/assets/7dbe6a38-adc3-4e2c-a7f5-b3f998b9668e)
![image](https://github.com/user-attachments/assets/4ce92bac-3b0c-4932-9530-62197b583fe2)

After

-delete the detail part

![image](https://github.com/user-attachments/assets/fffff86f-aa85-454e-b15f-776519434bb5)
![image](https://github.com/user-attachments/assets/e3ebb718-fcdf-43f4-85b8-00c56d53f498)

-Delete Book

Before

![image](https://github.com/user-attachments/assets/f650089d-62ba-40ee-8875-00b09594d4be)
![image](https://github.com/user-attachments/assets/21081e3f-2f1f-47c1-b393-bb97a011426d)

After

![image](https://github.com/user-attachments/assets/b09ad9c7-08ef-4f44-aa1c-143ed4455e3b)

![image](https://github.com/user-attachments/assets/13f1e946-e749-43e7-be37-8722a0c0d41f)

-Test results

![image](https://github.com/user-attachments/assets/c166a901-2298-4972-af2b-28de5e3554d3)

---

## Notes

- The frontend uses [shadcn/ui](https://ui.shadcn.com/) components:  
  `Alert`, `Badge`, `Button`, `Card`, `Input`, `Label`, `Select`, `Skeleton`, `Textarea`
- All error and success messages are visually displayed to the user.
- Both frontend and backend are easy to test and develop.
- The project can be easily dockerized and deployed to the cloud.

---

## License

Pull requests and contributions are welcome!  
Open source under the MIT License.
