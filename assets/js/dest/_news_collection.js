var app = app || {};

app.NewsCollection = Backbone.Collection.extend({

	url: ROOT + "/wp-json/wp/v2/news"
	
});