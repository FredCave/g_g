var app = app || {};

$(function() {

	// INIT MOMENT
	moment().format();

    new app.AppView();

    var appRouter = new app.MainRouter();
    Backbone.history.start({});

    app.Nav.init();

});