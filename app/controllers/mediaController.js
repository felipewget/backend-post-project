
var authService 	= require("./../services/authService.js");
var mediaService 	= require("./../services/mediaService.js");

var mediaController = function() {} // mediaController constructor

mediaController.prototype.getMedia = async function(req, res, app) {

	var response = {};

	res.send( response );
	res.end();

}

mediaController.prototype.upload = async function(req, res, app) {

	var response = {};

	res.send( response );
	res.end();

}

module.exports = mediaController;