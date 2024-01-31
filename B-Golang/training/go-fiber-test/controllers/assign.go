package controllers

import (
	"fmt"
	"math/big"
	"regexp"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// _____________________________________________ factorial

// คำนวณ factorial ของตัวเลขที่รับเข้ามาผ่านพารามิเตอร์ใน request
func FactorialHandler(c *fiber.Ctx) error {
	// ดึงค่าตัวเลขที่จะคำนวณ factorial จากพารามิเตอร์ใน request
	numStr := c.Params("num")

	// แปลงการแสดงสตริงของตัวเลขให้เป็นจำนวนเต็ม
	num, err := strconv.Atoi(numStr)
	if err != nil {

		// หากไม่สามารถแปลงเป็นตัวเลขได้ จะส่ง response กลับให้ client ว่ามีข้อผิดพลาด
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid number provided",
		})
	}

	// เรียกใช้ฟังก์ชัน Factorial เพื่อคำนวณ factorial ของตัวเลขที่รับมา
	result := Factorial(num)

	return c.JSON(fiber.Map{
		"number":    num,
		"factorial": result,
	})
}

// คำนวณ factorial ของตัวเลขที่รับเข้ามา
func Factorial(n int) *big.Int {
	// หากตัวเลขน้อยกว่า 0 จะคืนค่า 0 เนื่องจาก factorial ของตัวเลขลบไม่ได้
	if n < 0 {
		return big.NewInt(0)
	}

	// สร้าง big.Int เพื่อเก็บผลลัพธ์และกำหนดค่าเริ่มต้นเป็น 1
	result := big.NewInt(1)

	// ทำการคูณเลขทุกตัวตั้งแต่ 2 ถึง n เพื่อคำนวณ factorial
	for i := 2; i <= n; i++ {
		result.Mul(result, big.NewInt(int64(i)))
	}

	return result
}

// _____________________________________________ nickname

func NicknameHandler(c *fiber.Ctx) error {
	// ดึงค่า nickname จากพารามิเตอร์ใน request
	nickname := c.Params("nickname")

	// ดึงค่า tax_id จาก query parameter ใน request
	taxID := c.Query("tax_id")

	var response string

	// ตรวจสอบว่ามี tax_id ถูกส่งมาหรือไม่
	if taxID != "" {
		// ถ้ามี tax_id ให้เรียกใช้ฟังก์ชัน convertToASCII เพื่อแปลงค่า tax_id ให้เป็น ASCII representation
		asciiValues := convertToASCII(taxID)
		// สร้างข้อความ response ที่รวม nickname และ ASCII representation ของ tax_id
		response = fmt.Sprintf("%s → %s", nickname, asciiValues)
	} else {
		// ถ้าไม่มี tax_id ให้สร้างข้อความ response ที่ทักทาย nickname
		response = fmt.Sprintf("Hello, %s!", nickname)
	}

	// ส่ง response กลับให้ client
	return c.SendString(response)
}

// แปลง string เป็น ASCII representation
func convertToASCII(s string) string {
	var result string
	// วนลูปผ่านทุกตัวอักษรใน string
	for _, char := range s {
		// แปลงแต่ละตัวอักษรเป็น ASCII code และเก็บไว้ในตัวแปร result
		result += strconv.Itoa(int(char)) + " "
	}
	// ลบช่องว่างท้ายสุดของ result
	return result[:len(result)-1]
}

// _____________________________________________ registration

// 6.api method POST สมัครสมาชิก ดักฟิลข้อมูลให้ถูกต้อง localhost:3000/api/v1/register และถ้าใส่ข้อมูลไม่ถูกต้องให้โชว์ใส่ข้อมูลผิดพลาด
// ---
// email * ใช้อักษรภาษาอังกฤษ (a-z), (A-Z), ตัวเลข (0-9), และเครื่องหมาย (_), (-) เท่านั้น เช่น Example_01
// username
// password * ความยาว 6-20 ตัวอักษร
// line_id
// phone
// business_type
// website * 2-30 ตัวอักษร ต้องเป็นตัวอักษรภาษาอังกฤษตัวเล็ก(a-z) ตัวเลข(0-9) ห้ามใช้เครื่องหมายอักขระพิเศษ ยกเว้นเครื่อหมายขีด(-) ห้ามเว้นวรรคและห้ามใช้ภาษาไทย

func RegistrationHandler(c *fiber.Ctx) error {
	// สร้างโครงสร้าง RegistrationRequest เพื่อรับข้อมูลลงทะเบียนจาก request body
	type RegistrationRequest struct {
		Email        string `json:"email"`
		Username     string `json:"username"`
		Password     string `json:"password"`
		LineID       string `json:"line_id"`
		Phone        string `json:"phone"`
		BusinessType string `json:"business_type"`
		Website      string `json:"website"`
	}

	request := new(RegistrationRequest)
	// แปลง request body เป็น struct ของ RegistrationRequest
	if err := c.BodyParser(request); err != nil {
		// หากไม่สามารถแปลง request body ได้ ให้ส่ง response กลับว่ารูปแบบ request ไม่ถูกต้อง
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request format"})
	}

	// ตรวจสอบความถูกต้องของ email
	if !isValidEmail(request.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid email format"})
	}

	// ตรวจสอบความถูกต้องของ username
	if !isValidUsername(request.Username) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid username format"})
	}

	// ตรวจสอบความยาวของ password
	if len(request.Password) < 6 || len(request.Password) > 20 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid password length"})
	}

	// ตรวจสอบความถูกต้องของ Line ID, Phone, Business Type, และ Website
	if !isValidInput(request.LineID) ||
		!isValidInput(request.Phone) ||
		!isValidInput(request.BusinessType) ||
		!isValidWebsite(request.Website) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input format"})
	}

	return c.JSON(fiber.Map{"message": "Registration successful"})
}

// isValidEmail ใช้ตรวจสอบว่ารูปแบบ email ถูกต้องหรือไม่
func isValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// isValidUsername ใช้ตรวจสอบว่ารูปแบบ username ถูกต้องหรือไม่
func isValidUsername(username string) bool {
	usernameRegex := regexp.MustCompile(`^[a-zA-Z0-9_-]{6,20}$`)
	return usernameRegex.MatchString(username)
}

// isValidInput ใช้ตรวจสอบว่ารูปแบบของ input ถูกต้องหรือไม่
func isValidInput(input string) bool {
	inputRegex := regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)
	return inputRegex.MatchString(input)
}

// isValidWebsite ใช้ตรวจสอบว่ารูปแบบของ website ถูกต้องหรือไม่
func isValidWebsite(website string) bool {
	websiteRegex := regexp.MustCompile(`^[a-z0-9_-]{2,30}$`)
	return websiteRegex.MatchString(website)
}
