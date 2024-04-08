package models

import (
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	Name    string  `json:"name"`
	Symbole string  `json:"symbole"`
	Price   float32 `json:"price"`
	Volume  float32 `json:"volume"`
	Trades  int     `json:"trades"`
}
