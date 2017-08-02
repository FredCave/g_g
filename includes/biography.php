<?php 
$args = array(
    "p"              => 57
);
$bio_query = new WP_Query( $args ); 
if ( $bio_query->have_posts() ) :
    while ( $bio_query->have_posts() ) : $bio_query->the_post(); ?>
            
        <div class="widget news_widget">      
            <div class="widget_content">
        
                <div class="close"></div>

                <?php // IMAGE
                /* <% var image = app.App.imageCalc( acf.biography_image.sizes, acf.news_image_size ); %>
                <%= image %>  ?>

                <div class="info_wrapper">
                    <!-- IMAGE CREDITS -->
                    <?php if ( get_field("biography_image_credit") ) { ?>
                        <h4 class="image_credit">
                            <span class="fr">Crédits image :</span>
                            <span class="en">Image credits:</span>
                            <%= acf.biography_image_credit %>
                        </h4>
                    <?php } ?>
                    <!-- TITLE -->
                    <div class="indent_title_wrapper">
                        <h1 class="indent_title">
                            <span class="fr">Biographie</span>
                            <span class="en">Biography</span>
                        </h1>
                    </div>
                    <!-- TEXT -->
                    <div class="text_block fr"><%= acf.biography_text %></div>
                    <% if ( acf.biography_text_en.length ) { %>
                        <div class="text_block en"><%= acf.biography_text_en %></div>
                    <% } else { %>
                        <div class="text_block en">No translation available.</div>
                        <div class="text_block en"><%= acf.biography_text %></div>
                    <% } %>
                    <!-- IF IMAGES LINK -->
                    <% if ( acf.biography_link_images.length ) { %>
                        <div class="text_block">
                            <a target="_blank" href="<%= acf.biography_link_images %>">    
                                Images
                            </a>  
                        </div>                    
                    <% } %>
                    <!-- IF DOCUMENTS -->
                    <% if ( acf.biography_documents.length ) { %>
                        <div class="text_block">
                            <% _.each( acf.biography_documents, function( doc ) { %>
                                <a target="_blank" href="<%= doc.biography_document.url %>">    <%= doc.biography_document.title %>
                                </a>
                            <% }); %>    
                        </div>                    
                    <% } %>

                </div> */ ?>

            </div>
        </div>

    <?php
    endwhile;  
endif; 
?>