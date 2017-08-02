<?php get_header(); ?>

	<div id="bg_image">
		<?php get_bg_images(); ?>
	</div>

	<!-- NAV -->
	<?php include( "includes/nav.php" ); ?>

	<div id="wrapper">

		<!-- SIDEBAR -->
		<div id="sidebar">
			<?php include("includes/sidebar.php"); ?>
		</div>	

		<!-- MAIN COLUMN -->
		<div id="widget_wrapper">
			
			<!-- NEWS -->
			<div id="news">
				<?php include("includes/news.php"); ?>
			</div>

			<!-- BIOGRAPHY -->
			<div id="biography">
				<?php include("includes/biography.php"); ?>
			</div>

			<!-- PROJECTS -->
			<div id="projects">
			</div>

			<!-- CONCERTS -->
			<div id="concerts">
				<?php include("includes/concerts.php"); ?>
			</div>

			<!-- DISCOGRAPHY -->
			<div id="discography">
				<?php include("includes/discography.php"); ?>
			</div>

			<!-- LINKS -->
			<div id="links">
				<?php include("includes/links.php"); ?>
			</div>

		</div>

	</div>

<?php get_footer(); ?>