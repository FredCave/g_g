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

			// self.newsLoaded();

		});

	},

	newsLoaded: function () {

		console.log("NewsView.newsLoaded");

		var url = Backbone.history.location.href,
			hash,
			hash_id;
		// IF HASH
		if ( url.indexOf("#") > -1 ) {
			// IF NOT NEWS
			hash = url.split("#")[1].substring(1);

			// IF CONTAINS PROJECT ID
			if ( hash.indexOf("project") > -1 ) {
				hash_id = hash.split("/")[1];
				hash = "project-" + hash_id;
			}
			if ( hash !== "news" ) {
				// SCROLL DOWN TO NEXT SECTION
				$('html, body').animate({
            		scrollTop: $("#" + hash).offset().top - ( $("#nav").outerHeight() + 40 )
        		}, 1000 ); 

			}
		} 

	}

});