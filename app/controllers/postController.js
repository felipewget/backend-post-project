
var authService = require("./../services/authService.js");
var postService = require("./../services/postService.js");

var postController = function() {}

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

postController.prototype.createPost = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

postController.prototype.updatePost = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

postController.prototype.deletePost = async function(req, res, app) {

	// var authService = new ( require("./../../services/platform/authService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await authService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

module.exports = postController;