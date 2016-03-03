var userData = require("../userData.json");
var status = require("../status.json");



exports.signup = function(req, res) {  
	var username = req.query.username;

	var arr = userData["loginData"];
	var uniqueUsername = true;


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
		}

		if(uname == username)
		{
			uniqueUsername=false;
		}
	}


	if(uniqueUsername)
	{


		status["loginStatus"]["loggedIn"]="true";
		status["loginStatus"]["name"]=req.query.name;
		status["loginStatus"]["username"]=username;
		status["loginStatus"]["userType"]=req.query.userType;
		status["loginStatus"]["image"]="/images/user.png";
		status["loginStatus"]["courses"]=[];
		status["loginStatus"]["questionNumber"]=0;
		status["loginStatus"]["score"]=0;
		status["loginStatus"]["totalScore"]=0;
		status["loginStatus"]["opponentScore"]=0;

		userData["loginData"].push(
		{
			username: req.query.username, 
			password: req.query.password, 
			name: req.query.name,
			type: req.query.userType,
			image: "/images/user.png",
			courses: status["loginStatus"]["courses"]
		});

		if(req.query.userType=="student")
		{
			res.redirect('/student');
		}

		else
		{
			res.redirect('/instructor');
		}
	}

	else
	{
		res.redirect('/');
	}
};