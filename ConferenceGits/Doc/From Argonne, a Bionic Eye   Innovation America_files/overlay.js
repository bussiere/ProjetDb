jQuery(document).ready(function() {
  jQuery("#edit-search-block-form-1").eq(0).val("SEARCH...");
  jQuery("#edit-search-block-form-1").eq(0).focus(function(){
	if( jQuery(this).val() == 'SEARCH...'){
		jQuery(this).val('');
	  }
  });
  jQuery("#edit-search-block-form-1").eq(0).blur(function(){
	if( jQuery(this).val() == '') {
		jQuery(this).val('SEARCH...');
	 }
  });
});

jQuery(document).ready(function() {
  jQuery("#edit-search-theme-form-1").eq(0).val("SEARCH...");
  jQuery("#edit-search-theme-form-1").eq(0).focus(function(){
    if( jQuery(this).val() == 'SEARCH...'){
    		jQuery(this).val('');
      }
	});
  jQuery("#edit-search-theme-form-1").eq(0).blur(function(){
   	if( jQuery(this).val() == '') {
    		jQuery(this).val('SEARCH...');
   	}
  });
});