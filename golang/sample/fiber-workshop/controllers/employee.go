package controllers

import (
	"fiber-workshop/database"
	"fiber-workshop/models"
	m "fiber-workshop/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// _____________________________________________ search

func CountAgeGroups(c *fiber.Ctx) error {
	db := database.DBConn

	var genZCount, genYCount, genXCount, babyBoomerCount, giGenerationCount int64

	db.Model(&m.Employee{}).Where("age < ?", 25).Count(&genZCount)
	db.Model(&m.Employee{}).Where("age BETWEEN ? AND ?", 25, 40).Count(&genYCount)
	db.Model(&m.Employee{}).Where("age BETWEEN ? AND ?", 41, 55).Count(&genXCount)
	db.Model(&m.Employee{}).Where("age BETWEEN ? AND ?", 56, 75).Count(&babyBoomerCount)
	db.Model(&m.Employee{}).Where("age > ?", 75).Count(&giGenerationCount)

	result := m.AgeGroupCount{
		GenZ:         genZCount,
		GenY:         genYCount,
		GenX:         genXCount,
		BabyBoomer:   babyBoomerCount,
		GIGeneration: giGenerationCount,
	}

	return c.Status(200).JSON(result)
}

func SearchEmployees(c *fiber.Ctx) error {
	query := c.Query("search")

	if query == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Search query is required",
		})
	}

	var employees []models.Employee

	// Use the Gorm 'Where' clause to filter based on employee_id, name, and lastname
	result := database.DBConn.Where("employee_id = ? OR name LIKE ? OR lastname LIKE ?", query, "%"+query+"%", "%"+query+"%").Find(&employees)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "No matching records found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(employees)
}

// _____________________________________________ crud

func CreateEmployee(c *fiber.Ctx) error {
	employee := new(m.Employee)

	if err := c.BodyParser(employee); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid request payload",
		})
	}

	database.DBConn.Create(&employee)

	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Employee created successfully",
		"data":  employee,
	})
}

func ReadEmployees(c *fiber.Ctx) error {
	var employees []m.Employee
	database.DBConn.Find(&employees)

	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Employees retrieved successfully",
		"data":  employees,
	})
}

func ReadEmployee(c *fiber.Ctx) error {
	employeeID := c.Params("id")
	var employee m.Employee

	result := database.DBConn.First(&employee, employeeID)
	if result.Error == gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "Employee not found",
		})
	} else if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Error retrieving employee",
		})
	}

	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Employee retrieved successfully",
		"data":  employee,
	})
}

func UpdateEmployee(c *fiber.Ctx) error {
	employeeID := c.Params("id")
	var employee m.Employee

	result := database.DBConn.First(&employee, employeeID)
	if result.Error == gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "Employee not found",
		})
	} else if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Error retrieving employee",
		})
	}

	updatedEmployee := new(m.Employee)

	if err := c.BodyParser(updatedEmployee); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid request payload",
		})
	}

	// Update fields
	employee.Name = updatedEmployee.Name
	employee.LastName = updatedEmployee.LastName
	employee.Birthday = updatedEmployee.Birthday
	employee.Age = updatedEmployee.Age
	employee.Email = updatedEmployee.Email
	employee.Tel = updatedEmployee.Tel

	database.DBConn.Save(&employee)

	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Employee updated successfully",
		"data":  employee,
	})
}

func DeleteEmployee(c *fiber.Ctx) error {
	employeeID := c.Params("id")
	var employee m.Employee

	result := database.DBConn.First(&employee, employeeID)
	if result.Error == gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   "Employee not found",
		})
	} else if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   "Error retrieving employee",
		})
	}

	database.DBConn.Delete(&employee)

	return c.JSON(fiber.Map{
		"error": false,
		"msg":   "Employee deleted successfully",
	})
}
