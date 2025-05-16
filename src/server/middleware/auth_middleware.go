package middleware

import (
	"context"
	"gowebtemplate/src/server/util"
	"net/http"
)

func AuthMiddleware(next http.Handler, u *util.UserSessionManager) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Check if the user is authenticated
		isLoggedIn, loggedInErr := u.IsUserLoggedIn(r)
		userId, userIdErr := u.GetUserId(r)
		if loggedInErr != nil || userIdErr != nil {
			http.Redirect(w, r, "/500", http.StatusInternalServerError)
			return
		} else if !isLoggedIn || userId == -1 {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), "userID", userId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
