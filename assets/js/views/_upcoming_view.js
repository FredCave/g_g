var app = app || {};

app.UpcomingView = app.Widget.extend({
	
	el: "#upcoming",

	initialize: function (){

		console.log("UpcomingView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		this.collection = new app.UpcomingCollection();

		this.collection.fetch().then( function(){

    		self.render( self.collection );			

		});
	
	},

	filterDates: function ( posts ) {

		console.log("UpcomingView.filterDates");

		posts.forEach( function ( post ) { 

			// GET DATE
	        var concert_date = moment(post.attributes.date),
	            formatted_date;

	    	// IF TIME IS OTHER THAN DEFAULT
	    	if ( concert_date.hour() !== 0 ) {
				formatted_date = concert_date.format("D/MM/YYYY, HH:mm").replace(/\//g , "–");
	    	} else {
				formatted_date = concert_date.format("D/MM/YYYY").replace(/\//g , "–");
	    	}

	        post.attributes.date = formatted_date;

		});

		return posts;

	},

	render: function ( concerts ) {

		console.log("UpcomingView.Render");

		// FILTER DATES
		var filteredPosts = this.filterDates( this.collection );

		this.posts = {"posts": filteredPosts.toJSON() };

		this.template = _.template( $("#upcoming_template").html() );

		this.$el.append( this.template( this.posts ) ).fadeIn();

		// FADE IN
		this.$el.find(".widget").fadeIn().css("display","inline-block");

		return this;

	}

});