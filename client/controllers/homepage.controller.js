(function(){
  angular.module("app",[]).controller("indexController",function($scope,$http){

$scope.users=[];

$scope.userObj={
name:"",
mail:"",
dob:"",
department:"",
gender:"",
age:""
};

var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
//get collection list
$scope.getUsers=function(){
console.log("get users list")
$http.get("/api/userModel").success(function(r,s,x){
$scope.users=r;
})
};
$scope.getUsers();

//update user details
$scope.createUser=function(){
	console.log("create user",$scope.userObj);
	
	if(($scope.userObj.name !="")  && pattern.test($scope.userObj.mail) && ($scope.userObj.dob !="") && ($scope.userObj.department !="") && ($scope.userObj.gender !="")){
	
	$http({url:"/api/userModel",method:"POST",data:$scope.userObj}).success(function(r,s,x){
	$scope.users.push(r);
		$scope.userObj={
			name:"",
			mail:"",
			dob:"",
			department:"",
			gender:"",
			age:""
		};
	}).error(function(err){
		console.log("error in creating",err);
	})
	
	}

};
$scope.modifyUser=function(user){
$scope.showUpdateButton=true;
	$scope.userObj={
		_id:user._id,
		name:user.name,		
		mail:user.mail,
		dob:new Date(user.dob),
		department:user.department,
		gender:user.gender,
		age:user.age
		};
};
//add user from collection
$scope.updateUser=function(){

$scope.showUpdateButton=false;
console.log("update usermodel",$scope.userObj);
if(($scope.userObj.name !="") && pattern.test($scope.userObj.mail) && ($scope.userObj.dob !="") && ($scope.userObj.department !="") && ($scope.userObj.gender !="")){
		
	$http({url:"/api/updateUserModel/"+$scope.userObj._id,method:"PUT",data:$scope.userObj}).success(function(){
		console.log("inside update view controller");
	$scope.getUsers();
	$scope.userObj={name:"",
			mail:"",
			dob:"",
			department:"",
			gender:"",
			age:""
			};
	}).error(function(err){
		console.log("error in deleting",err);
	})
}
};


//delete user from collection
$scope.deleteUser=function(user){
	$http({url:"/api/deleteUserModel/"+user._id,method:"DELETE",data:user}).success(function(r,s,x){
		console.log("inside delete view controller");	
	$scope.getUsers();
	}).error(function(err){
		console.log("error in deleting",err);
	})

};
//calculate age
$scope.calculateAge=function(dob){
var birthDate = new Date(dob);
var presentDate = new Date();
var age=presentDate.getFullYear()-birthDate.getFullYear();
		
if(presentDate.getFullYear()-birthDate.getFullYear()>0){
	if(presentDate.getMonth()-birthDate.getMonth()==0){
		if(presentDate.getDate()-birthDate.getDate()<0){
			age=age-1;
		}
	}
	else if(presentDate.getMonth()-birthDate.getMonth()<0){
	age=age-1;
	}
}
else{
//error msg
}
//$scope.userObj.dob=birthDate.getDate()+"/"+birthDate.getMonth()+"/"+birthDate.getFullYear()
$scope.userObj.age=age;
}

})
})();