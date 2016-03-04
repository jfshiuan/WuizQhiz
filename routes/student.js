var status = require("../status.json");

exports.view = function(req, res) {  
	status['alt'] = false;
	res.render('student', status);
};

exports.view2 = function(req, res) {  
	status['alt'] = true;
	res.render('student', status);
};