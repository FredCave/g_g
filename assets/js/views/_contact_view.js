var app = app || {};

app.ContactView = app.Widget.extend({

	initialize: function (){

		console.log("ContactView.initialize");

		var self = this;

		// UPCOMING SECTION
		this.model = new app.ContactModel;
		this.model.fetch().then( function(){

			// console.log( 20, self.model );

			self.render();

		});

	},

	template: _.template( $('#contact_template').html() ),
	
	render: function () {

		console.log("ContactView.render");

		console.log( 34, this.$el );

		this.$el.append("<p>TEST</p>");

		this.$el.append( this.template( this.model ) );

		// FADE IN
		this.$el.find(".widget").fadeIn().css("display","inline-block");

		return this;

	}

});