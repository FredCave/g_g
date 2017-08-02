<?php 
$args = array(
    "post_type"         => "news",
    "posts-per-page"    => 3
);
$news_query = new WP_Query( $args ); 
if ( $news_query->have_posts() ) :
    while ( $news_query->have_posts() ) : $news_query->the_post(); ?>
            
        <div class="widget news_widget">      
            <div class="widget_content">
        
                <div class="close"></div>

                <!-- IMAGE -->
                <?php 
                $image = get_field("news_image");
                $image_size = get_field("news_image_size");
                image_object( $image, $image_size );
                ?>

                <div class="info_wrapper">
                    <!-- IMAGE CREDITS -->
                    <?php if ( get_field("news_image_credits") ) { ?>
                        <h4 class="image_credit">
                            <span class="fr">Crédits image :</span>
                            <span class="en">Image credits:</span>
                            <?php the_field("news_image_credits"); ?>
                        </h4>
                    <?php } ?>
                    <!-- TITLE -->
                    <div class="indent_title_wrapper">
                        <h1 class="indent_title">
                            <span class="fr"><?php the_title(); ?></span>
                            <span class="en"><?php the_field("news_title_english"); ?></span>
                        </h1>
                    </div>
                    <!-- TEXT -->
                    <div class="text_block fr"><?php the_field("news_text"); ?></div>
                    <?php if ( get_field("news_text_en") ) { ?>
                        <div class="text_block en"><?php the_field("news_text_en"); ?></div>
                    <?php } else { ?>
                        <div class="text_block en">No translation available.</div>
                        <div class="text_block en"><?php the_field("news_text"); ?></div>
                    <?php } ?>
                    
                </div>

            </div>
        </div>

    <?php
    endwhile;  
endif; 
?>