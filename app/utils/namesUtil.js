exports.formatName = async function( name ) {
	
	response = {
		cod: 200
	}

	try {

		return new Promise((sucess, reject) => {

			var arrName = name.split(' ');
			if( arrName.length > 1 ){

				var indexArr = arrName.length - 1;

				response.name = {
					full_name: 	name,
					first_name: arrName[0],
					last_name: 	arrName[indexArr],
				}

				return sucess( response );

			} else {

				response.name = {
					full_name: 	name,
					first_name: arrName[0],
					last_name: 	null,
				}

				return sucess( response );

			}
			

		});

	} catch ( e ) {

		response.cod = 500;
		response.error = "Problema interno";
		response.message = "Houve um erro interno, nossos engenheiros ja receberam o log estao trabalhando no caso";
		
		// console.log( e.message );
		return sucess( response );

	}
	
}