var userData = require("../userData.json");
var status = require("../status.json");



exports.getLoginData = function(req, res)
{
	res.json(userData['loginData']);
}


exports.login = function(req, res)
{  
	
	var username = req.query.username;
	var password = req.query.password;

	var arr = userData["loginData"];
	var validLogin = false;
	var userType, name, image, friends, courses;

	for(var i=0;i<arr.length;i++)
	{
		var obj = arr[i];
		var uname, pw, type, nam, img, fr, crs;
		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "username")
			{
				uname=attrValue;
			}
			if(attrName == "password")
			{
				pw=attrValue;
			}
			if(attrName == "type")
			{
				type=attrValue;
			}
			if(attrName == "name")
			{
				nam=attrValue;
			}
			if(attrName == "image")
			{
				img=attrValue;
			}
			if(attrName == "friends")
			{
				fr=attrValue;
			}
			if(attrName == "courses")
			{
				crs=attrValue;
			}
		}

		if(uname == username && pw == password)
		{
			validLogin=true;
			userType=type;
			name=nam;
			image=img;
			courses=crs;
			friends=fr;
		}
	}




	if(validLogin)
	{
		status["loginStatus"]["loggedIn"]="true";
		status["loginStatus"]["name"]=name;
		status["loginStatus"]["username"]=username;
		status["loginStatus"]["userType"]=userType;
		status["loginStatus"]["image"]=image;
		status["loginStatus"]["friends"]=friends;
		status["loginStatus"]["courses"]=courses;

		if(userType=="student")
		{
			res.render('student', status);
		}
		if(userType=="instructor")
		{
			res.render('instructor', status);
		}
	}
	else
	{
		status["loginStatus"]["loggedIn"]="false";
		status["loginStatus"]["name"]="";
		status["loginStatus"]["username"]="";
		status["loginStatus"]["userType"]="";
		status["loginStatus"]["image"]="";
		status["loginStatus"]["friends"]=[];
		status["loginStatus"]["courses"]=[];
		status["loginStatus"]["currentCourseID"]="";
		status["loginStatus"]["currentCourseName"]="";

		res.render('index', status);
	}

 /*data["friends"].push({name: req.query.name, 
	 					   description: req.query.description, 
	 					   imageURL: 'http://lorempixel.com/400/400/people'});*/
};