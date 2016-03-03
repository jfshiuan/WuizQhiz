var userData = require("../userData.json");
var status = require("../status.json");

exports.logout = function(req, res)
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
	status["loginStatus"]["action"]="";
	status["loginStatus"]["questionNumber"]=0;
	status["loginStatus"]["score"]=0;
	status["loginStatus"]["totalScore"]=0;
	status["loginStatus"]["opponentScore"]=0;

	res.redirect("/");
};