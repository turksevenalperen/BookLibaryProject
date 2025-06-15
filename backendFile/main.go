package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/turksevenalperen/book-library/db"
	_ "github.com/turksevenalperen/book-library/docs" // Swagger docs
	"github.com/turksevenalperen/book-library/routes"
)

// @title Book Library API
// @version 1.0
// @description CRUD API for managing a book library.
// @host localhost:8080
// @BasePath /

func main() {
	_ = godotenv.Load()

	db.Connect()

	r := routes.SetupRouter()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf(" Server running on port %s", port)
	r.Run(":" + port)
}
