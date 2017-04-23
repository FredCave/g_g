var app = app || {};

app.NewsItemView = app.Widget.extend({

	className: "widget news_widget",

	initialize: function () {

		// console.log("NewsItemView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

	},

    template: _.template( $('#news_item_template').html() ),

	render: function(){

		// console.log("NewsItemView.render");

		this.$el.html( this.template( this.model.attributes ) ).fadeIn().css("display","inline-block");

		return this;

	}

});