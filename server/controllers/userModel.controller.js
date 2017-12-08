var Users=require("../models/usersModel.js")

module.exports.createUser=function(req,res){
	var user = new Users(req.body);
	user.save(function(err,result){
	res.json(result);
	})
}

module.exports.updateUser=function(req,res){
	Users.update({_id:req.body._id},req.body,null,function(err,response){
	console.log("after updating server");
	res.send("updated");
	});
}

module.exports.deleteUser=function(req,res){
	console.log("req inside deleteuser");
	Users.remove({_id:req.params._id},function(err,removed){
	console.log("removed from serverdb");
	res.send("removed");
	});
	
}

module.exports.getUsers=function(req,res){
	Users.find({},function(err,result){
	res.json(result);
	});
}