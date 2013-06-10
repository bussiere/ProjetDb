/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
* sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
* interval: 100,   // number = milliseconds of polling interval
* over: showNav,  // function = onMouseOver callback (required)
* timeout: 0,   // number = milliseconds delay before onMouseOut function call
* out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($) {
  $.fn.hoverIntent = function(f,g) {
    // default configuration options
    var cfg = {
      sensitivity: 7,
      interval: 100,
      timeout: 0
    };
    // override configuration options with user supplied object
    cfg = $.extend(cfg, g ? { over: f, out: g } : f );

    // instantiate variables
    // cX, cY = current X and Y position of mouse, updated by mousemove event
    // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
    var cX, cY, pX, pY;

    // A private function for getting mouse position
    var track = function(ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };

    // A private function for comparing current and previous mouse position
    var compare = function(ev,ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      // compare mouse positions to see if they've crossed the threshold
      if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
        $(ob).unbind("mousemove",track);
        // set hoverIntent state to true (so mouseOut can be called)
        ob.hoverIntent_s = 1;
        return cfg.over.apply(ob,[ev]);
      } else {
        // set previous coordinates for next time
        pX = cX; pY = cY;
        // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
        ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
      }
    };

    // A private function for delaying the mouseOut function
    var delay = function(ev,ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = 0;
      return cfg.out.apply(ob,[ev]);
    };

    // A private function for handling mouse 'hovering'
    var handleHover = function(e) {
      // copy objects to be passed into t (required for event object to be passed in IE)
      var ev = jQuery.extend({},e);
      var ob = this;

      // cancel hoverIntent timer if it exists
      if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

      // if e.type == "mouseenter"
      if (e.type == "mouseenter") {
        // set "previous" X and Y position based on initial entry point
        pX = ev.pageX; pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $(ob).bind("mousemove",track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

      // else e.type == "mouseleave"
      } else {
        // unbind expensive mousemove event
        $(ob).unbind("mousemove",track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
      }
    };

    // bind the function to the two event listeners
    return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
  };
})(jQuery);



/*
 * Superfish v1.5.0 - jQuery menu widget
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
  $.fn.superfish = function(op){

    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $('<span class="'+c.arrowClass+'"> &#187;</span>'),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          o.retainPath=($.inArray($$[0],o.$path)>-1);
          $$.hideSuperfishUl();
          if (o.$path.length && $$.parents('li.'+o.hoverClass).length<1){
            o.onIdle.call(this);
            over.call(o.$path);
          }
        },o.delay); 
      },
      getMenu = function($menu){
        var menu = $menu.parents('ul.'+c.menuClass+':first')[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
      
    return this.addClass(c.menuClass).each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
        $(this).addClass(o.hoverClass+' '+c.bcClass)
          .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;
      
      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) {
          addArrow( $('>a:first-child',this) );
        }
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();
      
      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);
      
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};

  sf.c = {
    bcClass     : 'sf-breadcrumb',
    menuClass   : 'sf-js-enabled',
    anchorClass : 'sf-with-ul',
    arrowClass  : 'sf-sub-indicator'
  };
  sf.defaults = {
    hoverClass  : 'sfHover',
    pathClass : 'overideThisToUse',
    pathLevels  : 1,
    delay   : 800,
    animation : {opacity:'show'},
    speed   : 'normal',
    autoArrows  : true,
    disableHI : false, 
    onInit    : function(){}, 
    onBeforeShow: function(){},
    onShow    : function(){},
    onHide    : function(){},
    onIdle    : function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $('li.'+o.hoverClass,this).add(this).not(not).removeClass(o.hoverClass)
          .find('>ul').hide().css('visibility','hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        $ul = this.addClass(o.hoverClass)
          .find('>ul:hidden').css('visibility','visible');
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ o.onShow.call($ul); });
      return this;
    }
  });

})(jQuery);