package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	PublicKey string `json:"public_key"`
	Signature string `json:"signature"`
	Role      string `json:"role"`
	Status    string `json:"status"`
}
