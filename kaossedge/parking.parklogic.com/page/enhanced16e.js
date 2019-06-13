// Parklogic Enhance SMP - version 1.19 (smoke.parklogic.com)

function include(file) {
	var script  = document.createElement('script');
	script.src  = file;
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}


// Returns an associative array of the parameters found in the given url.
function getParametersFromUrl(url) {
	var parameters = new Array();
	var urlSplit = url.split("?");
	if (urlSplit.length > 1) {
		var pArray = urlSplit[1].split("&");
		for (var i = 0; i < pArray.length; i++) {
			var kvArray = pArray[i].split("=");
			parameters[kvArray[0]] = kvArray[1];
		}
	}
	return parameters;
}


function getParameters() {
	var plScript = document.getElementById("parklogic");
	var parameters = getParametersFromUrl(plScript.src);
	return parameters;
}


function forSaleBanner(parameters) {
	var plBanner = document.getElementById("plBanner");
	var forSaleNonLinkText = parameters["forSaleNonLinkText"];
	var forSaleLinkText = parameters["forSaleLinkText"];
	var forSaleUrl = parameters["forSaleUrl"];
	if (typeof plBanner !== 'undefined' && plBanner !== null) {  // Cname 
		document.write('<p style="margin: 0px; text-align: center; color: #000000; font-family: Arial, san-serif; font-size: 16px; padding: 0.6em 0.8em">' + forSaleNonLinkText + ' &nbsp;<a href="' + forSaleUrl + '" target="_blank" style="color: blue">' + forSaleLinkText + '</a></p>');
		plBanner.style.margin = "0px 0px 0px 0px";
		plBanner.style.backgroundColor = "#00ff00";
		plBanner.style.verticalAlign = "middle";
	} else {  // Iframe
		document.write('<div style="position:fixed; margin: 0px 0px 0px 0px; bottom:0px; left:0px; width:100%; height:24px; background: #003366; z-index: 100; overflow: hidden"> <div style="position:absolute; margin: 0px 0px 0px 0px; bottom:0px; left:0px; width:100%; height:23px; background: #ddeeff; z-index: 100; overflow: hidden"> <p align="center" style="margin-top: 1px; font-family: arial; font-size: medium; color: black">&nbsp;&nbsp;' + forSaleNonLinkText + ' &nbsp;<a href="' + forSaleUrl + '" style="color: #003366" target="_blank">' + forSaleLinkText + '</a></p> </div> </div>');
	}
}

var parameters = getParameters();
parameters['portfolioId'] = 200;
parameters['forSaleNonLinkText'] = 'This domain may be for sale.  ';
parameters['forSaleLinkText'] = 'Click here for more info.';
parameters['forSaleUrl'] = 'https://marketplace.parklogic.com/smp/login/sales/viewNegotiation.jsp?domain=bannerswap.com';
forSaleBanner(parameters);
