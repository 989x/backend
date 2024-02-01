package models

import "gorm.io/gorm"

type Person struct {
	Name string `json:"name"`
	Pass string `json:"pass"`
}

type User struct {
	Name     string `json:"name" validate:"required,min=3,max=32"`
	IsActive *bool  `json:"isactive" validate:"required"`
	Email    string `json:"email,omitempty" validate:"required,email,min=3,max=32"`
}

// _____________________________________________ dog

type Dogs struct {
	Name  string `json:"name"`
	DogID int    `json:"dog_id"`
}

type DogsRes struct {
	Name  string `json:"name"`
	DogID int    `json:"dog_id"`
	Type  string `json:"type"`
}

type ResultData struct {
	Data  []DogsRes `json:"data"`
	Name  string    `json:"name"`
	Count int       `json:"count"`
}

type ResultDogsData struct {
	Count      int       `json:"count"`
	Data       []DogsRes `json:"data"`
	Name       string    `json:"name"`
	SumRed     int       `json:"sum_red"`
	SumGreen   int       `json:"sum_green"`
	SumPink    int       `json:"sum_pink"`
	SumNoColor int       `json:"sum_nocolor"`
}

// _____________________________________________ company

type Company struct {
	gorm.Model
	Name         string `json:"name" validate:"required,min=3,max=50"`
	Description  string `json:"description,omitempty" validate:"max=255"`
	Location     string `json:"location,omitempty" validate:"max=100"`
	Industry     string `json:"industry,omitempty" validate:"max=50"`
	FoundedYear  int    `json:"founded_year,omitempty" validate:"omitempty,min=1800"`
	Website      string `json:"website,omitempty" validate:"omitempty,url"`
	ContactEmail string `json:"contact_email,omitempty" validate:"omitempty,email"`
}
