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
			
			var self = this;

			// console.log( 21, this.$el.find(".widget") );

			// SET HEIGHT IN ORDER TO ANIMATE
			this.$el.css( "height", this.$el.outerHeight() );
			// FADE OUT OPACITY OF CHILD + ANIMATE HEIGHT 
			setTimeout( function (){

				self.$el.css({
					"height" : 0,
					"display" : "inherit",
					"opacity" : 0					
				});	

				// AFTER ANIMATION: REMOVE
				setTimeout( function (){

					// IF IN MAIN COLUMN
					if ( self.$el.parents("#widget_wrapper").length ) {
						// CHANGE URL
						var prev = self.$el.prev("section").attr("id");
						Backbone.history.navigate( "#_" + prev , { trigger: true } );
					}
	
					setTimeout( function () {
						self.remove();
					}, 1000 );
					
				}, 500 );	

			}, 100 );

		}

	}

});