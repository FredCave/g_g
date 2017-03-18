var app = app || {};

app.ContactModel = Backbone.Model.extend({
	
	url : "http://localhost:8888/geoffroy/wp-json/wp/v2/posts/80", 

	initialize: function () {

		console.log( "Contact.initialize" );

	}

});