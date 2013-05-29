<!--

// ----------------------------------------------
// Constants and Globals
// ----------------------------------------------

//set any globals here
var ordnum = "1";


// ----------------------------------------------
// Initialize
// ----------------------------------------------

function wnInit () {

	//set 8-digit random number to be used in ads
	for(var o=0;o < 7;o++) {
		ordnum = ordnum + Math.floor((Math.random()*10));
	}

}


//call init function to execute things when this page loads
wnInit();


// ----------------------------------------------
// Dart Ad functions
// ----------------------------------------------

function BuildDartAd (server, site, page, width, height, tile, pos, tags) {
	var ad
	//set some defaults
	if (!server) server = "ln.doubleclick.net";
	if (!site) site = "wn.ln";
	if (!page) page = "business";
	if (!width) width = 468;
	if (!height) height = 60;
	if (!tile) tile = 1;
	if (!pos) pos = 1;
	if (!tags) tags = "!category=adult;";
	//write the ad
	ad = '<iframe src="' + BuildDartUrl("adi", server, site, page, width, height, tile, pos, tags) + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no" frameborder="0">';
	ad = ad + '<a href="' + BuildDartUrl("jump", server, site, page, width, height, tile, pos, tags) + 'target="_top">';
	ad = ad + '<img width="' + width + '" height="' + height + '" src="' + BuildDartUrl("ad", server, site, page, width, height, tile, pos, tags) + '" alt="Advertisement" /></a>';
	ad = ad + '</iframe>';
	document.write(ad);
}

function BuildDartUrl (type, server, site, page, width, height, tile, pos, tags) {
   	var dartUrl = 'http://'+server+'/'+ type+'/'+site+'/'+page+';'+tags+'sz='+width+'x'+height+';ptile='+tile+';pos='+pos+'ord='+ordnum;
	return dartUrl;
}

// ----------------------------------------------
// 24/7 Ad functions
// ----------------------------------------------


function BuildAd (server, site, page, width, height, listpos, position, category, target) {

	var ad;
	var ad_debug;

	//write the ad
	ad = '<iframe src="' + BuildAdUrl("frame", server, site, page, width, height, listpos, position, category, target) + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no" frameborder="0">';
	ad = ad + '<a href="' + BuildAdUrl("click", server, site, page, width, height, listpos, position, category, target) + ' target="_top">';
	ad = ad + '<img width="' + width + '" height="' + height + '" src="' + BuildAdUrl("image", server, site, page, width, height, listpos, position, category, target) + '" alt="Advertisement" /></a>';
	ad = ad + '</iframe>';

	document.write(ad);

	//ad_debug = true;
	if (ad_debug) {
		var debugad = ad;
		debugad = debugad.replace(/</g,"\&lt;");
		debugad = debugad.replace(/>/g,"\&gt;");
		document.write(debugad);
	}
	
}

function BuildAdUrl (type, server, site, page, width, height, listpos, position, category, target) {

	var adUrlType;
	var adUrl;

	//ad type
	if (type == "frame") {
		adUrlType = "adstream_sx.ads";
	} else if (type == "click") {
		adUrlType = "click_nx.ads";
	} else if (type == "image") {
		adUrlType = "adstream_nx.ads";
	}

	//build var
	adUrl = "http://"+server+"/"+adUrlType+"/"+site+"/"+page+"/ron/"+category+"/"+target+"/a/1"+ordnum+"@"+listpos+"!"+position;	
	
	return adUrl;

}



// ----------------------------------------------
// Google Ad functions
// ----------------------------------------------


function google_ad_request_done (google_ads) {

	var i;
	var item;
	var x = 0;

	//handle inputs
	if (typeof google_ads == "undefined") return null;

	//cycle through the elements and build the ad elements
	for (i = 0; i < google_ads.length; i++) {
		item = '';
		item += '<td><a href="' + google_ads[i].url + '" onmouseover="sb(\'Go to ' + google_ads[i].visible_url + '\');return true;" onmouseout="sb(\'\');return true;">';
		item += '<span class="google_head">' + google_ads[i].line1 + '</span><br />';
		item += '<span class="google_body">';
		item += google_ads[i].line2 + '<br />';
		item += google_ads[i].line3 + '<br />';
		item += '</span>';
		item += '<span class="google_link">' + google_ads[i].visible_url + '</span></a>';
		item += '</td>';

		//add to the array
		GoogleAds[x] = item;
		x++;
	}


}

function RenderGoogleAd (style) {

	var retval;

	if (GoogleAds.length == 0) return null;
	if (!style) style = "v";

	retval = '<table>';
	retval += '<caption>' + BuildGoogleFBUrl(google_ads) + '</caption>';
	if (style == "v") {
		retval += "<tr>" + GoogleAds.join("</tr><tr>") + "</tr>";
	} else {
		retval += "<tr>" + GoogleAds.join("") + "</tr>";
	}
	retval += '</table>';
	
	document.write(retval);

}


function BuildGoogleFBUrl (google_ads) {

	var i;
	var item;
	var x = 0;
	var retval;
	var url;

	//handle inputs
	if (typeof google_ads == "undefined") return "Ads by Google";
	
	url = 'http://pagead2.googlesyndication.com/pagead/userfeedback?url=www.wired.com&amp;hl=en';
	for (i = 0; i < google_ads.length; i++) {
		url += '&amp;adU=' + escape(google_ads[i].visible_url);
		url += '&amp;adT=' + escape(google_ads[i].line1);
	}
	url += '&amp;done=1';

	retval = '<a href="'+url+'" onmouseover="sb(\'User Feedback\');return true;" onmouseout="sb(\'\');return true;">Ads by Google</a>';
	return retval;

}




// ----------------------------------------------
// StyleSwitcher functions written by Paul Sowden
// http://www.idontsmoke.co.uk/ss/
// - - - - - - - - - - - - - - - - - - - - - - -
// For the details, visit ALA:
// http://www.alistapart.com/stories/alternate/
//
// nifty StyleSwitcher scripts modified by Aaron Jones 10/10/2002
// ----------------------------------------------

function setActiveStyleSheet(title, reset) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
  if (reset == 1) {
	  createCookie("wstyle", title, 365);
  }
}

function setStyle() {
	var style = readCookie("wstyle");
	if (style != null) {
		setActiveStyleSheet(style, 0);
	}
}


// ----------------------------------------------
// Window functions
// ----------------------------------------------

function popChild(url, width, height, winName) {
  var features = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=" + width + ",height=" + height;
  if (winName == "") {
  	winName = "childWin";
  }
  SmallWin = window.open(url,winName,features);
  if (window.focus) {
    SmallWin.focus();
  }
}

// ----------------------------------------------

function loadParent(url) {
  var parentWin = window.opener
  if (window.opener.closed) {
    window.open(url,"parentWin");
  } else {
    parentWin.location = url;
    if (window.focus) {
      parentWin.focus();
    }
  }
}

// ----------------------------------------------

function sb(stxt) {
	window.status = stxt;
}


// ----------------------------------------------
// Cookie functions
// ----------------------------------------------

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = ";expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+";domain=.wired.com;path=/;";
}

// ----------------------------------------------

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}


// ----------------------------------------------
// Date functions
// ----------------------------------------------

function isValidDay(iMonth, iDay, iYear) {

	//if selected exceeds max days in the month, returns max

	//set the days of the month array
	var aMonthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

	//if it's a leap year, add a day to feb
	if (iYear%4 == 0) {
		aMonthDays[1] = 29;
	}

	var iMonthIndex = iMonth-1;
	var iMaxDays = aMonthDays[iMonthIndex];
	
	//if the day exceeds the max, return the max
	if (iDay > iMaxDays) {
		return iMaxDays;
	} else {
		return iDay;
	}

}


//-->
