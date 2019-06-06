var authService = function() {} // authService constructor

authService.prototype.authenticate = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

authService.prototype.isAuthenticated = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var token = req.query.token;

	var response = { ola: 1 } // await authService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}

module.exports = authService;