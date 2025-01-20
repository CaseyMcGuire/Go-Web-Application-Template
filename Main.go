package main

import (
	"gameboard/src/server/build"
	"gameboard/src/server/views"
	"log"
	"net/http"
)

func main() {

	build.RunWebpack()

	// serve static assets from `/assets`
	fs := http.FileServer(http.Dir("src/assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		foo := views.ReactPage("Foo", "index")
		err := foo.Render(w)
		if err != nil {
			return
		}
	})

	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatal("Failed starting server")
		return
	}
}
