
/**
 *	Routes relationed with user's authentication
 *	@author 	Felipe Oliveira<felipe.wget@gmail.com
 *	@copyright 	Felipe Oliveira
 *	@version	0.0.1
 */
module.exports = function( app ){

	// Importing dependencies
	var authController = require("./../controllers/authController.js");

	/**
	 * 	Check if user stay authenticated
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.get( '/authenticate' , function( req, res ){
		( new authController() ).isAuthenticated( req, res, app );
	});

	/**
	 * 	Auth User
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.post( '/authenticate' , function( req, res ){
		( new authController() ).authenticate( req, res, app );
	});

	/**
	 * Create a new user
	 *
	 * @TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.post( '/register' , function( req, res ){
		( new authController() ).register( req, res, app );
	});


	/**
	 * 	Aplication`s logout
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *	}
	 */
	app.delete( '/logout' , function( req, res ){
		( new authController() ).logout( req, res, app );
	});

}
