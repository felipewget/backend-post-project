/**
 * Collection publicacoes
 * @description Este documento contem operacoes da collection publicacoes
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id			:	ObjectId(),
		user_id		: 	ObjectId(),
		text		: 	String,
		medias		: 	Array,
		categorys 	: 	Array
		created		: 	Timestamp,
		updated		: 	Timestamp|null,
		deleted		: 	null,
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

postsDAO.prototype.getPostById = function( id )
{

	var response 	= {};

	var self 		= this;

	return new Promise(( resolve, reject ) => {
		
		try {

			let query = { '_id'	: { $eq: id } };

			self._conn( self._db_name ).open(function( err, mongoclient ){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.find( query ).toArray(function (err, result) {

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

postsDAO.prototype.removePost = function( post_id, user_id )
{

	let self = this;

	var response 		= {
		success: true
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = {
				$and: [
					{ '_id': { $eq: post_id } },
					{ 'user_id': { $eq: user_id } }
				]
			}

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

postsDAO.prototype.updatePost = function( obj_update, user_id, post_id )
{

	let self = this;

	var response 		= {
		success: true
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = {
				$and: [
					{ '_id'		: { $eq: post_id } },
					{ 'user_id'	: { $eq: user_id } }
				]
			}

			let update = {
				$set: obj_update
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
	return postsDAO;
}