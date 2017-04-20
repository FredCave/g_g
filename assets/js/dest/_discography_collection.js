var app = app || {};

app.DiscographyCollection = Backbone.Collection.extend({

	url: ROOT + "/wp-json/wp/v2/albums"

});