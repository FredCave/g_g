<?php 

$upcoming = array();
$upcoming_years = array();
$previous = array();
$previous_years = array();

$args = array(
    "post_type"         => "concerts",
    "posts-per-page"    => -1
);
$concerts_query = new WP_Query( $args ); 
if ( $concerts_query->have_posts() ) :
    while ( $concerts_query->have_posts() ) : $concerts_query->the_post(); 
    
        $date_array = explode( "/", get_field("concert_date") );
        $year = $date_array[0];
        // REFORMAT DATE
        $date_end = explode( " ", $date_array[2] );
        $date = $date_end[0] . "/" . $date_array[1] . "/" . $date_array[0] . " " . substr( $date_end[1], 0, 5 ) ;

        // GET CONCERT DATA
        $data = array(
            'title' => get_the_title(),
            'date'  => $date,
            'year'  => $year, 
            'link'  => get_field("concert_venue_link"),
            'group' => get_field("concert_group")
        );
        // IF UPCOMING: PUSH TO UPCOMING ARRAY
        if ( !isPast( get_field("concert_date") ) ) {
            $upcoming[] = $data;
            // IF NOT ALREADY IN ARRAY
            if ( !in_array( $year , $upcoming_years ) ) {
                $upcoming_years[] = $year;
            }
        // ELSE IF PAST: PUSH TO PREVIOUS ARRAY
        } else {
            $previous[] = $data;
            if ( !in_array( $year , $previous_years ) ) {
                $previous_years[] = $year;
            }
        }
 
    endwhile;  
endif; 

// SORT BY DATE
usort( $upcoming, "date_cmp" );
usort( $previous, "date_cmp" );
usort( $upcoming_years, "year_cmp" );
usort( $previous_years, "year_cmp" );

?>

<div class="widget concerts_widget">
    <div class="widget_content">
        
        <div class="close"></div>

        <div class="title_wrapper">
            <h1 class="fr">Concerts à venir</h1>
            <h1 class="en">Upcoming Concerts</h1>
        </div>
        <?php // SHOW FILTER IF MORE THAN ONE YEAR
        if ( count( $upcoming_years ) > 1 ) : ?>
            <div class="concerts_filter">
                <span class="fr">Filtrer par année : </span>
                <span class="en">Filter by year: </span>
                <ul>
                    <?php foreach ( $upcoming_years as $year ) {
                        echo "<li><a href='' class='concert_filter'>" . $year . "</a></li>";
                    } ?>
                </ul>
            </div>
        <?php endif; ?>
        <div id="concerts_upcoming" class="concerts_list">
            <?php foreach ( $upcoming as $concert ) { ?>
                <div class="concert concert_visible" data-group="<?php echo $concert["group"]->ID; ?>" data-year="<?php echo $concert["year"]; ?>">
                    <div class="concert_date"><h2><?php echo $concert["date"]; ?> </h2></div>
                    <div class="concert_info">
                        <?php if ( $concert["group"] !== "" ) { ?>
                            <p class="concert_group">
                                <a href="#!projects/<?php echo $concert["group"]->ID; ?>">
                                    <?php echo $concert["group"]->post_title; ?>
                                </a>
                            </p>
                        <?php } ?>
                        <p>
                            <a target="_blank" href="<?php echo $concert["link"]; ?>">
                                <?php echo $concert["title"]; ?>    
                            </a>
                        </p>
                    </div>
                </div>
            <?php } ?>
        </div>

        <div class="title_wrapper">
            <h1 class="fr">Concerts passés</h1>
            <h1 class="en">Previous Concerts</h1>
        </div>
        <?php // SHOW FILTER IF MORE THAN ONE YEAR
        if ( count( $previous_years ) > 1 ) : ?>
            <div class="concerts_filter">
                <span class="fr">Filtrer par année : </span>
                <span class="en">Filter by year: </span>
                <ul>
                    <?php foreach ( $previous_years as $year ) {
                        echo "<li><a href='' class='concert_filter'>" . $year . "</a></li>";
                    } ?>
                </ul>
            </div>
        <?php endif; ?>
        <div id="concerts_previous" class="concerts_list">
             <?php foreach ( $previous as $concert ) { ?>
                <div class="concert concert_visible" data-group="<?php echo $concert["group"]->ID; ?>" data-year="<?php echo $concert["year"]; ?>">
                    <div class="concert_date"><h2><?php echo $concert["date"]; ?> </h2></div>
                    <div class="concert_info">
                        <?php if ( $concert["group"] !== "" ) { ?>
                            <p class="concert_group">
                                <a href="#!projects/<?php echo $concert["group"]->ID; ?>">
                                    <?php echo $concert["group"]->post_title; ?>
                                </a>
                            </p>
                        <?php } ?>
                        <p>
                            <a target="_blank" href="<?php echo $concert["link"]; ?>">
                                <?php echo $concert["title"]; ?>    
                            </a>
                        </p>
                    </div>
                </div>
            <?php } ?>              
        </div>

    </div>  
</div>



<?php /*

<script id="concerts_template" type="text/template">



</script>

<script id="concerts_sub_template" type="text/template">
    
    <% // GET YEARS 

    var yearArray = [];

    _.each(posts, function( post ){
    
        // PARSE RESULT
        var data = post.attributes,
            year = data.date.split("–")[2].split(",")[0];
        if ( yearArray.indexOf(year) == -1 ){
            yearArray.push(year);
        }
        
    }); 

    console.log( 452, yearArray );

    %>

    <% _.each(posts, function( post ){
        // PARSE RESULT
        var data = post.attributes; %>

        <div class="concert" data-group="<%= post.group %>">
            <div class="concert_date"><h2><%= data.date %></h2></div>
            <div class="concert_info">
                <% if ( data.group.length ) { %>
                    <p class="concert_group">
                        <a href="#!projects/<%= data.group[0].ID %>">
                            <%= data.group[0].post_title %>
                        </a>
                    </p>
                <% } %>
                <p>
                    <a target="_blank" href="<%= data.link %>">
                        <%= data.title %>     
                    </a>
                </p>
            </div>
        </div>
    <% }); %>

    <% if ( posts.length === 0 ) { %>
        <p class="no-concerts fr">Pas de concerts actuellement.</p>
        <p class="no-concerts en">Currently no concerts.</p>
    <% } %>
 
</script>

<script id="concerts_filter_template" type="text/template">
         
    <% if ( this.groups.length ) { %>
        <ul id="concerts_group_filter" class="concerts_filter">
            <% _.each( this.groups, function( group ){ %>
                <li><a data-filter="<%= group.ID %>" href=""><%= group.post_title %></a></li>
            <% }); %>             
        </ul>
    <% } %>

    <% if ( this.years.length ) { %>
        <ul id="concerts_year_filter" class="concerts_filter">
            <% _.each( this.years, function( year ){ 
                %>
                <li><a data-filter="<%= year %>" href=""><%= year %></a></li>
            <% }); %> 
        </ul>
    <% } %>

</script>


*/ ?>