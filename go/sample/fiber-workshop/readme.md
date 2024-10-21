## Go Fiber Test

### Assignment

1. **Automigrate ตารางโปรไฟล์ผู้ใช้:**
   - สร้างตารางสำหรับโปรไฟล์ผู้ใช้ผ่านฟีเจอร์ automigrate ของ GORM

2. **โครงสร้างโปรไฟล์ผู้ใช้:**
   - กำหนดโครงสร้างของโมเดลโปรไฟล์ผู้ใช้ที่ประกอบด้วยฟิลด์ต่อไปนี้: `gormmodel`, `employee_id`, `name`, `lastname`, `birthday`, `age`, `email`, `tel`

3. **API Routes:**
   - สร้างการดำเนินการ CRUD สำหรับโปรไฟล์ผู้ใช้ในเส้นทาง `localhost:3000/api/v1/xxx/…`
   - จัดกลุ่มเส้นทางภายใต้ `api/v1/`
   - ให้มีการพิสูจน์ตัวตนพื้นฐานด้วยชื่อผู้ใช้ `testgo` และรหัสผ่าน `23012023`
   - ไม่ต้องให้มีการพิสูจน์ตัวตนสำหรับการดึงข้อมูลผู้ใช้ด้วยเมธอด `GET`

4. **การเพิ่มข้อมูลแบบมวลหลายข้อมูล:**
   - เพิ่มโปรไฟล์ผู้ใช้มากกว่า 20 รายการลงในฐานข้อมูล

5. **API แสดงข้อมูลกลุ่มอายุ:**
   - สร้าง API ที่ตำแหน่ง `api/v1/` ที่แสดงจำนวนโปรไฟล์ผู้ใช้ในกลุ่มอายุต่าง ๆ:
     - GenZ (<24 ปี)
     - GenY (24-41 ปี)
     - GenX (42-56 ปี)
     - Baby Boomer (57-75 ปี)
     - G.I. Generation (>75 ปี)

6. **API ค้นหา:**
   - สร้าง API ค้นหา (`/search`) ที่อนุญาตให้ค้นหาโปรไฟล์ผู้ใช้ตามเกณฑ์ทั้ง 3 คือ `employee_id`, `name`, และ `lastname`
   - ใช้พารามิเตอร์ค้นหาเพียงหนึ่งตัว

### Installs

```bash
mkdir fiber-workshop && cd fiber-workshop
go mod init fiber-workshop

go get github.com/gofiber/fiber/v2
go get github.com/go-playground/validator/v10

go get gorm.io/gorm
go get gorm.io/driver/mysql
```

### Run

```bash
go run main.go
```
