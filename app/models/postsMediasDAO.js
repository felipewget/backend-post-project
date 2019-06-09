/**
 * Collection postsMediasDAO
 * @description Este documento contem operacoes na collection UsersInfo
 * @author Fe Oliveira
 * @collection_structure
 	{
		_id				: ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		name			: String<path>
		original_name	: String<path>
 		type			: Type<mime-type>,
 		created			: Timestamp,
 		deleted			: Timestamp|null,
 	}
 */

function postsMediasDAO(connection)
{

	this._db_name 			= 'db_name';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "posts_medias";

}

postsMediasDAO.prototype.resgisterMedia = function( obj_media )
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

postsMediasDAO.prototype.removeMedia = function( media_id )
{

	let self = this;

	var response 		= {
		success: true
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = { '_id' : { $eq: media_id } };

			let update = {
				$set: {
					'deleted': 	Date.now(),
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

postsMediasDAO.prototype.removeMediaByIds = function( arr_medias_id )
{

	let self = this;

	var response = {
		success: true
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = { '_id' : { $in: [ arr_medias_id ] } };
			
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

postsMediasDAO.prototype.listMediasByIds = function( arr_medias_id )
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

			let query = { '_id' : { $in: [ arr_medias_id ] } };

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
	return postsMediasDAO;
}
