
var conn 		= require("./../../config/dbConnect");
var authService = function(){}

authService.prototype.authenticate = async function( login, password, app ) {

	try {

		let self = this;

		return new Promise( async (success, reject) => {

			var usersDAO 			= new app.app.models.usersDAO( conn );

			usersDAO.authenticate( login, password ).then(function( response ){
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

authService.prototype.getUserByLogin = async function( login, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersDAO 		= new app.app.models.usersDAO( conn );

			usersDAO.getUserByLogin( login ).then(function( response ){
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

authService.prototype.createToken = async function( user_id, app ) {

	try {

		let self = this;

		return new Promise( async (success, reject) => {

			var usersSessionsDAO 		= new app.app.models.usersSessionsDAO( conn );
			var { createAccessToken }	= require("./../utils/tokensUtil");
			var ObjectId = require('mongodb').ObjectId;
  

			let access_token = await createAccessToken( user_id );

			let obj_user_token = {
				user_id : new ObjectId( user_id ),
				token 	: access_token.token,
				created : Date.now(),
				deleted	: null
			}

			usersSessionsDAO.createToken( obj_user_token ).then( function( response ){

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

authService.prototype.isAuthenticated = async function( token, app) {

	try {

		let self = this;

		return new Promise( async (success, reject) => {

			var response = {};

			var usersDAO 			= new app.app.models.usersDAO( conn );
			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );

			let token_response = await usersSessionsDAO.isValidSession( token );

			if( token_response.metadata && token_response.metadata.token ){

				response.success 		= true;
				response.authenticated 	= true;

				usersDAO.getUserById( token_response.metadata.user_id ).then( function( user ){
					
					response.metadata 	= user.metadata;

					return success( response );

				});

			} else {

				response.success 		= false;
				response.authenticated 	= false;

				return success( response );

			}

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

authService.prototype.createUser = async function( name, login, password, app ) {


	let self = this;

	return new Promise( async (success, reject) => {

		try {

			var usersDAO 			= new app.app.models.usersDAO( conn );
			var tokensUtil 			= new app.app.utils.tokensUtil;
			var { formatName } 		= require("./../utils/namesUtil");

			let obj_name = await formatName( name );

			var obj_user = {
				name: obj_name,
				auth: {
					login		: login,
					password	: password,
				},
				created			: Date.now(),
				updated			: null,
				deleted 		: null,
		 	};

			usersDAO.create( obj_user ).then( function( response ){

				return success( response );

			});

		} catch( e ){

			return success({
				success	: false,
				error	: e.message
			});

		}

	});

}

authService.prototype.logout = async function( token, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );

			usersSessionsDAO.removeAccessToken( token ).then( function( response ){

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

module.exports = authService;