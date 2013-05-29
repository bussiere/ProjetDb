var zdhint=(function() {
	
	var hint=document.referrer;
	var bDoHint=false;
	
	if (hint.indexOf("localhost")>-1 ||
		hint.indexOf("s3.amazonaws.com")>-1 || 
		hint.indexOf("google.com")>-1 || 
		hint.indexOf("bing.com")>-1 || 
		hint.indexOf("yahoo.com")>-1 || 
		hint.indexOf("aol.com")>-1 || 
		hint.indexOf("ask.com")>-1)  
	{
		document.write('<div id="hintad" style="height:60px;overflow:hidden;width:998px;display:none;margin:10px auto;"></div>');
		hint=hint.replace(/.*q=([^\&]+).*/g,"$1");
		if (hint.indexOf("http")>-1) {
			if (hint.indexOf("yahoo.com")>-1 && hint.indexOf("p=")>-1) {
				hint=hint.replace(/.*p=([^\&]+).*/g,"$1");
			}    
		}
		if (hint.indexOf("http")>-1) {
			hint=null;
			emulateSearchTerms(0);
		}
		else gotHint(hint,true);
	}
	
	function google_ad_request_done(google_ads) {
		var gadstr="";
		var i, number_google_ads=google_ads.length;
		if (google_ads.length > 0){
			gadstr+='<div class="abg_ad">';
			gadstr+='<div class="abg">Ads by Google</div>';
			for(i = 0; i < google_ads.length; ++i){
				tempvar = google_ads[i].line1;
				gadstr+='<p class="ad_title_large"><a href="'+google_ads[i].url+'" onMouseOver="return GOOGLEShowStatusInfo(\'' + escape(google_ads[i].visible_url) + '\')">'+google_ads[i].line1+'&nbsp;|&nbsp;';
				gadstr+='<a href="'+google_ads[i].url+'" onMouseOver="return GOOGLEShowStatusInfo(\'' + escape(google_ads[i].visible_url) + '\')">'+google_ads[i].visible_url+'</a></p>';
				gadstr+='<span class="ad_url"><a class="ad_url" href="' +  google_ads[i].url + '" onMouseOver="return GOOGLEShowStatusInfo(\'' + escape(google_ads[i].visible_url) + '\')">' + google_ads[i].visible_url +  '</a></span>';
				gadstr+='&nbsp;&nbsp;&nbsp;<a  class="ad_text" href="' +  google_ads[i].url + '">' +  google_ads[i].line2 + ' ' + google_ads[i].line3 +  '</a>';

			}
			gadstr+='</div>';
		}
		setTimeout(function() {
	     		var hintad=document.getElementById("hintad");
			if (hintad!=null) hintad.innerHTML=gadstr;
		},500);
	}
	
	
	/* -- IMPL SITE-SPECIFIC MECHANISMS FOR EMULATING SEARCH --*/
	function emulateSearchTerms(numcount) {
	     var breadcrumbs=findBreadcrumbs();
	     if (breadcrumbs==null && numcount<5) {
		numcount++;
		setTimeout(function(){emulateSearchTerms(++numcount);},500);   
		return;
	     }
	     else if (breadcrumbs!=null) {
		hint=ET_getHintFromBreadCrumbs(breadcrumbs);
		if (hint!=null) gotHint(hint,false);
	     }  
        if (hint==null) {
	     	var hintad=document.getElementById("hintad");
	     	if (hintad!=null) hintad.style.display="none";
	     }
	     return hint;
	}
	function findBreadcrumbs() {
	     var breadcrumbs=document.getElementById("breadcrumbs");
	     if (breadcrumbs==null) {
	     	var uls=document.getElementsByTagName("ul");
	     	for (var i=0;i<uls.length;i++) {
	     		var t=uls[i];
	     		var c=t.getAttribute("class");
	     		if (c==null) continue;
	     		if (c.indexOf("breadcrumbs")>-1) return t;
	     	}
	     }
	     else return breadcrumbs;
	     return null;
	}
	function ET_getHintFromBreadCrumbs(breadcrumbs) {
	     hint=null
	     var productName=null;
	   
	     if (typeof breadcrumbs=='undefined' || breadcrumbs==null) hint=null;
	     else {
		     var proditems = breadcrumbs.children;
		     if (typeof proditems!='undefined' && proditems!=null) { 
			var prodlen   = proditems.length;
			if (prodlen>0) {
				var bCapture=false;
				for (var i=0;i< prodlen-1;i++){

					var ank=proditems[i].childNodes[0];
					if (typeof ank=='undefined') continue;
					if (ank.href && ank.href.indexOf("reviews")>-1) bCapture=true;
					var val=proditems[i].childNodes[0].innerHTML;					
					if (bCapture) productName=((productName==null)?"":productName)+proditems[i].childNodes[0].innerHTML+" ";
				}	
				if (productName==null && !bCapture && prodlen>2) productName=proditems[prodlen-1].innerHTML;
				else if (bCapture) productName=productName+proditems[prodlen-1].innerHTML;				
				productName=productName.replace("&amp;","&");
				productName="best "+productName.replace(/[ ]+$/gi,"").toLowerCase();
			   }
		     }
		     if (productName!=null) hint=productName;
	     }
	     hint=hint.replace(/^[ ]+/gi,"").replace(/[ ]+$/gi,"");
	     hint=hint.replace(/\'/gi,"");
	     return hint;
	}	

	function gotHint(hint,bWriteNow) {
	     	var hintad=document.getElementById("hintad");
	     	if (hintad!=null) hintad.style.display="block";
		if (hint!=null) {
			hint=hint.replace(/^[ ]+/gi,"").replace(/[ ]+$/gi,"");
			if (hint=="") hint=null;
			if (hint!=null && hint!="" && hint.indexOf("http")!=0) {
				var gadstr="";
				gadstr+='<style>\n';
				gadstr+='.abg_ad ';
				gadstr+='{width:975px !important;text-align:left;font-weight:bold !important;font-family:arial !important;\n';
				gadstr+='text-decoration:none !important;font-size:14px  !important;color:#000000!important;background-color:#f9f9f9!important;padding:10px !important;}\n';
				gadstr+='.abg_ad p {padding:0px !important;margin:0px !important;}\n';
				gadstr+='.abg {float:right;color:#cdcdcd !important;font-size:12px !important;}\n';
				gadstr+='.ad_title {clear:both;font-weight:bold !important;}\n';
				gadstr+='a.ad_text {font-weight:bold !important;font-size:12px !important;color:#000000 !important;text-decoration:none !important;}\n';
				gadstr+='a.ad_url {font-weight:bold !important;font-size:12px !important;color:#898989 !important;text-decoration:none}\n';
				gadstr+='.ad_title_large a {text-decoration:none; color:#0064A0 !important;font-size:14px !important;font-weight:bold  !important;}\n';
				gadstr+='.ad_text_large {font-size:12px !important;color:#000000 !important; text-decoration:none;}\n';
				gadstr+='.ad_url_large\n';
				gadstr+='{font-size:12px !important;color:#008000 !important;text-decoration:none}\n';
				gadstr+='</style>\n';
				gadstr+='<scr'+'ipt type="text/javascript" language="JavaScript"><!--\n';
				if (!bWriteNow) {
					gadstr+=' function google_ad_request_done(google_ads) {\n';
					gadstr+='	var i=0;\n';
					gadstr+='	document.write(\'<div class="abg_ad">\');\n';
					gadstr+='	document.write(\'<div class="abg">Ads by Google</div>\');\n';			
					gadstr+='	document.write(\'<p class="ad_title_large"><a href="\'+google_ads[i].url+\'">\'+google_ads[i].line1+\'&nbsp;|&nbsp;\');\n';
					gadstr+='	document.write(\'<a href="\'+google_ads[i].url+\'" >\'+google_ads[i].visible_url+\'</a></p>\');\n';
					gadstr+='	document.write(\'<span class="ad_url"><a class="ad_url" href="\' +  google_ads[i].url + \'" >\' + google_ads[i].visible_url +  \'</a></span>\');\n';
					gadstr+='	document.write(\'&nbsp;&nbsp;&nbsp;<a  class="ad_text" href="\' +  google_ads[i].url + \'">\' +  google_ads[i].line2 + \' \' + google_ads[i].line3 +  \'</a>\');\n';
					gadstr+='	document.write(\'</div>\');\n';
					gadstr+=' }\n\n';
				}
				else {
					gadstr+=' function google_ad_request_done(google_ads) { zdhint.gard(google_ads);} \n';
				}
				gadstr+='	function GOOGLEShowStatusInfo(w){\n';
				gadstr+='		setTimeout("window.status = \\\'" + unescape(w) + "\\\';", 0);\n';
				gadstr+='		return true;\n';
				gadstr+='	}\n';
				gadstr+='	google_ad_client = \'ca-Ziffdavis-AFC_Top\';\n';
				gadstr+='	google_ad_channel = \'pcmag-hint\';\n';
				gadstr+='	google_ad_output = \'js\';\n';
				gadstr+='	google_max_num_ads = \'1\';\n';
				gadstr+='	google_ad_width = 100;\n';
				gadstr+='	google_ad_height = 30;\n';
				gadstr+='	google_ad_type = "text";\n';
				gadstr+='	google_color_border = "FFFFFF";\n';
				gadstr+='	google_color_bg = "FFFFFF";\n';
				gadstr+='	google_color_link = "003bb0";\n';
				gadstr+='	google_color_text = "000000";\n';
				gadstr+='	google_color_url = "003bb0";\n';
				gadstr+='	google_safe = \'high\';\n';
				gadstr+='	google_hints = \''+hint.replace(/%20/gi," ")+'\';\n';
				gadstr+='-->\n';
				gadstr+='</script>\n';
				gadstr+='<scr'+'ipt language="Java'+'Script" ';
				gadstr+='src="http://pagead2.googlesyndication.com/pagead/';
				gadstr+='show_ads.js">';
				gadstr+='</scr'+'ipt>';

				if (bWriteNow) 
					document.write(gadstr);
				else {
					var iframe=document.createElement("iframe");
					iframe.height="60";
					iframe.width="998";
					iframe.setAttribute("frameborder","0");
					iframe.setAttribute("marginheight","0");
					iframe.setAttribute("scrolling","no");
					iframe.setAttribute("marginwidth","0");
					document.getElementById("hintad").appendChild(iframe);
					var doc = iframe.contentDocument;
					if (doc == undefined || doc == null)
						doc = iframe.contentWindow.document;
					doc.open();
					doc.write("<body style=\"padding:0px;margin:0px;\">"+gadstr+"</body>");
					doc.close();
				}
			}	


		}
	}
	return {
		gard:google_ad_request_done
	}
})();