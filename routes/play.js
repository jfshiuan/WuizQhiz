var status = require("../status.json");
var questions = require("../questions.json");
var userData = require("../userData.json");

exports.play = function(req, res)
{  
	status["loginStatus"]["questionNumber"]=0;
	status["loginStatus"]["score"]=0;
	status["loginStatus"]["totalScore"]=0;
	

	var course=status["loginStatus"]["currentCourseID"];
	if(course =="" || course==-1 || course==undefined)
	{
		res.redirect('/student');
	}

	else
	{
		var qs;
		var arr = questions["course"];

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
			}

			if(course==cID)
			{
				qs=problems[status["loginStatus"]["questionNumber"]];
			}

		}

		status["loginStatus"]["questionNumber"] = status["loginStatus"]["questionNumber"] + 1;
		res.render('play', {"status": status, "qs":qs});
	}
};

exports.submitAnswer = function(req, res)
{

	var course=status["loginStatus"]["currentCourseID"];
	if(course =="" || course==-1 || course==undefined)
	{
		res.redirect('/student');
	}

	else
	{
		var qs;
		var arr = questions["course"];

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
			}

			if(course==cID)
			{
				status["loginStatus"]["totalScore"]=status["loginStatus"]["totalScore"] + 1;

				if (req.query.studentAnswer==problems[status["loginStatus"]["questionNumber"]-1]["correctAnswer"])
				{
					console.log("correct");
					status["loginStatus"]["score"]=status["loginStatus"]["score"] + 1;
				}
				else
				{
					console.log("incorrect");
				}

				qs=problems[status["loginStatus"]["questionNumber"]];
			}

		}

		if(qs==undefined)
		{
			var newScore=status["loginStatus"]["score"];
			var arr=userData["loginData"];
			var username = status["loginStatus"]["username"];
			var bestScore =newScore;




			var rand = Math.floor((Math.random() * (status["loginStatus"]["totalScore"]+1)));
			console.log(rand);
			status["loginStatus"]["opponentScore"]=rand;

			if(newScore > rand)
			{
				status["loginStatus"]["result"]	= "You Won!";			
			}
			else if(newScore < rand)
			{
				status["loginStatus"]["result"]	= "You Lost!";			

			}
			else
			{
				status["loginStatus"]["result"]	= "It's a tie!";			
			}


			for(var i=0;i<arr.length;i++)
			{
				var obj = arr[i];
				var uname, courses;
				for(var key in obj)
				{
					var attrName = key;
					var attrValue = obj[key];

					if(attrName == "username")
					{
						uname=attrValue;
					}
					if(attrName == "courses")
					{
						courses=attrValue;
					}
				}

				if(username==uname)
				{
					var arr=courses;

					for(var i=0;i<arr.length;i++)
					{
						var obj = arr[i];
						var cID;
						for(var key in obj)
						{
							var attrName = key;
							var attrValue = obj[key];

							if(attrName == "courseID")
							{
								cID=attrValue;
							}
							if(attrName == "bestScore")
							{
								if(course==cID)
								{
									if(newScore>attrValue)
									{
										obj[key]=newScore;
									}
									else
									{
										bestScore=attrValue;
									}
								}
							}
							if(attrName == "wins" && course==cID && newScore>rand)
							{
								obj[key]++;
							}
							else if(attrName == "losses" && course==cID && newScore<rand)
							{
								obj[key]++;
							}
							else if(attrName == "ties" && course==cID && newScore==rand)
							{
								obj[key]++;
							}
						}
					}
				}
			}


			res.render('endOfMatch', {"status": status, "bestScore": bestScore});
		}
		else
		{
			status["loginStatus"]["questionNumber"] = status["loginStatus"]["questionNumber"] + 1;
			res.render('play', {"status": status, "qs":qs});
		}
	}
};