var app = app || {};

app.SocialMediaModel = Backbone.Model.extend({
	
	url: "http://localhost:8888/geoffroy/wp-json/wp/v2/posts/72",

	initialize: function () {

		console.log("SocialMediaModel.initialize");

	}

});