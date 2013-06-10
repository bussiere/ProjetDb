/**
 * jQuery Mobile Menu 
 * Turn unordered list menu into dropdown select menu
 * version 1.0(31-OCT-2011)
 * 
 * Built on top of the jQuery library
 *   http://jquery.com
 * 
 * Documentation
 * 	 http://github.com/mambows/mobilemenu
 */
(function(a){a.fn.mobileMenu=function(b){var e={defaultText:"Navigate to...",className:"select-menu",subMenuClass:"sub-menu",subMenuDash:"&ndash;"},d=a.extend(e,b),c=a(this);this.each(function(){c.find("ul").addClass(d.subMenuClass);a("<select />",{"class":d.className}).insertAfter(c);a("<option />",{value:"#",text:d.defaultText}).appendTo("."+d.className);c.find("a").each(function(){var i=a(this),g="&nbsp;"+i.text(),h=i.parents("."+d.subMenuClass),f=h.length,j;if(i.parents("ul").hasClass(d.subMenuClass)){j=Array(f+1).join(d.subMenuDash);g=j+g}a("<option />",{value:this.href,html:g,selected:(this.href==window.location.href)}).appendTo("."+d.className)});a("."+d.className).change(function(){var f=a(this).val();if(f!=="#"){window.location.href=a(this).val()}})});return this}})(jQuery);

(function($){
$(document).ready(function() {

	/* Pretty Photo */
	$("a[rel^='prettyPhoto']").prettyPhoto({
		theme: 'facebook',
		social_tools: false
	});
  $("a[rel^='prettyPhoto']")
    .hover(function(){
        $(this).find('img').stop(true,true).fadeTo('fast', 0.55);
    }, function(){
        $(this).find('img').stop(true,true).fadeTo('fast', 1);
    });
    
  // Mobile Menu
  // $('#navbar ul.menu').mobileMenu();

  /* Mobile nav collapse
  ------------------------------------------------------------------- */
  $('.btn-navbar').click(function(e){
    e.preventDefault();
    var $el = $(this),
        $navCollapse = $el.next('.nav-collapse');

    // If collapsed
    if( $el.hasClass('collapsed') ) {
      $navCollapse.height( $navCollapse.children().outerHeight(true) );
      $el.removeClass('collapsed');
    } else {
      $navCollapse.height(0);
      $el.addClass('collapsed');
    }
  });
});

$(window).load(function(){

	// Set logo width
	function setLogoWidth() {
		var logo 	= $('#logo'),
				logoImg	= logo.find('img'),
				column	= logo.parent('.clearfloat'),
				logoW	= logo.width(),
				imgW	= logoImg.width(),
				colW	= column.width();
		
		if( imgW > colW ) {
			logo.addClass('bigger');
		} else {
			logo.addClass('smaller');
		}
	}
	setLogoWidth();
	
	
});
})(jQuery);
