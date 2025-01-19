package main

import (
	"gameboard/src/server/build"
	"html/template"
	"log"
	"net/http"
)

func main() {

	build.RunWebpack()

	// serve static assets from `/assets`
	fs := http.FileServer(http.Dir("src/assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		tmpl := template.Must(
			template.ParseFiles("src/server/views/ReactPage.html"))
		tmpl.Execute(w, ReactPageData{
			Title:      "Hello Go",
			BundleName: "index",
		})
	})
	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatal("Failed starting server")
		return
	}
}

type ReactPageData struct {
	Title      string
	BundleName string
}
