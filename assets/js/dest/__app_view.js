var app = app || {};

app.AppView = Backbone.View.extend({

	initialize: function () {

		console.log("AppView.initialize");

		new app.BgImageView();

		this.loadSidebar();

		// this.loadMainColumn();

		this.bindEvents();

	},

	bindEvents: function () {

		console.log("AppView.bindEvents");

		$("html,body").on( "scroll", function(){
			$("html,body").stop();
		});

	},

	loadSidebar: function () {

		console.log("AppView.loadSidebar");

		// CONTACT
		$("#sidebar").append("<section id='contact'></section>");
		new app.ContactView({el:"contact"});

		// LOAD UPCOMING CONCERTS
		$("#sidebar").append("<section id='upcoming'></section>");
		new app.UpcomingView();

		// SOUNDCLOUD 
		$("#sidebar").append("<section id='soundcloud'></section>");
		new app.SoundcloudView();

	},

	// loadMainColumn: function () {

	// 	console.log("AppView.loadMainColumn");

	// 	// $("#widget_wrapper").append("<section id='news'></section>");
	// 	// new app.NewsView();

	// }

});