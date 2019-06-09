var mediaService = function() {} // mediaService constructor

mediaService.prototype.saveUpload = async function( name_path, original_name, mime_type, app ) {

	try {

		let self = this;

		return new Promise( (success, reject) => {

			var postsMediasDAO = new app.app.models.postsMediasDAO( conn );

			let obj_archive = {
				name			: name_path,
				original_name	: original_name,
		 		type			: mime_type,
		 		created			: Date.now(),
		 		deleted			: null,
		 	}

			postsMediasDAO.resgisterMedia( obj_archive ).then( function( response ){
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

mediaService.prototype.getMediaByIds = async function( ids, app) {

	try {

		let self = this;

		return new Promise( (success, reject) => {

			var postsMediasDAO = new app.app.models.postsMediasDAO( conn );

			postsMediasDAO.listMediasByPosts( ids ).then( function( response ){
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

mediaService.prototype.getMediaByIds = async function( ids, app) {

	try {

		let self = this;

		return new Promise( (success, reject) => {

			var postsMediasDAO = new app.app.models.postsMediasDAO( conn );

			postsMediasDAO.listMediasByIds( ids ).then( function( response ){
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

mediaService.prototype.removeMediaByIds = async function( ids, app) {

	try {

		let self = this;

		return new Promise( (success, reject) => {

			var postsMediasDAO = new app.app.models.postsMediasDAO( conn );

			postsMediasDAO.removeMediaByIds( ids ).then( function( response ){
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

module.exports = mediaService;