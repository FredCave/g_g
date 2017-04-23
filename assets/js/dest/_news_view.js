var app = app || {};

app.NewsView = Backbone.View.extend({

	el: "#news",

	initialize: function () {

		// console.log("NewsView.initialize");

		var self = this;

		this.newsCollection = new app.NewsCollection();
		this.newsCollection.fetch().then( function(){
			self.renderItem( self.newsCollection );
		}); 

		// FOR TRIGGER EVENT BELOW
		// _.extend( this, Backbone.Events );

	},

	renderItem: function ( elems ) {

		// console.log("NewsView.renderItem");

		var self = this;
	
		// LOOP THROUGH ELEMS
		elems.forEach( function ( model ) {
			
			var newsItemView = new app.NewsItemView({model:model});
			self.$el.append( newsItemView.render().$el );

		});

		this.$el.children().last().find("img").on("load", function(){

			self.newsLoaded();

		});

	},

	newsLoaded: function () {

		console.log("NewsView.newsLoaded");

		var url = Backbone.history.location.href,
			hash;
		// IF HASH
		if ( url.indexOf("#") > -1 ) {
			// IF NOT NEWS
			hash = url.split("#")[1].substring(1);
			if ( hash !== "news" ) {
				// SCROLL DOWN TO NEXT SECTION
				
				console.log( hash, $("#" + hash).offset().top );
				
				$('html, body').animate({
            		scrollTop: $("#" + hash).offset().top - ( $("#nav").outerHeight() + 40 )
        		}, 1000 ); 

			}
		} 

	}

});