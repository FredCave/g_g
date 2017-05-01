var app = app || {};

app.SoundcloudView = app.Widget.extend({
	
	el: "#soundcloud",

	widgetTop: 0,

	widgetOffset: 0,

	initialize: function ( input ) {

		// console.log("SoundcloudView.initialize");

		var self = this;

		// IF INPUT: LOAD INPUTTED MODEL
		if ( input ) {

			this.playlist = input[0].media;

			this.render();

			this.bindEvents();

			setTimeout( function(){
				self.calcTopOffset();	
			}, 1000 );

		} else {

			// GET PLAYIST FROM HOME MODEL
			this.model = new app.HomeModel();
			this.model.fetch().then( function(){

				self.playlist = self.model.attributes.acf.home_playlist;

				self.render();

				self.bindEvents();

				setTimeout( function(){
					self.calcTopOffset();	
				}, 1000 );
				
			});			

		}

	},

	bindEvents: function () {

		console.log("SoundcloudView.bindEvents");

		var self = this;

		$(window).off("scroll");
		$(window).on("scroll", _.throttle( function(){

			self.pinCheck( $(window).scrollTop() );

		}, 100 ) );

	},

	calcTopOffset: function () {

		console.log("SoundcloudView.calcTopOffset");

		// GET TOP OFFSET OF WIDGET
		this.widgetOffset = $("#nav").height() + 40;

		this.widgetTop = $("#soundcloud").offset().top - this.widgetOffset - 25;

		// var offset = $("#nav").height() + 40;

	},

	pinCheck: function ( scrollTop ) {

		console.log("SoundcloudView.pinCheck");

		if ( this.widgetTop < scrollTop ) {

			var parentW = $("#soundcloud").width();

			$("#soundcloud .widget").css({
				"position" : "fixed",
				"top" : this.widgetOffset,
				"width" : parentW
			});

		} else {

			$("#soundcloud .widget").css({
				"position" : "",
				"top" : "",
				"width" : ""
			});			

		}

	},

	render: function () {

		// console.log("SoundcloudView.render");

		this.template = _.template( $("#playlist_template").html() );

		this.$el.empty();

		this.$el.append( this.template( this.playlist ) );

		// FADE IN
		this.$el.find(".widget").fadeIn().css("display","inline-block");
	
	}

});