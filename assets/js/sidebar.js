var Sidebar = {
	
	newsletterVisible: false,

	init: function () {

		console.log("Sidebar.init");

		this.calcTopOffset();

		this.bindEvents();

		this.show();

	},

	bindEvents: function () {

		console.log("Sidebar.bindEvents");

		var self = this;

		$("#newsletter_toggle a").on( "click", function(e) {

			e.preventDefault();
			if ( !self.newsletterVisible ) {
				$("#newsletter_form").css({
					"height" : "150px"
				});
				self.newsletterVisible = true;
			} else {
				$("#newsletter_form").css({
					"height" : ""
				});
				self.newsletterVisible = false;
			}

		});

		$(window).on( "scroll", _.throttle( function(){

			// CHECK IF SIDEBAR IS VISIBLE
			if ( $("#sidebar").is(":visible") ) {
				self.pinCheck( $(window).scrollTop() );
			}

		}, 100 ) );

	},

	show: function () {

		console.log("Sidebar.show");

		// LOOP THROUGH WIDGETS
		$("#sidebar .widget").each( function(){

			var widget = $(this);
			_.delay( function(){
				widget.fadeIn( 1000 );
			}, 1000 );

		});

	},

	calcTopOffset: function () {

		console.log("Sidebar.calcTopOffset");

		// GET TOP OFFSET OF WIDGET
		this.soundcloudOffset = $("#nav").height() + 40;

		this.soundcloudTop = $(".soundcloud_widget").offset().top - this.soundcloudOffset;

		// var offset = $("#nav").height() + 40;

	},

	pinCheck: function ( scrollTop ) {

		console.log("Sidebar.pinCheck");

		// console.log( this.widgetTop, scrollTop, $("#soundcloud").offset().top );

		// if ( this.widgetTop < scrollTop ) {

		// 	var parentW = $("#soundcloud").width();

		// 	$("#soundcloud .widget").css({
		// 		"position" : "fixed",
		// 		"top" : this.widgetOffset,
		// 		"width" : parentW
		// 	});

		// } else {

		// 	$("#soundcloud .widget").css({
		// 		"position" : "",
		// 		"top" : "",
		// 		"width" : ""
		// 	});			

		// }

	},

}