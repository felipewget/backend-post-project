
var conn 		= require("./../../../config/dbConnect");
var authService = function(){}

authService.prototype.authenticate = async function( login, password, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersDAO 		= new app.app.models.usersDAO( conn );

			usersDAO.authenticate( login, password ).then(function( response ){
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

authService.prototype.createToken = async function( user_id, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );
			var tokensUtil 			= new app.app.utils.tokensUtil;

			tokensUtil.createAccessToken( user_id ).then( function( access_token ){

				return usersSessionsDAO.createToken( user_id, access_token );

			}).then( function( response ){

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

authService.prototype.isAuthenticated = async function( token, app) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersDAO 			= new app.app.models.usersDAO( conn );
			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );
			var tokensUtil 			= new app.app.utils.tokensUtil;

			tokensUtil.getSessionToken( token ).then( function( token_response ){

				if( token_response.success && token_response.metadata && token_response.metadata.authenticated === true ){

					let user_id = token_response.metadata.user_id;

					usersDAO.getUserById( user_id ).then( function( response ){
						
						return success( token_response.metadata.user = response.metadata );

					});

				} else {
					return success( token_response );
				}

			});

		});

	} catch( e ){

		return success({
			success	: false
			error	: e.message
		});

	}

}

authService.prototype.register = async function( user_id, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );
			var tokensUtil 			= new app.app.utils.tokensUtil;

			tokensUtil.removeAccessTokenById( user_id ).then( function( response ){

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

authService.prototype.logout = async function( user_id, app ) {

	try {

		let self = this;

		return new Promise((success, reject) => {

			var usersSessionsDAO 	= new app.app.models.usersSessionsDAO( conn );
			var tokensUtil 			= new app.app.utils.tokensUtil;

			tokensUtil.removeAccessTokenById( user_id ).then( function( response ){

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

module.exports = authService;