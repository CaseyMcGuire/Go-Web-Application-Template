package controllers

import (
	"fmt"
	"gameboard/src/server/services"
	"gameboard/src/server/views"
	"github.com/gorilla/sessions"
	"net/http"
)

type UserController struct {
	userService services.UserService
}

var (
	store         = sessions.NewCookieStore([]byte("secret-key"))
	authenticated = "authenticated"
)

func (u *UserController) HandleLogin(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user_session")
	if auth, ok := session.Values[authenticated].(bool); ok && auth {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == http.MethodGet {
		views.ReactPage("Login", "index").Render(w)
		return
	} else if r.Method == http.MethodPost {
		email := r.FormValue("email")
		password := r.FormValue("password")

		if u.userService.UserWithPasswordExists(email, password) {
			session.Values[authenticated] = true
			sessionErr := session.Save(r, w)
			if sessionErr == nil {
				http.Redirect(w, r, "/", http.StatusOK)
			} else {
				http.Error(w, sessionErr.Error(), http.StatusInternalServerError)
			}
		} else {
			http.Redirect(w, r, "/login?no_such_user=true", http.StatusFound)
		}
	} else {
		panic(fmt.Sprintf("Unsupported HTTP method: %s", r.Method))
	}
}

func (u *UserController) HandleRegister(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user_session")
	if auth, ok := session.Values[authenticated].(bool); ok && auth {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == http.MethodGet {
		views.ReactPage("Register", "index").Render(w)
		return
	} else if r.Method == http.MethodPost {
		username := r.FormValue("email")
		password := r.FormValue("password")

		if u.userService.UserExists(username) {
			http.Redirect(w, r, "/register?error=username_already_taken", http.StatusSeeOther)
		} else {
			err, _ := u.userService.CreateUser(username, password)
			if err != nil {
				http.Error(w, "Something went wrong. Please try again", http.StatusInternalServerError)
			} else {
				http.Redirect(w, r, "/login", http.StatusFound)
			}
		}
	} else {
		panic(fmt.Sprintf("Unsupported HTTP method: %s", r.Method))
	}
}

func (u *UserController) HandleLogout(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "user_session")

	// Set MaxAge to -1 to delete the cookie
	session.Options.MaxAge = -1
	_ = session.Save(r, w)
	http.Redirect(w, r, "/", http.StatusFound)
}

func NewUserController() *UserController {
	return &UserController{
		userService: *services.NewUserService(),
	}
}
