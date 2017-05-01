var app = app || {};

app.ProjectsView = Backbone.View.extend({
	
	el: "#projects",

	initialize: function () {

		console.log("ProjectsView.initialize");

		var self = this;

		this.model = new app.ProjectModel({id:this.id});
		this.model.fetch().then( function(){

			var projectItemView = new app.ProjectItemView({model:self.model});
			self.$el.append( projectItemView.render().$el );

		});

	}

});
