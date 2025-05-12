package util

import (
	"github.com/gorilla/sessions"
	"net/http"
)

type UserSessionManager struct {
	cookieStore *sessions.CookieStore
}

var (
	authenticatedKey = "authenticatedKey"
	userIDKey        = "UserID"
	userSessionKey   = "userSessionKey"
)

func (u *UserSessionManager) IsUserLoggedIn(r *http.Request) (bool, error) {
	session, err := u.cookieStore.Get(r, userSessionKey)
	if err != nil {
		return false, err
	}
	auth, ok := session.Values[authenticatedKey].(bool)
	return ok && auth, nil
}

func (u *UserSessionManager) GetUserId(r *http.Request) (int, error) {
	session, err := u.cookieStore.Get(r, userSessionKey)
	if err != nil {
		return -1, err
	}
	if authenticated, found := session.Values[authenticatedKey].(bool); !found || !authenticated {
		return -1, nil
	}
	userID, ok := session.Values[userSessionKey].(int)
	if !ok {
		return -1, nil
	}
	return userID, nil
}

func (u *UserSessionManager) LogInUser(w http.ResponseWriter, r *http.Request, userId int) error {
	session, err := u.cookieStore.Get(r, userSessionKey)
	if err != nil {
		return err
	}
	session.Values = make(map[interface{}]interface{})
	session.Values[authenticatedKey] = true
	session.Values[userIDKey] = userId
	return session.Save(r, w)
}

func (u *UserSessionManager) LogoutUser(w http.ResponseWriter, r *http.Request) error {
	session, err := u.cookieStore.Get(r, userSessionKey)
	if err != nil {
		return err
	}
	// Set MaxAge to -1 to delete the cookie
	session.Options.MaxAge = -1
	delete(session.Values, authenticatedKey)
	delete(session.Values, userIDKey)
	return session.Save(r, w)
}

func NewUserSessionManager(
	store *sessions.CookieStore,
) *UserSessionManager {
	return &UserSessionManager{
		cookieStore: store,
	}
}
