package controllers

import (
	"errors"
	"fiber-workshop/database"
	m "fiber-workshop/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateCompany(c *fiber.Ctx) error {
	db := database.DBConn
	company := new(m.Company)

	if err := c.BodyParser(company); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Error parsing request body"})
	}

	result := db.Create(&company)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error creating company"})
	}

	return c.JSON(company)
}

func GetCompanies(c *fiber.Ctx) error {
	db := database.DBConn
	companies := []m.Company{}

	result := db.Find(&companies)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error retrieving companies"})
	}

	return c.JSON(companies)
}

func GetCompany(c *fiber.Ctx) error {
	db := database.DBConn
	company := new(m.Company)
	companyID := c.Params("id")

	result := db.First(&company, companyID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Company not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error retrieving company"})
	}

	return c.JSON(company)
}

func UpdateCompany(c *fiber.Ctx) error {
	db := database.DBConn
	company := new(m.Company)
	companyID := c.Params("id")

	if err := c.BodyParser(&company); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Error parsing request body"})
	}

	result := db.Model(&company).Where("id = ?", companyID).Updates(&company)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error updating company"})
	}

	return c.JSON(company)
}

func DeleteCompany(c *fiber.Ctx) error {
	db := database.DBConn
	company := new(m.Company)
	companyID := c.Params("id")

	result := db.Delete(&company, companyID)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error deleting company"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
