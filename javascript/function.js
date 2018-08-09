/* TABS */
  $(document).ready( function() {
    $('#tab-container').easytabs();
/* PLACEHOLDER TEXT */
if(!Modernizr.input.placeholder){
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
} 
/* THUMBNAIL HOVER */
    $('.circle').mosaic({
    	opacity		:	0.8
    });
/* SLIDER */    
    $('#banner').bjqs({
      'animation' : 'slide',
      'width' : 650,
      'height' : 350
    });
        
  });
/* FADE IN  */  
$(document).ready(function(){
$(".tab-container, .copyright").animate({opacity:1.0},800);
});

  
