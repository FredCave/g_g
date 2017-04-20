// var app = app || {};

// app.SocialMediaView = Backbone.View.extend({
	
// 	el: "#social_media",

// 	initialize: function () {

// 		console.log("SocialMediaView.initialize");

// 		var self = this;

// 		this.model = new app.SocialMediaModel();

// 		this.model.fetch().then( function(){

//     		self.render( self.model.attributes );			

// 		});
	
// 	}, 

// 	render: function ( attributes ) {

// 		console.log("SocialMediaView.render");

// 		var links = attributes.acf.home_social_media_links,
// 			link,
// 			self = this;

// 		links.forEach( function ( link ) {

// 			self.returnIcon(link.home_social_media_link);

// 		});

// 	},

// 	returnIcon: function ( url ) {

// 		console.log("SocialMediaView.returnIcon");

// 		// WHERE TO GET IMAGES????
// 		var imgSrc;
// 		if ( url.indexOf("youtube") > -1 ) {
// 			console.log("youtube");
// 			imgSrc = "../wp-content/themes/HOLDING/assets/img/youtube.svg";
// 		} else if ( url.indexOf("vimeo") > -1 ) {
// 			console.log("vimeo");
// 			imgSrc = "../wp-content/themes/HOLDING/assets/img/vimeo.svg";
// 		} else if ( url.indexOf("soundcloud") > -1 ) {
// 			console.log("soundcloud");
// 			imgSrc = "../wp-content/themes/HOLDING/assets/img/soundcloud.svg";
// 		} else if ( url.indexOf("facebook") > -1 ) {
// 			console.log("facebook");
// 			imgSrc = "../wp-content/themes/HOLDING/assets/img/facebook.svg";
// 		}

// 		// APPEND LI WITH IMAGE SRC AND LINK
// 		this.$el.append("<li><a href='" + url + "' target='_blank'><img src='" + imgSrc + "' /></a></li>");

// 	}

// });