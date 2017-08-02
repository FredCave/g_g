<!-- CONTACT -->

<div class="widget contact_widget">
    <div class="widget_content">

        <div class="title_wrapper">
            <h1>Contact</h1>
        </div>

        <?php $email = get_field( "contact_main", 80 ); ?>
        <div>
            <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a>
        </div>

        <!-- SOCIAL MEDIA -->
        <?php $soc_med_links = get_field( "home_social_media_links", 80 ); 
        if ( $soc_med_links ) : ?>
            <ul class="home_social_media">

                <?php foreach( $soc_med_links as $link ) { 
                    
                    $url = $link["home_social_media_link"];

                    // GET ICONS
                    if ( strpos( $url, 'youtube' ) !== false ) { ?>
                        <li class="social_media_link">
                            <a target="_blank" href="<?php echo $url; ?>">
                                <img src="<?php bloginfo('template_url'); ?>/assets/img/youtube.svg" />
                    <?php } else if ( strpos( $url, 'vimeo' ) !== false ) { ?> 
                        <li class="social_media_link">
                            <a target="_blank" href="<?php echo $url; ?>">
                                <img src="<?php bloginfo('template_url'); ?>/assets/img/vimeo.svg" />
                    <?php } else if ( strpos( $url, 'soundcloud' ) !== false ) { ?>
                        <li class="social_media_link">
                            <a target="_blank" href="<?php echo $url; ?>">
                                <img src="<?php bloginfo('template_url'); ?>/assets/img/soundcloud.svg" />
                    <?php } else if ( strpos( $url, 'facebook' ) !== false ) { ?> 
                        <li class="social_media_link">
                            <a target="_blank" href="<?php echo $url; ?>">
                                <img src="<?php bloginfo('template_url'); ?>/assets/img/facebook.svg" />
                    <?php } else  { ?>
                        <li class="social_media_link link_text">
                            <a target="_blank" href="<?php echo $url; ?>">
                                <?php echo $url; ?>
                    <?php } ?>
                            </a>
                        </li>

                <?php } ?>

            </ul>
        <?php endif; ?>

        <!-- NEWSLETTER -->
        <div id="newsletter_toggle">
            <span class="fr"><a href="">Recevoir le newsletter</a></span>
            <span class="en"><a href="">Sign up to the newsletter</a></span>
        </div>
        <div id="newsletter_form">
            <?php echo do_shortcode("[newsletter]"); ?>
        </div>

    </div>  
</div>

<!-- UPCOMING -->

<div class="widget upcoming_widget">
    <div class="widget_content">

        <div class="title_wrapper">
            <h1 class="fr">À Venir</h1>
            <h1 class="en">Upcoming</h1>
        </div>

        <?php 
        $concerts = get_upcoming_concerts( 3 ); 
        foreach ( $concerts as $concert ) { ?>
            <div class="upcoming_concert">
                <h2><?php echo $concert["date"]; ?></h2>
                <?php 
                // IF GROUP EXISTS
                if ( $concert["group"] ) { ?>
                    <p><a href="#!projects/<?php echo $concert["group"][0]->ID; ?>">
                        <?php echo $concert["group"][0]->post_title; ?>
                    </a></p>
                <?php }
                // IF LINK EXISTS
                if ( $concert["link"] ) { ?>
                    <p><a target="_blank" href="<?php echo $concert["link"]; ?>"><?php echo $concert["title"]; ?></a></p>
                <?php } else { ?>
                    <p><?php echo $concert["title"]; ?></p>
                <?php } ?>
            </div>           
        <?php } ?>

        <div class="link see_more_concerts">
            <a href="#_concerts" class="fr">Voir plus de concerts</a>
            <a href="#_concerts" class="en">See more concerts</a>
        </div>

    </div>
</div>  

<!-- SOUNDCLOUD PLAYLIST -->

<div class="widget soundcloud_widget">
    <div class="widget_content">

        <?php the_field( "home_playlist", 72 ); ?>

    </div>
</div>  

