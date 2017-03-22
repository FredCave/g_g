var app = app || {};

app.BgImageModel = Backbone.Model.extend({
	
	url : "http://localhost:8888/geoffroy/wp-json/wp/v2/posts/72", 

	src : "",

	initialize: function () {

		console.log( "BgImageModel.initialize" );

	}

});