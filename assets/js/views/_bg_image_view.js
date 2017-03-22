var app = app || {};

app.BgImageView = Backbone.View.extend({

	el: "#bg_image",

	initialize: function (){

		console.log("BgImageView.initialize");

		var self = this;

		this.model = new app.BgImageModel();

		this.model.fetch().then( function(){

    		self.render( self.model.attributes );			

		});
    
		$(window).on( "resize", _.throttle( function (){
			
			// RECALCULATE IMAGE
			self.render( self.model.attributes );

		}, 500 ) );

	},

	template: _.template( $('#bg_image_template').html() ),

	imageCalc: function ( data ) {
	
		console.log("BgImageView.imageCalc");

		var imgRatio = data.width / data.height,
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
			newSrc = data.sizes.thumbnail;
		} else if ( imgW > 300 && imgW <= 600 ) { // MEDIUM
			newSrc = data.sizes.medium;
		} else if ( imgW > 600 && imgW <= 768 ) { // MEDIUM_LARGE
			newSrc = data.sizes.medium_large;
		} else if ( imgW > 768 && imgW <= 900 ) { // LARGE
			newSrc = data.sizes.large;
		} else { // EXTRALARGE
			newSrc = data.sizes.extralarge;
		}

		this.model.src = newSrc;

	},

	render: function ( data ) {

		console.log("BgImageView.render");

		this.imageCalc( data.acf.home_background_image );

		this.$el.html( this.template( this.model ) );

		return this;

	}

});