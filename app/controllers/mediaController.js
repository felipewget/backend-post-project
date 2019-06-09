
var mediaController = function() {

	this.mediaService 	= require("./../services/mediaService.js");
	this.authService 	= require("./../services/authService.js");

}

mediaController.prototype.removeMedia = async function(req, res, app) {

	var { token, ids } 	= req.query;
	var response 	= {};

	self.mediaService 	= require("./../services/mediaService.js");
	self.authService 	= require("./../services/authService.js");

	let authService 	= ( new self.authService() );
	let mediaService 	= ( new self.mediaService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		response = await mediaService.removeMediaByIds( ids );

	}

	res.send( response );
	res.end();

}

mediaController.prototype.getMediaById = async function(req, res, app) {

	var { token, ids } 	= req.query;
	var response 	= {};

	self.mediaService 	= require("./../services/mediaService.js");
	self.authService 	= require("./../services/authService.js");

	let authService 	= ( new self.authService() );
	let mediaService 	= ( new self.mediaService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		response = await mediaService.getMediaByIds( ids );

	}

	res.send( response );
	res.end();

}

mediaController.prototype.uploadMedia = async function(req, res, app) {

	let self = this;

	var { token } = req.query;
	var response = {};

	let multer 			= require('multer');
	self.mediaService 	= require("./../services/mediaService.js");
	self.authService 	= require("./../services/authService.js");

	let authService 	= ( new self.authService() );
	let mediaService 	= ( new self.mediaService() );

	var obj_auth = await authService.isAuthenticated( token, app );

	if( !obj_auth.authenticated ){

		response.success = false;
		response.authenticated = false;

	} else {

		let user_id 	= obj_auth.metadata._id;

		// Setting Storage
		let storage = multer.diskStorage({

			// Setting Path
			destination: function (req, file, cb) {
				cb(null, 'app/publics/uploads/posts_medias');
			},

			// Setting File
			filename: function (req, file, cb) {

				// Get Extension
				let ext = file.originalname.substr( file.originalname.lastIndexOf('.') + 1 );

				// Set File Name
				cb( null, Date.now() + '.' + ext );
			}

		});

		// Obj Upload
		let upload = multer({

			// Setting Storage
			storage: storage,

			// Validate Archive
			fileFilter: function (req, file, cb) {

				// Validação
			    if (file.mimetype !== 'image/png') { // @TODO env types
			     	
			     	req.err = { 
		     			success: false,
		     			error: "Tipo de arquivo invalido",
			     	};

			       	return cb( null, false, new Error('') );

			    }

			    cb( null, true );

			   }

		}).single('media');

		upload( req, res, async function(err) {

			if(req.err != undefined ){

				response.success 	= false;
				response.error  	= req.err;

			} else if(req.file == undefined ){

				response.success 	= false;
				response.error 		= 'Envie um arquivo para Upload';

			} else {

				response = await mediaService.saveUpload( req.file.filename, req.file.originalname, req.file.mimetype, app );
				// var resp = {
		  //    			cod: 200,
		  //    			title: 'Falha no Upload',
		  //    			message: 'Upload feito com sucesso!',
		  //    			metadata: {
		  //    				nome_original: req.file.originalname,
		  //    				type: req.file.mimetype,
		  //    				filename: req.file.filename,
		  //    				path: '/uploads/messenger/'+ req.file.filename,
		  //    				}
		  //    			};
		  //    		res.send(resp);
				// // console.log( req.file );

			}

			res.send( response );
			res.end();

	    });

	}

}

module.exports = mediaController;