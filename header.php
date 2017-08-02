<!DOCTYPE html>
<html <?php language_attributes(); ?> style="margin-top: 0px !important" data-scroll="0">

<head>
	<title><?php bloginfo('title'); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<meta property="og:image" content="<?php get_soc_med_image(); ?>" />
	<meta name="twitter:image" content="<?php get_soc_med_image(); ?>">

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style.css">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/style.min.css">
	
	<link rel="canonical" href="<?php bloginfo('url'); ?>"/>

	<script>
		// FIX IE CONSOLE ERRORS
		if (!window.console) console = {log: function() {}}; 
		// SET ROOT
		var ROOT = '<?= get_bloginfo("url"); ?>';
		var THEME_ROOT = '<?= get_bloginfo("template_url"); ?>';
	</script>

	<?php wp_head(); ?>

</head>

<body class="body-class">
	<script>
		// ANALYTICS
		
		// FACEBOOK

	</script>