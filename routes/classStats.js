var status = require("../status.json");
var userData = require("../userData.json");

exports.classStats = function(req, res)
{  
	var courseID = status["loginStatus"]["currentCourseID"];
	var statsArray=[];
	var arr = userData["loginData"];

//console.log(arr);

	var courses, course, type;

	for(var i=0;i<arr.length;i++)
	{
		var obj = arr[i];
		var name;
		for(var key in obj)
		{
			var attrName = key;
			var attrValue = obj[key];

			if(attrName == "name")
			{
				name=attrValue;
			}
			if(attrName == "type")
			{
				type=attrValue;
			}

			if(attrName == "courses" && type=="student")
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
						course.name=name;
						statsArray.push(course);
					}
				}
			}
		}
	}

	//console.log(statsArray);

	res.render('classStats', {"status": status, "stats": statsArray});
};