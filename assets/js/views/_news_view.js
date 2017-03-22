var app = app || {};

app.NewsView = Backbone.View.extend({

	el: "#news",

	initialize: function () {

		console.log("NewsView.initialize");

		var self = this;

		// this.collection = new app.NewsCollection();

		// this.collection.fetch({reset:true});
	
		// this.listenTo( this.collection, 'reset', this.render );

	},

	render: function(){

		console.log("NewsView.render", this.collection);

		var self = this;

		var $list = this.$el.empty();

		// console.log( 37, $list );

		this.collection.forEach( function ( model ) {

			// console.log(41);

			var newsItemView = new app.NewsItemView({model:model});
			$list.append( newsItemView.render().$el );	

		});

	}

});