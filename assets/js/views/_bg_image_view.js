var app = app || {};

app.BgImageView = Backbone.View.extend({

	el: "#bg_image",

	initialize: function (){

		console.log("BgImageView.initialize");

		var self = this;

		// GET DATA
		this.model = new app.BgImageModel();
		this.model.fetch().then( function(){

    		self.render( self.model.attributes );			

		});

		this.bindEvents();
    
	},

	bindEvents: function () {

		$(window).on( "resize", _.throttle( function (){
			// RECALCULATE IMAGE
			console.log( 29, "BG image resize" );
			self.render( self.model.attributes );
		}, 500 ) );

	},

	template: _.template( $('#bg_image_template').html() ),

	imageCalc: function ( input ) {
	
		console.log("BgImageView.imageCalc");

		var img = input.image,
			imgRatio = img.width / img.height,
			winRatio = $(window).width() / $(window).height(),
			imgW, 
			newSrc;

		// GET ACTUAL IMG WIDTH
		if ( winRatio < imgRatio ) {
			imgW = $(window).height() * imgRatio;
		} else {
			imgW = $(window).width();
		}

		// CHANGE POINTS: THM = 300 / MED = 600 / LRG = 900 // XLG = 1200
		if ( imgW <= 300 ) { // THUMBNAIL
			newSrc = img.sizes.thumbnail;
		} else if ( imgW > 300 && imgW <= 600 ) { // MEDIUM
			newSrc = img.sizes.medium;
		} else if ( imgW > 600 && imgW <= 768 ) { // MEDIUM_LARGE
			newSrc = img.sizes.medium_large;
		} else if ( imgW > 768 && imgW <= 900 ) { // LARGE
			newSrc = img.sizes.large;
		} else { // EXTRALARGE
			newSrc = img.sizes.extralarge;
		}

		img.src = newSrc;

	},

	slideshowInit: function () {

		console.log("BgImageView.slideshowInit");

		$("#bg_image li").first().addClass("visible");

		var delay = 8000;

		setTimeout( function(){

			setInterval( function (){

				var current = $("#bg_image .visible");

				current.removeClass("visible");

				if ( current.next().length ) {
					current.next().addClass("visible");
				} else {
					$("#bg_image li").first().addClass("visible")
				}

			}, 8000 );

		}, delay );

	},

	render: function ( data ) {

		console.log("BgImageView.render");

		var self = this;

		// LOOP THROUGH MODEL AND ADD CALC SRCs

		images = data.acf.home_background_image;

		images.forEach( function ( image ) {

			self.imageCalc( image );			

		});

		this.$el.html( this.template( this.model ) );

		// IF MULTIPLE IMAGES
		if ( images.length ) {
			this.slideshowInit();
		}

		return this;

	}

});