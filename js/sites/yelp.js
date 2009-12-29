var yelpCompoundHandler = function(url, host, path) {
  var handler;
  if (host.indexOf("www.") == 0 || path.indexOf('user_details') != -1 || path.indexOf('syndicate/user') != -1) {
     handler = nodemapper.createPathRegexpHandler("yelp.com", 
        /^(?:\/user_details\?userid=|\/syndicate\/user\/)([\w\-]+)/, 
        {keyName: "pk", casePreserve: 1});
  } else handler = nodemapper.createUserIsSubdomainHandler("yelp.com");
  return handler(url, host, path);
};

nodemapper.registerDomain("yelp.com", {
	name: "Yelp",
	urlToGraphNode: yelpCompoundHandler,
	pkRegexp: /^(?=\w)[\w-]{22}$/,
        identRegexp: /^[\w\-]+$/
	});
nodemapper.addSimpleHandler("yelp.com", "pk_to_rss", 
    "http://www.yelp.com/syndicate/user/", "/rss.xml");
nodemapper.addSimpleHandler("yelp.com", "pk_to_profile", 
    "http://www.yelp.com/user_details?userid=");
nodemapper.addSimpleHandler("yelp.com", "ident_to_profile",
    "http://", ".yelp.com");
