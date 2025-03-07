package services

import "errors"

type UserService struct {
	store map[string]string
}

type User struct {
	Username string
}

func (u UserService) CreateUser(username string, password string) (error, *User) {
	password, exists := u.store[username]
	if exists {
		return errors.New("User with that username already exists"), nil
	} else {
		u.store[username] = password
		return nil, &User{
			Username: username,
		}
	}
}

func (u UserService) UserExists(username string) bool {
	_, exists := u.store[username]
	return exists
}

func (u UserService) UserWithPasswordExists(username string, password string) bool {
	storedPassword, exists := u.store[username]
	if !exists {
		return false
	}
	return storedPassword == password
}
