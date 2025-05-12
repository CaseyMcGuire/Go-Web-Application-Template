package build

import (
	"encoding/hex"
	"github.com/gorilla/sessions"
	"log"
	"net/http"
	"os"
)

func CreateCookieStore() *sessions.CookieStore {
	authKey := os.Getenv("SESSION_AUTH_KEY")             // For authentication (HMAC)
	encryptionKey := os.Getenv("SESSION_ENCRYPTION_KEY") // For encryption (AES)

	if len(authKey) == 0 || len(encryptionKey) == 0 {
		log.Fatalf("SESSION_AUTH_KEY and/or SESSION_ENCRYPTION_KEY environment variables are not set.")
	}

	decodedAuthKey, authErr := hex.DecodeString(authKey)
	decodedEncryptionKey, encryptionErr := hex.DecodeString(encryptionKey)
	if authErr != nil || encryptionErr != nil {
		log.Fatalf("SESSION_AUTH_KEY and/or SESSION_ENCRYPTION_KEY failed during decoding")
	}

	store := sessions.NewCookieStore(
		decodedAuthKey,
		decodedEncryptionKey,
	)

	store.Options = &sessions.Options{
		Path:     "/",       // Apply to whole site
		MaxAge:   86400 * 7, // 7 days
		HttpOnly: true,      // Prevent JavaScript access to the cookie
		Secure:   true,      // Only send cookie over HTTPS
		SameSite: http.SameSiteLaxMode,
	}
	// For local development without HTTPS
	if os.Getenv("APP_ENV") != "production" {
		store.Options.Secure = false
	}
	return store
}
