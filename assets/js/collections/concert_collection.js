var app = app || {};

app.ConcertCollection = Backbone.Collection.extend({

	model: app.ConcertModel,

	url: "http://localhost:8888/geoffroy/wp-json/wp/v2/concerts"

});