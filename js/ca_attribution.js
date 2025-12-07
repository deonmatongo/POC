/**
* Custom URL - Distributor tracking.
*/
/**
* Get Parameter from URL
*/
function getURLParameterByName(param_name) {
    param_name = param_name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param_name + "=([^&#]*)",'i'),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Attribution paramters.
var utm_campaign = getURLParameterByName('utm_campaign');
var utm_source = getURLParameterByName('utm_source');
var utm_medium = getURLParameterByName('utm_medium');
var utm_content = getURLParameterByName('utm_content');
var utm_term = getURLParameterByName('utm_term');

if(utm_campaign || utm_source || utm_medium || utm_content || utm_term) {
	setAttributionCookie('utm_campaign',utm_campaign ,9999) //Set Cookie
	setAttributionCookie('utm_source',utm_source ,9999) //Set Cookie
	setAttributionCookie('utm_medium',utm_medium ,9999) //Set Cookie
	setAttributionCookie('utm_content',utm_content  ,9999) //Set Cookie
	setAttributionCookie('utm_term',utm_term ,9999) //Set Cookie
}

	/**
	* Get Main Domain
	*/
	function getMainDomain() {
	   var i=0,currentdomain=document.domain,p=currentdomain.split('.'),s='_gd'+(new Date()).getTime();
	   while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
		  currentdomain = p.slice(-1-(++i)).join('.');
		  document.cookie = s+"="+s+";domain="+currentdomain+";";
	   }
	   document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+currentdomain+";";
	   return currentdomain;
	}
	/**
	* Set distributor cookie
	*/
	function setAttributionCookie(cookie_name,cookie_value,days){
			var today = new Date();
			today.setTime(today.getTime() + (days*24*60*60*1000)); //Set cookie expiry time 
			var expires = "expires="+today.toGMTString();
			document.cookie = cookie_name + "=" + decodeURIComponent(cookie_value)+";"+expires+";path=/;domain=."+getMainDomain();
	}

	/**
	* Get Distributor cookie stored value
	*/
	function getAttributionCookie(cookie_name) {
		var name = cookie_name + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
     if(typeof(MktoForms2) != 'undefined') { //If Marketo Form exists on landing page.
		utm_campaign = getAttributionCookie('utm_campaign');
		utm_source = getAttributionCookie('utm_source');
		utm_medium = getAttributionCookie('utm_medium');
		utm_content = getAttributionCookie('utm_content');
		utm_term = getAttributionCookie('utm_term');
		if(utm_campaign || utm_source || utm_medium || utm_content || utm_term){
		
		MktoForms2.whenReady(function (form) {	 
				if(utm_campaign) {
					form.addHiddenFields({'utmcampaign' : utm_campaign });
				}else{
					form.addHiddenFields({'utmcampaign' : 'none' });
				}
				if(utm_source){
					form.addHiddenFields({'utmsource' : utm_source });
				}else{
					form.addHiddenFields({'utmsource' : 'none' });
				} 
				if(utm_medium){				
					form.addHiddenFields({'utmmedium' : utm_medium });
				}else{
					form.addHiddenFields({'utmmedium' : 'none' });
				}
				if(utm_content){
					form.addHiddenFields({'utmcontent' : utm_content });
				}else{
					form.addHiddenFields({'utmcontent' : 'none' });
				} 
				if(utm_term){							
					form.addHiddenFields({'utmterm' : utm_term });
				}else{
					form.addHiddenFields({'utmterm' : 'none' });
				}
				form.onSuccess(function(success){ //Clear Cookie 
						setAttributionCookie('utm_campaign','',-1) //Delete cookie
						setAttributionCookie('utm_source','',-1) //Set Cookie
						setAttributionCookie('utm_medium','',-1) //Set Cookie
						setAttributionCookie('utm_content','',-1) //Set Cookie
						setAttributionCookie('utm_term','',-1) //Set Cookie
				})
		});		
	}
}	
