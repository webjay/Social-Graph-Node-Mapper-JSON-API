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
