var app = app || {};

app.MainRouter = Backbone.Router.extend({

    newsPrepped: false,

	routes: {

        "news" : "showLatestNews",

        "news/:id" : "showNewsItem",

        "biography" : "showBiography",

        "projects/:id" : "showProjectItem",

        "concerts" : "showConcerts",

        "discography" : "showDiscography",        

        "links" : "showLinks",

        "contact" : "showContact",     

        "*other"    : "showHome"

    },

    exists: function ( section ) {

        // console.log("Router.exists");

        return $("#" + section).length;

    },

    navTo: function ( section ) {

        console.log( "Router.navTo", section );
    
        var offset = $("#nav").outerHeight() + 40;
        if ( $(window).width() <= 700 ) {
            offset = 40;
        }

        _.defer( function(){
            $('html, body').animate({
                scrollTop: $("#" + section).offset().top - offset
            }, 1000 );    
        });
      
    },

    showHome: function () {

    	console.log("showHome");

        Backbone.history.navigate('news');  

        // PREP HTML + FADE IN 
        if ( !this.newsPrepped ) {
            app.App.newsHtmlPrep(); 
            this.newsPrepped = true;
        } else {
             console.log("Nav to news.");
            this.navTo("news"); 
        }
      
    },

    showLatestNews: function () {

    	console.log("showLatestNews");

        // if ( !this.exists( "news" ) ) {
        //     $("#widget_wrapper").append("<section id='news'></section>");
        //     new app.NewsView();
        // } 
        // this.navTo("news");

        // PREP HTML
        // + FADE IN 
        if ( !this.newsPrepped ) {
            app.App.newsHtmlPrep(); 
            this.newsPrepped = true;
        } else {
            console.log("Nav to news.");
            this.navTo("news"); 
        }

    },

    showNewsItem: function () {

    	console.log("showNewsItem");

        // if ( !this.exists( "news" ) ) {
        //      console.log("Nav to news.");
        //     new app.NewsView();
        // }
        // this.navTo("news"); 

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

        var self = this;

        $("html,body").animate({
            scrollTop:0
        }, 50, function(){

            // IF WRAPPER DOES NOT EXIST
            if ( !self.exists( "projects" ) ) {
                
                console.log( 140 );

                $("#widget_wrapper").append("<section id='projects'></section>");
                new app.ProjectsView({id:id});
                
            } else {
                
                console.log( 146 );

                // IF INDIVIDUAL ITEM DOES NOT EXIST
                if ( !$("#project-" + id ).length ) {
                    new app.ProjectsView({id:id}); 
                // NAVIGATE TO
                } else {
                    self.navTo("project-" + id);
                }
            }

        });

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

        // if ( !$("#widget_wrapper").find("#contact").length ) {
        //     $("#widget_wrapper").append("<section id='main_contact'></section>");
        //     new app.ContactView({el:"main_contact"});
        // }

        if ( $(window).width() <= 700 ) {
            this.navTo("main_contact");   
        } else {
            this.navTo("contact");            
        }

    }

});