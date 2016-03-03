var userData = require("../userData.json");
var status = require("../status.json");
var courses = require("../courses.json");

exports.addTheCourse = function(req, res)
{  
	var courseID = req.body.courseDropdown;


	var courseName="";

	var arr=courses;

	for(var i=0;i<arr.length;i++)
	{
		var obj = arr[i];
		var name, ID;
		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "courseID")
			{
				ID=attrValue;
			}
			if(attrName == "courseName")
			{
				name=attrValue;
			}
		}

		if(ID == courseID)
		{
			courseName=name;
		}

	}



	arr = userData["loginData"];
	var username = status["loginStatus"]["username"];
	var course = {"courseID": courseID, "courseName": courseName, "bestScore": 0, "wins": 0, "losses": 0, "ties": 0};

	for(var i=0; i<arr.length; i++)
	{
		var obj = arr[i];
		var uname, course;

		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "username")
			{
				uname=attrValue;
			}
			if(attrName == "courses" && uname==username)
			{
				obj[key].push(course);
			}
		}
	}


	res.redirect('/addCourse');

};