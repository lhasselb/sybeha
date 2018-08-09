	<!--START MENU BUTTONS-->
	<ul class='etabs'>
	<% if $Menu(2) %>
		<% loop $Menu(2) %>
			<li class="tab"><a href="#$URLSegment" title="$Title.XML">$MenuTitle.XML</a></li>
		<% end_loop %>
	<% else %>
		<% loop $Menu(1) %>
			<li class="tab"><a href="#$URLSegment" title="$Title.XML">$MenuTitle.XML</a></li>
		<% end_loop %>	
	<% end_if %>
	</ul>
	<!--END MENU BUTTONS-->