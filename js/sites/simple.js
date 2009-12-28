// -*-java-*-

/**
 * Copyright 2007 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

nodemapper.registerDomain(
    "digg.com",
    {name: "Digg",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "(?:users|rss)",
        "digg.com")});
nodemapper.addSimpleHandler("digg.com", "ident_to_profile",
			    "http://digg.com/users/", "/");
nodemapper.addSimpleHandler("digg.com", "ident_to_rss",
			    "http://digg.com/users/", "/history/diggs.rss");

nodemapper.registerDomain(
    "pownce.com",
    {name: "Pownce",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
        "pownce.com", /^\/(?:feeds\/public\/)?(\w+)(?:[.\/]|$)/, {slashAnything: 1})});
nodemapper.addSimpleHandler("pownce.com", "ident_to_profile", 
    "http://pownce.com/");
nodemapper.addSimpleHandler("pownce.com", "ident_to_rss", 
    "http://pownce.com/feeds/public/", ".rss");
nodemapper.addSimpleHandler("pownce.com", "ident_to_atom", 
    "http://pownce.com/feeds/public/", ".atom");

nodemapper.registerDomain(
    "jaiku.com",
    {name: "Jaiku",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("jaiku.com")});
nodemapper.addSimpleHandler("jaiku.com", "ident_to_profile", 
    "http://", ".jaiku.com/");
nodemapper.addSimpleHandler("jaiku.com", "ident_to_rss", 
    "http://", ".jaiku.com/feed/rss");

nodemapper.registerDomain(
    "mugshot.org",
    {name: "Mugshot",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
        "mugshot.org",
        /^\/person\?who=(\w+)/,
        {casePreserve: 1}),
     identCasePreserve: 1,
     accountToSgn: {ident: ["mugshot.org"]}
    });

nodemapper.addSimpleHandler("mugshot.org", "ident_to_profile",
			    "http://mugshot.org/person?who=", "");

nodemapper.registerDomain(
    "linkedin.com",
    {name: "LinkedIn",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "in",
        "linkedin.com")});

nodemapper.addSimpleHandler("linkedin.com", "ident_to_profile",
			    "http://www.linkedin.com/in/", "");

nodemapper.registerDomain(
    "ma.gnolia.com",
    {name: "Ma.gnolia",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "people",
        "ma.gnolia.com")});
nodemapper.addSimpleHandler("ma.gnolia.com", "ident_to_profile", 
    "http://ma.gnolia.com/people/");
nodemapper.addSimpleHandler("ma.gnolia.com", "ident_to_rss", 
    "http://ma.gnolia.com/rss/full/people/");

nodemapper.registerDomain(
    "ziki.com",
    {name: "Ziki",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
        "ziki.com",
        /^\/\w\w\/people\/(\w+)\/?/)});

nodemapper.addSimpleHandler("ziki.com", "ident_to_profile",
			    "http://www.ziki.com/people/", "");

nodemapper.registerDomain(
    ["del.icio.us", "delicious.com"],
    {name: "del.icio.us",
     primaryDomain: "del.icio.us",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
         "del.icio.us", /^\/(?:rss\/)?(\w+)/, 
         { notUsernames: { "rss": 1 }, slashAnything: 1})});

nodemapper.addSimpleHandler("del.icio.us", "ident_to_profile", 
    "http://delicious.com/");
nodemapper.addSimpleHandler("del.icio.us", "ident_to_rss", 
    "http://feeds.delicious.com/rss/");

nodemapper.registerDomain(
    ["tungle.me", "tgl.me"],
    {name: "Tungle.me",
     primaryDomain: "tungle.me",
     urlToGraphNode: nodemapper.createSlashUsernameHandler(
         "tungle.me")});
nodemapper.addSimpleHandler("tungle.me", "ident_to_profile", 
    "http://tungle.me/");

nodemapper.registerDomain("webshots.com", {
    name: "Webshots",
    identRegexp: /^\w+$/
});
nodemapper.registerDomain("community.webshots.com",
  {urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler("user", 
      "webshots.com")});
nodemapper.addSimpleHandler("webshots.com", "ident_to_profile", 
    "http://community.webshots.com/user/");
nodemapper.addSimpleHandler("webshots.com", "ident_to_rss", 
    "http://community.webshots.com/rss?contentType=rss&type=user&value=");

nodemapper.registerDomain(
    "smugmug.com",
    {name: "SmugMug",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("smugmug.com")});
nodemapper.addSimpleHandler("smugmug.com", "ident_to_profile", 
    "http://", ".smugmug.com/");
nodemapper.addSimpleHandler("smugmug.com", "ident_to_atom", 
    "http://www.smugmug.com/hack/feed.mg?Type=nicknameRecentPhotos&Data=", 
    "&format=atom03");

nodemapper.registerDomain(
    "vox.com",
    {name: "Vox",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("vox.com")});
nodemapper.addSimpleHandler("vox.com", "ident_to_content", 
    "http://", ".vox.com/");
nodemapper.addSimpleHandler("vox.com", "ident_to_profile",
    "http://", ".vox.com/profile/");
nodemapper.addSimpleHandler("vox.com", "ident_to_rss",
    "http://", ".vox.com/library/rss-full.xml");
nodemapper.addSimpleHandler("vox.com", "ident_to_atom",
    "http://", ".vox.com/library/atom-full.xml");
nodemapper.addSimpleHandler("vox.com", "ident_to_foaf",
    "http://", ".vox.com/profile/foaf.rdf");

nodemapper.registerDomain(
    "tumblr.com",
    {name: "Tumblr",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("tumblr.com")});
nodemapper.addSimpleHandler("tumblr.com", "ident_to_profile", 
    "http://", ".tumblr.com/");
nodemapper.addSimpleHandler("tumblr.com", "ident_to_rss", 
    "http://", ".tumblr.com/rss");

nodemapper.registerDomain(
    "xanga.com",
    {name: "Xanga",
     urlToGraphNode: nodemapper.createSlashUsernameHandler(
        "xanga.com", { slashAnything: 1 })});
nodemapper.addSimpleHandler("xanga.com", "ident_to_profile", 
    "http://xanga.com/");
nodemapper.addSimpleHandler("xanga.com", "ident_to_rss", 
    "http://xanga.com/", "/rss");

nodemapper.registerDomain(
    "360.yahoo.com",
    {name: "Yahoo! 360",
     urlToGraphNode: nodemapper.createSlashUsernameHandler(
        "360.yahoo.com", { slashAnything: 1 })});
nodemapper.addSimpleHandler("360.yahoo.com", "ident_to_profile", 
    "http://360.yahoo.com/");
nodemapper.addSimpleHandler("360.yahoo.com", "ident_to_rss", 
    "http://blog.360.yahoo.com/");

nodemapper.registerDomain(
    "spaces.live.com",
    {name: "Windows Live Spaces",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler(
        "spaces.live.com")});
nodemapper.addSimpleHandler("spaces.live.com", "ident_to_profile", 
    "http://", ".spaces.live.com");
nodemapper.addSimpleHandler("spaces.live.com", "ident_to_rss", 
    "http://", ".spaces.live.com/feed.rss");

nodemapper.registerDomain(
    "travelpod.com",
    {name: "TravelPod",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "members", "travelpod.com")});
nodemapper.addSimpleHandler("travelpod.com", "ident_to_profile",
			    "http://travelpod.com/members/");
nodemapper.addSimpleHandler("travelpod.com", "ident_to_rss",
			    "http://travelpod.com/syndication/rss/");

nodemapper.registerDomain(
    "imageshack.us",
    {name: "ImageShack",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "user", "imageshack.us")});
nodemapper.addSimpleHandler("imageshack.us", "ident_to_profile",
			    "http://profile.imageshack.us/user/");
nodemapper.addSimpleHandler("imageshack.us", "ident_to_rss",
			    "http://rss.imageshack.us/user/", "/rss/");

nodemapper.registerDomain("bloglines.com",
  {name: "Bloglines",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
      "(?:blog|public)", "bloglines.com", {slashAnything: 1})});
nodemapper.addSimpleHandler("bloglines.com", "ident_to_profile", 
    "http://www.bloglines.com/blog/");
nodemapper.addSimpleHandler("bloglines.com", "ident_to_rss", 
    "http://www.bloglines.com/blog/", "/rss");

nodemapper.registerDomain("nytimes.com",
  {name: "TimesPeople",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler("view/user",
      "nytimes.com", {keyName: "pk", slashAnything: 1})});
nodemapper.addSimpleHandler("nytimes.com", "pk_to_profile", 
    "http://timespeople.nytimes.com/view/user/", "/activities.html");
nodemapper.addSimpleHandler("nytimes.com", "pk_to_rss", 
    "http://timespeople.nytimes.com/view/user/", "/rss.xml");

upcomingHandler = nodemapper.createSomethingSlashUsernameHandler("user", 
    "upcoming.yahoo.com", {keyName: "pk"});
nodemapper.registerDomain("upcoming.yahoo.com",
  {name: "Upcoming",
   urlToGraphNode: upcomingHandler});
nodemapper.registerDomain("upcoming.org",
  {urlToGraphNode: upcomingHandler});
nodemapper.addSimpleHandler("upcoming.yahoo.com", "pk_to_profile", 
    "http://upcoming.yahoo.com/user/", "/");
nodemapper.addSimpleHandler("upcoming.yahoo.com", "pk_to_rss", 
    "http://upcoming.yahoo.com/syndicate/v2/my_events/");

nodemapper.registerDomain("socializr.com",
  {name: "Socializr",
   identRegexp: /^[A-Za-z]\w{2,}$/});
nodemapper.addSimpleHandler("socializr.com", "ident_to_profile", 
    "http://www.socializr.com/user/");
nodemapper.addSimpleHandler("socializr.com", "ident_to_rss", 
    "http://www.socializr.com/rss/user/", "/rss.xml");
nodemapper.addSimpleHandler("socializr.com", "pk_to_profile", 
    "http://www.socializr.com/user/");
nodemapper.addSimpleHandler("socializr.com", "pk_to_rss", 
    "http://www.socializr.com/rss/user/", "/rss.xml");

nodemapper.registerDomain("furl.net",
  {name: "Furl",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
      "members", "furl.net", {slashAnything: 1})});
nodemapper.addSimpleHandler("furl.net", "ident_to_profile", 
    "http://www.furl.net/members/");
nodemapper.addSimpleHandler("furl.net", "ident_to_rss", 
    "http://www.furl.net/members/", "/rss.xml");

nodemapper.registerDomain("dailymotion.com",
  {name: "DailyMotion",
   urlToGraphNode: nodemapper.createPathRegexpHandler(
    "dailymotion.com", /^\/(?:rss\/)?(\w+)(?:\/|$|\?from=)/, {slashAnything: 1})});
nodemapper.addSimpleHandler("dailymotion.com", "ident_to_profile", 
    "http://www.dailymotion.com/");
nodemapper.addSimpleHandler("dailymotion.com", "ident_to_rss", 
    "http://www.dailymotion.com/rss/", "/1");

nodemapper.registerDomain("vimeo.com",
  {name: "Vimeo",
   urlToGraphNode: nodemapper.createSlashUsernameHandler(
    "vimeo.com", {slashAnything: 1})});
nodemapper.addSimpleHandler("vimeo.com", "ident_to_profile", 
    "http://www.vimeo.com/");
nodemapper.addSimpleHandler("vimeo.com", "ident_to_rss", 
    "http://www.vimeo.com/", "/videos/rss");

nodemapper.registerDomain("d.hatena.ne.jp",
  {name: "Hatena::Diary",
   urlToGraphNode: nodemapper.createPathRegexpHandler(
    "d.hatena.ne.jp", /^\/([\w-]+)(?:\/|$)/, {casePreserve: 1})});
nodemapper.addSimpleHandler("d.hatena.ne.jp", "ident_to_profile", 
    "http://d.hatena.ne.jp/", "/");
nodemapper.addSimpleHandler("d.hatena.ne.jp", "ident_to_rss", 
    "http://d.hatena.ne.jp/", "/rss");
nodemapper.addSimpleHandler("d.hatena.ne.jp", "ident_to_foaf", 
    "http://d.hatena.ne.jp/", "/foaf");

nodemapper.registerDomain("disqus.com",
  {name: "Disqus",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
      "people", "disqus.com", {slashAnything: 1})});
nodemapper.addSimpleHandler("disqus.com", "ident_to_profile", 
    "http://www.disqus.com/people/");
nodemapper.addSimpleHandler("disqus.com", "ident_to_rss", 
    "http://www.disqus.com/people/", "/comments.rss");

var rateitallHandler = function(url, host, path) {
  var handler;
  if (path.match(/\/rss-u-[A-Za-z]/)) {
    handler = nodemapper.createPathRegexpHandler(
     "rateitall.com", /^\/rss-u-([A-Za-z][\w-]*).aspx$/);
  } else if (path.match(/\/rss-u-[0-9]/)) {
    handler = nodemapper.createPathRegexpHandler(
     "rateitall.com", /^\/rss-u-([0-9]+).aspx$/, {keyName: "pk"});
  } else if (path.match(/\/usercommentsrss.aspx\?RI=[A-Za-z]/)) {
    handler = nodemapper.createPathRegexpHandler(
     "rateitall.com", /^\/usercommentsrss.aspx\?RI=([A-Za-z][\w-]*)/);
  } else if (path.match(/\/usercommentsrss.aspx\?RI=[0-9]/)) {
    handler = nodemapper.createPathRegexpHandler(
     "rateitall.com", /^\/usercommentsrss.aspx\?RI=([0-9]+)/, {keyName: "pk"});
  } else {
     handler = nodemapper.createSlashUsernameHandler("rateitall.com");
  }
  return handler(url, host, path);
};

nodemapper.registerDomain("rateitall.com",
  {name: "RateItAll",
   identRegexp: /^(?!rss-)[A-Za-z][\w-]*$/,
   urlToGraphNode: rateitallHandler});
nodemapper.addSimpleHandler("rateitall.com", "ident_to_profile", 
    "http://www.rateitall.com/");
nodemapper.addSimpleHandler("rateitall.com", "pk_to_profile", 
    "http://www.rateitall.com/Profile.aspx?userID=");
nodemapper.addSimpleHandler("rateitall.com", "ident_to_rss", 
    "http://www.rateitall.com/rss-u-", ".aspx");
nodemapper.addSimpleHandler("rateitall.com", "pk_to_rss", 
    "http://www.rateitall.com/rss-u-", ".aspx");

nodemapper.registerDomain("slideshare.net",
  {name: "SlideShare",
   urlToGraphNode: nodemapper.createPathRegexpHandler(
    "slideshare.net", /^\/(?:rss\/user\/)?(\w+)(?:\/|$)/, {slashAnything: 1})});
nodemapper.addSimpleHandler("slideshare.net", "ident_to_profile", 
    "http://www.slideshare.net/");
nodemapper.addSimpleHandler("slideshare.net", "ident_to_rss", 
    "http://www.slideshare.net/rss/user/");

nodemapper.registerDomain("blog.sina.com.cn",
  {name: "Sina Blog"});
nodemapper.addSimpleHandler("blog.sina.com.cn", "ident_to_profile", 
    "http://blog.sina.com.cn/");
nodemapper.addSimpleHandler("blog.sina.com.cn", "ident_to_rss", 
    "http://blog.sina.com.cn/rss/", ".xml");

nodemapper.registerDomain("hi.baidu.com",
  {name: "Baidu Space"});
nodemapper.addSimpleHandler("hi.baidu.com", "ident_to_profile", 
    "http://hi.baidu.com/");
nodemapper.addSimpleHandler("hi.baidu.com", "ident_to_rss", 
    "http://hi.baidu.com/", "/rss");

nodemapper.registerDomain(
    "blogbus.com",
    {name: "Blogbus",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("blogbus.com")});
nodemapper.addSimpleHandler("blogbus.com", "ident_to_profile", 
    "http://", ".blogbus.com/");
nodemapper.addSimpleHandler("blogbus.com", "ident_to_rss", 
    "http://", ".blogbus.com/index.rdf");

nodemapper.registerDomain("bebo.com",
  {name: "Bebo",
   identRegexp: /^[A-Za-z]\w{2,}$/});
nodemapper.addSimpleHandler("bebo.com", "pk_to_profile", 
    "http://bebo.com/Profile.jsp?MemberId=");
nodemapper.addSimpleHandler("bebo.com", "ident_to_profile", 
    "http://bebo.com/");
nodemapper.addSimpleHandler("bebo.com", "pk_to_rss", 
    "http://bebo.com/api/BlogRss.jsp?MemberId=");

nodemapper.registerDomain("reddit.com",
  {name: "Reddit",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
      "user", "reddit.com", {slashAnything: 1})});
nodemapper.addSimpleHandler("reddit.com", "ident_to_profile", 
    "http://reddit.com/user/");
nodemapper.addSimpleHandler("reddit.com", "ident_to_rss", 
    "http://reddit.com/user/", "/submitted.rss");

nodemapper.registerDomain("ilike.com",
  {name: "iLike",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
      "user", "ilike.com", {slashAnything: 1})});
nodemapper.addSimpleHandler("ilike.com", "ident_to_profile", 
    "http://www.ilike.com/user/");
nodemapper.addSimpleHandler("ilike.com", "ident_to_rss", 
    "http://www.ilike.com/user/", "/songs_ilike.rss");


nodemapper.registerDomain(
    "multiply.com",
    {name: "Multiply",
     urlToGraphNode: nodemapper.createUserIsSubdomainHandler("multiply.com")});
nodemapper.addSimpleHandler("multiply.com", "ident_to_profile", 
    "http://", ".multiply.com/");
nodemapper.addSimpleHandler("multiply.com", "ident_to_rss", 
    "http://", ".multiply.com/feed.rss");

nodemapper.registerDomain(
    "dopplr.com",
    {name: "Dopplr",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "traveller", "dopplr.com")});
nodemapper.addSimpleHandler("dopplr.com", "ident_to_profile",
			    "http://www.dopplr.com/traveller/", "");

nodemapper.registerDomain(
    "c2.com",
    {name: "c2.com",
     notMassMarketSite: true,
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "c2.com", 
      /^\/cgi\/wiki\?(.*)/, 
      {casePreserve: 1}),
     identCasePreserve: 1
});

nodemapper.addSimpleHandler("c2.com", "ident_to_profile",
    "http://c2.com/cgi/wiki?");

nodemapper.registerDomain(
    "bookshelved.org",
    {name: "Bookshelved",
     notMassMarketSite: true,
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "bookshelved.org",
      /^\/cgi\-bin\/wiki\.pl\?(.*)/,
      {casePreserve: 1}),
     identCasePreserve: 1
});
nodemapper.addSimpleHandler("bookshelved.org", "ident_to_profile",
    "http://bookshelved.org/cgi-bin/wiki.pl?");

nodemapper.registerDomain(
    ["xpdeveloper.net", "xpdeveloper.org"],
    {name: "XP Developer",
     primaryDomain: "xpdeveloper.net", // is this?
     notMassMarketSite: true,
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "xpdeveloper.net", 
      /^\/xpdwiki\/Wiki\.jsp\?page=(.*)/, 
      {casePreserve: 1}),
     identCasePreserve: 1
});
nodemapper.addSimpleHandler("xpdeveloper.net", "ident_to_profile",
    "http://xpdeveloper.net/xpdwiki/Wiki.jsp?page=");

nodemapper.registerDomain(
    "usemod.com",
    {name: "UseModWiki",
     notMassMarketSite: true,
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "usemod.com", 
      /^\/cgi\-bin\/mb\.pl\?(.*)/, 
      {casePreserve: 1}),
     identCasePreserve: 1
   });
nodemapper.addSimpleHandler("usemod.com", "ident_to_profile",
    "http://usemod.com/cgi-bin/mb.pl?");

nodemapper.registerDomain(
    "advogato.org",
    {name: "Advogato",
     notMassMarketSite: true,
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "advogato.org",
      /^\/person\/(\w+)/)
   });
nodemapper.addSimpleHandler("advogato.org", "ident_to_profile",
    "http://www.advogato.org/person/", "/");
nodemapper.addSimpleHandler("advogato.org", "ident_to_foaf",
    "http://www.advogato.org/person/", "/foaf.rdf");

nodemapper.registerDomain("weeloop.com",
{name: "weeloop",
 urlToGraphNode: nodemapper.createUserIsSubdomainHandler("weeloop.com")
});
nodemapper.addSimpleHandler("weeloop.com", "ident_to_foaf",
                            "http://", ".weeloop.com/foaf.rdf");
nodemapper.addSimpleHandler("weeloop.com", "ident_to_profile",
                            "http://", ".weeloop.com/profile");
nodemapper.addSimpleHandler("weeloop.com", "ident_to_atom",
                            "http://", ".weeloop.com/api/post?mimeType=application/atom+xml");

nodemapper.registerDomain("planeta.rambler.ru",
{name: "Rambler-Planeta",
 identRegexp: /^[\w\.]+$/,
 urlToGraphNode: nodemapper.createPathRegexpHandler(
   "planeta.rambler.ru",
   /^\/users\/([\w\.]+)/)
});
nodemapper.addSimpleHandler("planeta.rambler.ru", "ident_to_foaf",
    "http://planeta.rambler.ru/users/", "/friends/foaf/");
nodemapper.addSimpleHandler("planeta.rambler.ru", "ident_to_rss",
    "http://planeta.rambler.ru/users/", "/rss/");

nodemapper.registerDomain("mojageneracja.pl",
  {name: "MojaGeneracja",
   urlToGraphNode: nodemapper.createPathRegexpHandler(
   "mojageneracja.pl",
       /^\/(\d+)(?:\/|$)/, {keyName: "pk"})
      });
nodemapper.addSimpleHandler("mojageneracja.pl", "pk_to_profile",
    "http://www.mojageneracja.pl/", "/");
nodemapper.addSimpleHandler("mojageneracja.pl", "pk_to_rss",
    "http://www.mojageneracja.pl/", "/rss");

nodemapper.registerDomain(
    "goodreads.com",
    {name: "goodreads",
     urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
        "user/show", "goodreads.com", {keyName: "pk"})});
nodemapper.addSimpleHandler("goodreads.com", "pk_to_profile",
			    "http://www.goodreads.com/user/show/");
nodemapper.addSimpleHandler("goodreads.com", "pk_to_rss",
			    "http://www.goodreads.com/review/list_rss/");

nodemapper.registerDomain("tripit.com", {
  name: "TripIt",
  identRegexp: /^[-\w\+\.]+$/,
  urlToGraphNode: nodemapper.createPathRegexpHandler(
      "tripit.com", /^\/people\/([-\w\+\.]+)/ )
});
nodemapper.addSimpleHandler("tripit.com", "ident_to_profile",
    "http://tripit.com/people/");

__END__

http://digg.com/users/foobar	sgn://digg.com/?ident=foobar
http://digg.com/users/foobar/	sgn://digg.com/?ident=foobar
http://digg.com/users/foobar/history/diggs.rss sgn://digg.com/?ident=foobar
# old rss url (no longer used, but kept for historical legacy)
http://digg.com/rss/foobar/index2.xml sgn://digg.com/?ident=foobar
profile(sgn://digg.com/?ident=foobar)	http://digg.com/users/foobar/
rss(sgn://digg.com/?ident=foobar)	http://digg.com/users/foobar/history/diggs.rss

http://pownce.com/a   sgn://pownce.com/?ident=a
http://pownce.com/A   sgn://pownce.com/?ident=a
http://pownce.com/A/   sgn://pownce.com/?ident=a
http://pownce.com/A/public/   sgn://pownce.com/?ident=a
http://pownce.com/A/public/with_friends   sgn://pownce.com/?ident=a
http://pownce.com/bob/foaf/     sgn://pownce.com/?ident=bob
profile(sgn://pownce.com/?ident=a) http://pownce.com/a
rss(sgn://pownce.com/?ident=a) http://pownce.com/feeds/public/a.rss
atom(sgn://pownce.com/?ident=a) http://pownce.com/feeds/public/a.atom

http://bradfitz.jaiku.com/   sgn://jaiku.com/?ident=bradfitz
http://BRADFITZ.JAIKU.COM/   sgn://jaiku.com/?ident=bradfitz
profile(sgn://jaiku.com/?ident=bradfitz) http://bradfitz.jaiku.com/
rss(sgn://jaiku.com/?ident=bradfitz) http://bradfitz.jaiku.com/feed/rss

http://linkedin.com/in/foobar	sgn://linkedin.com/?ident=foobar
http://linkedin.com/in/foobar/	sgn://linkedin.com/?ident=foobar
http://www.linkedin.com/in/foobar/	sgn://linkedin.com/?ident=foobar
http://www.linkedin.com/in/foobar	sgn://linkedin.com/?ident=foobar
profile(sgn://linkedin.com/?ident=foobar)  http://www.linkedin.com/in/foobar

# TODO(bradfitz): pk URLs for these types:
# http://www.linkedin.com/pub/5/512/39a

http://ma.gnolia.com/people/daveman692	sgn://ma.gnolia.com/?ident=daveman692
http://ma.gnolia.com/people/daveman692/	sgn://ma.gnolia.com/?ident=daveman692
profile(sgn://ma.gnolia.com/?ident=daveman692) http://ma.gnolia.com/people/daveman692
rss(sgn://ma.gnolia.com/?ident=daveman692) http://ma.gnolia.com/rss/full/people/daveman692

# case sensitive identifiers!
http://mugshot.org/person?who=7ACcH9gn7zv4YG  sgn://mugshot.org/?ident=7ACcH9gn7zv4YG
profile(sgn://mugshot.org/?ident=7ACcH9gn7zv4YG)  http://mugshot.org/person?who=7ACcH9gn7zv4YG

http://www.ziki.com/en/people/bob   sgn://ziki.com/?ident=bob
http://www.ziki.com/fr/people/bob/  sgn://ziki.com/?ident=bob
http://www.ziki.com/fr/people/bob/extrastuff sgn://ziki.com/?ident=bob
profile(sgn://ziki.com/?ident=bob)  http://www.ziki.com/people/bob

http://del.icio.us/jsmarr	sgn://del.icio.us/?ident=jsmarr
http://del.icio.us/rss/jsmarr	sgn://del.icio.us/?ident=jsmarr
http://delicious.com/jsmarr	sgn://del.icio.us/?ident=jsmarr
http://delicious.com/rss/jsmarr	sgn://del.icio.us/?ident=jsmarr
http://feeds.delicious.com/rss/jsmarr	sgn://del.icio.us/?ident=jsmarr
profile(sgn://del.icio.us/?ident=jsmarr)	http://delicious.com/jsmarr
rss(sgn://del.icio.us/?ident=jsmarr)	http://feeds.delicious.com/rss/jsmarr

http://community.webshots.com/user/bob sgn://webshots.com/?ident=bob
profile(sgn://webshots.com/?ident=bob) http://community.webshots.com/user/bob
rss(sgn://webshots.com/?ident=bob) http://community.webshots.com/rss?contentType=rss&type=user&value=bob

http://jsmarr.smugmug.com sgn://smugmug.com/?ident=jsmarr
profile(sgn://smugmug.com/?ident=jsmarr) http://jsmarr.smugmug.com/
atom(sgn://smugmug.com/?ident=jsmarr) http://www.smugmug.com/hack/feed.mg?Type=nicknameRecentPhotos&Data=jsmarr&format=atom03

http://bradfitz.tumblr.com/   sgn://tumblr.com/?ident=bradfitz
profile(sgn://tumblr.com/?ident=bradfitz) http://bradfitz.tumblr.com/
rss(sgn://tumblr.com/?ident=bradfitz) http://bradfitz.tumblr.com/rss

http://xanga.com/a/   sgn://xanga.com/?ident=a
profile(sgn://xanga.com/?ident=a) http://xanga.com/a
rss(sgn://xanga.com/?ident=a) http://xanga.com/a/rss

http://360.yahoo.com/a/   sgn://360.yahoo.com/?ident=a
profile(sgn://360.yahoo.com/?ident=a) http://360.yahoo.com/a
rss(sgn://360.yahoo.com/?ident=a) http://blog.360.yahoo.com/a

http://bradfitz.spaces.live.com/   sgn://spaces.live.com/?ident=bradfitz
profile(sgn://spaces.live.com/?ident=bradfitz) http://bradfitz.spaces.live.com
rss(sgn://spaces.live.com/?ident=bradfitz) http://bradfitz.spaces.live.com/feed.rss

http://www.travelpod.com/members/foobar	sgn://travelpod.com/?ident=foobar
http://travelpod.com/members/foobar/	sgn://travelpod.com/?ident=foobar
profile(sgn://travelpod.com/?ident=foobar)	http://travelpod.com/members/foobar
rss(sgn://travelpod.com/?ident=foobar)	http://travelpod.com/syndication/rss/foobar

http://www.imageshack.us/user/foobar	sgn://imageshack.us/?ident=foobar
http://imageshack.us/user/foobar/	sgn://imageshack.us/?ident=foobar
profile(sgn://imageshack.us/?ident=foobar)	http://profile.imageshack.us/user/foobar
rss(sgn://imageshack.us/?ident=foobar)	http://rss.imageshack.us/user/foobar/rss/

http://www.bloglines.com/blog/jsmarr sgn://bloglines.com/?ident=jsmarr
http://www.bloglines.com/blog/jsmarr/rss sgn://bloglines.com/?ident=jsmarr
http://www.bloglines.com/public/jsmarr sgn://bloglines.com/?ident=jsmarr
profile(sgn://bloglines.com/?ident=jsmarr) http://www.bloglines.com/blog/jsmarr
rss(sgn://bloglines.com/?ident=jsmarr) http://www.bloglines.com/blog/jsmarr/rss

http://upcoming.yahoo.com/user/75587/ sgn://upcoming.yahoo.com/?pk=75587
# upcoming.org redirects to upcoming.yahoo.com but some ppl still use it
http://upcoming.org/user/75587/ sgn://upcoming.yahoo.com/?pk=75587
profile(sgn://upcoming.yahoo.com/?pk=75587) http://upcoming.yahoo.com/user/75587/
rss(sgn://upcoming.yahoo.com/?pk=75587) http://upcoming.yahoo.com/syndicate/v2/my_events/75587

http://timespeople.nytimes.com/view/user/57047872 sgn://nytimes.com/?pk=57047872
http://timespeople.nytimes.com/view/user/57047872/activities.html sgn://nytimes.com/?pk=57047872
http://timespeople.nytimes.com/view/user/57047872/rss.xml sgn://nytimes.com/?pk=57047872
profile(sgn://nytimes.com/?pk=57047872) http://timespeople.nytimes.com/view/user/57047872/activities.html
rss(sgn://nytimes.com/?pk=57047872) http://timespeople.nytimes.com/view/user/57047872/rss.xml

http://www.socializr.com/user/jsmarr sgn://socializr.com/?ident=jsmarr
# TODO: this doesn't work cuz we're we have a custom identRegexp, so we need to use sgnFromHttpUsingToHttpRules
#http://socializr.com/user/jsmarr sgn://socializr.com/?ident=jsmarr
http://www.socializr.com/rss/user/jsmarr/rss.xml sgn://socializr.com/?ident=jsmarr
profile(sgn://socializr.com/?ident=jsmarr) http://www.socializr.com/user/jsmarr
rss(sgn://socializr.com/?ident=jsmarr) http://www.socializr.com/rss/user/jsmarr/rss.xml
http://www.socializr.com/user/12345 sgn://socializr.com/?pk=12345
profile(sgn://socializr.com/?pk=12345) http://www.socializr.com/user/12345
rss(sgn://socializr.com/?pk=12345) http://www.socializr.com/rss/user/12345/rss.xml

http://bebo.com/jsmarr sgn://bebo.com/?ident=jsmarr
http://bebo.com/Profile.jsp?MemberId=12345 sgn://bebo.com/?pk=12345
profile(sgn://bebo.com/?ident=jsmarr) http://bebo.com/jsmarr
profile(sgn://bebo.com/?pk=12345) http://bebo.com/Profile.jsp?MemberId=12345
rss(sgn://bebo.com/?pk=12345) http://bebo.com/api/BlogRss.jsp?MemberId=12345

http://reddit.com/user/jsmarr sgn://reddit.com/?ident=jsmarr
http://reddit.com/user/jsmarr/submitted.rss sgn://reddit.com/?ident=jsmarr
profile(sgn://reddit.com/?ident=jsmarr) http://reddit.com/user/jsmarr
rss(sgn://reddit.com/?ident=jsmarr) http://reddit.com/user/jsmarr/submitted.rss 

http://www.ilike.com/user/jsmarr sgn://ilike.com/?ident=jsmarr
http://ilike.com/user/jsmarr/songs_ilike.rss sgn://ilike.com/?ident=jsmarr
profile(sgn://ilike.com/?ident=jsmarr) http://www.ilike.com/user/jsmarr
rss(sgn://ilike.com/?ident=jsmarr) http://www.ilike.com/user/jsmarr/songs_ilike.rss 

http://bradfitz.multiply.com/   sgn://multiply.com/?ident=bradfitz
profile(sgn://multiply.com/?ident=bradfitz) http://bradfitz.multiply.com/
rss(sgn://multiply.com/?ident=bradfitz) http://bradfitz.multiply.com/feed.rss

http://btrott.vox.com/   sgn://vox.com/?ident=btrott
http://btrott.vox.com/profile/foaf.rdf   sgn://vox.com/?ident=btrott
http://btrott.vox.com/profile/ sgn://vox.com/?ident=btrott
http://btrott.vox.com/library/audio/6a00b8ea0714f01bc000e398d429800003.html sgn://vox.com/?ident=btrott

profile(sgn://vox.com/?ident=btrott)  http://btrott.vox.com/profile/
foaf(sgn://vox.com/?ident=btrott)  http://btrott.vox.com/profile/foaf.rdf
atom(sgn://vox.com/?ident=btrott)  http://btrott.vox.com/library/atom-full.xml
rss(sgn://vox.com/?ident=btrott)  http://btrott.vox.com/library/rss-full.xml

http://www.dopplr.com/traveller/bradfitz/           sgn://dopplr.com/?ident=bradfitz
http://dopplr.com/traveller/bradfitz/               sgn://dopplr.com/?ident=bradfitz
http://www.dopplr.com/traveller/bradfitz            sgn://dopplr.com/?ident=bradfitz
http://www.dopplr.com/traveller/bradfitz/something  sgn://dopplr.com/?ident=bradfitz

profile(sgn://dopplr.com/?ident=bradfitz) http://www.dopplr.com/traveller/bradfitz

# wikis. These have case-sensitive identifiers
http://c2.com/cgi/wiki?AdewaleOshineye  sgn://c2.com/?ident=AdewaleOshineye
profile(sgn://c2.com/?ident=AdewaleOshineye) http://c2.com/cgi/wiki?AdewaleOshineye

http://bookshelved.org/cgi-bin/wiki.pl?AdewaleOshineye  sgn://bookshelved.org/?ident=AdewaleOshineye
profile(sgn://bookshelved.org/?ident=AdewaleOshineye)  http://bookshelved.org/cgi-bin/wiki.pl?AdewaleOshineye

http://xpdeveloper.net/xpdwiki/Wiki.jsp?page=AdewaleOshineye  sgn://xpdeveloper.net/?ident=AdewaleOshineye
profile(sgn://xpdeveloper.net/?ident=AdewaleOshineye)  http://xpdeveloper.net/xpdwiki/Wiki.jsp?page=AdewaleOshineye

http://usemod.com/cgi-bin/mb.pl?SunirShah   sgn://usemod.com/?ident=SunirShah
profile(sgn://usemod.com/?ident=SunirShah)   http://usemod.com/cgi-bin/mb.pl?SunirShah

http://www.advogato.org/person/bradfitz             sgn://advogato.org/?ident=bradfitz
http://www.advogato.org/person/bradfitz/            sgn://advogato.org/?ident=bradfitz
http://www.advogato.org/person/bradfitz/foaf.rdf    sgn://advogato.org/?ident=bradfitz
http://www.advogato.org/person/bradfitz/foaf.rdf#me sgn://advogato.org/?ident=bradfitz
foaf(sgn://advogato.org/?ident=bradfitz)            http://www.advogato.org/person/bradfitz/foaf.rdf
profile(sgn://advogato.org/?ident=bradfitz)         http://www.advogato.org/person/bradfitz/

http://bob.weeloop.com   sgn://weeloop.com/?ident=bob
http://bob.weeloop.com/profile   sgn://weeloop.com/?ident=bob
http://bob.weeloop.com/api/post?mimeType=application/rss+xml   sgn://weeloop.com/?ident=bob
http://bob.weeloop.com/api/post?mimeType=application/atom+xml   sgn://weeloop.com/?ident=bob
http://bob.weeloop.com/foaf.rdf   sgn://weeloop.com/?ident=bob
foaf(sgn://weeloop.com/?ident=bob)  http://bob.weeloop.com/foaf.rdf
profile(sgn://weeloop.com/?ident=bob)  http://bob.weeloop.com/profile
atom(sgn://weeloop.com/?ident=bob)  http://bob.weeloop.com/api/post?mimeType=application/atom+xml

http://www.furl.net/members/jsmarr  sgn://furl.net/?ident=jsmarr
http://furl.net/members/jsmarr/rss.xml  sgn://furl.net/?ident=jsmarr
profile(sgn://furl.net/?ident=jsmarr) http://www.furl.net/members/jsmarr
rss(sgn://furl.net/?ident=jsmarr) http://www.furl.net/members/jsmarr/rss.xml

http://www.dailymotion.com/jsmarr  sgn://dailymotion.com/?ident=jsmarr
http://dailymotion.com/jsmarr  sgn://dailymotion.com/?ident=jsmarr
http://beta.dailymotion.com/JSMarr?from=rss  sgn://dailymotion.com/?ident=jsmarr
http://www.dailymotion.com/rss/jsmarr/1  sgn://dailymotion.com/?ident=jsmarr
profile(sgn://dailymotion.com/?ident=jsmarr) http://www.dailymotion.com/jsmarr
rss(sgn://dailymotion.com/?ident=jsmarr) http://www.dailymotion.com/rss/jsmarr/1

http://www.vimeo.com/jsmarr  sgn://vimeo.com/?ident=jsmarr
http://vimeo.com/jsmarr  sgn://vimeo.com/?ident=jsmarr
http://www.vimeo.com/jsmarr/videos/rss  sgn://vimeo.com/?ident=jsmarr
profile(sgn://vimeo.com/?ident=jsmarr) http://www.vimeo.com/jsmarr
rss(sgn://vimeo.com/?ident=jsmarr) http://www.vimeo.com/jsmarr/videos/rss

http://www.disqus.com/people/jsmarr sgn://disqus.com/?ident=jsmarr
http://disqus.com/people/jsmarr/comments.rss sgn://disqus.com/?ident=jsmarr
profile(sgn://disqus.com/?ident=jsmarr) http://www.disqus.com/people/jsmarr
rss(sgn://disqus.com/?ident=jsmarr) http://www.disqus.com/people/jsmarr/comments.rss

http://www.rateitall.com/jsmarr sgn://rateitall.com/?ident=jsmarr
http://www.rateitall.com/Profile.aspx?userID=12345 sgn://rateitall.com/?pk=12345
http://www.rateitall.com/rss-u-jsmarr.aspx sgn://rateitall.com/?ident=jsmarr
http://www.rateitall.com/rss-u-12345.aspx sgn://rateitall.com/?pk=12345
profile(sgn://rateitall.com/?ident=jsmarr) http://www.rateitall.com/jsmarr
profile(sgn://rateitall.com/?pk=12345) http://www.rateitall.com/Profile.aspx?userID=12345
rss(sgn://rateitall.com/?ident=jsmarr) http://www.rateitall.com/rss-u-jsmarr.aspx
rss(sgn://rateitall.com/?pk=12345) http://www.rateitall.com/rss-u-12345.aspx

# old rateitall url structure (no longer used, but there may be old links out there)
http://www.rateitall.com/usercommentsrss.aspx?RI=jsmarr sgn://rateitall.com/?ident=jsmarr
http://www.rateitall.com/usercommentsrss.aspx?RI=12345 sgn://rateitall.com/?pk=12345

http://www.slideshare.net/jsmarr sgn://slideshare.net/?ident=jsmarr
http://slideshare.net/rss/user/jsmarr sgn://slideshare.net/?ident=jsmarr
profile(sgn://slideshare.net/?ident=jsmarr) http://www.slideshare.net/jsmarr
rss(sgn://slideshare.net/?ident=jsmarr) http://www.slideshare.net/rss/user/jsmarr

http://blog.sina.com.cn/jsmarr sgn://blog.sina.com.cn/?ident=jsmarr
http://blog.sina.com.cn/rss/jsmarr.xml sgn://blog.sina.com.cn/?ident=jsmarr
profile(sgn://blog.sina.com.cn/?ident=jsmarr) http://blog.sina.com.cn/jsmarr
rss(sgn://blog.sina.com.cn/?ident=jsmarr) http://blog.sina.com.cn/rss/jsmarr.xml

http://hi.baidu.com/jsmarr sgn://hi.baidu.com/?ident=jsmarr
http://hi.baidu.com/jsmarr/rss sgn://hi.baidu.com/?ident=jsmarr
profile(sgn://hi.baidu.com/?ident=jsmarr) http://hi.baidu.com/jsmarr
rss(sgn://hi.baidu.com/?ident=jsmarr) http://hi.baidu.com/jsmarr/rss

http://jsmarr.blogbus.com/   sgn://blogbus.com/?ident=jsmarr
http://jsmarr.blogbus.com/index.rdf   sgn://blogbus.com/?ident=jsmarr
profile(sgn://blogbus.com/?ident=jsmarr) http://jsmarr.blogbus.com/
rss(sgn://blogbus.com/?ident=jsmarr) http://jsmarr.blogbus.com/index.rdf

http://planeta.rambler.ru/users/alex.nec.ru/  sgn://planeta.rambler.ru/?ident=alex.nec.ru
http://planeta.rambler.ru/users/alex.nec.RU  sgn://planeta.rambler.ru/?ident=alex.nec.ru
foaf(sgn://planeta.rambler.ru/?ident=alex.nec.ru)  http://planeta.rambler.ru/users/alex.nec.ru/friends/foaf/
rss(sgn://planeta.rambler.ru/?ident=alex.nec.ru)  http://planeta.rambler.ru/users/alex.nec.ru/rss/

http://d.hatena.ne.jp/akatori777 sgn://d.hatena.ne.jp/?ident=akatori777
http://d.hatena.ne.jp/akatori777/ sgn://d.hatena.ne.jp/?ident=akatori777
http://d.hatena.ne.jp/AKatori777/ sgn://d.hatena.ne.jp/?ident=AKatori777
http://d.hatena.ne.jp/A-Sky/ sgn://d.hatena.ne.jp/?ident=A-Sky
http://d.hatena.ne.jp/akatori777/foaf sgn://d.hatena.ne.jp/?ident=akatori777
http://d.hatena.ne.jp/akatori777/20090101/11920734 sgn://d.hatena.ne.jp/?ident=akatori777
profile(sgn://d.hatena.ne.jp/?ident=akatori777) http://d.hatena.ne.jp/akatori777/
foaf(sgn://d.hatena.ne.jp/?ident=akatori777) http://d.hatena.ne.jp/akatori777/foaf
rss(sgn://d.hatena.ne.jp/?ident=akatori777) http://d.hatena.ne.jp/akatori777/rss

http://www.mojageneracja.pl/13192415/ sgn://mojageneracja.pl/?pk=13192415
http://www.mojageneracja.pl/13192415/something sgn://mojageneracja.pl/?pk=13192415
profile(sgn://mojageneracja.pl/?pk=13192415) http://www.mojageneracja.pl/13192415/
rss(sgn://mojageneracja.pl/?pk=13192415) http://www.mojageneracja.pl/13192415/rss

http://www.goodreads.com/user/show/1150869 sgn://goodreads.com/?pk=1150869
http://goodreads.com/user/show/1150869 sgn://goodreads.com/?pk=1150869
http://www.goodreads.com/review/list_rss/1150869 sgn://goodreads.com/?pk=1150869
profile(sgn://goodreads.com/?pk=1150869) http://www.goodreads.com/user/show/1150869
rss(sgn://goodreads.com/?pk=1150869) http://www.goodreads.com/review/list_rss/1150869

http://tungle.me/jsmarr sgn://tungle.me/?ident=jsmarr
http://tgl.me/jsmarr sgn://tungle.me/?ident=jsmarr
profile(sgn://tungle.me/?ident=jsmarr) http://tungle.me/jsmarr

http://tripit.com/people/Adam+Smith sgn://tripit.com/?ident=adam+smith
http://tripit.com/people/aNOTher-person/ sgn://tripit.com/?ident=another-person
http://tripit.com/people/some.1 sgn://tripit.com/?ident=some.1
http://www.tripit.com/people/just_me/nothing sgn://tripit.com/?ident=just_me
http://www.tripit.com/people/meEE.123 sgn://tripit.com/?ident=meee.123
http://www.tripit.com/people/trying?what sgn://tripit.com/?ident=trying
profile(sgn://tripit.com/?ident=foobar) http://tripit.com/people/foobar
