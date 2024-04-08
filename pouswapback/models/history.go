package models

import "gorm.io/gorm"

type History struct {
	gorm.Model
	In        string  `json:"in"`  // Token in
	Out       string  `json:"out"` // Token out
	AmountIn  float32 `json:"amount_in"`
	AmountOut float32 `json:"amount_out"`
	Price     float32 `json:"price"` // Price of token in / token out // TODO : a voir si on le laisse
	Timestamp int64   `json:"timestamp"`
	UserID    uint    `json:"user_id"`
}
