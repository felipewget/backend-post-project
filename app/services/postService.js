var postService = function() {} // postService constructor

postService.prototype.authenticate = async function(req, res, app) {

	// var postService = new ( require("./../../services/platform/postService.js") )();

	// var login = req.query.login;
	// var password = req.query.password;

	var response = { ola: 1 } // await postService.authenticate( login, password, app );

	res.send( response );
	res.end();

}

postService.prototype.isAuthenticated = async function(req, res, app) {

	// var postService = new ( require("./../../services/platform/postService.js") )();

	// var token = req.query.token;

	var response = { ola: 1 } // await postService.isAuthenticated( token, app );

	res.send(response);
	res.end();

}

module.exports = postService;