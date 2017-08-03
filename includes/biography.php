<?php 
$args = array(
    "p" => 57
);
$bio_query = new WP_Query( $args ); 
if ( $bio_query->have_posts() ) :
    while ( $bio_query->have_posts() ) : $bio_query->the_post(); ?>
            
        <div class="widget news_widget">      
            <div class="widget_content">
        
                <div class="close"></div>

                <?php // IMAGE
                $image = get_field("biography_image");
                image_object( $image ); ?>

                <div class="info_wrapper">

                    <!-- IMAGE CREDITS -->
                    <?php if ( get_field("biography_image_credit") ) { ?>
                        <h4 class="image_credit">
                            <span class="fr">Crédits image :</span>
                            <span class="en">Image credits:</span>
                            <?php the_field("biography_image_credit"); ?>
                        </h4>
                    <?php } ?>

                    <!-- TITLE -->
                    <div class="indent_title_wrapper">
                        <h1 class="indent_title">
                            <span class="fr">Biographie</span>
                            <span class="en">Biography</span>
                        </h1>
                    </div>

                </div><!-- END OF .INFO_WRAPPER -->

                <!-- TEXT -->
                <div class="text_block fr"><?php the_field("biography_text"); ?></div>
                <?php if ( get_field("biography_text_en") ) { ?>
                    <div class="text_block en"><?php the_field("biography_text_en"); ?></div>
                <?php } else { ?>
                    <div class="text_block en">No translation available.</div>
                    <div class="text_block en"><?php the_field("biography_text"); ?></div>
                <?php } ?>

                <!-- IF IMAGES LINK -->
                <?php if ( get_field("biography_link_images") ) { ?>
                    <div class="text_block">
                        <a target="_blank" href="<?php the_field("biography_link_images"); ?>">    
                            Images
                        </a>  
                    </div>                    
                <?php } ?>

                <!-- IF DOCUMENTS -->
                <?php if ( have_rows("biography_documents") ) { ?>
                    <div class="text_block">
                        <?php while ( have_rows("biography_documents") ) : the_row(); 
                            $document = get_sub_field("biography_document"); ?>
                            <a target="_blank" href="<?php echo $document["url"]; ?>">    
                                <?php echo $document["title"]; ?>
                            </a>
                        <?php endwhile; ?>
                    </div>                    
                <?php } ?>

            </div>
        </div>

    <?php
    endwhile;  
endif; 
?>