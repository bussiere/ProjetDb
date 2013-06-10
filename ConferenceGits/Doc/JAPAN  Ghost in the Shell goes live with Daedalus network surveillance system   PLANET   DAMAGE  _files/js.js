jQuery(document).ready(function($){
  
    //Random Post
  function loadRandom() {
    var $refreshBtn = $('.more-refresh a'),
      $randomWrap = $('#random-wrapper'),
      $wrapInner  = $randomWrap.children('span'),
      $loader   = $('#random-loader'),
      url     = document.location.href,
      $randomContent;
      
    $wrapInner.wrapAll('<div id="random-content"/>');
    $randomContent = $('#random-content');
    
    $refreshBtn.click(function(e){
      e.preventDefault();
      $.ajax({
        url: url,
        cache: false,
        beforeSend: function(){
          $randomContent.fadeTo(600,0.3);
          $loader.fadeIn();
        },
        success: function(data){
                    $loader.fadeOut();
          $randomContent.fadeOut(600, function(){
            $(this)
            .html($(data).find('#random-wrapper').children('span'))
            .fadeTo(600,1);
                        $('.playicon').parent().addClass('video-thumb');
          });
        }
      });
    });
  } // End loadRandom()
  loadRandom();
  
  //Sooperfish Menu
  $('#madmenu ul:first').addClass('sf-menu').superfish({
    hoverClass : 'sfHover',
    delay: 400,
    autoArrows : true,
    speed: 300,
    animation:   {opacity:'show',height:'show'},
    onInit: function() {
      $(this).find('.sf-sub-indicator').text('');
    }
  });

  $('.menu-select select').change(function(){
    var val = $(this).val();
        newVal = ( $(this).hasClass('page-dropdown-menu') ) ? options.baseurl + '?p=' + val : val;
    if( val !== -1 ) {
      window.location.href = newVal;
    }
  });
  
  // addclass to playicon element parent
  $('.playicon').parent().addClass('video-thumb');

});
