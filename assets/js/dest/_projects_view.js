var app = app || {};

app.ProjectsView = app.Widget.extend({
	
	el: "#projects",

	initialize: function () {

		console.log("ProjectsView.initialize");

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

		var self = this;

		this.model = new app.ProjectModel({id:this.id});

		this.model.fetch().then( function(){

			self.render();

		});

	},

	loadConcerts: function () {

		console.log("ProjectsView.loadConcerts");

		var self = this; 

		this.upcomingConcerts = new app.UpcomingCollection;
		this.upcomingConcerts.fetch().then( function(){

			// RETURNS ARRAY OF OBJECTS
			self.filteredConcerts = self.upcomingConcerts.filter( function(item) { 
				// GET GROUP FROM ACF RELATIONSHIP OBJECT
				var group = item.get("group")[0];

				if ( group ) {
					return group.ID == self.id;	
				} else {
					return null;
				}
				
			});

			if ( self.filteredConcerts.length ) {
				self.renderConcerts();
			}
			
		});

	}, 

	loadAlbums: function () {

		console.log("ProjectsView.loadAlbums");

		var self = this; 

		this.albums = new app.DiscographyCollection;
		this.albums.fetch().then( function(){

			// RETURNS ARRAY OF OBJECTS
			self.filteredAlbums = self.albums.filter( function(item) { 
				// GET GROUP FROM ACF RELATIONSHIP OBJECT
				var group = item.get("acf");
				return group.album_group[0].ID == self.id;
			});

			if ( self.filteredAlbums.length ) {
				self.renderAlbums();
			}

		});

	},

	template: _.template( $('#project_template').html() ),
	
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

	navTo: function ( section ) {

        console.log( "Router.navTo", section );
    
        $('html, body').animate({
            scrollTop: $("#" + section).offset().top - ( $("#nav").outerHeight() + 40 )
        }, 1000 );          

    },

	render: function () {

		// console.log("ProjectsView.render");

		var self = this;

		this.$el.append( this.template( this.model ) );

		this.$el.find(".widget:last-child").fadeIn().css("display","inline-block");

		// LOAD CONCERTS + ALBUMS	
		this.loadConcerts();
		this.loadAlbums();

		// UNDERSCORE DEFER
		setTimeout( function(){
			self.navTo("project-" + self.id);
		}, 500 );

		return this;

	},

	renderConcerts: function () {

		console.log("ProjectsView.renderConcerts");

		this.target = $("#project-" + this.id).find(".project_concerts");

		// APPEND TITLE
		this.target.append("<div class='title_wrapper'><h1 class='fr'>Concerts à venir</h1><h1 class='en'>Upcoming Concerts</h1></div>");

		this.filteredConcertPosts = {"posts": this.filterDates( this.filteredConcerts ) };

		this.concertsTemplate = _.template( $('#concerts_sub_template').html() );

		this.target.append( this.concertsTemplate( this.filteredConcertPosts ) );

		return this;

	},

	renderAlbums: function () {

		console.log("ProjectsView.renderAlbums");

		this.target = $("#project-" + this.id).find(".project_discography");

		// APPEND TITLE
		this.target.append("<div class='title_wrapper'><h1>Albums</h1></div>");

		this.filteredAlbumPosts = {"posts": this.filteredAlbums };

		this.projectAlbumTemplate = _.template( $('#project_album_template').html() );

		this.target.append( this.projectAlbumTemplate( this.filteredAlbumPosts ) );

		return this;

	}

});
