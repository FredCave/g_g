<script id="bg_image_template" type="text/template">

	<div style="background-image:url('<%= src %>')"></div>

</script>

<script id="widget_template" type="text/template">

    <div class="">
		<div class="close">x</div>
    </div>

</script>

<script id="news_item_template" type="text/template">

    <div class="widget_content">
		
        <div class="close"></div>
        <!-- IMAGE -->
        <img src="<%= acf.news_image.url %>" />
        <div class="info_wrapper">
            <!-- IMAGE CREDITS -->
            <div class="image_credit"><%= acf.news_image_credits %></div>
            <!-- TITLE -->
            <h1><%= title.rendered %></h1>
            <!-- TEXT -->
            <div class="text_block"><%= acf.news_text %></div>
        </div>

    </div>

</script>

<script id="concert_template" type="text/template">

    <ul>
        <li class="concert_date"><%= acf.concert_date %></li>
        <li><%= acf.concert_group %></li>
        <li><a target="_blank" href="<%= acf.concert_venue_link %>">@ <%= title.rendered %></a></li>
    </ul>

</script>