package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/turksevenalperen/book-library/db"
	"github.com/turksevenalperen/book-library/models"
)

// Loads the .env file and initializes the database connection before running tests
func TestMain(m *testing.M) {
	err := godotenv.Load("../.env")
	println("godotenv.Load() error:", err)
	println("Loaded DATABASE_URL:", os.Getenv("DATABASE_URL"))
	f, ferr := os.Open(".env")
	if ferr != nil {
		println(".env file could not be opened:", ferr.Error())
	} else {
		println(".env file opened successfully.")
		f.Close()
	}
	db.Connect()
	code := m.Run()
	os.Exit(code)
}

func TestCreateBookAndGetBooks(t *testing.T) {
	router := gin.Default()
	router.POST("/books", CreateBook)
	router.GET("/books", GetBooks)

	// Add a book
	book := models.Book{Title: "Test Book", Author: "Test Author", Year: 2024}
	body, _ := json.Marshal(book)
	req := httptest.NewRequest("POST", "/books", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf("Expected 201, got %d", w.Code)
	}

	// Get all books
	req2 := httptest.NewRequest("GET", "/books", nil)
	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)

	if w2.Code != http.StatusOK {
		t.Fatalf("Expected 200, got %d", w2.Code)
	}

	var books []models.Book
	if err := json.NewDecoder(w2.Body).Decode(&books); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}
	if len(books) == 0 {
		t.Errorf("Expected at least 1 book, got 0")
	}
}
