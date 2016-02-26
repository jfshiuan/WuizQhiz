var status = require("../status.json");
var questions = require("../questions.json");

exports.play = function(req, res) {  
	var course=status["loginStatus"]["currentCourseID"];
	if(course =="" || course==-1 || course==undefined)
	{
		res.render('student', status);
	}
	else
	{

		var qs;
		var arr = questions["course"];
		console.log(arr);

		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var problems, cID;
			for(var key in obj)
			{
				var attrName = key;
				var attrValue = obj[key];

				if(attrName == "courseID")
				{
					cID=attrValue;
				}
				if(attrName == "problems")
				{
					problems=attrValue;
				}
console.log(attrValue);

			}

			if(course==cID)
			{
				qs=problems;
			}

		}

		res.render('play', {"status": status, "qs":qs});
	}


};