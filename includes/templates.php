

<?php /*******************************************

    PROJECTS

**********************************************/ ?>

<script id="project_item_template" type="text/template">

    <div id="project-<%= this.model.id %>" class="widget_content">
        
        <div class="close"></div>

        <!-- IMAGE -->         
        <% if ( acf.project_image ) {
            var image = app.App.imageCalc( acf.project_image.sizes, acf.project_image_size ); %>
            <%= image %>
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
                <div class="fr"><%= this.model.attributes.acf.project_text %></div>
                <div class="en"><%= this.model.attributes.acf.project_text_en %></div>
            </div>
            <!-- MUSICIANS -->
            <div class="text_block">
                <div class="fr">
                    <h1>Musiciens</h1>
                    <%= this.model.attributes.acf.project_musicians %>        
                </div>
                <div class="en">
                    <h1>Musicians</h1>
                    <%= this.model.attributes.acf.project_musicians_en %>
                </div>
            </div>
            <!-- ADDTIONAL SOUNDCLOUD -->
            <% if ( this.model.attributes.acf.project_media_soundcloud.length ) { 
                posts = this.model.attributes.acf.project_media_soundcloud;
                _.each ( posts, function ( post ) { %>
                    <div class="soundcloud_hidden">
                        <%= post.media %>
                    </div>
                <% });
                } %>
            <!-- ADDTIONAL VIDEOS -->
            <% if ( this.model.attributes.acf.project_media.length ) { 
                posts = this.model.attributes.acf.project_media;

                _.each ( posts, function ( post ) { %>
                    <div class="text_block">
                        <%= post.media %>
                    </div>
                <% });
                } %>
            <!-- PRESS SPACE -->
            <% if ( this.model.attributes.acf.project_press.length ) { %>
                <div class="text_block">
                    <div class="fr">
                        <h1>Presse</h1>
                        <%= this.model.attributes.acf.project_press %>        
                    </div>
                </div>
            <%  } %>  
            <% if ( this.model.attributes.acf.project_press_en.length ) { %>
                <div class="text_block">
                    <div class="en">
                        <h1>Press</h1>
                        <%= this.model.attributes.acf.project_press_en %>        
                    </div>
                </div>
            <%  } %> 
         
            <!-- CONCERTS -->
            <div class="project_concerts"></div>
            <!-- DISCOGRAPHY -->
            <div class="project_discography"></div>
            <!-- DOCUMENTS -->
            <% if ( this.model.attributes.acf.project_documents.length ) { %>
                <ul class="project_documents">
                <% docs = this.model.attributes.acf.project_documents;
                _.each ( docs, function ( doc ) { %>
                    <div class="text_block">
                        <a target="_blank" href="<%= doc.document.url %>">
                            <%= doc.document.title %>
                        </a>
                    </div>
                <% }); %>  
                </ul>
            <% } %>
            <!-- SOCIAL MEDIA -->
            <% 
            if ( this.model.attributes.acf.project_social_media.length ) { %>
                <ul class="project_social_media">
                <% links = this.model.attributes.acf.project_social_media;
                _.each ( links, function ( link ) { 
                    // IF NO ICON: CHANGE CLASS
                    if ( link.icon.length === 0 ) { %>
                    <li class="social_media_link link_text">
                    <% } else { %>
                    <li class="social_media_link">
                    <% } %>
                        <a target="_blank" href="<%= link.project_social_media_link %>">
                            <% // IF NO ICON
                            if ( link.icon.length === 0 ) { %>
                                <%= link.project_social_media_link %>
                            <% } else { %>
                                <img src="<%= link.icon %>" />
                            <% } %>        
                        </a>
                    </li>
                <% }); %>
                </ul>
            <% } %>
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



