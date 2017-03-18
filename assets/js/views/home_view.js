var app = app || {};

app.HomeView = Backbone.View.extend({
	
	initialize: function () {

		console.log("HomeView.initialize");

		var bgImageView = new app.BgImageView();

		var upcomingConcertsView = new app.UpcomingConcertsView();	

		var homeContactView = new app.ContactView();	

		var socialMediaView = new app.SocialMediaView();

	}
	
});