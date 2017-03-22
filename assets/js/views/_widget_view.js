var app = app || {};

app.Widget = Backbone.View.extend({
	
	el: "#widget_wrapper",

	// className: "widget",

	initialize: function () {

		console.log("Widget.initialize");

		console.log( 11, this.model );

		var self = this;

		this.model.fetch().then( function(){

			console.log( 13, self.model );

		});

		this.render();

		this.model.on( "click", function(){
			console.log(18);
		});

	},

	events: {
		"click .close" : "closeWidget"
	},

	template: _.template( $('#widget_template').html() ),

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

	render: function () {

		console.log("Widget.render");

		this.$el.append( this.template( this.model.attributes ) );

		return this;

	},

	closeWidget: function () {

		console.log("Widget.closeWidget");

	}

});