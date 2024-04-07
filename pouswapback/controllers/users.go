package controllers

import (
	db "pouswapback/database"
	"pouswapback/models"

	"github.com/gofiber/fiber/v2"
)

func AddUser(c *fiber.Ctx) error {
	user := models.User{PublicKey: "0x...", Role: "admin"} // change to the request body
	err := db.DB.CreateUser(user)
	if err != nil {
		return c.SendString(err.Error())
	}
	return c.SendString("User added successfully")
}

func GetUserByPK(c *fiber.Ctx) error {
	user, err := db.DB.GetUserByPublicKey("0x...")
	if err != nil {
		return c.SendString(err.Error())
	}
	return c.JSON(user)
}

func GetAllUsers(c *fiber.Ctx) error {
	users, err := db.DB.GetAllUsers()
	if err != nil {
		return c.SendString(err.Error())
	}
	return c.JSON(users)
}
