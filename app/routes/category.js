
/**
 *	Routes relationed with categorys
 *	@author 	Felipe Oliveira<felipe.wget@gmail.com
 *	@copyright 	Felipe Oliveira
 *	@version	0.0.1
 */
module.exports = function( app ){

	// Importing dependencies
	var categoryController = require("./../controllers/categoryController.js");

	/**
	 * 	List categorys
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.get( '/categorys' , function( req, res ){
		( new categoryController ).listCategorys( req, res, app );
	});

}
