var app = app || {};

app.ContactView = Backbone.View.extend({

	el: "#main_contact",

	initialize: function (){

		console.log("ContactView.initialize");

		var self = this;

		this.model = new app.ContactModel();

		this.model.fetch().then( function(){

			self.address = self.model.attributes.acf.contact_main;

			self.render( self.address );

		});
    
	},

	render: function ( address ) {

		console.log("ContactView.render", address );

		this.$el.html( "<p><a href='mailto:" + address + "'>" + address + "</a></p>" );

		return this;

	}

});