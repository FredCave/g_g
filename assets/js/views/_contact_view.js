var app = app || {};

app.ContactView = app.Widget.extend({

	el: "#contact",

	initialize: function (){

		console.log("ContactView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		// UPCOMING SECTION
		this.model = new app.ContactModel;
		this.model.fetch().then( function(){

			console.log( 20, self.model );

			self.render();

		});

	},

	template: _.template( $('#contact_template').html() ),
	
	render: function () {

		console.log("ContactView.render");

		console.log( 34, this.model );

		this.$el.append( this.template( this.model ) );

		// FADE IN
		this.$el.find(".widget").fadeIn().css("display","inline-block");

		return this;

	}

});