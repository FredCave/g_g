var app = app || {};

app.Nav = {

	projectsVisible: false, 

	init: function () {

	    $("#projects_toggle").on("click", function (e){
	    	e.preventDefault();
	    	app.Nav.toggleProjects();
	    });	

	    $("#lang_selec a").on("click", function(e){
			e.preventDefault();
			app.Nav.langSelec( $(this) );
	    });	

	}, 

	toggleProjects: function () {

		// console.log("Nav.toggleProjects");

		if ( !this.projectsVisible ) {
			// SHOW
			$("#projects_hidden").show();
			this.projectsVisible = true;
		} else {
			// HIDE
			$("#projects_hidden").hide();
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