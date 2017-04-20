var app = app || {};

app.LinksView = app.Widget.extend({
	
	el: "#links",

	initialize: function () {

		console.log("LinksView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		// UPCOMING SECTION
		this.model = new app.LinksModel;
		this.model.fetch().then( function(){

			self.render();

		});

	},

	template: _.template( $('#links_template').html() ),
	
	render: function () {

		console.log("LinksView.render");

		this.$el.append( this.template( this.model ) );

		// FADE IN
		this.$el.find(".widget").fadeIn().css("display","inline-block");

		return this;

	}

});
