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

__END__

# Can have ident, pk, or both.  The ident-only redirects to
# pk+ident... sometimes (if the ident doesn't have an underscore?)
# Not case-sensitive.

http://www.threadless.com/profile/149253/Aunalis sgn://threadless.com/?ident=149253/aunalis
http://www.threadless.com/profile/149253         sgn://threadless.com/?pk=149253
profile(sgn://threadless.com/?pk=149253)  http://www.threadless.com/profile/149253
profile(sgn://threadless.com/?ident=149253/aunalis) http://www.threadless.com/profile/149253/aunalis

http://www.threadless.com/rss/blog/149253/Aunalis   sgn://threadless.com/?ident=149253/aunalis
http://www.threadless.com/rss/blog/149253           sgn://threadless.com/?pk=149253
rss(sgn://threadless.com/?ident=149253/aunalis)     http://www.threadless.com/rss/blog/149253/aunalis
rss(sgn://threadless.com/?pk=149253)                http://www.threadless.com/rss/blog/149253

# stuff follows username
http://www.threadless.com/profile/149253/Aunalis/archive  sgn://threadless.com/?ident=149253/aunalis
http://www.threadless.com/profile/149253/Aunalis/blogs  sgn://threadless.com/?ident=149253/aunalis
http://www.threadless.com/profile/149253/Aunalis/blog/  sgn://threadless.com/?ident=149253/aunalis

# misc hostnames:
http://threadless.com/profile/226507/Legoman  sgn://threadless.com/?ident=226507/legoman
http://media.threadless.com/profile/284208/Neiko  sgn://threadless.com/?ident=284208/neiko

# blog URL (in their URL terminology a blog is a blog entry and "blogs" is a blog)
blog(sgn://threadless.com/?ident=149253/aunalis)  http://www.threadless.com/profile/149253/aunalis/blogs
