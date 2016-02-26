var status = require("../status.json");
var courses = require("../courses.json");
var questions = require("../questions.json");

exports.createQuiz = function(req, res) 
{  

var course=status["loginStatus"]["currentCourseID"];
	if(course =="" || course==-1 || course==undefined)
	{
		res.render('instructor', status);
	}
	else
	{
		res.render('createQuiz', {"status": status, "questions": questions});	
	}
};