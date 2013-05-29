jQuery(function(){initPage();})

jQuery(document).ready(function(){
  var currentswitch = 1;
  var nextswitch = 2;
  var interval = 1
  jQuery('.switcher li a').hover(function(){
           clearInterval(interval);
           jQuery(this).parent().addClass('active');
           jQuery(this).parent().siblings().removeClass('active');
           jQuery('#' + jQuery(this).parent().attr('id') + '-c').show();
           jQuery('#' + jQuery(this).parent().attr('id') + '-c').siblings().hide();
          if(currentswitch != parseInt(jQuery(this).parent().attr('id').split("-")[1]))
           {
            currentswitch = parseInt(jQuery(this).parent().attr('id').split("-")[1]);
            nextswitch = (currentswitch + 1) % 5;
            return false;
           }
  });
  function nextSwitch() {
    jQuery('.switcher').find('#switch-' + nextswitch).addClass('active').siblings().removeClass('active');
    jQuery('#switch-' + nextswitch + '-c').show().siblings().hide();
    currentswitch = nextswitch;
    nextswitch = currentswitch+ 1;
    if(nextswitch == 6) { nextswitch = 1}
  }
  interval = setInterval(function() {
    nextSwitch();}, 6000);
});


function initNavIndexes()
{
	var nav = document.getElementById("nav");
	if(nav) {
		var lis = nav.getElementsByTagName("a");
		for (var i=0; i<lis.length; i++) {
			lis[i].style.zIndex = i+1;
			//lis[i].style.zIndex = lis.length-i;
		}
	}
}
function initPage()
{
	clearFormFields({
		clearInputs: true,
		clearTextareas: true,
		passwordFieldText: false,
		addClassFocus: "focus",
		filterClass: "default"
	});
	initNavIndexes();
}
function clearFormFields(o)
{
	if (o.clearInputs == null) o.clearInputs = true;
	if (o.clearTextareas == null) o.clearTextareas = true;
	if (o.passwordFieldText == null) o.passwordFieldText = false;
	if (o.addClassFocus == null) o.addClassFocus = false;
	if (!o.filterClass) o.filterClass = "default";
	if(o.clearInputs) {
		var inputs = document.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++ ) {
			if((inputs[i].type == "text" || inputs[i].type == "password") && inputs[i].className.indexOf(o.filterClass) == -1) {
				inputs[i].valueHtml = inputs[i].value;
				inputs[i].onfocus = function ()	{
					if(this.valueHtml == this.value) this.value = "";
					if(this.fake) {
						inputsSwap(this, this.previousSibling);
						this.previousSibling.focus();
					}
					if(o.addClassFocus && !this.fake) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				inputs[i].onblur = function () {
					if(this.value == "") {
						this.value = this.valueHtml;
						if(o.passwordFieldText && this.type == "password") inputsSwap(this, this.nextSibling);
					}
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
				if(o.passwordFieldText && inputs[i].type == "password") {
					var fakeInput = document.createElement("input");
					fakeInput.type = "text";
					fakeInput.value = inputs[i].value;
					fakeInput.className = inputs[i].className;
					fakeInput.fake = true;
					inputs[i].parentNode.insertBefore(fakeInput, inputs[i].nextSibling);
					inputsSwap(inputs[i], null);
				}
			}
		}
	}
	if(o.clearTextareas) {
		var textareas = document.getElementsByTagName("textarea");
		for(var i=0; i<textareas.length; i++) {
			if(textareas[i].className.indexOf(o.filterClass) == -1) {
				textareas[i].valueHtml = textareas[i].value;
				textareas[i].onfocus = function() {
					if(this.value == this.valueHtml) this.value = "";
					if(o.addClassFocus) {
						this.className += " " + o.addClassFocus;
						this.parentNode.className += " parent-" + o.addClassFocus;
					}
				}
				textareas[i].onblur = function() {
					if(this.value == "") this.value = this.valueHtml;
					if(o.addClassFocus) {
						this.className = this.className.replace(o.addClassFocus, "");
						this.parentNode.className = this.parentNode.className.replace("parent-"+o.addClassFocus, "");
					}
				}
			}
		}
	}
	function inputsSwap(el, el2) {
		if(el) el.style.display = "none";
		if(el2) el2.style.display = "inline";
	}
}

function OpenImageWindow(querystring, winWidth, winHeight){LeftPosition=(winWidth)?(winWidth) : 0;TopPosition=(winHeight)?(winHeight): 0;NewWinWidth=LeftPosition;NewWinHeight=TopPosition;NewWinWidth=(NewWinWidth>screen.availWidth-60)?screen.availWidth-60:NewWinWidth;NewWinWidth=750;NewWinHeight=(NewWinHeight>screen.availHeight-60)?screen.availHeight-60:NewWinHeight;settings='menubar=no,scrollbars=yes,resizable,height='+NewWinHeight+',width='+NewWinWidth;hWin=window.open(querystring,"ImagePopup",settings,false);hWin.focus();if(hWin.opener==null)hWin.opener=self;}