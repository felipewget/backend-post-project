


var categoryController = function(){

	this.categoryService = require("./../services/categoryService.js");
	this.authService 	 = require("./../services/authService.js");

}

categoryController.prototype.listCategorys = async function(req, res, app) {

	let self = this;

	let authService 	= ( new self.authService() );
	let categoryService = ( new self.categoryService() );

	var { token } = req.query;
	var response = {};

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		response = await categoryService.listAvaliableCategorys( app );

	}

	res.send( response );
	res.end();

}

module.exports = categoryController;