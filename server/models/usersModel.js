var mongoose= require("mongoose");
 
module.exports=mongoose.model("users",{
		name:String,
		mail:String,
		dob:String,
department:String,
		gender:String,
		age:Number});