
/**
 *	Posts Routes 
 *	@author 	Felipe Oliveira<felipe.wget@gmail.com
 *	@copyright 	Felipe Oliveira
 *	@version	0.0.1
 */
module.exports = function( app ){

	// Importing dependencies
	var postController = require("./../controllers/postController.js");

	/**
	 * 	List posts
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.get( '/posts' , function( req, res ){
		( new postController() ).listPosts( req, res, app );
	});

	/**
	 * 	Create a new post
	 *
	 * 	@TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.post( '/post/create' , function( req, res ){
		( new postController() ).createPost( req, res, app );
	});

	/**
	 * Edit the publication
	 *
	 * @TODO describe params
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *		metadata	: Obj
	 *	}
	 */
	app.post( '/post/:post_id/edit' , function( req, res ){
		( new postController() ).updatePost( req, res, app );
	});


	/**
	 * 	Remove a publication
	 *
	 * 	@return array {
	 *		success		: Bool,
	 *	}
	 */
	app.delete( '/post' , function( req, res ){
		( new postController() ).deletePost( req, res, app );
	});

}
