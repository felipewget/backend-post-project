/**
 * Collection publicacoes
 * @description Este documento contem operacoes da collection publicacoes
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id		:	ObjectId(),
		user_id	: 	ObjectId(),
		text	: 	String,
		medias	: 	Array,
		created: 	Timestamp,
 	}
 */

function postsDAO(connection)
{

	this._db_name 			= 'application';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "posts";
	
}

postsDAO.prototype.createPost = function( obj_post )
{
	
	var response 			= {};

	let self = this;

	return new Promise((resolve, reject) => {

		try {

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.insert( obj_post, function( status, result){

						response.success = true;
						response.metadata = result.ops;

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

postsDAO.prototype.list = function( pages = 1, categorys = [] )
{

	// @TODO terminar este metodo

	var response 	= {};

	let self 		= this;

	return new Promise(( resolve, reject ) => {
		
		try {

			let fields = {
				_id		:	1,
				user_id	: 	1,
				text	: 	1,
				medias	: 	1,
				created: 	1,
			};

			let query = {
				$and: [
					{ 'auth.login'		: { $eq: login } },,
					{ 'auth.password'	: { $eq: password } }
				]
			};

			self._conn( self._db_name ).open(function( err, mongoclient ){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query, fields ).toArray(function (err, result) {

						mongoclient.close();

						response.success 	= true;
						response.metadata 	= result;

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

postsDAO.prototype.deletePost = function( id )
{

	let self = this;

	var response 		= {};

	return new Promise(( resolve, reject ) => {

		try {

			let query = { '_id': 	{ $eq: new require('mongodb').ObjectId( id ) } };

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.remove( query , function (err, result) {
					
						mongoclient.close();

						response.success = true;
						response.metadata = result;

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
	return postsDAO;
}