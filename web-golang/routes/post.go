package routes

import (
    "net/http"
    "context"
    "github.com/conglt10/web-golang/models"
    "github.com/conglt10/web-golang/auth"
    "github.com/conglt10/web-golang/utils"
    "github.com/conglt10/web-golang/database"
    "github.com/julienschmidt/httprouter"
    "github.com/asaskevich/govalidator"
	"go.mongodb.org/mongo-driver/bson"
	"github.com/satori/go.uuid"
	_ "reflect"
	"fmt"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	collection := db.ConnectPosts();
	
	var result []bson.M 
	data, err := collection.Find(context.Background(), bson.M{})


	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
		return
	}

	defer data.Close(context.Background())
	for data.Next(context.Background()) {
		var elem bson.M
		err := data.Decode(&elem)

		if err != nil {
			res.JSON(w, 500, "Internal Server Error")
			return
		}

		result = append(result, elem)
	}

	
	res.JSON(w, 200, result)
}

func GetMyPosts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	username, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	collection := db.ConnectPosts();
	
	var result []bson.M 
	data, err := collection.Find(context.Background(), bson.M{"creater": username})

	defer data.Close(context.Background())
	for data.Next(context.Background()) {
		var elem bson.M
		err := data.Decode(&elem)

		if err != nil {
			res.JSON(w, 500, "Internal Server Error")
			return
		}

		result = append(result, elem)
	}

	
	res.JSON(w, 200, result)
}

func CreatePost(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	creater, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	title := r.PostFormValue("title")

	if govalidator.IsNull(title) {
        res.JSON(w, 400, "Data can not empty")
        return
    }
	
	title = models.Santize(title)
	uid := uuid.NewV4()

	id := fmt.Sprintf("%x-%x-%x-%x-%x", uid[0:4], uid[4:6], uid[6:8], uid[8:10], uid[10:])
	collection := db.ConnectPosts();

	newPost := bson.M{"id": id, "creater": creater, "title": title}

	_, errs := collection.InsertOne(context.TODO(), newPost)

	if errs != nil {
        res.JSON(w, 500, "Create post has failed")
        return
	}
	
	res.JSON(w, 201, "Create Succesfully")

}

func EditPost(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	title := r.PostFormValue("title")
	username, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	if govalidator.IsNull(title) {
        res.JSON(w, 400, "Data can not empty")
        return
	}

	collection := db.ConnectPosts()
	
	var result bson.M 
	errFind := collection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errFind != nil {
        res.JSON(w, 404, "Post Not Found")
        return
	}

	creater := fmt.Sprintf("%v", result["creater"])

	if username != creater {
		res.JSON(w, 403, "Permission Denied")
        return
	}

	filter := bson.M{"id": id}
	update := bson.M{"$set": bson.M{"title": title}}

	_, errUpdate := collection.UpdateOne(context.TODO(), filter, update)

	if errUpdate != nil {
		res.JSON(w, 500, "Edit has failed")
		return
	}
	
	res.JSON(w, 200, "Edit Successfully")

}

func DeletePost(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	username, err := jwt.ExtractUsernameFromToken(r)
	collection := db.ConnectPosts()

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}
	
	var result bson.M 
	errFind := collection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errFind != nil {
        res.JSON(w, 404, "Post Not Found")
        return
	}

	creater := fmt.Sprintf("%v", result["creater"])

	if username != creater {
		res.JSON(w, 403, "Permission Denied")
        return
	}

	errDelete := collection.FindOneAndDelete(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errDelete != nil {
		res.JSON(w, 500, "Delete has failed")
		return
	}

	res.JSON(w, 200, "Delete Successfully")

}
