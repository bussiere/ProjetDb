(function(){var e=document,b,a=(e.location.protocol=="https:"?"https":"http"),c=(a=="https"?"https://info.betteradvertising.com/c/betrad/pub/":"http://cdn.betrad.com/pub/");e.getElementById("_bapw-icon").src=c+"icon1.png";e.getElementById("_bapw-link").onclick=function(){var f=this;function d(i,l){var j=e.getElementsByTagName("head")[0]||e.documentElement,h=false,g=e.createElement("script");function k(){g.onload=g.onreadystatechange=null;j.removeChild(g);l()}g.src=i;g.onreadystatechange=function(){if(!h&&(this.readyState=="loaded"||this.readyState=="complete")){h=true;k()}};g.onload=k;j.insertBefore(g,j.firstChild)}this.onclick="return false";d(a+"://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js",function(){d(c+"pub1.js",function(){BAPW.i(f,{pid:8,ocid:660},false)})});return false};b=e.createElement("img");b.src=a+"://l.betrad.com/pub/p.gif?pid=8&ocid=660&ii=1&r="+Math.random();b.height="1";b.width="1";e.body.appendChild(b)}());