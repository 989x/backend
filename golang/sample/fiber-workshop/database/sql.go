package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	_ "gorm.io/driver/mysql"
	"gorm.io/gorm"

	m "fiber-workshop/models"
)

var (
	DBConn *gorm.DB
)

func InitDatabase() {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true&loc=Local",
		"root",
		"secret",
		"127.0.0.1",
		"3306",
		"golang_test",
	)
	var err error
	DBConn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	fmt.Println("Database connected!")
	DBConn.AutoMigrate(&m.Dogs{})
	DBConn.AutoMigrate(&m.Company{})
	DBConn.AutoMigrate(&m.Employee{})
}
