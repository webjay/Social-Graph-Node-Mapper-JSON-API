var stumbleuponCompoundHandler = function(url, host, path) {
  var handler;
  if (host.indexOf('www.') == 0 || host.indexOf('rss.') == 0) {
    if (path.indexOf('syndicate.php') != -1) {
      handler = nodemapper.createPathRegexpHandler("stumbleupon.com",
          /^\/syndicate.php\?stumbler=([^&]+)/);
    } else {
      handler = nodemapper.createSomethingSlashUsernameHandler(
        "(?:user|stumbler)", "stumbleupon.com", {slashAnything:1});
    }
  } else handler = nodemapper.createUserIsSubdomainHandler("stumbleupon.com");
  return handler(url, host, path);
};
    //"http://www.stumbleupon.com/syndicate.php?stumbler=");

nodemapper.registerDomain(
    "stumbleupon.com",
    {name: "StumbleUpon",
     urlToGraphNode: stumbleuponCompoundHandler});
nodemapper.addSimpleHandler("stumbleupon.com", "ident_to_profile", 
    "http://", ".stumbleupon.com");
nodemapper.addSimpleHandler("stumbleupon.com", "ident_to_rss", 
    "http://rss.stumbleupon.com/user/", "/favorites");

__END__

http://bradfitz.stumbleupon.com/   sgn://stumbleupon.com/?ident=bradfitz
http://bradfitz.stumbleupon.com/blog/   sgn://stumbleupon.com/?ident=bradfitz
http://www.stumbleupon.com/stumbler/bradfitz/   sgn://stumbleupon.com/?ident=bradfitz
http://www.stumbleupon.com/stumbler/bradfitz/blog/   sgn://stumbleupon.com/?ident=bradfitz
http://rss.stumbleupon.com/user/bradfitz/favorites   sgn://stumbleupon.com/?ident=bradfitz

profile(sgn://stumbleupon.com/?ident=bradfitz) http://bradfitz.stumbleupon.com
rss(sgn://stumbleupon.com/?ident=bradfitz) http://rss.stumbleupon.com/user/bradfitz/favorites

# old rss format
http://www.stumbleupon.com/syndicate.php?stumbler=bradfitz sgn://stumbleupon.com/?ident=bradfitz
