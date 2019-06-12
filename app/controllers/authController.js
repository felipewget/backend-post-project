
var authController = function() {

	this.authService = require("./../services/authService.js");

} // authController constructor

authController.prototype.authenticate = async function(req, res, app) {

	let self = this;
	let authService = ( new self.authService() );

	var { login, password } = req.body;

	var response = await authService.authenticate( login, password, app );

	if( response && response.metadata && response.metadata._id ){
		
		access_token = await authService.createToken( response.metadata._id, app );
		
		response.metadata.access_token = access_token.metadata.token;

	}

	res.send( response );
	res.end();

}

authController.prototype.isAuthenticated = async function(req, res, app) {

	let self = this;
	let authService = ( new self.authService() );

	var { token } = req.query;

	var response = await authService.isAuthenticated( token, app );

	res.send( response );
	res.end();

}

authController.prototype.register = async function(req, res, app) {

	let self = this;
	let authService = ( new self.authService() );

	var { name, login, password } = req.body;
	var response = {};

	var response = await authService.getUserByLogin( login, app );

	if( response.metadata && response.metadata._id ){

		response = {
			success: false,
			message: "Email ja cadastrado"
		}

	} else {
		
		var response = await authService.createUser( name , login, password, app );	

		console.log( response );

		if( response.success && response.success === true && response.metadata._id ){

			response = await authService.authenticate( login, password, app );

		} else {

			response = {
				success: false,
				error: "Erro ao tentar criar o cadastro"
			}

		}

	}

	res.send( response );
	res.end();

}

authController.prototype.logout = async function(req, res, app) {

	let self = this;
	let authService = ( new self.authService() );

	var { token } = req.body;
	consol.log( token );

	var response = await authService.logout( token, app );

	res.send(response);
	res.end();

}

module.exports = authController;