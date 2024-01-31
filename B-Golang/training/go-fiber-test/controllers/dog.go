package controllers

import (
	"go-fiber-test/database"
	m "go-fiber-test/models"
	"strings"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// _____________________________________________ lib

func DogIDGreaterThan100(db *gorm.DB) *gorm.DB {
	return db.Where("dog_id > ?", 100)
}

func DogIDGreaterThan50LessThan100(db *gorm.DB) *gorm.DB {
	return db.Where("dog_id > ? AND dog_id < ?", 50, 100)
}

// _____________________________________________ assign

func GetDogsGreaterThan50LessThan100(c *fiber.Ctx) error {
	db := database.DBConn
	var dogs []m.Dogs

	// Apply the DogIDGreaterThan50LessThan100 scope
	db.Scopes(DogIDGreaterThan50LessThan100).Find(&dogs)

	return c.Status(200).JSON(dogs)
}

func GetDogsSum(c *fiber.Ctx) error {
	db := database.DBConn
	var dogs []m.Dogs

	// Fetch all dogs from the database
	db.Find(&dogs)

	// Calculate sums based on color categories
	sumRed := 0
	sumGreen := 0
	sumPink := 0
	sumNoColor := 0

	for _, dog := range dogs {
		switch {
		case dog.DogID > 10 && dog.DogID <= 50:
			sumRed++
		case dog.DogID > 100 && dog.DogID <= 150:
			sumGreen++
		case dog.DogID > 200 && dog.DogID <= 250:
			sumPink++
		default:
			sumNoColor++
		}
	}

	// Prepare the response
	response := fiber.Map{
		"count":       len(dogs),
		"data":        dogs,
		"name":        "golang-test",
		"sum_red":     sumRed,
		"sum_green":   sumGreen,
		"sum_pink":    sumPink,
		"sum_nocolor": sumNoColor,
	}

	return c.Status(200).JSON(response)
}

func SoftRemoveDog(c *fiber.Ctx) error {
	db := database.DBConn
	id := c.Params("id")

	var dog m.Dogs
	if err := db.First(&dog, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Dog not found"})
	}

	if err := db.Delete(&dog).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to soft remove the dog"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Dog soft removed successfully"})
}

// GetSoftRemovedDogs retrieves dogs that have been soft removed
func GetSoftRemovedDogs(c *fiber.Ctx) error {
	db := database.DBConn
	var softRemovedDogs []m.Dogs

	// Fetch dogs that have been soft removed (DeletedAt is not null)
	db.Unscoped().Where("deleted_at IS NOT NULL").Find(&softRemovedDogs)

	return c.Status(200).JSON(softRemovedDogs)
}

// _____________________________________________ request

func GetDogs(c *fiber.Ctx) error {
	db := database.DBConn
	var dogs []m.Dogs

	// Apply the DogIDGreaterThan100 scope
	db.Scopes(DogIDGreaterThan100).Find(&dogs)

	return c.Status(200).JSON(dogs)
}

func GetDog(c *fiber.Ctx) error {
	db := database.DBConn
	search := strings.TrimSpace(c.Query("search"))
	var dog []m.Dogs

	result := db.Find(&dog, "dog_id = ?", search)

	// returns found records count, equals `len(users)
	if result.RowsAffected == 0 {
		return c.SendStatus(404)
	}
	return c.Status(200).JSON(&dog)
}

func AddDog(c *fiber.Ctx) error {
	//twst3
	db := database.DBConn
	var dog m.Dogs

	if err := c.BodyParser(&dog); err != nil {
		return c.Status(503).SendString(err.Error())
	}

	db.Create(&dog)
	return c.Status(201).JSON(dog)
}

func UpdateDog(c *fiber.Ctx) error {
	db := database.DBConn
	var dog m.Dogs
	id := c.Params("id")

	if err := c.BodyParser(&dog); err != nil {
		return c.Status(503).SendString(err.Error())
	}

	db.Where("id = ?", id).Updates(&dog)
	return c.Status(200).JSON(dog)
}

func RemoveDog(c *fiber.Ctx) error {
	db := database.DBConn
	id := c.Params("id")
	var dog m.Dogs

	result := db.Delete(&dog, id)

	if result.RowsAffected == 0 {
		return c.SendStatus(404)
	}

	return c.SendStatus(200)
}

func GetDogsJson(c *fiber.Ctx) error {
	db := database.DBConn
	var dogs []m.Dogs

	db.Find(&dogs)

	var dataResults []m.DogsRes
	for _, v := range dogs { //1 inet 112 //2 inet1 113
		typeStr := ""
		if v.DogID == 1 {
			typeStr = "red"
		} else if v.DogID == 2 {
			typeStr = "green"
		} else if v.DogID == 3 {
			typeStr = "pink"
		} else {
			typeStr = "no color"
		}

		d := m.DogsRes{
			Name:  v.Name,  //inet1
			DogID: v.DogID, //113
			Type:  typeStr, //green
		}
		dataResults = append(dataResults, d)
		// sumAmount += v.Amount
	}

	r := m.ResultData{
		Data:  dataResults,
		Name:  "golang-test",
		Count: len(dogs),
	}
	return c.Status(200).JSON(r)
}
