
var conn 		= require("./../../config/dbConnect");
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
			success	: false,
			error	: e.message
		});

	}

}

postService.prototype.getPostById = async function( post_id, app ){

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );
			var ObjectId = require('mongodb').ObjectId;

			let obj_post_id = new ObjectId( post_id );

			postsDAO.getPostById( obj_post_id ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

postService.prototype.createPost = async function( text, medias, categorys, user_id, app ){

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );
			var ObjectId = require('mongodb').ObjectId;

			let obj_post = {
				user_id		: 	new ObjectId( user_id ),
				text		: 	text,
				medias		: 	medias,
				created 	:	Date.now(),
				categorys 	: 	categorys,
				deleted 	: 	null
		 	}

			postsDAO.createPost( obj_post ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

postService.prototype.updatePost = async function( text, medias, categorys, user_id, post_id, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var postsDAO 	= new app.app.models.postsDAO( conn );
			var ObjectId = require('mongodb').ObjectId;

			let obj_post = {
				text		: 	text,
				medias		: 	medias,
				categorys 	: 	categorys,
				updated 	: 	Date.now(),
		 	}

			let obj_post_id = ObjectId( post_id );
			let obj_user_id = ObjectId( user_id );

			postsDAO.updatePost( obj_post, obj_user_id, obj_post_id ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

postService.prototype.removePost = async function( post_id, user_id, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var ObjectId = require('mongodb').ObjectId;
			var postsDAO 	= new app.app.models.postsDAO( conn );

			let obj_post_id = ObjectId( post_id );
			let obj_user_id = ObjectId( user_id );

			postsDAO.removePost( obj_post_id, obj_user_id ).then(function( response ){

				return success( response );

			});

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

module.exports = postService;