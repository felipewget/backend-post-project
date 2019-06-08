exports.createAccessToken = function( user_id ) {

	try {

		var sha1 = require('sha1');
		var response = {
			cod: 200,
			token: null,
		};

		return new Promise((sucess, reject) => {

			response.token = sha1( Date.now() + "_" + user_id + "") // @todo, fazer
			return sucess( response );

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";
		
		// console.log( e.message );
		return sucess( response );

	}
	
}

exports.createDeaultTokenLink = function( login ) {

	var sha1 = require('sha1');
	var response = {
		cod: 200,
		token: null,
	};

	try {

		return new Promise((sucess, reject) => {

			response.token = sha1( Date.now() + "_" + login + "_code_link")
			return sucess( response );

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";
		
		// console.log( e.message );
		return sucess( response );

	}

}

// @TODO
exports.createUserPasswordToken = function( password ) {

	var response = {
		cod: 200,
		password: null,
	};

	try {

		return new Promise((sucess, reject) => {

			response.password = password;
			return sucess( response );

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";
		
		// console.log( e.message );
		return sucess( response );

	}

}