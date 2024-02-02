# GORM Model for Employee Management

This repository is dedicated to a comprehensive Employee Management System implemented in Go, utilizing the GORM library for seamless database operations. The system is designed to effectively manage employee data, featuring functionalities for creating, updating, and deleting employee records.

## Enhanced Employee Model

The `Employee` struct is the cornerstone for representing employee data. To ensure professionalism and streamline the process, the model now incorporates both `ID` and `EmployeeID`. To leverage the automatic ID generation provided by GORM, we've embedded the `gorm.Model` struct:

```go
type Employee struct {
	gorm.Model
	EmployeeID int    `json:"employee_id" validate:"required"`
	Name       string `json:"name" validate:"required,min=3,max=32"`
	LastName   string `json:"lastname" validate:"required,min=3,max=32"`
	Birthday   string `json:"birthday" validate:"required"`
	Age        int    `json:"age" validate:"required"`
	Email      string `json:"email" validate:"required,email,min=3,max=32"`
	Tel        string `json:"tel" validate:"required"`
}
```

By doing so, GORM automatically adds fields such as `ID`, `CreatedAt`, `UpdatedAt`, and `DeletedAt` to the model. The `EmployeeID` field remains an essential part of the struct, ensuring a unique identifier for each employee. GORM handles the meticulous task of ID creation, as well as the management of creation and update history.

To disable GORM's auto-migration and take control of ID generation and history management according to your specific requirements, you can use the following snippet:

```go
DBConn.AutoMigrate(&Employee{})
```

Feel free to replace `Employee{}` with your actual model instance. This empowers you to orchestrate ID creation and history management with precision, aligning with your project's needs.
