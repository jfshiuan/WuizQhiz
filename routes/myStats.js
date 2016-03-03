var status = require("../status.json");
var userData = require("../userData.json");

exports.myStats = function(req, res)
{
	var arr=userData["loginData"];
	var username = status["loginStatus"]["username"];
	var courseID = status["loginStatus"]["currentCourseID"];
	var courses, course;

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
				courses=attrValue;

				for(var j=0; j<courses.length; j++)
				{
					var obj2 = courses[j];
					var cID;
		
					for(var key2 in obj2)
					{
						var attrName2 = key2;
						var attrValue2 = obj2[key2];

						if(attrName2 == "courseID")
						{
							cID = attrValue2;
						}
					}
					if(cID==courseID)
					{
						course = obj2;
					}
				}
			}
		}
	}

	res.render('myStats', {"status": status, "course": course});
};