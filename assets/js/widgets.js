var Widgets = {
	
	init: function () {

		console.log("Widgets.init");

		this.concertsInit();

	},

	concertsInit: function () {

		console.log("Widgets.concertsInit");

		$(".concerts_list").each( function(){

			// IF MORE THAN 12 ELEMENTS && MULTIPLE YEARS: SHOW ONLY CURRENT YEAR
			var length = $(this).children().length;
			if ( length > 12 && $(this).prev(".concerts_filter").length ) {
				var currentYear = new Date().getFullYear();
				// LOOP THROUGH CONCERTS – IF NOT CURRENT YEAR: HIDE
				$(this).find(".concert").each( function(){
					if ( parseInt( $(this).attr("data-year") ) !== currentYear  ) {
						$(this).removeClass("concert_visible");
					}
				});
			} else {
				// HIDE FILTER
				$(this).prev(".concerts_filter").hide();
			}

		});

		// BIND FILTER EVENTS
		$(".concert_filter").on("click", function(e) {

			e.preventDefault();
			var year = $(this).text();
			// LOOP THROUGH CONCERTS
			$(this).parents(".concerts_filter").next(".concerts_list").find(".concert").each( function(){
				if ( $(this).attr("data-year") === year  ) {
					$(this).addClass("concert_visible");
				} else {
					$(this).removeClass("concert_visible");
				}			
			});

		});

	}

}