/**
 * Collection 	Categorys
 * @description Model que gerencia os usuarios
 * @author 		Fe Oliveira
 * @copyright 	Fe Oliveira
 * @collection_structure
 	{
		_id			: ObjectId(),	// Objeto Id do proprio MongoDB para indexacao
		name 		: String,
		num_posts 	: Integer,
		created		: Timestamp,
		deleted 	: Timestamp,
 	}
 */

function categorysDAO(connection)
{

	this._db_name 			= 'application';
	this._conn 				= connection( this._db_name );
	this._collection_name 	= "categorys";

}

categorysDAO.prototype.listAvaliableCategorys = function()
{

	let self = this;

	var response 		= {};

	return new Promise(( resolve, reject ) => {

		try {

			// All Categorys
			let match = { $match: {} }; 

			// If there is on posts
			let lookup = {
	  			$lookup:{
		            from          : "posts",
		            localField    : "created",
		            foreignField  : "_id",
		            as            : "posts"
		        },
	  		}

	  		// Select only necessary fields
	  		let project = {
	        	$project: {
	        		_id	 : 1,
	        		name : 1,
	        		posts: 1,
	        		posts: {
	        			_id: 		1,
	        		},
	        	}
	      	};

	      	// Order By
	      	let sort = {
				$sort: { name: 1 }
			};

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

		            collection.aggregate([
		                            match,
		                            project,
		                            lookup,
		                            sort,
		            ]).toArray( function(err, result) {

		              	response.success = true;
		     			response.metadata = result;

		                mongoclient.close();

		                return resolve( response );

		          	});

 				});

			});

		} catch ( e ) {

			console.log( 'erro' + e.message);
			response.success = false;
			response.error = e.message;
			return resolve( response );

		}

	});

}

categorysDAO.prototype.insertOrGetCategoryByName = function( name )
{

	let self = this;

	var response 		= {
		success: true,
		metadata: {}
	};

	return new Promise(( resolve, reject ) => {

		try {

			let query = { 'name' : { $eq: name } };

			let update = {
				$setOnInsert: { 'name' : name }
			};

			self._conn( self._db_name ).open( function(err, mongoclient){

				mongoclient.collection( self._collection_name, function(err, collection){

					collection.findOneAndUpdate( query, update, { upsert: true }, function( error, callback ){

						var _id;

						if( callback.lastErrorObject && callback.lastErrorObject.updatedExisting === false && callback.lastErrorObject.upserted ){
							_id = callback.lastErrorObject.upserted;
						} else if( callback.lastErrorObject && callback.lastErrorObject.updatedExisting === true ){
							_id = callback.value._id;
						}

						mongoclient.close();

						response.metadata._id = _id;

						return resolve( response );

					});

				});

			});

		} catch ( e ) {

			console.log( 'erro' + e.message);
			response.success = false;
			response.error = e.message;
			return resolve( response );

		}

	});

}

module.exports = function(){
	return categorysDAO;
}
