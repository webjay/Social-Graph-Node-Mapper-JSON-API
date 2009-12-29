// Theadless.com

var pkMatcher = nodemapper.createPathRegexpHandler(
    "threadless.com",
    /\/(?:profile|rss\/blog)\/(\d+)\/?$/,
    {keyName:"pk"});

var identMatcher = nodemapper.createPathRegexpHandler(
    "threadless.com",
    /\/(?:profile|rss\/blog)\/(\d+\/\w+)(?:\/.*)?$/,
    {fallbackHandler: pkMatcher});

nodemapper.registerDomain(
    "threadless.com",
    {name: "Threadless",
     urlToGraphNode: identMatcher,
     identRegexp: /^\d+\/\w+$/});

nodemapper.addSimpleHandler("threadless.com", "pk_to_rss",
                            "http://www.threadless.com/rss/blog/", "");
nodemapper.addSimpleHandler("threadless.com", "ident_to_rss",
                            "http://www.threadless.com/rss/blog/", "");

nodemapper.addSimpleHandler("threadless.com", "pk_to_profile",
                            "http://www.threadless.com/profile/", "");
nodemapper.addSimpleHandler("threadless.com", "ident_to_profile",
                            "http://www.threadless.com/profile/", "");

nodemapper.addSimpleHandler("threadless.com", "ident_to_blog",
                            "http://www.threadless.com/profile/", "/blogs");
