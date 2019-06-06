var categoryService = function() {} // categoryService constructor

categoryService.prototype.authenticate = async function(req, res, app) {

	// var categoryService = new ( require("./../../services/platform/categoryService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await categoryService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

categoryService.prototype.isAuthenticated = async function(req, res, app) {

	// var categoryService = new ( require("./../../services/platform/categoryService.js") )();

	// var token = req.query.token;

	var response = { ola: 1 } // await categoryService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}

module.exports = categoryService;