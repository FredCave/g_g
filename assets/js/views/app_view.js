var app = app || {};

app.AppView = Backbone.View.extend({

	el: "#wrapper",

	initialize: function () {

		console.log("AppView.initialize");

		var homeView = new app.HomeView();

	},

	render: function () {

		console.log("AppView.render");

	}

});