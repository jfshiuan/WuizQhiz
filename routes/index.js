/*
 * GET home page.
 */
 var userData = require("../userData.json");

exports.view = function(req, res){

  res.render('index', userData);
};
