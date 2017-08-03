<?php 

$albums = array();

$args = array(
    "post_type"         => "albums",
    "posts-per-page"    => -1
);
$album_query = new WP_Query( $args ); 
if ( $album_query->have_posts() ) :
    while ( $album_query->have_posts() ) : $album_query->the_post(); 
                
        $data = array(
            'title'                 => get_the_title(),
            'link_buy_online'       => get_field("link_buy_online"),
            'album_cover'           => get_field("album_cover"),
            'album_group'           => get_field("album_group"),
            'album_label'           => get_field("album_label"), 
            'album_link_label'      => get_field("album_link_label"), 
            'album_year'            => get_field("album_year"), 
            'album_other_info'      => get_field("album_other_info"), 
            'album_other_info_en'   => get_field("album_other_info_en"), 
            'album_online_reviews'  => get_field("album_online_reviews"), 
            'album_prizes'          => get_field("album_prizes")
        );
        $albums[] = $data;
         
    endwhile;  
endif; 
?>

<div class="widget discography_widget">

    <div class="widget_content">

        <div class="close"></div>

        <div class="title_wrapper">
            <h1 class="fr">Discographie</h1>
            <h1 class="en">Discography</h1>
        </div>

        <?php foreach ( $albums as $album ) { ?>

            <div class="album">
                <div class="album_column">
                    
                    <a class="album_image" target="_blank" href="<?php echo $album["link_buy_online"]; ?>">
                        <?php 
                        $image = $album["album_cover"]; 
                        image_object( $image ); 
                        ?>
                    </a>               
                    <p class="album_title">
                        <?php echo $album["title"]; ?>
                    </p>
                    <?php if ( $album["album_group"] ) { ?>
                        <p>
                            <a class="internal" href="#!projects/<?php echo $album["album_group"][0]->ID; ?>">
                                <?php echo $album["album_group"][0]->post_title; ?>
                            </a>
                        </p>
                    <?php } ?>
                    <p>
                        <a target="_blank" href="<?php echo $album["album_link_label"]; ?>"><?php echo $album["album_label"]; ?></a>
                    </p>
                    <p><?php echo $album["album_year"]; ?></p>

                </div>
                <div class="album_column">
    
                    <div class="album_info">
                        <div class="fr"><?php echo $album["album_other_info"]; ?></div>
                        <div class="en"><?php echo $album["album_other_info_en"]; ?></div>
                    </div>            
                    <a class="album_buy" target="_blank" href="<?php echo $album["link_buy_online"]; ?>">
                        <span class="fr">Acheter en ligne</span>
                        <span class="en">Buy Online</span>
                    </a>
                    <!-- REVIEWS -->
                    <?php if ( $album["album_online_reviews"] ) { ?>
                        <ul>
                            <p class="fr">Presse : </p>
                            <p class="en">Reviews: </p>
                            <?php foreach ( $album["album_online_reviews"] as $review ) { ?>
                                <li>
                                    <a target="_blank" href="<?php echo $review["album_online_review_link"] ?>"><?php echo $review["album_online_review_title"] ?></a>
                                </li>
                            <?php } ?>
                        </ul>
                    <?php } ?>
                    <!-- LOGOS -->
                    <?php if ( $album["album_prizes"] ) { ?>
                        <ul class="album_logos">
                            <?php foreach ( $album["album_prizes"] as $prize ) { 
                                // var_dump( $prize["album_prize"] );
                                ?>
                                <li>
                                    <img src="<?php echo $prize["album_prize"]["url"]; ?>" />
                                </li>
                            <?php } ?>
                        </ul>
                    <?php } ?>

                </div>
            </div>

        <?php } ?>
        
    </div> 

</div> 

<?php /*

<script id="discography_template" type="text/template">


            

        
            <% _.each( this.collection.models, function( post ){ %>
                <div class="album">
                    <div class="album_column">
                        <a class="album_image" target="_blank" href="<%= post.attributes.acf.link_buy_online %>">
                            <img src="<%= post.attributes.acf.album_cover.url %>" />
                        </a>
                        <p class="album_title">
                            <%= post.attributes.title.rendered %>
                        </p>
                        <% if ( post.attributes.acf.album_group.length ) { %>
                            <p>
                                <a class="internal" href="#!projects/<%= post.attributes.acf.album_group[0].ID %>">
                                    <%= post.attributes.acf.album_group[0].post_title %>
                                </a>
                            </p>
                        <% } %>                    
                        <p>
                            <a target="_blank" href="<%= post.attributes.acf.album_link_label %>"><%= post.attributes.acf.album_label %></a>
                        </p>
                        <p><%= post.attributes.acf.album_year %></p>
                    </div>
                    <div class="album_column">
                        <div class="album_info">
                            <div class="fr"><%= post.attributes.acf.album_other_info %></div>
                            <div class="en"><%= post.attributes.acf.album_other_info_en %></div>
                        </div>                            
                            <a class="album_buy" target="_blank" href="<%= post.attributes.acf.link_buy_online %>">
                                <span class="fr">Acheter en ligne</span>
                                <span class="en">Buy Online</span>
                            </a>
                        <!-- REVIEWS -->
                        <% if ( post.attributes.acf.album_online_reviews.length ) { %>
                            <ul>
                                <p class="fr">Presse : </p>
                                <p class="en">Reviews: </p>
                                <% _.each( post.attributes.acf.album_online_reviews, function( review ){ %>
                                    <li>
                                        <a target="_blank" href="<%= review.album_online_review_link %>"><%= review.album_online_review_title %></a>
                                    </li>
                                <% }); %>
                            </ul>
                        <% } %>
                        <!-- LOGOS -->
                        <% if ( post.attributes.acf.album_prizes.length ) { %>
                            <ul class="album_logos">
                                <% _.each( post.attributes.acf.album_prizes, function( logo ){ %>
                                    <li>
                                        <img src="<%= logo.album_prize.url %>" />
                                    </li>
                                <% }); %>
                            </ul>
                        <% } %>
                    </div>
                </div>
            <% }); %>



</script>


*/ ?>