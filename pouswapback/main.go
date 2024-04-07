package main

import (
	"fmt"
	"os"
	"time"

	controllers "pouswapback/controllers"
	db "pouswapback/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

func main() {

	setLog()
	log.Info("Starting server...")

	app := fiber.New(fiber.Config{})
	config := NewConfig()

	db.ConnectDatabase(config.DbHost, config.DbUser, config.DbPassword, config.DbName, config.DbPort)

	app.Route("/users", func(api fiber.Router) {
		api.Get("/", controllers.GetAllUsers).Name("getAll")
		api.Post("/add", controllers.AddUser).Name("add")
		api.Get("/getByPK", controllers.GetUserByPK).Name("getByPK")
	})

	app.Listen(":3000")

}

func setLog() {
	fmt.Println("setLog: ", time.Now().UTC().Format("2006-01-02"))
	logFileName := fmt.Sprintf("logs/log-%s.log", time.Now().UTC().Format("2006-01-02"))
	file, err := os.OpenFile(logFileName, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666) // 0666 = CHMOD
	if err != nil {
		log.Panic("setLog: ", err)
		return
	}
	log.SetOutput(file) // changer l'outpout pour dire qu'on print plus dans la console mais dans le fichier
}
