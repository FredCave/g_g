var app = app || {};

app.NewsItemView = Backbone.View.extend({

	className: "widget news_widget",

	initialize: function () {

		console.log("NewsItemView.initialize");

	},

	events: {
		"click .close": "widgetClose"
	},

    template: _.template( $('#news_item_template').html() ),

	render: function(){

		console.log("NewsItemView.render");

		console.log( 19, this.model.attributes );

		if ( this.model.has("acf.news_image") ) {
			console.log("Contains image");
		} else {
			console.log("No image");	
		}

		this.$el.html( this.template( this.model.attributes ) );

		return this;

	},

	widgetClose: function () {

		this.unbind();
		this.remove();

	}

});