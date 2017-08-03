<?php 
$args = array(
    "p" => 38
);
$links_query = new WP_Query( $args ); 
if ( $links_query->have_posts() ) :
    while ( $links_query->have_posts() ) : $links_query->the_post(); ?>
            
        <div class="widget links_widget">
            <div class="widget_content">
                
                <div class="close"></div>
             
                <div class="title_wrapper">
                    <h1 class="fr">Liens</h1>
                    <h1 class="en">Links</h1>
                </div>   

                <!-- GROUPS -->
                <?php if ( have_rows("links_groups") ) : ?>
                    <h2 class="fr">Groupes/Musiciens</h2>
                    <h2 class="en">Groups/Musicians</h2>
                    <ul>
                        <?php while ( have_rows("links_groups") ) : the_row(); ?>
                            <li><a target="_blank" href="<?php the_sub_field("link_url"); ?>"><?php the_sub_field("link_title"); ?></a></li>  
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>

                <!-- LABELS -->
                <?php if ( have_rows("links_labels") ) : ?>
                    <h2>Labels</h2>
                    <ul>
                        <?php while ( have_rows("links_labels") ) : the_row(); ?>
                            <li><a target="_blank" href="<?php the_sub_field("link_url"); ?>"><?php the_sub_field("link_title"); ?></a></li>  
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>

                <!-- OTHER -->
                <?php if ( have_rows("links_other") ) : ?>
                    <h2 class="fr">Autre</h2>
                    <h2 class="en">Other</h2>
                    <ul>
                        <?php while ( have_rows("links_other") ) : the_row(); ?>
                            <li><a target="_blank" href="<?php the_sub_field("link_url"); ?>"><?php the_sub_field("link_title"); ?></a></li>  
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>                

            </div>  
        </div>

    <?php
    endwhile;  
endif; 
?>
