
var authService = require("./../services/authService.js");

var authController = function() {} // authController constructor

authController.prototype.authenticate = async function(req, res, app) {

	var { login, password } = req.query;

	var response = await ( new authService() ).authenticate( login, password, app );

	res.send( response );
	res.end();

}

authController.prototype.isAuthenticated = async function(req, res, app) {

	var { token } = req.query;

	var response = await ( new authService() ).isAuthenticated( token );

	res.send( response );
	res.end();

}

authController.prototype.register = async function(req, res, app) {

	let authService = ( new authService() );

	var { name, login, password } = req.query;
	var response = {};

	var response = await authService.checkIfEmailExist( name, login, password );
	if( response.metadata && response.metadata.user_id ){

		response = {
			success: false,
			message: "Email ja cadastrado"
		}

	} else {

		await authService.createUser( name, login, password );	
		response = await authService.authenticate( login, password, app );

	}

	res.send( response );
	res.end();

}

authController.prototype.logout = async function(req, res, app) {

	var { token } = req.query;

	var response = await ( new authService() ).logout( token );

	res.send(response);
	res.end();

}

module.exports = authController;