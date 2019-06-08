/**
 * Collection 	Users
 * @description Model que gerencia os usuarios
 * @author 		Fe Oliveira
 * @copyright 	Fe Oliveira
 * @collection_structure
 	{
		_id	: ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		name: {
			first_name	: String,
			last_name	: String,
			full_name	: String,
		},
		auth: {
			login		: String,
			password	: String,
		},
		created			: Timestamp,
		updated			: Timestamp,
		deleted: 		: Timestamp,
 	}
 */

function usersDAO(connection)
{

	this._db_name 			= 'application';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "users";

}

usersDAO.prototype.authenticate = function( login, password )
{

	var response 	= {};
	var self 		= this;

	return new Promise(( resolve, reject ) => {
		
		try {

			let fields = {
				auth 	: 0,
				created : 0,
				deleted : 0,
				updated : 0
			};

			let query = {
				$and: [
					{ 'auth.login'		: { $eq: login } },
					{ 'auth.password'	: { $eq: password } }
				]
			};

			self._conn( self._db_name ).open(function( err, mongoclient ){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.success 	= true;
						response.metadata 	= result && result[0]
												? result[0]
												: null ;

						return resolve( response );

					});

				});

			});

		} catch( e ) {

			response.success 	= false;
			response.error 		= e.message;

			return resolve( response );

		}

	});

}


usersDAO.prototype.getUserByLogin = function( login )
{

	var response 	= {};

	var self 		= this;

	return new Promise(( resolve, reject ) => {
		
		try {
			

			let fields = {
				_id: 	1,
				name: 	1,
			};

			let query = { 'auth.login'		: { $eq: login } };

			self._conn( self._db_name ).open(function( err, mongoclient ){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.success 	= true;
						response.metadata 	= result && result[0]
												? result[0]
												: null ;

						return resolve( response );

					});

				});

			});

		} catch( e ) {

			response.success 	= false;
			response.error 		= e.message;

			return resolve( response );

		}

	});

}

usersDAO.prototype.create = function( objUser )
{
	
	var response	= {};

	let self = this;

	return new Promise((resolve, reject) => {		

		try {

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.insert( objUser, function( status, result){

						response.success 	= true;
						response.metadata 	= result.ops[0];

						mongoclient.close();
						
						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			response.success 	= false;
			response.error 		= e.message;

			return resolve( response );

		}

	});

}

usersDAO.prototype.getUserById = function( id ){

	var response 	= {};

	var self 		= this;

	return new Promise(( resolve, reject ) => {
		
		try {
			

			let fields = {
				_id: 	1,
				name: 	1,
			};

			let query = { '_id'	: { $eq: new require('mongodb').ObjectId( id ) } };

			self._conn( self._db_name ).open(function( err, mongoclient ){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.success 	= true;
						response.metadata 	= result && result[0]
												? result[0]
												: null ;

						return resolve( response );

					});

				});

			});

		} catch( e ) {

			response.success 	= false;
			response.error 		= e.message;

			return resolve( response );

		}

	});

}

module.exports = function(){
	return usersDAO;
}
