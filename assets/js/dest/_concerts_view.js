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
	        var concert_date = moment( post.attributes.date, "YYYY/MM/DD HH:mm:ss" ),
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

		this.subTemplate = _.template( $('#concerts_sub_template').html() );

		// IF PREVIOUS: ADD FILTERING
		if ( section === "previous" ) {

			this.renderPrevious( this.posts );

		} else {

			this.target.append( this.subTemplate( this.posts ) );			

		}

		return this;

	},

	renderPrevious: function ( posts ) {

		console.log("ConcertsView.renderPrevious");

		// GET GROUPS + YEARS
		var groups = [],
			years = [],
			year;

		if ( posts.length ) {

			_.each( posts, function( post ) {
				// IF NOT YET IN ARRAY
				if ( !_.contains( groups, post[0].attributes.group[0] ) ) {
					groups.push( post[0].attributes.group[0] );
				}
				year = post[0].attributes.date.split("–")[2].split(",")[0];
				if ( !_.contains( years, year ) ) {
					years.push( year );
				}			
			});

		}

		this.groups = groups;
		this.years = years;

		// ADD FILTER
		this.filterTemplate = _.template( $('#concerts_filter_template').html() );

		this.target.append( this.filterTemplate() );

		this.previousTemplate = _.template( $('#concerts_sub_template').html() );

		this.target.append( this.subTemplate( this.posts ) );

	}

});
