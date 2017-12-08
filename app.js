var express= require("express"),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose"),
	userModelController=require(__dirname+"/server/controllers/userModel.controller.js");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/employee");
var app=express();
app.use(bodyParser());
app.use("/client/js",express.static(__dirname+"/client/controllers"));
app.get("/",function(req,res){
res.sendFile(__dirname+"/client/views/homepage.html");
});

//RESTFUL APIS
app.get("/api/userModel",userModelController.getUsers);
app.put("/api/updateUserModel/:_id",userModelController.updateUser);
app.delete("/api/deleteUserModel/:_id",userModelController.deleteUser);
app.post("/api/userModel",userModelController.createUser);

app.listen(8080,function(){
console.log("Listening on PORT 8080");
});
