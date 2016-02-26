var status = require("../status.json");

exports.help = function(req, res)
{  

	if (status["loginStatus"]["loggedIn"]=="false")
	{
		res.render('loginHelp', status);
	}
	else if(status["loginStatus"]["loggedIn"]=="true" && status["loginStatus"]["userType"]=="student")
	{
		res.render('studentHelp', status);
	}
	else if(status["loginStatus"]["loggedIn"]=="true" && status["loginStatus"]["userType"]=="instructor")
	{
		res.render('instructorHelp', status);
	}
	else
	{
		console.log("error");
	}

};