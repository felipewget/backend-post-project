/**
 * Collection UsersSessions
 * @description Este documento contem operacoes da collection UsersSessions
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id: 		ObjectId(),		// Objeto Id do proprio MongoDB para indexacao
		user_id: 	ObjectId(),		// Id do usuario da collection Users
		token: 		HashString, 	// Token de autenticacao
		created: 	Timestamp,	 	// Quando a sessao criada 
		deleted:    Timestamp|null	// Soft-delete
 	}
 */

function usersSessionsDAO(connection)
{

	this._db_name 			= 'application';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "users_sessions";
	
}

usersSessionsDAO.prototype.createToken = function( obj_user_session )
{
	
	var response 			= {};

	let self = this;

	return new Promise((resolve, reject) => {

		try {

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.insert( obj_user_session, function( status, result){

						response.success = true;
						response.metadata = result.ops[0]
											? result.ops[0]
											: null ;

						mongoclient.close();

						return resolve( response );

					});				

				});

			});

		} catch ( e ) {

			response.success = false;
			response.error = e.message;
			return resolve( response );

		}

	});

}

usersSessionsDAO.prototype.isValidSession = function( token )
{

	let self = this;

	var response 		= {};

	return new Promise(( resolve, reject ) => {

		try {

			let fields = {
				_id: 		1,
				user_id: 	1,
				link: 		1,
				token: 		1,
			};

			let query = {
				$and: [
					{ 'token'	: { $eq: token } },
					{ 'deleted' : { $eq: null } }
				]
			}

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {
					
						mongoclient.close();

						response.success = true;
						response.metadata = result[0]
											? result[0]
											: null;

						return resolve( response );

					});				

				});

			});

		} catch ( e ) {

			response.success = false;
			response.error = e.message;
			return resolve( response );

		}

	});

}

usersSessionsDAO.prototype.removeAccessToken = function( token )
{

	let self = this;

	var response 		= {
		success: true
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = { 'token': { $eq: token } };

			let update = {
				$set: {
					'deleted': 		Date.now(),
				}
			};

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.update( query, update, { upsert: true }, function( error, callback ){

						mongoclient.close();

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			response.success = false;
			response.error = e.message;
			return resolve( response );

		}

	});

}

module.exports = function(){
	return usersSessionsDAO;
}