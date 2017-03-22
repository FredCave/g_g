var app = app || {};

app.AppView = Backbone.View.extend({

	el: "#widget_wrapper",

	initialize: function () {

		console.log("AppView.initialize");

		var bgImageView = new app.BgImageView();

		this.initialWidgetLoad();

	},

	initialWidgetLoad: function () {

		console.log("AppView.initialWidgetLoad");

		// LOAD UPCOMING CONCERTS, SOUNDCLOUD + NEWS WIDGETS
		var self = this;
		this.$el.append("<div id='news'></div>");
		// var newsView = new app.NewsView({max:3});
		this.newsCollection = new app.NewsCollection();
		this.newsCollection.fetch().then( function(){
			self.renderWidgets( self.newsCollection );
		}); 
		// PASS RESULT TO RENDERWIDGETS
		// this.listenTo( this.newsCollection, 'reset', this.renderWidgets() );
		
		// var contactModel = new app.ContactModel();
		// var upcomingWidget = new app.Widget({model:contactModel});

		// var bgImageModel = new app.BgImageModel();
		// var soundcloudWidget = new app.Widget({model:bgImageModel});		

	},

	render: function () {

		console.log("AppView.render");

	},

	renderWidgets: function ( elems ) {

		console.log("AppView.renderWidgets");

		console.log( 45, elems );

		var self = this;
		// LOOP THROUGH ELEMS
		elems.forEach( function ( model ) {
			
			// PASS TO RENDER WIDGET
			var newsItemView = new app.NewsItemView({model:model});
			self.$el.append( newsItemView.render().$el );	

		});

	}, 

	renderWidget: function ( elem ) {

		console.log("AppView.renderWidget");

		// this.$el.append( elem );

		// return this;

	}

});