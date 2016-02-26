var status = require("../status.json");

exports.view = function(req, res) {  
	res.render('student', status);

};