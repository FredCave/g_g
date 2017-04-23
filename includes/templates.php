<?php /*******************************************

    BACKGROUND IMAGE

**********************************************/ ?>

<script id="bg_image_template" type="text/template">

	<ul>

        <% images = this.model.attributes.acf.home_background_image;
        _.each ( images, function( img ) { %>

            <li style="background-image:url('<%= img.image.src %>')"></li>

        <% }); %>

    </ul>

</script>

<?php /*******************************************

    CONTACT

**********************************************/ ?>

<script id="contact_template" type="text/template">

    <div class="widget contact_widget">
        <div class="widget_content">
                     
            <div class="title_wrapper">
                <h1>Contact</h1>
            </div>

            <div>
                <a href="mailto:<%= this.model.attributes.acf.contact_main %>"><%= this.model.attributes.acf.contact_main %></a>
            </div>

        </div>  
    </div>

</script>

<?php /*******************************************

    UPCOMING

**********************************************/ ?>

<script id="upcoming_template" type="text/template">

    <div class="widget upcoming_widget">
        <div class="widget_content">

            <div class="title_wrapper">
                <h1 class="fr">À Venir</h1>
                <h1 class="en">Upcoming</h1>
            </div>

            <% 
            i = 0;
            _.each(posts, function( post ) { 
                if ( i < 3 ) { %>
                <div class="upcoming_concert">
                    <h2><%= post.date %></h2>
                    <% if ( post.group.length ) { %>
                        <p><a href="#_projects/<%= post.group[0].ID %>">
                            <%= post.group[0].post_title %>
                        </a></p>
                    <% } %>
                    <p><a href="<%= post.link %>"><%= post.title %></a></p>
                </div>
                <% }
                i++;
            }); %>

            <div class="link see_more_concerts">
                <a href="#_concerts" class="fr">Voir plus de concerts</a>
                <a href="#_concerts" class="en">See more concerts</a>
            </div>

        </div>
    </div>  

</script>

<?php /*******************************************

    PLAYLIST

**********************************************/ ?>

<script id="playlist_template" type="text/template">

    <div class="widget soundcloud_widget">
        <div class="widget_content">

            <%= this.playlist %>

        </div>
    </div>  

</script>

<?php /*******************************************

    NEWS

**********************************************/ ?>

<script id="news_item_template" type="text/template">

    <div class="widget_content">
		
        <div class="close"></div>
        <!-- IMAGE -->
        <img class="<%= acf.news_image_size %>" src="<%= acf.news_image.url %>" />
        <div class="info_wrapper">
            <!-- IMAGE CREDITS -->
            <h4 class="image_credit">
                <span class="fr">Crédits image :</span>
                <span class="en">Image credits:</span>
                <%= acf.news_image_credits %>
            </h4>
            <!-- TITLE -->
            <div class="indent_title_wrapper">
                <h1 class="indent_title">
                    <span class="fr"><%= title.rendered %></span>
                    <span class="en"><%= title.rendered %></span>
                </h1>
            </div>
            <!-- TEXT -->
            <div class="text_block fr"><%= acf.news_text %></div>
            <% if ( acf.news_text_en.length ) { %>
                <div class="text_block en"><%= acf.news_text_en %></div>
            <% } else { %>
                <div class="text_block en">No translation available.</div>
                <div class="text_block en"><%= acf.news_text %></div>
            <% } %>
            
        </div>

    </div>

</script>

<?php /*******************************************

    BIOGRAPHY

**********************************************/ ?>

<script id="biography_template" type="text/template">

    <div class="widget biography_widget">

        <div class="widget_content">
            
            <div class="close"></div>
                 
            <!-- IMAGE -->
            <img class="<%= acf.news_image_size %>" src="<%= acf.biography_image.url %>" />
            <div class="info_wrapper">
                <!-- IMAGE CREDITS -->
                <h4 class="image_credit">
                    <span class="fr">Crédits image :</span>
                    <span class="en">Image credits:</span>
                    <%= acf.biography_image_credit %>
                </h4>
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
                <!-- IF DOCUMENTS -->
                <% if ( acf.biography_documents.length ) { %>
                    <div class="text_block">
                        <% _.each( acf.biography_documents, function( doc ) { %>
                            <a target="_blank" href="<%= doc.biography_document.url %>">    <%= doc.biography_document.title %>
                            </a>
                        <% }); %>    
                    </div>                    
                <% } %>

            </div>

        </div>  

    </div>

</script>

<?php /*******************************************

    PROJECTS

**********************************************/ ?>

<script id="project_template" type="text/template">

    <div class="widget project_widget" id="project-<%= this.model.id %>">

        <div class="widget_content">
            
            <div class="close"></div>
         
            <!-- IMAGE -->
            <% if ( this.model.attributes.acf.project_image ) { %>
                <img class="<%= this.model.attributes.acf.news_image_size %>" src="<%= this.model.attributes.acf.project_image.url %>" />
            <% } %>

            <div class="info_wrapper">
                <!-- IMAGE CREDITS -->
                <% if ( this.model.attributes.acf.project_image_credits ) { %>
                    <h4 class="image_credit">
                        <span class="fr">Crédits image :</span>
                        <span class="en">Image credits:</span>
                        <%= this.model.attributes.acf.project_image_credits %>
                    </h4>
                <% } %>
                <!-- TITLE -->
                <div class="indent_title_wrapper">
                    <h1 class="indent_title">
                        <%= this.model.attributes.title.rendered %>
                    </h1>
                </div>
                <!-- TEXT -->
                <div class="text_block">
                    <%= this.model.attributes.acf.project_text %>
                </div>
                <!-- ADDTIONAL MEDIA -->
                <% if ( this.model.attributes.acf.project_media.length ) { 
                    posts = this.model.attributes.acf.project_media;
                    _.each ( posts, function ( post ) { %>
                        <div class="text_block">
                            <%= post.media %>
                        </div>
                    <% });
                    } %>
                <!-- CONCERTS -->
                <div class="project_concerts"></div>
                <!-- DISCOGRAPHY -->
                <div class="project_discography"></div>
                <!-- DOCUMENTS -->
                <% if ( this.model.attributes.acf.project_documents.length ) { %>
                    <ul class="project_documents">

                    </ul>
                <% } %>
                <!-- SOCIAL MEDIA -->
                <% if ( this.model.attributes.acf.project_social_media.length ) { %>
                    <ul class="project_social_media">

                    </ul>
                <% } %>
            </div>

        </div>  

    </div>

</script>

<script id="project_album_template" type="text/template">
     
    <ul>
         
    <% _.each(posts, function( post ){
        // PARSE RESULT
        var data = post.attributes 
        %>

        <li class="project_album">
            <a href="#_discography"><img src="<%= data.acf.album_cover.url %>"/></a>
            <p class="project_album_title">
                <p>
                    <a href="#_discography"><%= data.title.rendered %></a>
                </p>
            </p>
        </li>

    <% }); %>

    </ul>
 
</script>

<?php /*******************************************

    CONCERTS

**********************************************/ ?>

<script id="concerts_template" type="text/template">

    <div class="widget concerts_widget">
        <div class="widget_content">
            
            <div class="close"></div>

            <div class="title_wrapper">
                <h1 class="fr">Concerts à venir</h1>
                <h1 class="en">Upcoming Concerts</h1>
            </div>
            <div class="filter"></div>
            <div id="concerts_upcoming"></div>

            <div class="title_wrapper">
                <h1 class="fr">Concerts passés</h1>
                <h1 class="en">Previous Concerts</h1>
            </div>
            <div class="filter"></div>
            <div id="concerts_previous"></div>

        </div>  
    </div>

</script>

<script id="concerts_sub_template" type="text/template">
         
    <% _.each(posts, function( post ){
        // PARSE RESULT
        var data = post.attributes; %>

        <div class="concert" data-group="<%= post.group %>">
            <div class="concert_date"><h2><%= data.date %></h2></div>
            <div class="concert_info">
                <% if ( data.group.length ) { %>
                    <a href="#_projects/<%= data.group[0].ID %>">
                        <p class="concert_group"><%= data.group[0].post_title %></p>
                    </a>
                <% } %>
                <p><a target="_blank" href="<%= data.link %>"><%= data.title %></a></p>
            </div>
        </div>
    <% }); %>

    <% if ( posts.length === 0 ) { %>
        <p class="no-concerts fr">Pas de concerts actuellement.</p>
        <p class="no-concerts en">Currently no concerts.</p>
    <% } %>
 
</script>

<script id="concerts_filter_template" type="text/template">
         
    <% if ( this.groups.length ) { %>
        <ul id="concerts_group_filter" class="concerts_filter">
            <% _.each( this.groups, function( group ){ %>
                <li><a data-filter="<%= group.ID %>" href=""><%= group.post_title %></a></li>
            <% }); %>             
        </ul>
    <% } %>

    <% if ( this.years.length ) { %>
        <ul id="concerts_year_filter" class="concerts_filter">
            <% _.each( this.years, function( year ){ 
                %>
                <li><a data-filter="<%= year %>" href=""><%= year %></a></li>
            <% }); %> 
        </ul>
    <% } %>

</script>

<?php /*******************************************

    DISCOGRAPHY

**********************************************/ ?>

<script id="discography_template" type="text/template">

    <div class="widget discography_widget">

        <div class="widget_content">
            
            <div class="close"></div>
         
            <div class="title_wrapper">
                <h1 class="fr">Discographie</h1>
                <h1 class="en">Discography</h1>
            </div>

            <% _.each( this.collection.models, function( post ){ %>
                <div class="album">
                    <div class="album_column">
                        <a class="album_image" target="_blank" href="<%= post.attributes.acf.link_buy_online %>">
                            <img src="<%= post.attributes.acf.album_cover.url %>" />
                        </a>
                        <p class="album_title">
                            <%= post.attributes.title.rendered %>
                        </p>
                        <p><%= post.attributes.acf.album_group[0].post_title %></p>
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
                                <p class="fr">Soutien : </p>
                                <p class="en">Supported by: </p>
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

        </div> 

    </div> 

</script>

<?php /*******************************************

    LINKS

**********************************************/ ?>

<script id="links_template" type="text/template">

    <div class="widget links_widget">
        <div class="widget_content">
            
            <div class="close"></div>
         
            <div class="title_wrapper">
                <h1 class="fr">Liens</h1>
                <h1 class="en">Links</h1>
            </div>

            <!-- GROUPS -->
            <% if ( this.model.attributes.acf.links_groups.length ) { %>
                <h2>Groups</h2>
                <ul>
                <% _.each( this.model.attributes.acf.links_groups, function( post ){ %>
                    <li><a target="_blank" href="<%= post.link_url %>"><%= post.link_title %></a></li>  
                <% }); %> 
                </ul>
            <% } %>

            <!-- LABELS -->
            <% if ( this.model.attributes.acf.links_labels.length ) { %>
                <h2>Labels</h2>
                <ul>
                <% _.each( this.model.attributes.acf.links_labels, function( post ){ %>
                    <li><a target="_blank" href="<%= post.link_url %>"><%= post.link_title %></a></li>  
                <% }); %> 
                </ul>
            <% } %>

            <!-- OTHER -->
            <% if ( this.model.attributes.acf.links_other.length ) { %>
                <h2 class="fr">Autre</h2>
                <h2 class="en">Other</h2>
                <ul>
                <% _.each( this.model.attributes.acf.links_other, function( post ){ %>
                    <li><a target="_blank" href="<%= post.link_url %>"><%= post.link_title %></a></li>  
                <% }); %> 
                </ul>
            <% } %>

        </div>  
    </div>

</script>

