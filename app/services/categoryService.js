var conn 		= require("./../../config/dbConnect");

var categoryService = function() {} // categoryService constructor

categoryService.prototype.listAvaliableCategorys = async function( app ) {

	try {

		let self = this;

		return new Promise( (success, reject) => {

			var categorysDAO = new app.app.models.categorysDAO( conn );

			categorysDAO.listAvaliableCategorys().then( function( response ){
				return success( response );
			});

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

categoryService.prototype.processCategorysPost = async function( arr_categorys, app) {

	try {

		let self = this;

		return new Promise( async (success, reject) => {

			var categorysDAO 	= new app.app.models.categorysDAO( conn );
			var ObjectId 		= require('mongodb').ObjectId;
			var categorys_ids 	= [];

			// arr_categorys = ['eeeeeeee', 'eeee']; @TODO testar com Angular e ReactNative
			for( let i in arr_categorys ){

				let obj_category = await categorysDAO.insertOrGetCategoryByName( arr_categorys[i] );

				let category_id = new ObjectId( obj_category.metadata._id );

				categorys_ids.push( category_id );

			}

			return success( categorys_ids );

		});

	} catch( e ){

		return success({
			success	: false,
			error	: e.message
		});

	}

}

module.exports = categoryService;