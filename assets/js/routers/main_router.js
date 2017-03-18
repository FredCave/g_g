var app = app || {};

app.MainRouter = Backbone.Router.extend({

	routes: {

        "news" : "showLatestNews",

        "news/:id" : "showNewsItem",

        "biography" : "showBiography",

        "projects/:id" : "showProjects",

        "concerts" : "showConcerts",

        "discography" : "showDiscography",        

        "links" : "showLinks",

        "contact" : "showContact",     

        "*other"    : "showHome"

    },

    showHome: function () {

    	console.log("showHome");

    },

    showLatestNews: function () {

    	console.log("showLatestNews");

    },

    showNewsItem: function () {

    	console.log("showNewsItem");

    },

    showBiography: function () {

    	console.log("showBiography");

    },
    
    showProjects: function () {

    	console.log("showProjects");

    },

    showConcerts: function () {

    	console.log("showConcerts");

    },

    showDiscography: function () {

    	console.log("showDiscography");

    },
    
    showLinks: function () {

    	console.log("showLinks");

    },
    
    showContact: function () {

    	console.log("showContact");

    }

});