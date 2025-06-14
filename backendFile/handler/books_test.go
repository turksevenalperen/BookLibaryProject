package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/turksevenalperen/book-library/models"
)

func TestCreateBookAndGetBooks(t *testing.T) {
	router := gin.Default()
	router.POST("/books", CreateBook)
	router.GET("/books", GetBooks)

	// Kitap ekle
	book := models.Book{Title: "Test Kitap", Author: "Test Yazar", Year: 2024}
	body, _ := json.Marshal(book)
	req := httptest.NewRequest("POST", "/books", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Fatalf("Beklenen 201, gelen %d", w.Code)
	}

	// Kitapları getir
	req2 := httptest.NewRequest("GET", "/books", nil)
	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)

	if w2.Code != http.StatusOK {
		t.Fatalf("Beklenen 200, gelen %d", w2.Code)
	}

	var books []models.Book
	if err := json.NewDecoder(w2.Body).Decode(&books); err != nil {
		t.Fatalf("Yanıt çözümlenemedi: %v", err)
	}
	if len(books) == 0 {
		t.Errorf("En az 1 kitap bekleniyordu, 0 geldi")
	}
}
