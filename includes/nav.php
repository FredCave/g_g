<div id="nav_toggle"><a href="">Menu</a></div>

<ul id="nav" class="small_screen_hide">
	<li><a href="#!news">
		<span class="fr">Actualités</span><span class="en">News</span>
	</a></li>
	<li><a href="#!biography">
		<span class="fr">Biographie</span><span class="en">Biography</span>
	</a></li>
	<li><a id="projects_toggle" href="">
			<span class="fr">Projets</span><span class="en">Projects</span>
		</a>
		<ul id="mobile_projects_hidden">
			<?php get_projects(); ?>
		</ul>
	</li>
	<li><a href="#!concerts">
		<span class="fr">Concerts</span><span class="en">Concerts</span>
	</a></li>
	<li><a href="#!discography">
		<span class="fr">Discographie</span><span class="en">Discography</span>
	</a></li>
	<li><a href="#!links">
		<span class="fr">Liens</span><span class="en">Links</span>
	</a></li>
	<li class="hide"><a href="#!contact">Contact</a></li>
	<li id="lang_selec">
		<a class="lang_en" href="">EN</a> / <a class="lang_fr selected" href="">FR</a>
	</li>
	<ul id="projects_hidden">
		<?php get_projects(); ?>
	</ul>
</ul>