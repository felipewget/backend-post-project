var mediaService = function() {} // mediaService constructor

mediaService.prototype.saveUpload = async function( name_archive, app) {

	// var mediaService = new ( require("./../../services/platform/mediaService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await mediaService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

mediaService.prototype.getMedia = async function( _id, app) {

	// var mediaService = new ( require("./../../services/platform/mediaService.js") )();

	// var token = req.query.token;

	var response = { ola: 1 } // await mediaService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}

module.exports = mediaService;