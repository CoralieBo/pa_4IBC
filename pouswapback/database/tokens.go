package db

import "pouswapback/models"

func (d *DatabasePostgres) CreateToken(token models.Token) error {
	result := d.Db.Create(&token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (d *DatabasePostgres) UpdateToken(token models.Token) error {
	result := d.Db.Save(&token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (d *DatabasePostgres) DeleteToken(token string) error {
	result := d.Db.Delete(&models.Token{}, token)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (d *DatabasePostgres) GetAllTokens() ([]models.Token, error) {
	var tokens []models.Token
	result := d.Db.Find(&tokens)
	if result.Error != nil {
		return tokens, result.Error
	}
	return tokens, nil
}
