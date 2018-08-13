<% cached 'layout', $LastEdited %> 
<div class='panel-container'>
<% if $Menu(2) %>
	<% loop $Menu(2) %>
	<div id="$URLSegment">
		<div class="leftColumn">
		<% if MenuTitle == "Contact"%>
			<h2>$Title</h2>
			<% if StatusMessage %>
			<p>$StatusMessage</p>
			<% end_if %>
			$Up.ContactForm 
		<% else_if MenuTitle == "About"%>
			<h2>$Title</h2>
			$Content
		<% else %>
			$Content	
		<% end_if %>
		</div>
		<div class="rightColumn">$SideContent</div>
		<div class="clears"></div>
	</div>
	<% end_loop %> 
<% else %>
	<% loop $Menu(1) %>
	<div id="$URLSegment">
		<div class="leftColumn">
			<!--<h2>$Title</h2>$Content--> 
			$Up.Form
		</div>
		<div class="rightColumn">$SideContent</div>
		<div class="clears"></div>
	</div>
	<% end_loop %> 
<% end_if %>
</div>
<% end_cached %>