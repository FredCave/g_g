var app = app || {};

// GLOBAL FUNCTIONS
app.App = {

	init: function () {

		console.log("App.init");

		var self = this;

		// SCROLL TO TOP
		$("html,body").animate({
			scrollTop : 0
		}, 500 );

		this.bindEvents();

		Background.init();
		Sidebar.init();
		Widgets.init();

		setTimeout( function(){
			self.mQBreakpoints();
		}, 500 );

	},

	bindEvents: function () {

		console.log("App.bindEvents");

		var self = this;

		$(window).on( "resize", _.throttle( function (){
			// RECALCULATE IMAGES
			self.imagesRecalc();
		}, 1000 ) );

		// MEDIA QUERY BREAKPOINTS
		this.mql = {};
		this.mql.s = window.matchMedia("(max-width: 700px)");
		this.mql.s.addListener(function(){
			self.mQBreakpoints();
		});

		$("body").on("scroll", function(){
			console.log("Body scrolling", $("body").height(), $("body").scrollTop() );
		});

	},

	imagesRecalc: function () {

		// console.log("App.imagesRecalc");

		// LOOP THROUGH ALL IMAGES IN WIDGET_WRAPPER
		$("#widget_wrapper img").not(".size-full").each( function(){

			// GET IMG WIDTH
			var imgW = $(this).width();
			if ( $(this).hasClass("portrait") ) {
				imgW = $(this).height();
			}
		
			if ( imgW <= 300 ) { // THUMBNAIL
				newSrc = $(this).attr("data-thm");
			} else if ( imgW > 300 && imgW <= 600 ) { // MEDIUM
				newSrc = $(this).attr("data-med");
			} else if ( imgW > 600 && imgW <= 768 ) { // MEDIUM_LARGE
				newSrc = $(this).attr("data-mdl");
			} else if ( imgW > 768 && imgW <= 900 ) { // LARGE
				newSrc = $(this).attr("data-lrg");
			} else { // EXTRALARGE
				newSrc = $(this).attr("data-xlg");
			}

			// IF NEWSRC NOT SAME AS CURRENT SRC
			if ( newSrc !== $(this).attr("src") ) {
				$(this).attr( "src", newSrc )
				console.log( 41, "Src changed." );				
			}

		});

	},

	imageCalc: function ( obj, size ) {

		console.log("App.imageCalc");

		// GET ACTUAL IMG WIDTH
		var imgW = obj['thumbnail-width'],
			imgH = obj['thumbnail-height'];
		
		// GET RENDERED WIDTH
		var wrapperW = $("#widget_wrapper").width() - 24,
			rendW,
			newSrc;

		if ( size === "one-quarter" ) {
			rendW = wrapperW * 0.25;
		} else if ( size === "one-third"  ) {
			rendW = wrapperW * 0.33;
		} else if ( size === "one-half"  ) {
			rendW = wrapperW * 0.5;
		} else { // TWO-THIRDS
			rendW = wrapperW * 0.67;
		}

		// IF PORTRAIT
		if ( imgH > imgW ) {
			rendW = rendW / ( imgW / imgH );
			// ADD CLASS
			size += " portrait";
		} 

		// CHANGE POINTS: THM = 300 / MED = 600 / LRG = 900 / XLG = 1200
		if ( rendW <= 300 ) { // THUMBNAIL
			newSrc = obj.thumbnail;
		} else if ( rendW > 300 && rendW <= 600 ) { // MEDIUM
			newSrc = obj.medium;
		} else if ( rendW > 600 && rendW <= 768 ) { // MEDIUM_LARGE
			newSrc = obj.medium_large;
		} else if ( rendW > 768 && rendW <= 900 ) { // LARGE
			newSrc = obj.large;
		} else { // EXTRALARGE
			newSrc = obj.extralarge;
		}

		return "<img class='" + size + "' \
			src='" + newSrc + "' \
			data-thm='" + obj.thumbnail + "' \
			data-med='" + obj.medium + "' \
			data-mdl='" + obj.medium_large + "' \
			data-lrg='" + obj.large + "' \
			data-xlg='" + obj.extralarge + "' />";

	},

	mQBreakpoints: function () {

		console.log("App.mQBreakpoints");

		if ( this.mql.s.matches ) {
			
			console.log("mql.s");

			// MOVE CONTACT TO WIDGET WRAPPER
			if ( $("#main_contact").html() === "" ) {
				$("#contact").clone().attr("id","").appendTo("#main_contact");
			}
		} else {
			// HIDE CONTACT	
			$("#main_contact").hide();
		}

	},

	targetBlank: function () {

		console.log("App.targetBlank");

		// LOOP THROUGH ALL LINKS IN MAIN COLUMN
		$("#widget_wrapper a").each( function(){

			if ( !$(this).hasClass("internal") ) {
				$(this).attr("target","_blank");
			}

		});

	},

	newsHtmlPrep: function () {

		console.log("App.newsHtmlPrep");

		// LOOP THROUGH IMAGES
		$(".news_widget .text_block img").each( function(){
			
			// UNWRAP LINKS
			if ( $(this).parent("a").length ) {
				$(this).unwrap();
			}

			// GET RATIO
			var ratio = $(this).attr("height") / $(this).attr("width"),
				width;

			if ( ratio >= 1 ) {
				width = 45;
			} else if ( ratio < 1 && ratio > 0.5 ) {
				width = 67;
			} else if ( ratio < 0.5 && ratio > 0.3 ) {
				width = 80;
			} else {
				width = 100;
			}

			$(this).wrap("<div class='image_wrapper'></div>").css({
				"width" : width + "%"
			});

			$(this).parents("p").find("a").css({
				"margin-left" : -4
			});

		});

		$(".news_widget").fadeIn(1000);

	}

}

$(function() {

	// INIT MOMENT
	moment().format();

	// INIT GLOBAL FUNCTIONS
	app.App.init();

	// var appView = new app.AppView();

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

	app.Nav.init();

});