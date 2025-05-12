package controllers

import (
	ent "gowebtemplate/src/server/db/ent/codegen"
	"gowebtemplate/src/server/services"
	"gowebtemplate/src/server/util"
	"gowebtemplate/src/server/views"
	"net/http"
)

type UserController struct {
	userService    *services.UserService
	sessionManager *util.UserSessionManager
}

func (u *UserController) HandleLogin(w http.ResponseWriter, r *http.Request) {
	isLoggedIn, err := u.sessionManager.IsUserLoggedIn(r)
	if err != nil {
		http.Redirect(w, r, "/500", http.StatusInternalServerError)
		return
	}
	if isLoggedIn {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == http.MethodGet {
		views.ReactPage("Login", "index").Render(w)
		return
	} else if r.Method == http.MethodPost {
		email := r.FormValue("email")
		password := r.FormValue("password")
		user, err := u.userService.GetUserWithPassword(r.Context(), email, password)
		if err != nil {
			http.Redirect(w, r, "/500", http.StatusInternalServerError)
			return
		}

		if user != nil {
			sessionErr := u.sessionManager.LogInUser(w, r, user.ID)
			if sessionErr == nil {
				http.Redirect(w, r, "/", http.StatusOK)
			} else {
				http.Error(w, sessionErr.Error(), http.StatusInternalServerError)
			}
		} else {
			http.Redirect(w, r, "/login?no_such_user=true", http.StatusFound)
		}
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (u *UserController) HandleRegister(w http.ResponseWriter, r *http.Request) {
	isLoggedIn, err := u.sessionManager.IsUserLoggedIn(r)
	if err != nil {
		http.Redirect(w, r, "/500", http.StatusInternalServerError)
		return
	}
	if isLoggedIn {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	if r.Method == http.MethodGet {
		views.ReactPage("Register", "index").Render(w)
		return
	} else if r.Method == http.MethodPost {
		email := r.FormValue("email")
		password := r.FormValue("password")
		exists, err := u.userService.UserExists(r.Context(), email)
		if err != nil {
			http.Redirect(w, r, "/500", http.StatusInternalServerError)
		} else if exists {
			http.Redirect(w, r, "/register?error=username_already_taken", http.StatusSeeOther)
		} else {
			_, err := u.userService.CreateUser(r.Context(), email, password)
			if err != nil {
				http.Error(w, "Something went wrong. Please try again", http.StatusInternalServerError)
			} else {
				http.Redirect(w, r, "/login", http.StatusFound)
			}
		}
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (u *UserController) HandleLogout(w http.ResponseWriter, r *http.Request) {
	err := u.sessionManager.LogoutUser(w, r)
	if err != nil {
		http.Redirect(w, r, "/500", http.StatusInternalServerError)
	} else {
		http.Redirect(w, r, "/", http.StatusFound)
	}
}

func NewUserController(
	dbClient *ent.Client,
	userSession *util.UserSessionManager,
) *UserController {
	return &UserController{
		userService: services.NewUserService(
			dbClient,
		),
		sessionManager: userSession,
	}
}
