package handler

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/turksevenalperen/book-library/db"
	"github.com/turksevenalperen/book-library/models"
)

// @Summary Get all books
// @Produce json
// @Success 200 {array} models.Book
// @Router /books [get]
func GetBooks(c *gin.Context) {
	var books []models.Book
	err := db.DB.Select(&books, "SELECT * FROM book")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	if books == nil {
		books = []models.Book{}
	}
	c.JSON(http.StatusOK, books)
}

// @Summary Add a new book
// @Accept json
// @Produce json
// @Param book body models.Book true "Book to add"
// @Success 201 {object} models.Book
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /books [post]
func CreateBook(c *gin.Context) {
	var book models.Book

	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON provided"})
		return
	}

	if book.Title == "" || book.Author == "" || book.Year == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	query := `INSERT INTO book (title, author, year, detail) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.DB.QueryRow(query, book.Title, book.Author, book.Year, book.Detail).Scan(&book.ID)

	if err != nil {
		log.Printf("Kitap eklenirken hata: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not insert book"})
		return
	}

	c.JSON(http.StatusCreated, book)
}

// @Summary Get a book by ID
// @Produce json
// @Param id path int true "Book ID"
// @Success 200 {object} models.Book
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /books/{id} [get]
func GetBookByID(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	err := db.DB.Get(&book, "SELECT * FROM book WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	c.JSON(http.StatusOK, book)
}

// @Summary Update a book by ID
// @Accept json
// @Produce json
// @Param id path int true "Book ID"
// @Param book body models.Book true "Book data to update"
// @Success 200 {object} models.Book
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /books/{id} [put]
func UpdateBook(c *gin.Context) {
	id := c.Param("id")
	var book models.Book

	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON provided"})
		return
	}

	if book.Title == "" || book.Author == "" || book.Year == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	query := `UPDATE book SET title=$1, author=$2, year=$3, detail=$4 WHERE id=$5`
	res, err := db.DB.Exec(query, book.Title, book.Author, book.Year, book.Detail, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update book"})
		return
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	book.ID = atoi(id)
	c.JSON(http.StatusOK, book)
}

func atoi(s string) int {
	i, _ := strconv.Atoi(s)
	return i
}

// @Summary Delete a book by ID
// @Produce json
// @Param id path int true "Book ID"
// @Success 204 "No Content"
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /books/{id} [delete]
func DeleteBook(c *gin.Context) {
	id := c.Param("id")

	res, err := db.DB.Exec("DELETE FROM book WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete book"})
		return
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
