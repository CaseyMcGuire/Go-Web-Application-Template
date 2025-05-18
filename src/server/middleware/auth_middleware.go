package middleware

import (
	"context"
	"gowebtemplate/src/server/util"
	"net/http"
)

var (
	UserId = "UserId"
)

func AuthMiddleware(next http.Handler, u *util.UserSessionManager) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		isLoggedIn, loggedInErr := u.IsUserLoggedIn(r)
		if loggedInErr != nil {
			http.Redirect(w, r, "/500", http.StatusInternalServerError)
			return
		}

		userId, userIdErr := u.GetUserId(r)
		if userIdErr != nil {
			http.Redirect(w, r, "/500", http.StatusInternalServerError)
			return
		}

		if !isLoggedIn || userId == -1 {
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), UserId, userId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
