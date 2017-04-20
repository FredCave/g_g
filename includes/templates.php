<?php /*******************************************

    BACKGROUND IMAGE

**********************************************/ ?>

<script id="bg_image_template" type="text/template">

	<ul>

        <% images = this.model.attributes.acf.home_background_image; %>

        <% _.each ( images, function( img ) { %>

            <li style="background-image:url('<%= img.image.src %>')"></li>

        <% }); %>

    </ul>

</script>

<?php /*******************************************

    UPCOMING

**********************************************/ ?>

<script id="upcoming_template" type="text/template">

    <div class="widget upcoming_widget">
        <div class="widget_content">
    		<div class="close"></div>

            <div class="title_wrapper">
                <h1>Upcoming</h1>
            </div>

            <% 
            i = 0;
            _.each(posts, function( post ) { 
                if ( i < 3 ) { %>
                <div class="upcoming_concert">
                    <h2><%= post.date %></h2>
                    <p><%= post.group[0].post_title %></p>
                    <p><a href="<%= post.link %>"><%= post.title %></a></p>
                </div>
                <% }
                i++;
            }); %>

            <div class="link see_more_concerts">
                <a href="#_concerts">See more concerts</a>
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
            <div class="close"></div>

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
        <img src="<%= acf.news_image.url %>" />
        <div class="info_wrapper">
            <!-- IMAGE CREDITS -->
            <h4 class="image_credit"><%= acf.news_image_credits %></h4>
            <!-- TITLE -->
            <h1 class="news_title"><%= title.rendered %></h1>
            <!-- TEXT -->
            <div class="text_block"><%= acf.news_text %></div>
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
     
            <div class="title_wrapper">
                <h1>Biography</h1>
            </div>
            
            <!-- IMAGE -->
            <img src="<%= acf.biography_image.url %>" />
            <div class="info_wrapper">
                <!-- IMAGE CREDITS -->
                <h4 class="image_credit">Credit here</h4>
                <!-- TEXT -->
                <div class="text_block"><%= acf.biography_text %></div>
            </div>

        </div>  

    </div>

</script>

<?php /*******************************************

    PROJECTS

**********************************************/ ?>

<script id="project_template" type="text/template">

    <div class="widget project_widget" data-id="<%= this.model.id %>">

        <div class="widget_content">
            
            <div class="close"></div>
         
            <div class="title_wrapper">
                <h1><%= this.model.attributes.title.rendered %></h1>
            </div>

            <!-- IMAGE -->
            <% if ( this.model.attributes.acf.project_image ) { %>
                <img src="<%= this.model.attributes.acf.project_image.url %>" />
            <% } %>

            <div class="info_wrapper">
                <!-- IMAGE CREDITS -->
                <h4 class="image_credit">
                    <%= this.model.attributes.acf.project_image_credits %>
                </h4>
                <!-- TEXT -->
                <div class="text_block">
                    <%= this.model.attributes.acf.project_text %>
                </div>
                <!-- ADDTIONAL MEDIA -->
                <% if ( this.model.attributes.acf.project_media.length ) { %>
                    Additional Media
                <% } %>
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
            <img src="<%= data.acf.album_cover.url %>"/>
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
                <h1>Upcoming Concerts</h1>
            </div>
            <div class="filter"></div>
            <div id="concerts_upcoming"></div>

            <div class="title_wrapper">
                <h1>Previous Concerts</h1>
            </div>
            <div class="filter"></div>
            <div id="concerts_previous"></div>

        </div>  
    </div>

</script>

<script id="concerts_sub_template" type="text/template">
         
    <% _.each(posts, function( post ){
        // PARSE RESULT
        var data = post.attributes %>

        <div class="concert" data-group="<%= post.group %>">
            <div class="concert_date"><h2><%= data.date %></h2></div>
            <div class="concert_info">
                <p class="concert_group"><%= data.group[0].post_title %></p>
                <p><a href="<%= post.link %>"><%= data.title %></a></p>
            </div>
        </div>
    <% }); %>
 
</script>

<?php /*******************************************

    DISCOGRAPHY

**********************************************/ ?>

<script id="discography_template" type="text/template">

    <div class="widget discography_widget">

        <div class="widget_content">
            
            <div class="close"></div>
         
            <div class="title_wrapper">
                <h1>Discography</h1>
            </div>

            <% _.each( this.collection.models, function( post ){ %>
                <div class="album">
                    <div class="album_column">
                        <a class="album_buy" target="_blank" href="<%= post.attributes.acf.link_buy_online %>">
                            <img src="<%= post.attributes.acf.album_cover.url %>" />
                        </a>
                    </div>
                    <div class="album_column">
                        <p class="album_title"><%= post.attributes.title.rendered %></p>
                        <p><%= post.attributes.acf.album_group[0].post_title %></p>
                        <p>
                            <a target="_blank" href="<%= post.attributes.acf.album_link_label %>"><%= post.attributes.acf.album_label %></a>
                        </p>
                        <p><%= post.attributes.acf.album_year %></p>
                        <div class="album_info">
                            <%= post.attributes.acf.album_musicians %>
                            <%= post.attributes.acf.album_other_info %>
                        </div>
                            <h1>
                                <a class="album_buy" target="_blank" href="<%= post.attributes.acf.link_buy_online %>">Buy Online</a>
                            </h1>
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
                <h1>Links</h1>
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
                <h2>Other</h2>
                <ul>
                <% _.each( this.model.attributes.acf.links_other, function( post ){ %>
                    <li><a target="_blank" href="<%= post.link_url %>"><%= post.link_title %></a></li>  
                <% }); %> 
                </ul>
            <% } %>

        </div>  
    </div>

</script>

<?php /*******************************************

    CONTACT

**********************************************/ ?>

<script id="contact_template" type="text/template">

    <div class="widget contact_widget">
        <div class="widget_content">
            
            <div class="close"></div>
         
            <div class="title_wrapper">
                <h1>Contact</h1>
            </div>

            <div>
                <a href="mailto:<%= this.model.attributes.acf.contact_main %>"><%= this.model.attributes.acf.contact_main %></a>
            </div>

        </div>  
    </div>

</script>