var userData = require("../userData.json");
var status = require("../status.json");
var courses = require("../courses.json");



exports.view = function(req, res)
{  
	var username = status["loginStatus"]["username"];
	var otherCourses=courses.slice();

	var arr = userData["loginData"];
	var currentCourses;

	for(var i=0;i<arr.length;i++)
	{
		var obj = arr[i];
		var uname;
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
				currentCourses=attrValue;
			}
		}
	}

	if(currentCourses != undefined)
	{
		var splice=false;

		for(var i=0; i<currentCourses.length; i++)
		{
			var obj=currentCourses[i];
			var cID;
			for(var key in obj)
			{
				var attrName=key;
				var attrValue=obj[key];

				if(attrName == "courseID")
				{
					cID = attrValue;

					for(var j=otherCourses.length-1; j>=0; j--)
					{
						splice=false;
						var obj2=otherCourses[j];
						for(var key2 in obj2)
						{
							var attrName2=key2;
							var attrValue2 = obj2[key2];

							if(attrName2 == "courseID" && attrValue2 == cID)
							{

								splice=true;
							}
						}

						if(splice)
						{
							otherCourses.splice(j, 1);
						}
					}
				}
			}
		}
	}
	res.render('addCourse', {"status":status, "courses":otherCourses});

};