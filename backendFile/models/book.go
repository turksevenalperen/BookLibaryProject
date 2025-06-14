package models

type Book struct {
	ID     int    `db:"id" json:"id" example:"1"`
	Title  string `db:"title" json:"title" example:"Sefiller"`
	Author string `db:"author" json:"author" example:"Victor Hugo"`
	Year   int    `db:"year" json:"year" example:"1862"`
}
