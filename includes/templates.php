<script id="bg_image_template" type="text/template">

	<div style="background-image:url('<%= src %>')"></div>

</script>


<script id="concert_template" type="text/template">

    <ul>
        <li class="concert_date"><%= acf.concert_date %></li>
        <li><%= acf.concert_group %></li>
        <li><a target="_blank" href="<%= acf.concert_venue_link %>">@ <%= title.rendered %></a></li>
    </ul>

</script>