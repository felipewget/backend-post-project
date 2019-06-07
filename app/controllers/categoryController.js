
var authService = require("./../services/authService.js");
var categoryService = require("./../services/categoryService.js");

var categoryController = function() {} // categoryController constructor

categoryController.prototype.listCategorys = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

module.exports = categoryController;