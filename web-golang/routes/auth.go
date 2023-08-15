package routes

import (
    "fmt"
    "net/http"
    "context"
    "github.com/conglt10/web-golang/models"
    "github.com/conglt10/web-golang/auth"
    "github.com/conglt10/web-golang/utils"
    "github.com/conglt10/web-golang/database"
    "github.com/julienschmidt/httprouter"
    "github.com/asaskevich/govalidator"
    "go.mongodb.org/mongo-driver/bson"
)

func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    username := r.PostFormValue("username")
    password := r.PostFormValue("password")

    if govalidator.IsNull(username) || govalidator.IsNull(password) {
        res.JSON(w, 400, "Data can not empty")
        return
    }

    username = models.Santize(username)
    password = models.Santize(password)

    collection := db.ConnectUsers()

    var result bson.M
    err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&result)

    
    if err != nil {
        res.JSON(w, 400, "Username or Password incorrect")
        return
    }

    // convert interface to string
    hashedPassword := fmt.Sprintf("%v", result["password"])

    err = models.CheckPasswordHash(hashedPassword, password)

    if err != nil {
        res.JSON(w, 401, "Username or Password incorrect")
        return
    }

    token, errCreate := jwt.Create(username)

    if errCreate != nil {
        res.JSON(w, 500, "Internal Server Error")
        return
    }

    res.JSON(w, 200, token)
}

func Register(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    username := r.PostFormValue("username")
    email := r.PostFormValue("email")
    password := r.PostFormValue("password")

    if govalidator.IsNull(username) || govalidator.IsNull(email) || govalidator.IsNull(password) {
        res.JSON(w, 400, "Data can not empty")
        return
    }

    if !govalidator.IsEmail(email) {
        res.JSON(w, 400, "Email is invalid")
        return
    }

    username = models.Santize(username)
    email = models.Santize(email)
    password = models.Santize(password)

    collection := db.ConnectUsers()
    var result bson.M
    errFindUsername := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&result)
    errFindEmail := collection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)

    if errFindUsername == nil || errFindEmail == nil {
        res.JSON(w, 409, "User does exists")
        return
    }

    password, err := models.Hash(password)

    if err != nil {
        res.JSON(w, 500, "Register has failed")
        return
    }

    newUser := bson.M{"username": username, "email": email, "password": password}

    _, errs := collection.InsertOne(context.TODO(), newUser)

    if errs != nil {
        res.JSON(w, 500, "Register has failed")
        return
    }

    res.JSON(w, 201, "Register Succesfully")
}
