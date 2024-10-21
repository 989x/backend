package controllers

import (
	"net/http"
	"outsource-management/api/configs"
	"outsource-management/api/helpers"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetMonthlyAttendance(c *fiber.Ctx) error {
	// Get query parameters
	yearFromStr := c.Query("start_year")
	yearToStr := c.Query("end_year")
	monthFromStr := c.Query("start_month")
	monthToStr := c.Query("end_month")

	// Initialize start and end years and months to search
	startYear := 0
	endYear := time.Now().Year()
	startMonth := time.January
	endMonth := time.December

	// Convert query parameters to integers if they are not empty
	if yearFromStr != "" {
		yearFrom, err := strconv.Atoi(yearFromStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid 'year_from' parameter",
			})
		}
		startYear = yearFrom
	}

	if yearToStr != "" {
		yearTo, err := strconv.Atoi(yearToStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid 'year_to' parameter",
			})
		}
		endYear = yearTo
	}

	if monthFromStr != "" {
		monthFrom, err := strconv.Atoi(monthFromStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid 'month_from' parameter",
			})
		}
		startMonth = time.Month(monthFrom)
	}

	if monthToStr != "" {
		monthTo, err := strconv.Atoi(monthToStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid 'month_to' parameter",
			})
		}
		endMonth = time.Month(monthTo)
	}

	// MongoDB collection and context
	collection := configs.MgConn.Db.Collection("staffs")
	context := configs.MgConn.Ctx

	// Define filter for querying
	filter := bson.M{}

	// Add conditions to filter based on years and months
	if startYear > 0 && endYear > 0 {
		// Iterate over years within the range
		for year := startYear; year <= endYear; year++ {
			startDate := time.Date(year, startMonth, 1, 0, 0, 0, 0, time.UTC)
			endDate := time.Date(year, endMonth+1, 0, 23, 59, 59, 0, time.UTC)

			// Create a filter for each year within the range
			yearFilter := bson.M{
				"start_date": bson.M{
					"$gte": startDate,
					"$lte": endDate,
				},
			}

			// Merge the year filter with the main filter using "$or" operator
			if filter["$or"] == nil {
				filter["$or"] = bson.A{yearFilter}
			} else {
				filter["$or"] = append(filter["$or"].(bson.A), yearFilter)
			}
		}
	}

	// Count total staffs
	totalStaffs, err := collection.CountDocuments(context, filter)
	if err != nil {
		return err
	}

	// Aggregation pipeline to count employees per month
	pipeline := bson.A{
		bson.M{
			"$match": filter,
		},
		bson.M{
			"$group": bson.M{
				"_id": bson.M{
					"$dateToString": bson.M{
						"format": "%Y-%m",
						"date":   "$start_date",
					},
				},
				"count": bson.M{"$sum": 1},
			},
		},
		bson.M{
			"$sort": bson.M{"_id": 1},
		},
	}

	// Perform aggregation
	cursor, err := collection.Aggregate(context, pipeline)
	if err != nil {
		return err
	}
	defer cursor.Close(context)

	// Store the results in a map
	monthlyCounts := make(map[string]int)
	for cursor.Next(context) {
		var result struct {
			Month string `bson:"_id"`
			Count int    `bson:"count"`
		}
		if err := cursor.Decode(&result); err != nil {
			return err
		}
		monthlyCounts[result.Month] = result.Count
	}

	response := map[string]interface{}{
		"total_staffs":   totalStaffs,
		"monthly_counts": monthlyCounts,
	}
	return helpers.JsonResponse(c, nil, 200, response, "Monthly Employee Attendance")
}
