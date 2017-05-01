var app = app || {};

app.ProjectItemView = app.Widget.extend({

	className: "widget project_widget",

	initialize: function () {

		console.log("ProjectItemView.initialize");

		this.id = this.model.id;

		// GET EVENTS FROM PARENT
		_.extend( this.events, app.Widget.prototype.events );

	},

    template: _.template( $('#project_item_template').html() ),

	render: function(){

		console.log("ProjectItemView.render");

		var self = this;

		// GET ICONS FOR SOCIAL MEDIA
		this.socialMediaIcon( this.model );

		// this.$el.append( this.template( this.model ) );
		// this.$el.find(".widget:last-child").fadeIn().css("display","inline-block");

		this.$el.html( this.template( this.model.attributes ) ).fadeIn().css("display","inline-block");

		// RESIZE IFRAMES
		this.resizeIframes( this.$el.find(".widget:last-child") );

		// LOAD CONCERTS + ALBUMS	
		this.loadConcerts();
		this.loadAlbums();

		// LOAD SOUNDCLOUD WIDGET
		if ( this.model.attributes.acf.project_media_soundcloud.length ) {
			this.loadSoundcloud( this.model.attributes.acf.project_media_soundcloud );
		}

		// DEFER UNTIL CALLSTACK CLEARED
		_.defer( function(){ 
			self.navTo("project-" + self.id); 
		});

		return this;

	},

	loadConcerts: function () {

		console.log("ProjectItemView.loadConcerts", this.id );

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

		console.log("ProjectItemView.loadAlbums");

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

	loadSoundcloud: function ( input ) {

		console.log("ProjectItemView.loadSoundcloud");

		new app.SoundcloudView( input );
		
		$("#soundcloud").attr("data-changed",true);

	},

	resizeIframes: function ( elem ) {

		console.log("ProjectItemView.resizeIframes");

		elem.find("iframe").each( function(){

			// GET RATIO 
			var ratio = $(this).attr("height") / $(this).attr("width");

			$(this).css({
				"height" : $(this).width() * ratio
			});

		});

	},

	socialMediaIcon: function ( model ) {

		console.log("ProjectItemView.socialMediaIcon");

		var links = this.model.attributes.acf.project_social_media,
			imgSrc;

		if ( links.length ) {

			links.forEach( function ( link ) {

				url = link.project_social_media_link;

				if ( url.indexOf("youtube") > -1 ) {
					imgSrc = THEME_ROOT + "/assets/img/youtube.svg";
				} else if ( url.indexOf("vimeo") > -1 ) {
					imgSrc = THEME_ROOT + "/assets/img/vimeo.svg";
				} else if ( url.indexOf("soundcloud") > -1 ) {
					imgSrc = THEME_ROOT + "/assets/img/soundcloud.svg";
				} else if ( url.indexOf("facebook") > -1 ) {
					imgSrc = THEME_ROOT + "/assets/img/facebook.svg";
				} else {
					imgSrc = "";
				}

				link.icon = imgSrc;

			});

		}

	},

	renderConcerts: function () {

		console.log("ProjectItemView.renderConcerts");

		this.target = $("#project-" + this.id).find(".project_concerts");

		// APPEND TITLE
		this.target.append("<div class='title_wrapper'><h1 class='fr'>Concerts à venir</h1><h1 class='en'>Upcoming Concerts</h1></div>");

		this.filteredConcertPosts = {"posts": this.filterDates( this.filteredConcerts ) };

		this.concertsTemplate = _.template( $('#concerts_sub_template').html() );

		this.target.append( this.concertsTemplate( this.filteredConcertPosts ) );

		return this;

	},

	renderAlbums: function () {

		console.log("ProjectItemView.renderAlbums");

		this.target = $("#project-" + this.id).find(".project_discography");

		// APPEND TITLE
		this.target.append("<div class='title_wrapper'><h1>Albums</h1></div>");

		this.filteredAlbumPosts = {"posts": this.filteredAlbums };

		this.projectAlbumTemplate = _.template( $('#project_album_template').html() );

		this.target.append( this.projectAlbumTemplate( this.filteredAlbumPosts ) );

		return this;

	}

});