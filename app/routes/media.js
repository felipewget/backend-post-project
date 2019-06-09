
/**
 *	Media and Upload`s Routes
 *	@author 	Felipe Oliveira<felipe.wget@gmail.com
 *	@copyright 	Felipe Oliveira
 *	@version	0.0.1
 */
module.exports = function( app ){

	// Importing dependencies
	var mediaController = require("./../controllers/mediaController.js");

	/**
	 * 	Upload Media
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.get( '/media/post/list' , function( req, res ){
		( new mediaController ).getMediaById( req, res, app );
	});

	/**
	 * 	Upload Media
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.post( '/media/upload' , function( req, res ){
		( new mediaController ).uploadMedia( req, res, app );
	});

	/**
	 * 	Remove Medias
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.delete( '/media' , function( req, res ){
		( new mediaController ).removeMedia( req, res, app );
	});

}
