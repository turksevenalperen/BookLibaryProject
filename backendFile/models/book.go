package models

type Book struct {
	ID     int    `db:"id" json:"id"`
	Title  string `db:"title" json:"title"`
	Author string `db:"author" json:"author"`
	Year   int    `db:"year" json:"year"`
	Detail string `db:"detail" json:"detail"`
}
