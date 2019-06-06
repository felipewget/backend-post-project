
/**
 *	Shared Routes
 *
 *	@internal	Utils Routes, how 404 endpoint
 *	@author 	Felipe Oliveira<felipe.wget@gmail.com
 *	@copyright 	Felipe Oliveira
 *	@version	0.0.1
 */
module.exports = function( app ){

	/**
	 * 	404 Route - Route not found
	 *
	 *	@return {
	 *		success		: False
	 *		error		: "Page not found"
	 *		cod			: 404
	 *	}
	 */
	app.use(function(req, res, next){

	  res.send({
	  	success		: false 			,
	 	error		: "Page not found"	,
	 	cod			: 404 				,
	  });

	  res.end();

	});

}
