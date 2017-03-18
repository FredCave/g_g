var app = app || {};

app.UpcomingConcertsView = Backbone.View.extend({
	
	el: "#upcoming",

	initialize: function (){

		console.log("UpcomingConcertsView.initialize");

		this.collection = new app.ConcertCollection();

		this.collection.fetch({reset:true});
	
		this.listenTo( this.collection, 'reset', this.render );

	},

	render: function ( concerts ) {

		console.log("Render", this.collection);

		var $list = this.$el.empty();

		this.collection.forEach( function ( model ) {

			var concert_date = moment(model.attributes.acf.concert_date);

			// IF IN PAST
			if ( moment().diff(concert_date, 'days') < 0 ) {
				var item = new app.ConcertView({ model: model });
				$list.append( item.render().$el );				
			}

		});

		return this;

	}

});