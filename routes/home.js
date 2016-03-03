var status = require("../status.json");

exports.home = function(req, res)
{  

	if (status["loginStatus"]["loggedIn"]=="false")
	{
		res.redirect('/');
	}
	else if(status["loginStatus"]["loggedIn"]=="true" && status["loginStatus"]["userType"]=="student")
	{
		res.redirect('/student');
	}
	else if(status["loginStatus"]["loggedIn"]=="true" && status["loginStatus"]["userType"]=="instructor")
	{
		res.redirect('/instructor');
	}
	else
	{
		console.log("error");
	}

};