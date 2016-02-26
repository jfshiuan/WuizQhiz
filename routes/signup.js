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

		userData["loginData"].push(
		{
			username: req.query.username, 
			password: req.query.password, 
			name: req.query.name,
			type: req.query.userType,
			image: "/images/user.png"
		});

		if(req.query.userType=="student")
		{
			res.render('student', status);
		}

		else
		{
			res.render('instructor', status);
		}
	}

	else
	{
		res.render('index', status);
	}
};