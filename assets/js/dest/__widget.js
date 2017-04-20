var app = app || {};

app.Widget = Backbone.View.extend({
	
	events: {
		"click .close": "widgetClose"
	},

	widgetClose: function () {

		this.unbind();

		// CHECK IF LAST NEWS ITEM
		if ( this.$el.hasClass("news_widget") && $("#news").children().length === 1 ) {
			// REMOVE PARENT SECTION
			$("#news").remove();
		} else {
			this.remove();			
		}

	}

});