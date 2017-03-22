var app = app || {};

app.NewsCollection = Backbone.Collection.extend({

	url: "http://localhost:8888/geoffroy/wp-json/wp/v2/news",

	initialize: function () {

		console.log("NewsCollection.initialize");

	}
	
});