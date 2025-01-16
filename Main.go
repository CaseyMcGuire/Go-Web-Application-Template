package main

import (
	"fmt"
	"gameboard/src/build"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		build.RunWebpack()
		_, err := fmt.Fprintf(w, "Hello Go!")
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
