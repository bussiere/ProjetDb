//-------------------------------------------------
//		youtube playlist jquery plugin
//		Created by dan@geckonm.com
//		www.geckonewmedia.com
//
//		Modified by Andrew Ensley
//		andrewensley.com
//-------------------------------------------------
(function($){
	$.fn.ytplaylist = function(options){
		// default settings
		var options = $.extend({
				holderId: 'ytvideo',
				playerHeight: '385',
				playerWidth: '480',
				embedParams: '',
				showInline: false
			}, options);
		return this.each(function(){
			var selector = $(this);
			//throw a youtube player in
			function play(id)
			{
				return '<iframe width="' + options.playerWidth + '" height="' + options.playerHeight
					+ '" src="//www.youtube.com/embed/' + id + '?' + options.embedParams
					+ '" frameborder="0" allowfullscreen></iframe>';
			};
			//grab a youtube id from a url (thanks to http://jquery-howto.blogspot.com/2009/05/jyoutube-jquery-youtube-thumbnail.html)
			function youtubeid(url) {
				var ytid = url.match('[\\?&]v=([^&#]*)');
				/*var ytid = url.match('/v/([^&#]*)');*/
				ytid = ytid[1];
				return ytid;
			};
			//load inital video
			var firstVid = selector.children('li:first-child').addClass('currentvideo').children('a').attr('href');
			$('#' + options.holderId).html(play(youtubeid(firstVid)));
			//load video on request
			selector.children('li').children('a').click(function(e){
				var $this = $(this);
				if(options.showInline){
					$('li.currentvideo').removeClass('currentvideo');
					$this.parent('li').addClass('currentvideo').html(play(youtubeid($this.attr('href'))));
				}
				else{
					$('#' + options.holderId).html(play(youtubeid($this.attr('href'))));
					$this.parent().parent('ul').find('li.currentvideo').removeClass('currentvideo');
					$this.parent('li').addClass('currentvideo');
				}
				e.stopPropagation();
				return false;
			});
		});
	};
})(jQuery);
