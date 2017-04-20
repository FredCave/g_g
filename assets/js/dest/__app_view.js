var app = app || {};

app.AppView = Backbone.View.extend({

	initialize: function () {

		console.log("AppView.initialize");

		new app.BgImageView();

		this.loadSidebar();

		this.loadMainColumn();

	},

	loadSidebar: function () {

		console.log("AppView.loadSidebar");

		// LOAD UPCOMING CONCERTS
		$("#sidebar").append("<section id='upcoming'></section>");
		new app.UpcomingView();

		// SOUNDCLOUD 
		$("#sidebar").append("<section id='soundcloud'></section>");
		// new app.SoundcloudView();

	},

	loadMainColumn: function () {

		console.log("AppView.loadMainColumn");

		$("#widget_wrapper").append("<section id='news'></section>");
		new app.NewsView();

	}

	// initialWidgetLoad: function () {

	// 	// console.log("AppView.initialWidgetLoad");

	// 	var self = this;

	// 	// NEWS 
	// 	this.$el.append("<section id='news'></section>");
	// 		// TO DO: MAX 3 POSTS
	// 	this.newsView = new app.NewsView();

	// },

	// render: function () {

	// 	console.log("AppView.render");

	// },

	// renderWidgets: function ( elems ) {

	// 	console.log("AppView.renderWidgets");

	// 	// var self = this;
	// 	// // LOOP THROUGH ELEMS
	// 	// elems.forEach( function ( model ) {
			
	// 	// 	// PASS TO RENDER WIDGET
	// 	// 	var newsItemView = new app.NewsItemView({model:model});
	// 	// 	self.$el.append( newsItemView.render().$el );	

	// 	// });

	// }, 

	// renderWidget: function ( elem ) {

	// 	console.log("AppView.renderWidget");

	// 	// this.$el.append( elem );

	// 	// return this;

	// }

});