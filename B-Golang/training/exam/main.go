// https://docs.google.com/document/d/1niYae1o_haIBO1a852P3qT1qTMH3XHZzqbW7s33VH-Y/edit

package main

import (
	"fmt"
	"strconv"
)

func main() {
	// exercise0()
	// exercise1()
	// exercise2()
	// exercise3()
	// exercise4()
	// exercise5()
	exercise6()
}

// :- Exercise 0 -:
// Example-: Switch case condition
// Two
func exercise0() {
	fmt.Println(":- Exercise 0 -:")
	switchToIf()
}

// :- Exercise 1 -:
// 3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78 81 84 87 90 93 96 99
// 1.1 Total numbers divisible by 3: 33
// 1.2 Result of 20^2 is: 400
func exercise1() {
	fmt.Println(":- Exercise 1 -:")

	// 1.1 ระหว่าง 1-100 มีเลขที่หาร 3 ลงตัวกี่ตัว อะไรบ้าง (for if)
	count := 0
	for i := 1; i <= 100; i++ {
		if i%3 == 0 {
			fmt.Printf("%d ", i)
			count++
		}
	}
	fmt.Printf("\n1.1 Total numbers divisible by 3: %d\n", count)

	// 1.2 สร้างฟังชั่นคำนวณเลขยกกำลัง เช่น num(20,2) (เรียกใช้เป็นฟังชั่น) ฝึกการใช้ฟังชั่น (หน้า34-35)
	result := power(20, 2)
	fmt.Printf("1.2 Result of 20^2 is: %d\n", result)
}

// :- Exercise 2 -:
// Minimum: 9
// Maximum: 97
func exercise2() {
	fmt.Println(":- Exercise 2 -:")
	x := []int{
		48, 96, 86, 68, 57, 82, 63, 70, 37, 34, 83, 27, 19, 97, 9, 17,
	}

	min, max := findMinMax(x)
	fmt.Printf("Minimum: %d\n", min)
	fmt.Printf("Maximum: %d\n", max)
}

// :- Exercise 3 -:
// The total number of occurrences of digit 9 is: 300
func exercise3() {
	fmt.Println(":- Exercise 3 -:")
	result := countDigit9(1000)
	fmt.Printf("The total number of occurrences of digit 9 is: %d\n", result)
}

// :- Exercise 4 -:
// Sorted Slice: [2 9 15 17 19 27 34 37 48 49 57 63 67 68 70 82 83 86 96 97 112 125 199 289]
func exercise4() {
	fmt.Println(":- Exercise 4 -:")

	// Input slice
	x := []int{
		48, 96, 86, 68,
		57, 82, 63, 70,
		37, 34, 83, 27,
		19, 97, 9, 17, 49, 199, 289, 2, 15, 67, 125, 112,
	}

	// Bubble sort
	bubbleSort(x)

	// Print the sorted slice
	fmt.Println("Sorted Slice:", x)
}

// :- Exercise 5 -:
// Name -: Mr. Tim Carry (Age: 25)
// Address -: 142rd roads, Virginir, 22202

// Name -: Ms. Laura McCoy (Age: 22)
// Address -: 123/western Street, New York, 12304

// Name -: Mr. John Doe (Age: 30)
// Address -: 456 Main Street, California, 56789

// Name -: Ms. Alice Smith (Age: 28)
// Address -: 789 Elm Avenue, Texas, 78901
func exercise5() {
	fmt.Println(":- Exercise 5 -:")

	// สร้าง map เพื่อจัดเก็บข้อมูลสำหรับบุคคลหลายคน
	personMap := make(map[string]Person)

	// เพิ่มข้อมูลสำหรับบุคคลลงใน map
	personMap["Tim Carry"] = Person{Name: "Mr. Tim Carry", Age: 25, Address: "142rd roads, Virginir, 22202"}
	personMap["Laura McCoy"] = Person{Name: "Ms. Laura McCoy", Age: 22, Address: "123/western Street, New York, 12304"}

	// เพิ่มข้อมูลเพิ่มเติม
	personMap["John Doe"] = Person{Name: "Mr. John Doe", Age: 30, Address: "456 Main Street, California, 56789"}
	personMap["Alice Smith"] = Person{Name: "Ms. Alice Smith", Age: 28, Address: "789 Elm Avenue, Texas, 78901"}

	// วนซ้ำบน map และแสดงรายละเอียด
	// for _, person := range personMap {
	// fmt.Printf("Name -: %s (Age: %d)\n", person.Name, person.Age)
	// fmt.Printf("Address -: %s\n\n", person.Address)
	// }

	fmt.Println("ans", personMap["John Doe"].Name)
}

// :- Exercise 6 -:
// Company Name: ABC Corporation
// Address: 123 Main Street, Cityville
// CEO: John Doe
// Revenue: $500000.00
func exercise6() {
	fmt.Println(":- Exercise 6 -:")

	// สร้างอินสแตนซ์ของโครงสร้างบริษัท
	myCompany := Company{
		Name:    "ABC Corporation",
		Address: "123 Main Street, Cityville",
		CEO:     "John Doe",
		Revenue: 500000,
	}

	// แสดงรายละเอียด
	printCompanyInfo(myCompany)
}

// ________________________________________ structures

// Exercise 5
// Person structure
type Person struct {
	Name    string
	Age     int
	Address string
}

// Exercise 6
// Company structure
type Company struct {
	Name    string
	Address string
	CEO     string
	Revenue float64
}

// ________________________________________ functions

// Exercise 0
func switchToIf() {
	i := 2
	fmt.Println("Example-: Switch case condition")

	if i == 0 {
		fmt.Println("Zero")
	} else if i == 1 {
		fmt.Println("One")
	} else if i == 2 {
		fmt.Println("Two")
	} else if i == 3 {
		fmt.Println("Three")
	} else {
		fmt.Println("Your i not in case.")
	}
}

// Exercise 1
// ใช้ในการคำนวณเลขยกกำลัง
func power(base, exponent int) int {
	result := 1
	// คำนวณค่ายกกำลังของ base ด้วย exponent
	for i := 0; i < exponent; i++ {
		result *= base
	}
	return result
}

// Exercise 2
// ให้หาค่าต่ำสุดและค่าสูงสุดใน slice ของตัวเลขที่รับเข้ามา
func findMinMax(arr []int) (min, max int) {
	if len(arr) == 0 {
		return 0, 0
	}

	min, max = arr[0], arr[0]

	// หาค่าต่ำสุดและค่าสูงสุดใน slice arr
	for _, v := range arr {
		if v < min {
			min = v
		}
		if v > max {
			max = v
		}
	}

	return min, max
}

// Exercise 3
func countDigit9(n int) int {
	count := 0
	// นับจำนวนครั้งที่เลข 9 ปรากฏในตัวเลขทุกตัวตั้งแต่ 1 ถึง n
	for i := 1; i <= n; i++ {
		strNum := strconv.Itoa(i)
		for _, digit := range strNum {
			if digit == '9' {
				count++
			}
		}
	}
	return count
}

// Exercise 4
func bubbleSort(arr []int) {
	n := len(arr)
	// เรียงลำดับตัวเลขใน slice arr ด้วยวิธี Bubble Sort
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				// สลับตำแหน่งของ arr[j] และ arr[j+1]
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
}

// Exercise 6
func printCompanyInfo(c Company) {
	fmt.Printf("Company Name: %s\n", c.Name)
	fmt.Printf("Address: %s\n", c.Address)
	fmt.Printf("CEO: %s\n", c.CEO)
	fmt.Printf("Revenue: $%.2f\n", c.Revenue)
}
