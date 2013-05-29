function addLoadEvent(func) {
          var oldonload = window.onload;
          if (typeof window.onload != 'function') 
          {
            window.onload = func;
          } 
          else 
          {
            window.onload = function() 
            {
            oldonload();
            func();
            };
          }
        }

function setShellBG()
{
    var shellEl = "";
    if ( document.getElementById("shell") != null )
    {
        shellEl = document.getElementById("shell");
        shellEl.style.background = '#000';
    } 
}

// addLoadEvent(setShellBG);

   
/* begin common cookie functions.  see http://techweb/javascript_commons/docs/cookies.html for documentation. */
/* Set cookie value */
function setCookie(name, value, escapeValue, expires, path, domain, secure) {

	var cookieToken = name + '=' + ((escapeValue) ?  escape(value) : value) + ((expires) ? '; expires=' + expires.toGMTString() : '') + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + ((secure) ? '; secure' : '');
	document.cookie = cookieToken;

}

/* Get cookie value */
function getCookie(name) {
	var allCookies = document.cookie;
	
	var cookieName = name + "=";
	var start = allCookies.indexOf("; " + cookieName);
	
	if (start == -1) {
		start = allCookies.indexOf(cookieName);
		if (start != 0) return null;
	}
	else start += 2;
	
	var end = document.cookie.indexOf(";", start);
	if (end == -1) end = allCookies.length;
	
	return unescape(allCookies.substring(start + cookieName.length, end));
}

/* Delete a cookie */
function deleteCookie(name, path, domain) {
	var value = getCookie(name);
	if (value != null) document.cookie = name + '=' + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
	return value;
}

/* Test for cookie support */
function verifyCookieSafe() {
	setCookie('pingCookies', 'hello');
	if (getCookie('pingCookies')) return true;
	else return false;
}

/* end common cookie functions. */

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
	  setCookie("wstyle", title, 365); 
  }
}

function setStyle() {
	var style = readCookie("wstyle");
	if (style != null) {
		setActiveStyleSheet(style, 0);
	}
}


 /* cache css bg images for IE6 */
if ( document.all )
{  
    try {
      document.execCommand("BackgroundImageCache", false, true);
    } catch(err) {}
}


/* Parses URL Pathname 
        Author: Jamie L. Marin, Senior Web Developer 
        Date: June !5, 2005 
*/ 

/* Sets varibles for URI pathname and pathname length */ 
var browserURI = location.pathname; 
var uriLength = browserURI.length; 

/* Creates Array */ 
var directories = new Array( ); 

/* Find out indexes of first, next, and last slashes */ 
var startSlash = browserURI.indexOf('/'); 
var nextSlash =  browserURI.indexOf('/', startSlash + 1); 
var lastSlash = browserURI.lastIndexOf('/'); 
var slashCount = 0; 

/* test for one deep section */ 
if (startSlash == lastSlash) 
{ 
        directories[slashCount] = location.pathname.slice(startSlash + 1); 
} 


/* Loop to define sections from 1 to N */ 
while (startSlash != lastSlash || nextSlash != -1) 
{ 
        directories[slashCount] = location.pathname.substring(startSlash + 1,nextSlash);        
        
        if (lastSlash + 1 != uriLength) 
                directories[slashCount +1] = browserURI.slice(nextSlash + 1); 
                
        startSlash = nextSlash; 
        nextSlash =  browserURI.indexOf('/', startSlash + 1);           
        slashCount++;   
} 

var paths = new Array( ); 

function parsePath(path) { 
    var pathLength = path.length;    
    
    var sSlash = path.indexOf('/'); 
    var nSlash =  path.indexOf('/', sSlash + 1); 
    var lSlash = path.lastIndexOf('/'); 
    var sCount = 0; 
    
    if (sSlash == lSlash) 
    { 
        paths[sCount] = path.slice(sSlash + 1); 
    }    
    
    /* Loop to define sections from 1 to N */ 
    while (sSlash != lSlash || nSlash != -1) 
    { 
        paths[sCount] = path.substring(sSlash + 1,nSlash);      
        
        if (lSlash + 1 != pathLength) 
                paths[sCount +1] = path.slice(nSlash + 1); 
                
        sSlash = nSlash; 
        nSlash =  path.indexOf('/', sSlash + 1);                
        sCount++;       
    }    

} 

/* Set User Friendly Variables */ 
var firstDir = directories[0]; 
var lastDir = directories[directories.length-1]; 

/* set Omni-friendly path */ 
var omniHierarchy = ""; 
for (var i=0; i<directories.length; i++) { 
    omniHierarchy += directories[i]; 
    if (i != directories.length - 1) 
        omniHierarchy += ","; 
} 

var setPageType = "";
var setProp1 = "";
var setProp2 = "";
var setProp3 = "";
var setProp5 = "";
var setProp6 = ""; 
var setProp7 = ""; 
var setProp8 = ""; 
var setProp9 = ""; 

var setEvents = "";

if (directories[0] == "") {
    setProp6 = "homepage"; 
    omniHierarchy = "homepage"; 
}
if (directories.length >= 1 && directories[0] != "") 
    setProp6 = directories[0]; 
if (directories.length >= 2) 
    setProp7 = setProp6 + '/' + directories[1]; 
if (directories.length >= 3) 
    setProp8 = setProp7 + '/' + directories[2];    
if (directories.length >= 4) 
    setProp9 = setProp8 + '/' + directories[3];    
    
function setProps() { 
    setProp6 = ""; 
    setProp7 = ""; 
    setProp8 = ""; 
    setProp9 = ""; 
    if (paths.length >= 1 && paths[0] != "") 
    setProp6 = paths[0]; 
    if (paths.length >= 2) 
        setProp7 = setProp6 + '/' + paths[1]; 
    if (paths.length >= 3) 
        setProp8 = setProp7 + '/' + paths[2];    
    if (paths.length >= 4) 
        setProp9 = setProp8 + '/' + paths[3]; 
} 

function trackData(evnt) {
    s.linkTrackVars="events";
    s.linkTrackEvents=evnt;
    s.events=evnt;
    s.tl(this,'o','AjaxCall');
}


/*UTILITY FUNCTIONS*/
var cnp = window.cnp || {};
cnp.util = {};
cnp.util.getElements = function(classname, tagname, root){
	var all, elements, element;
	if(!root){
		root = document;
	}
	else if(typeof root == "string"){
		root = document.getElementById(root);
	}
	if(!tagname){
		tagname = "*";
	}
	all = root.getElementsByTagName(tagname);
	if(!classname){
		return all;
	}
	elements = [];
	for(var i = 0; i < all.length; i++){
		element = all[i];
		if(cnp.util.isMember(element,classname)){
			elements.push(element)
		}
	}
	return elements;
};
cnp.util.isMember = function(element, classname){
	var classes, whitespace, c; 
	classes = element.className;
	if(!classes){
		return false;
	}
	if(classes == classname){
		return true;
	}
	whitespace = /\s+/;
	if (!whitespace.test(classes)){
		return false;
	}
	c = classes.split(whitespace);
	for(var i = 0; i < c.length; i++){
		if (c[i] == classname){
			return true;
		}
	}
	return false;
};
cnp.util.makeElement = function(args){
	var element;
	var tagName = args.tagName;
	var attributes = args.attributes;
	var children = args.children; 
	element = document.createElement(tagName);
	if(attributes){
		for(var prop in attributes){
			if(attributes.hasOwnProperty(prop)){
				element[prop] = attributes[prop];
			}
		}
	}
	if(children){
		for(var i=0; i<children.length; i++){
			element.appendChild( children[i]);
		}
	}
	return element;
};
cnp.util.isDescendant= function(ancestor, descendant){
	if(!ancestor || !descendant) return;
	try{
		var similarDescendants = ancestor.getElementsByTagName(descendant.nodeName);
		for(var i=0; i<similarDescendants.length; i++)
			if( similarDescendants[i] == descendant ) return true;
	}catch(e){
		//console.dir(e);
	}
	return false;
};
cnp.util.getAncestors = function(element){
	var parents = new Array( );
	while( element.parentNode ){
		if( element.parentNode.nodeType == 1 )
			parents.push(element.parentNode);
			element = element.parentNode;
	}
	return parents;
};
cnp.util.getOffsetParents = function(element){
	var offsetParents = new Array( );
	while( element.offsetParent ){
		if( element.offsetParent.nodeType == 1 )
			offsetParents.push(element.offsetParent);
			element = element.offsetParent;
	}
	return offsetParents;
};
cnp.SelectNavigator = function(element){
    this.element = element;
    this.element.onchange = function(){
        var destination = this.options[this.selectedIndex].value;
        if(destination.match(/http.*/)){ 
            window.open(destination);
        }
    }
};
cnp.SelectNavigationForm = function(form, select, submit){
    form.onsubmit = function(){
        var destination = select.options[select.selectedIndex].value;
        window.location = destination;
        return false;
    };
};

/*** GLOBAL HEADER ***/
DropdownMenu.OVER_CLASSNAME = " over";
DropdownMenu.OPEN_CLASSNAME = " open";
DropdownMenu.CURRENT_CLASSNAME = " active";
function DropdownMenu(delay, openFunc, closeFunc){
    this.delay = delay || 250;
    this.openFunc = openFunc;
    this.closeFunc = closeFunc;
    this.items = [];
    this.timerId = {};
    this.isActive = false;
    this.isDisplayed = false;
    this.handleEvents();
}
DropdownMenu.prototype = {
    handleEvents: function(){
        var dropdownMenu = this;
        document.onclick = function(){
            if(!dropdownMenu.isActive && dropdownMenu.isDisplayed){
                dropdownMenu.deactivateAll();
            }
        };
    },
    addList: function(list, triggerClassName, menuClassName){
        var triggerElement, menuElement;
        for(var i=0; i<list.childNodes.length; i++){
            if(list.childNodes[i].nodeName == 'LI'){
                triggerElement = cnp.util.getElements(triggerClassName, null, list.childNodes[i])[0];
                menuElement = cnp.util.getElements(menuClassName, null, list.childNodes[i])[0];
                this.items.push(new DropdownItem(list.childNodes[i], triggerElement, menuElement, this));
            }
        }
    },
    getItemById: function(listID){
        for(var i=0; i<this.items.length; i++){
            if(this.items[i].itemElement.id == listID){
                return this.items[i];
            }
        }
        return null;
    },
    activate: function(item){
        if(this.timerId){
            window.clearInterval(this.timerId);
        }
        this.deactivateAll();
        item.activate();
        this.setActive(true);
        this.setDisplayed(true);
    },
    deactivate: function(item, delay){
        var currentObj = this;
        this.timerId = window.setTimeout(
            function(){
                item.deactivate();
                currentObj.setDisplayed(false);
            }, 
        delay);
        this.setActive(false);
    },
    deactivateAll: function(){
        for(var i=0; i<this.items.length; i++){
            this.items[i].deactivate();
        }
    },
    setCurrentState: function(id){
        this.getItemById(id).setCurrentState();
    },
    isActive: function(){
        return this.isActive;
    },
    isDisplayed: function(){
        return this.isDisplayed;
    },
    setActive: function(isActive){
        this.isActive = isActive;
    },
    setDisplayed: function(isDisplayed){
        if(isDisplayed){
            this.isDisplayed = true;
        }
        else if(!this.isActive){
            this.isDisplayed = false;
        }
    }
};
function DropdownItem(itemElement, triggerElement, menuElement, composite){
    this.itemElement = itemElement;
    this.triggerElement = triggerElement;
    this.menuElement = menuElement;
    this.composite = composite;
    this.delay = this.composite.delay;
    this.init();
}
DropdownItem.prototype = {
    init: function(){
        var instance = this;
        this.itemElement.onmouseover = function(event){instance.handleItemMouseOver(event);}
        this.itemElement.onmouseout = function(event){instance.handleItemMouseOut(event);}
    },
    handleItemMouseOver: function(event){
        var evt, prevElement;
        evt = event || window.event;
        prevElement = evt.relatedTarget || evt.fromElement;
        if(prevElement != this.itemElement && !cnp.util.isDescendant(this.itemElement,prevElement)){
            this.composite.activate(this);
        }
    },
    handleItemMouseOut: function(event){
        var evt, nextElement;
        evt = event || window.event; 
        nextElement = evt.relatedTarget || evt.toElement;
        if(nextElement != this.itemElement && !cnp.util.isDescendant(this.itemElement,nextElement)){
            this.composite.deactivate(this, this.delay);
        }
    },
    activate: function(event){
        if(this.menuElement){
            this.setAncestorZIndex('1000');
            this.menuElement.className += DropdownMenu.OPEN_CLASSNAME;
        }
        if(this.triggerElement){
            this.triggerElement.className += DropdownMenu.OVER_CLASSNAME;
        }
        if(this.composite.openFunc){
            this.composite.openFunc();
        }
    },
    deactivate: function(event){
        if(this.menuElement){
            this.setAncestorZIndex('');
            this.menuElement.className = this.menuElement.className.replace(DropdownMenu.OPEN_CLASSNAME, '');
        }
        if(this.triggerElement){
            this.triggerElement.className = this.triggerElement.className.replace(DropdownMenu.OVER_CLASSNAME, '');
        }
        if(this.composite.closeFunc){
            this.composite.closeFunc();
        }
    },
    setAncestorZIndex: function(value){
        var ancestors = cnp.util.getAncestors(this.menuElement);
        for(var i=0; i<ancestors.length; i++){
            ancestors[i].style.zIndex = value;
        }
    },
    setCurrentState: function(){
        this.triggerElement.className += DropdownMenu.CURRENT_CLASSNAME;
    },
    getDelay: function(){
        return this.delay;
    },
    setDelay: function(delay){
        this.delay = delay;
    },
    getComposite: function(){
        return this.composite;
    },
    setComposite: function(composite){
        this.composite = composite;
    }
};

/*  Global Nav Specific
***********************/
 var globalNav = {
     init: function(subId, menu){
         this.menu = menu;
         this.subId = subId;
         this.setupSubItem();
         this.initSearch();
         this.initSignIn();
     },
     setupSubItem: function(){
        var subItem, closeBtn, gNav = this;
        subItem = this.menu.getItemById(this.subId);
        subItem.setDelay("1000");
        closeBtn = document.createElement('A');
        closeBtn.id = 'gh_close_sub_flyout';
        closeBtn.onclick = function(){gNav.menu.deactivate(subItem)};
        subItem.menuElement.appendChild(closeBtn);
     },
     initSearch: function(){
        /*legacy search validation*/
        var searchForm = document.getElementById('gs_search_form');
        if( location.href.indexOf('blog.wired') != -1 ){
            searchForm.action = "http://www.wired.com/search";
        }
        searchForm.onsubmit = function(){
            if(this.elements["query"].value == ""){
                return false;
            }else{
                if(document.getElementById('gs_siteAlias').value == 'bc_video'){
                    location.href = "http://www.wired.com/video/search/" + this.elements["query"].value;
                    return false;
                }
                return true;
            }
        };
        /*go button rollover*/
        var submitBtn = document.getElementById('gs_submit');
        submitBtn.onmouseover = function(){this.src = 'http://www.wired.com/images/global_header/submit_over.gif';};
        submitBtn.onmouseout = function(){this.src = 'http://www.wired.com/images/global_header/submit.gif';};
        var pImg = new Image();
        pImg.src= "http://www.wired.com/images/global_header/submit_over.gif";
     },
     initSignIn: function(){
        var elem = document.getElementById("gh_greeting");
        if(elem){
            var siText = "Sign In";
            var siHref = "/user/login";
            if(isLogged()){
                siText = "Sign Out";
                siHref = "/user/logout";
                elem.appendChild(
                    cnp.util.makeElement({
                        tagName: "SPAN", 
                        attributes:{className: "gh_username", innerHTML: "Hi, " + getUserName() + "&nbsp;&#124;&nbsp;"},
                        children:[]
                    })
                );
            }
            if( location.href.indexOf('blog.wired')!=-1){
                siHref = "http://www.wired.com" + siHref;
            }
            elem.appendChild(
                cnp.util.makeElement({
                    tagName: "A", 
                    attributes:{innerHTML: siText, href: siHref},
                    children:[]
                })
            );
            elem.innerHTML += "&nbsp;&#124;";
        }
        function isLogged(){
            return (document.cookie.indexOf("wired_reddit=") != -1);
        }
        function getUserName(){
            return getCookie("amg_user_info");
        }    
     }
};
(function(){
	var listElement, menu;
	listElement = document.getElementById('pnav_list');
	menu = new DropdownMenu('350');
	menu.addList(listElement, 'primaryLink', 'dropdownMenu');
	globalNav.init("pn_subscribe_a", menu);
})();

//Setup Navigation Selects
addLoadEvent(
    function(){
        var $ = function(id){return document.getElementById(id) || false;}
        
        //Set up Select elements in footer to link to pages (in option values) in a new window
        var footerSelects = $('drop_downs').getElementsByTagName('SELECT');
        for(var i=0; i<footerSelects.length; i++){
            var select = new cnp.SelectNavigator(footerSelects[i]);
        }
        if($('browse_issue_form')){
            var issueForm = new cnp.SelectNavigationForm($('browse_issue_form'), $('browse_issue_select'), $('browse_issue_submit'));
        }
    }
);
