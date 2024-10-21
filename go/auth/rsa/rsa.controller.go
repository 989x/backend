package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"outsource-management/api/configs"
	"outsource-management/api/core"
	"outsource-management/api/helpers"
	"outsource-management/api/models"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

func LoginRSA(c *fiber.Ctx) error {
	var loginBody models.Login_body
	if err := c.BodyParser(&loginBody); err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	godotenv.Load(".env")
	validate := validator.New()
	if err := validate.Struct(loginBody); err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	loginResponse, err := core.OnePlatformLogin(loginBody)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	if loginResponse.Result != "Success" {
		return helpers.JsonResponse(c, nil, 503, nil, "Fail : Username or Password invalid.")
	}

	httpRequest, err := core.CreateAccountRequest(loginResponse.TokenType + " " + loginResponse.AccessToken)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	httpRequest.Header.Set("Authorization", loginResponse.TokenType+" "+loginResponse.AccessToken)

	client := &http.Client{}
	requestClient, err := client.Do(httpRequest)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}
	defer requestClient.Body.Close()

	httpResult, err := ioutil.ReadAll(requestClient.Body)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	var getOneAccount models.Get_OneAccount
	if err = json.Unmarshal(httpResult, &getOneAccount); err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	collection := configs.MgConn.Db.Collection("staffs")
	context := configs.MgConn.Ctx

	var staff models.StaffGetForUpdate

	query := bson.D{{Key: "account_id", Value: getOneAccount.ID}}
	if err := collection.FindOne(context, query).Decode(&staff); err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	// Generate RSA private key from file
	privateKeyBytes, err := ioutil.ReadFile("api/keys/private.pem")
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyBytes)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	// Create a JWT token
	token := jwt.New(jwt.SigningMethodRS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["account_id"] = getOneAccount.ID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// Sign the token with RSA private key
	tokenString, err := token.SignedString(privateKey)
	if err != nil {
		return helpers.JsonResponse(c, err, 503, nil, "Fail")
	}

	responseLogin := models.Admin_login_response{
		AccountId:   getOneAccount.ID,
		AccessToken: tokenString,
	}

	return helpers.JsonResponse(c, nil, 200, responseLogin, "Success")
}
