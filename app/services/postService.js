
var conn 		= require("./../../../config/dbConnect");
var postService = function() {} // postService constructor

postService.prototype.list = async function( page = 1, categorys, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );

			postsDAO.list( page, categorys ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false
			error	: e.message
		});

	}

}

postService.prototype.save = async function( obj_post, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );

			postsDAO.save( obj_post ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false
			error	: e.message
		});

	}

}

postService.prototype.update = async function( obj_post, id, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );

			postsDAO.update( obj_post, id ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false
			error	: e.message
		});

	}

}

postService.prototype.removePost = async function( id, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );

			postsDAO.removePost( id ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false
			error	: e.message
		});

	}

}

module.exports = postService;