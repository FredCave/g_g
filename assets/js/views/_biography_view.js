var app = app || {};

app.BiographyView = app.Widget.extend({
	
	el: "#biography",

	initialize: function () {

		console.log("BiographyView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		this.model = new app.BiographyModel();

		this.model.fetch().then( function(){

			self.render();

		});

	}, 

	template: _.template( $('#biography_template').html() ),

	render: function () {

		console.log("BiographyView.render");

		this.$el.append( this.template( this.model.attributes ) );

		this.$el.find(".widget").fadeIn().css("display","inline-block");

		return this;

	}

});
