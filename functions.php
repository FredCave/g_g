<?php

// SECURITY: HIDE USERNAMES
add_action(‘template_redirect’, ‘bwp_template_redirect’);
function bwp_template_redirect() {
    if ( is_author() ) {
        wp_redirect( home_url() ); 
        exit;
    }
}

// HIDE VERSION OF WORDPRESS
function wpversion_remove_version() {
    return '';
    }
add_filter('the_generator', 'wpversion_remove_version');

// ENQUEUE CUSTOM SCRIPTS
function enqueue_cpr_scripts() {
  
    wp_deregister_script( 'jquery' );
//     wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js');
// //    wp_register_script( 'jquery', get_template_directory_uri() . '/js/_jquery.js');
//     wp_enqueue_script( 'jquery' );  
    
//    wp_enqueue_script('jquery', get_template_directory_uri() . '/js/_jquery.js', true);
    // wp_enqueue_script('all-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery'), true);

    // wp_register_script( "custom_ajax", get_template_directory_uri() . '/js/custom_ajax.js', array('jquery') );
    // wp_localize_script( "custom_ajax", "myAjax", array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );        
    // wp_enqueue_script( "custom_ajax" );

    // wp_localize_script( 'ajax-script', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

}
add_action('wp_enqueue_scripts', 'enqueue_cpr_scripts');

// ADD CUSTOM POST TYPES
add_action( 'init', 'create_post_types' );
function create_post_types() {
    register_post_type( 'news',
    array(
        'labels' => array(
            'name' => __( 'News' )
        ),
        'public' => true,
        'show_in_rest' => true,
        // 'taxonomies' => array('archive-cat'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 5
        )
    );
    register_post_type( 'projects',
    array(
        'labels' => array(
            'name' => __( 'Projects' )
        ),
        'public' => true,
        'show_in_rest' => true,
        // 'taxonomies' => array('category'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 6
        )
    );
    register_post_type( 'concerts',
    array(
        'labels' => array(
            'name' => __( 'Concerts' )
        ),
        'public' => true,
        'show_in_rest' => true,
        // 'taxonomies' => array('category'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 7
        )
    );
    register_post_type( 'albums',
    array(
        'labels' => array(
            'name' => __( 'Albums' )
        ),
        'public' => true,
        'show_in_rest' => true,
        // 'taxonomies' => array('category'),
        'has_archive' => true,
        'supports' => array('editor','title'),
        'menu_position' => 8
        )
    );
}

// IMAGE OBJECT

    // ADD CUSTOM IMAGE SIZES
add_theme_support( 'post-thumbnails' );
add_image_size( 'extralarge', 1200, 1200 );

function image_object( $image, $class ) {
    if( !empty($image) ): 
        $width = $image['sizes'][ 'thumbnail-width' ];
        $height = $image['sizes'][ 'thumbnail-height' ];
        $thumb = $image['sizes'][ "thumbnail" ]; // 300
        $medium = $image['sizes'][ "medium" ]; // 600
        $large = $image['sizes'][ "large" ]; // 900
        $extralarge = $image['sizes'][ "extralarge" ]; // 1200
        $id = $image["id"];
        // // DEFAULT IS FULL WIDTH
        // if ( $height / $width >= 0.5 && $height / $width < 1 ) {
        //     $class = "two-thirds";
        // } else if ( $height / $width >= 1 ) {
        //     $class = "one-third";
        //     // PORTRAIT MODE
        //     $thumb = $image['sizes'][ "medium" ];
        //     $medium = $image['sizes'][ "large" ];
        //     $large = $image['sizes'][ "extralarge" ]; 
        // } else {
        //     $class = "full-width"; 
        // }
        echo "<img class='" . $class . " ' 
            alt='Le Ton Vertical' 
            width='" . $width . "' 
            height='" . $height . "' 
            data-thm='" . $thumb . "' 
            data-med='" . $medium . "' 
            data-lrg='" . $large . "' 
            data-xlg='" . $extralarge . "' 
            src=' " . $thumb . "' />";
    endif;
}

// GET BACKGROUND IMAGEs

function get_bg_images () {

    $images = get_field( "home_background_image", 72 );
    if ( $images ) {
        echo "<ul>";
        foreach ( $images as $image ) { ?>

            <li id="<?php echo $image["image"]["ID"]; ?>" 
                data-ratio="<?php echo $image["image"]["width"] / $image["image"]["height"]; ?>" 
                data-thm="<?php echo $image["image"]["sizes"]["thumbnail"]; ?>" 
                data-med="<?php echo $image["image"]["sizes"]["medium"]; ?>" 
                data-lrg="<?php echo $image["image"]["sizes"]["large"]; ?>" 
                data-xlg="<?php echo $image["image"]["sizes"]["extralarge"]; ?>" 
                style="background-image:url('<?php echo $image["image"]["sizes"]["thumbnail"]; ?>')">                
            </li>

        <?php }
        echo "</ul>";
    }

}

// REST API ENDPOINTS

function date_cmp ($a, $b) {
    return strcmp( $a["date"], $b["date"] );
}

function year_cmp ($a, $b) {
    return strcmp( $a, $b );
}

function get_upcoming_concerts ( $max ) {

    if ( is_null( $max ) ) {
        $max = 99;
    }

    $args = array(
        "post_type"         => "concerts",
        "posts_per_page"    => -1
    );
    $agenda_query = new WP_Query( $args );
    $concerts = array();
    // LOOP THROUGH POSTS
    if ( $agenda_query->have_posts() ) :
        $i = 0;
        while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
            // FILTER USING ISPAST FILTER
            if ( !isPast( get_field("concert_date") ) ) {
                $concerts[] = array(
                    'title' => get_the_title(),
                    'date' => get_field("concert_date"),
                    'link' => get_field("concert_venue_link"),
                    'group' => get_field("concert_group")
                );
            }
            $i++;
        endwhile;
        wp_reset_postdata();
    endif;

    // SORT BY DATE
    usort( $concerts, "date_cmp" );

    // RETURN ONLY REQUESTED AMOUNT
    $return_data = array();
    $i = 0;
    while ( $i < $max ) {
        $return_data[] = $concerts[$i];
        $i++;
    }

    return $return_data;

}


/* function upcoming_concerts () {

    $args = array(
        "post_type"         => "concerts",
        "posts_per_page"    => -1
    );
    $agenda_query = new WP_Query( $args );
    $data = array();
    // LOOP THROUGH POSTS
    if ( $agenda_query->have_posts() ) :
        $i = 0;
        while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 
            // FILTER USING ISPAST FILTER
            if ( !isPast( get_field("concert_date") ) ) {
                $data[] = array(
                    'title' => get_the_title(),
                    'date' => get_field("concert_date"),
                    'link' => get_field("concert_venue_link"),
                    'group' => get_field("concert_group")
                );
            }
            $i++;
        endwhile;
        wp_reset_postdata();
    endif;

    // SORT BY DATE
    usort( $data, "date_cmp" );

    // RETURN DATA
    if ( empty( $data ) ) {
        return null;
    }    
    return $data;
} */

function previous_concerts () {
    $args = array(
        "post_type"         => "concerts",
        "posts_per_page"    => -1
    );
    $agenda_query = new WP_Query( $args );
    $data = array();
    // LOOP THROUGH POSTS
    if ( $agenda_query->have_posts() ) :
        $i = 0;
        while ( $agenda_query->have_posts() ) : $agenda_query->the_post(); 

            // FILTER USING ISPAST FILTER
            if ( isPast( get_field("concert_date") ) ) {
                $data[] = array(
                    'title' => get_the_title(),
                    'date' => get_field("concert_date"),
                    'link' => get_field("concert_venue_link"),
                    'group' => get_field("concert_group")
                );
            }
        endwhile;
        wp_reset_postdata();
    endif;
    // RETURN DATA
    if ( empty( $data ) ) {
        return null;
    }    
    return $data;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1', '/upcoming/', array(
        'methods' => 'GET',
        'callback' => 'upcoming_concerts',
    ) );
    register_rest_route( 'custom/v1', '/previous/', array(
        'methods' => 'GET',
        'callback' => 'previous_concerts',
    ) );
} );




// AGENDA / ARCHIVE

    // DATE CHECKER

function isPast ( $date ) {
    // CURRENT DATE
    $today = explode( "/", date("d/m/Y") );
    $today_day = $today[0];
    $today_month = $today[1];
    $today_year = $today[2];
    // INPUT DATE
    // FORMAT: 2017-03-31 19:00:00
    $show = explode( "/", $date );
    $show_year = $show[0];
    $show_month = $show[1];
    $show_day = $show[2];

    $past = false;
    // IF YEAR IS IN PAST
    if ( $show_year < $today_year ) {
        $past = true;
    // IF YEAR IS CURRENT
    } else if ( $show_year === $today_year ) {
        // IF MONTH IS IN PAST
        if ( $show_month < $today_month ) {
            $past = true;
        } else if ( $show_month === $today_month ) {
            // IF DAY IS IN PAST
            if ( $show_day < $today_day ) {
                $past = true; 
            }
        } 
    } 
    return $past;
}

// GET PROJECTS FOR MENU

function get_projects () {
    $projects_query = new WP_Query( "post_type=projects" ); 
    if ( $projects_query->have_posts() ) :
        while ( $projects_query->have_posts() ) : $projects_query->the_post(); ?>
            <li><a href="#!projects/<?php the_ID(); ?>"><?php the_title(); ?></a></li>
        <?php
        endwhile;  
    endif;    
}

// GET NEWS FOR INITIAL LOAD

function gg_get_news () {
    
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
                        <h4 class="image_credit">
                            <span class="fr">Crédits image :</span>
                            <span class="en">Image credits:</span>
                            <?php the_field("news_image_credits"); ?>
                        </h4>
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

}

// IMAGE TO BE SHARED ON FACEBOOK AND TWITTER

function get_soc_med_image () {

    $args = array(
        "name"  => "home-page",
    );
    $img_query = new WP_Query( $args );
    // LOOP THROUGH POSTS
    if ( $img_query->have_posts() ) :
        while ( $img_query->have_posts() ) : $img_query->the_post(); 

            $image = get_field("home_social_media_image");
            echo $image["url"];

        endwhile;
        wp_reset_postdata();
    endif;

}

?>