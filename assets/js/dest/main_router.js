var app = app || {};

app.MainRouter = Backbone.Router.extend({

	routes: {

        "_news" : "showLatestNews",

        "_news/:id" : "showNewsItem",

        "_biography" : "showBiography",

        "_projects/:id" : "showProjectItem",

        "_concerts" : "showConcerts",

        "_discography" : "showDiscography",        

        "_links" : "showLinks",

        "_contact" : "showContact",     

        "*other"    : "showHome"

    },

    exists: function ( section ) {

        // console.log("Router.exists");

        return $("#" + section).length;

    },

    navTo: function ( section ) {

        console.log( "Router.navTo", section );
    
        $('html, body').animate({
            scrollTop: $("#" + section).offset().top - ( $("#nav").outerHeight() + 40 )
        }, 1000 );          

    },

    showHome: function () {

    	console.log("showHome");

        Backbone.history.navigate('news');  

        if ( !this.exists( "news" ) ) {
            $("#widget_wrapper").append("<section id='news'></section>");
            new app.NewsView();
        } 
        this.navTo("news");

    },

    showLatestNews: function () {

    	console.log("showLatestNews");

        if ( !this.exists( "news" ) ) {
            $("#widget_wrapper").append("<section id='news'></section>");
            new app.NewsView();
        } 
        this.navTo("news");

    },

    showNewsItem: function () {

    	console.log("showNewsItem");

        if ( !this.exists( "news" ) ) {
            new app.NewsView();
        }
        this.navTo("news"); 

    },

    showBiography: function () {

    	console.log("showBiography");

        if ( !this.exists( "biography" ) ) {
            $("#widget_wrapper").append("<section id='biography'></section>");
            new app.BiographyView(); 

            // $(document).on("NewsView.newsLoaded()", function(){
            //     console.log("News loaded.");
            // });

        }
        this.navTo("biography");

    },
    
    showProjectItem: function (id) {

        console.log("showProjectItem", id);

        // IF WRAPPER DOES NOT EXIST
        if ( !this.exists( "projects" ) ) {
            $("#widget_wrapper").append("<section id='projects'></section>");
            new app.ProjectsView({id:id});
        } else {
            // IF INDIVIDUAL ITEM DOES NOT EXIST
            if ( !$("#project-" + id ).length ) {
                new app.ProjectsView({id:id}); 
            // NAVIGATE TO
            } else {
                this.navTo("project-" + id);
            }
        }

    },    

    showConcerts: function () {

    	console.log("showConcerts");

        if ( !this.exists( "concerts" ) ) {
            $("#widget_wrapper").append("<section id='concerts'></section>");
            new app.ConcertsView();
        }
            this.navTo("concerts");

    },

    showDiscography: function () {

    	console.log("showDiscography");

        if ( !this.exists( "discography" ) ) {
            $("#widget_wrapper").append("<section id='discography'></section>");
            new app.DiscographyView();
        }
        this.navTo("discography");

    },
    
    showLinks: function () {

    	console.log("showLinks");

        if ( !this.exists( "links" ) ) {
            $("#widget_wrapper").append("<section id='links'></section>");
            new app.LinksView();
        }
        this.navTo("links");

    },
    
    showContact: function () {

    	console.log("showContact");

        if ( !$("#widget_wrapper").find("#contact").length ) {
            $("#widget_wrapper").append("<section id='main_contact'></section>");
            new app.ContactView({el:"main_contact"});
        }
        this.navTo("contact");

    }

});