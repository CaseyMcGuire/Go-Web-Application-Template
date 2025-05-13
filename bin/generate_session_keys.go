package main

import (
	"encoding/hex"
	"fmt"
	"log"

	"github.com/gorilla/securecookie"
)

func main() {
	authKey := securecookie.GenerateRandomKey(64)
	encryptionKey := securecookie.GenerateRandomKey(32)

	if authKey == nil || encryptionKey == nil {
		log.Fatal("Failed to generate keys")
	}

	fmt.Printf("SESSION_AUTH_KEY=%s\n", hex.EncodeToString(authKey))
	fmt.Printf("SESSION_ENCRYPTION_KEY=%s\n", hex.EncodeToString(encryptionKey))
}
