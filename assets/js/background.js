var Background = {
	
	init: function () {

		console.log("Background.init");

		var self = this;

		this.bindEvents();

		this.imagesCalc();

		_.defer( function(){
			self.slideshowInit();
		});

	},

	bindEvents: function () {

		console.log("Background.bindEvents");

		var self = this;

		$(window).on( "resize", _.throttle( function (){
			// RECALCULATE IMAGE
			self.imagesCalc();
		}, 500 ) );

	},

	imagesCalc: function () {

		console.log("Background.imagesCalc");

		$("#bg_image li").each( function(){

			var imgRatio = parseFloat( $(this).attr("data-ratio") ),
				winRatio = $(window).width() / $(window).height(),
				imgW, 
				newSrc;	

			// GET ACTUAL IMG WIDTH
			if ( winRatio < imgRatio ) {
				imgW = $(window).height() * imgRatio;
			} else {
				imgW = $(window).width();
			}

			console.log( 51, winRatio, imgRatio, imgW );

			// CHANGE POINTS: THM = 300 / MED = 600 / LRG = 900 // XLG = 1200
			if ( imgW <= 300 ) { // THUMBNAIL
				newSrc = $(this).attr("data-thm");
			} else if ( imgW > 300 && imgW <= 600 ) { // MEDIUM
				newSrc = $(this).attr("data-med");
			} else if ( imgW > 600 && imgW <= 900 ) { // LARGE
				newSrc = $(this).attr("data-lrg");
			} else { // EXTRALARGE
				newSrc = $(this).attr("data-xlg");
			}

			// IF NEWSRC IS DIFFERENT TO CURRENT SRC
			if ( newSrc !== $(this).attr("src") ) {
				$(this).css("background-image","url(" + newSrc + ")");
			}

		});

	}, 

	slideshowInit: function () {

		console.log("Background.slideshowInit");

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


}