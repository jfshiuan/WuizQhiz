var userData = require("../userData.json");
var status = require("../status.json");



exports.getSelectedCourse = function(req, res)
{
	res.json(status['loginStatus']['currentCourseID']);




 /*data["friends"].push({name: req.query.name, 
	 					   description: req.query.description, 
	 					   imageURL: 'http://lorempixel.com/400/400/people'});*/
};