package main

import (
	"fmt"
	"gameboard/src/server/build"
	"gameboard/src/server/controllers"
	"gameboard/src/server/views"
	"log"
	"net/http"
)

func main() {

	build.RunWebpack()

	// serve static assets from `/assets`
	fs := http.FileServer(http.Dir("src/assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))
	userController := controllers.NewUserController()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		foo := views.ReactPage("Foo", "index")
		err := foo.Render(w)
		if err != nil {
			return
		}
	})

	http.HandleFunc("/login", userController.HandleLogin)
	http.HandleFunc("/register", userController.HandleRegister)
	http.HandleFunc("/logout", userController.HandleLogout)

	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		log.Fatal("Failed starting server")
		return
	}
	fmt.Printf("Server started...")
}
