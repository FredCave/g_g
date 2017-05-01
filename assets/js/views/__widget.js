var app = app || {};

app.Widget = Backbone.View.extend({
	
	events: {
		"click .close": "widgetClose"
	},

	widgetClose: function () {

		this.unbind();

		var self = this,
			target = this.$el;

		// IF NEWS
		if ( this.$el.hasClass("news_widget") ) {

			// IF LAST
			if ( $("#news").children().length === 1 ) {
				// REMOVE PARENT SECTION
				setTimeout( function () {
					$("#news").remove();
				}, 1000 );
			}

			// target = this.$el;

		// IF PROJECTS
		} else if ( this.$el.hasClass("project_widget") ) {
		
			// IF SC WIDGET HAS BEEN CHANGED: RESET SOUNDCLOUD POPUP
			if ( $("#soundcloud").attr("data-changed") ) {
				new app.SoundcloudView();
			}

			// IF LAST PROJECT ITEM: CLOSE PARENT WRAPPER
			if ( $("#projects").children().length === 1 ) {
				// REMOVE PARENT SECTION
				setTimeout( function () {
					$("#projects").remove();
				}, 1000 );

			}

		} 
			
		// SET HEIGHT IN ORDER TO ANIMATE
		target.css( "height", this.$el.outerHeight() );
		// FADE OUT OPACITY OF CHILD + ANIMATE HEIGHT 
		setTimeout( function (){

			target.css({
				"height" : 0,
				"display" : "inherit",
				"opacity" : 0					
			});	

			// AFTER ANIMATION: REMOVE
			setTimeout( function (){

				// CHANGE URL
				var prev = target.prev("section").attr("id");
				Backbone.history.navigate( "#_" + prev );

				setTimeout( function () {
					self.remove();
				}, 1000 );
				
			}, 500 );	

		}, 100 );

	}

});