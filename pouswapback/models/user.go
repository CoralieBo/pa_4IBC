package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	PublicKey string `json:"public_key"`
	Role      string `json:"role"`
}
