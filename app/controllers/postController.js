var postController = function() {

	this.postService 		= require("./../services/postService.js");
	this.authService 		= require("./../services/authService.js");
	this.categoryService 	= require("./../services/categoryService.js");

}

postController.prototype.listPosts = async function(req, res, app) {

	try {

		// Load Dependencie
		postService = ( new postService() );
		authService = ( new authService() );

		var response = {};

		// Check Authentication

		// List

		

		res.send( response );
		res.end();


	} catch( e ){

		console.log( e.message );
		res.json({
			success: false,
			message: e.message,
			cod	   : 5
		});

		res.end();

	}

}

postController.prototype.create = async function(req, res, app) {

	let self = this;

	var { text, medias, categorys, token } = req.query;
	
	var response 				= {};

	let authService 	= ( new self.authService() );
	let postService 	= ( new self.postService() );
	let categoryService = ( new self.categoryService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		let user_id 	= obj_auth.metadata._id;

		let categorys_ids 	= categorys
							? await categoryService.processCategorysPost( categorys, app )
							: [] ;

		// Adicionar os IDS das categorias
		response = await postService.createPost( text, medias, categorys_ids, user_id, app );

	}

	res.send( response );
	res.end();

}

postController.prototype.updatePost = async function(req, res, app) {

	let self = this;

	var { text, medias, categorys, token } 	= req.query;
	var { post_id }							= req.params;
	var response 				= {};

	let authService = ( new self.authService() );
	let postService = ( new self.postService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		let user_id = obj_auth.metadata._id;

		// Adicionar os IDS das categorias
		response = await postService.updatePost( text, medias, [], user_id, post_id, app );

		if( response.success ){

			let post = await postService.getPostById( post_id, app );
			
			if( post.metadata && post.metadata._id ){

				response.metadata = post.metadata;

			}

		}

	}

	res.send( response );
	res.end();

}

postController.prototype.removePost = async function(req, res, app) {

	let self = this;

	var { post_id, token } = req.query;
	var response 				= {};

	let authService = ( new self.authService() );
	let postService = ( new self.postService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		let user_id = obj_auth.metadata._id;

		// Adicionar os IDS das categorias
		response = await postService.removePost( post_id, user_id, app );

		response.success = true;
		response.metadata = {
			post_id: post_id
		};

	}

	res.send( response );
	res.end();

}

module.exports = postController;