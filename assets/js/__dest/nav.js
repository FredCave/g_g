var app = app || {};

app.Nav = {

	projectsVisible: false, 

	menuHidden: true, 

	init: function () {

		var self = this;

	    $("#projects_toggle").on("click", function (e){
	    	e.preventDefault();
	    	
	    	self.toggleProjects();	    		

	    });	

	    // CLICK OUTSIDE TO CLOSE
	    $(document).on( "click", function(e){
	    	if ( !$(event.target).closest("#projects_hidden").length && !$(event.target).closest("#projects_toggle").length ) {
	    		console.log("Click outside.");
	    		// IF PROJECTS VISIBLE
	    		if ( self.projectsVisible ) {
	    			console.log("Projects are visible.");
	    			$("#projects_hidden").hide();
					self.projectsVisible = false;
	    		} else {
	    			console.log("Projects are not visible.");
	    		}
	    	}
	    });
	    
	    $("#lang_selec a").on("click", function(e){
			e.preventDefault();
			app.Nav.langSelec( $(this) );
	    });	

	    // SMALLER SCREENS

	    	// CLICK
	    $("#nav a").on("click", function(){

	    	// IF NOT PROJECTS
	    	if ( $(this).attr("id") !== "projects_toggle" ) {
	    		_.defer( self.menuHide() );	    		
	    	}

	    });

	    	// NAV TOGGLE
	    $("#nav_toggle a").on("click", function (e){
	    	e.preventDefault();
	    	$("#nav_toggle").addClass("small_screen_hide");
	    	$("#nav").removeClass("small_screen_hide");
			self.menuHidden = false;

	    	console.log( 45, self.menuHidden );

	    });

	    	// CLICK OUTSIDE TO CLOSE
	    $(document).on( "click", function(e){
	    	
	    	console.log( 52, self.menuHidden );

	    	if ( !$(event.target).closest("#nav").length && !$(event.target).closest("#nav_toggle").length ) {
	    		console.log( 49 );
	    		// IF PROJECTS VISIBLE
	    		if ( self.menuHidden === false ) {
	    			self.menuHide();
	    		} 
	    	}
	    });

	}, 

	menuHide: function () {

		console.log("Nav.menuHide");

    	$("#nav_toggle").removeClass("small_screen_hide");
		$("#nav").addClass("small_screen_hide");
		self.menuHidden = true;

	},

	toggleProjects: function () {

		// console.log("Nav.toggleProjects");

		if ( !this.projectsVisible ) {
			// SHOW
	    	if ( $(window).width() <= 700 ) {
	    		console.log(96);
	    		$("#mobile_projects_hidden").show();
	    	} else {
	    		$("#projects_hidden").show();	    		
	    	}
			this.projectsVisible = true;
		} else {
			// HIDE
	    	if ( $(window).width() <= 700 ) {
	    		$("#mobile_projects_hidden").hide();
	    	} else {
	    		$("#projects_hidden").hide();	    		
	    	}
			this.projectsVisible = false;
		}

	},

	langSelec: function ( click ) {

		console.log("Nav.langSelec");

		if ( click.hasClass("lang_en") ) {

			$(".lang_fr").removeClass("selected");
			$(".lang_en").addClass("selected");

			$(".fr").hide();
			$(".en").show();

		} else if ( click.hasClass("lang_fr") ) {

			$(".lang_en").removeClass("selected");
			$(".lang_fr").addClass("selected");

			$(".en").hide();
			$(".fr").show();

		}

	}

}