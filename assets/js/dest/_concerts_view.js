var app = app || {};

app.ConcertsView = app.Widget.extend({
	
	el: "#concerts",

	initialize: function () {

		console.log("ConcertsView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		// UPCOMING SECTION
		this.upcoming = new app.UpcomingCollection;
		this.upcoming.fetch().then( function(){

			// TO REDO: FILTER IN ORDER TO GET UNIFORM FORMAT WITH PROJECTVIEW
			self.filteredUpcoming = self.upcoming.filter( function(item){
				return item;
			});

			self.renderConcerts( "upcoming" );

		});

		// PREVIOUS (WITH FILTER)
		this.previous = new app.PreviousCollection;
		this.previous.fetch().then( function(){

			self.filteredPrevious = self.previous.filter( function(item){
				return item;
			});

			self.renderConcerts( "previous" );

		});

		this.renderWrapper();

	},

	filterDates: function ( posts ) {

		// console.log("UpcomingView.filterDates");

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
	
	renderWrapper: function () {

		this.wrapperTemplate = _.template( $('#concerts_template').html() );

		this.$el.append( this.wrapperTemplate );

		this.$el.find(".widget").fadeIn().css("display","inline-block");

	},

	// RENDER SUB-SECTIONS INDEPENDENTLY
	renderConcerts: function ( section ) {

		console.log("ConcertsView.renderConcerts", section);

		if ( section === "upcoming" ) {

			this.target = $("#concerts_upcoming");
			this.filteredPosts = this.filterDates( this.filteredUpcoming );

		} else {

			this.target = $("#concerts_previous");
			this.filteredPosts = this.filterDates( this.filteredPrevious );

		}

		this.posts = {"posts": this.filteredPosts };

		this.upcomingTemplate = _.template( $('#concerts_sub_template').html() );

		this.target.append( this.upcomingTemplate( this.posts ) );

		return this;

	},

	renderPrevious: function () {

		console.log("ConcertsView.renderPrevious");

		this.previousTemplate = _.template( $('#concerts_template').html() );


	}

});
