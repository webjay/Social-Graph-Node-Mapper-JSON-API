var GOOGLE_TLDS = "ad ae am as at az ba be bg bi bs ca cd cg ch ci cl cn co.bw co.ck co.cr co.id co.il co.im co.in co.je co.jp co.ke co.kr co.ls co.ma co.mw co.nz co.pn co.th co.tt co.ug co.uk co.uz co.ve co.vi co.yu co.za co.zm co.zw com com.af com.ag com.ar com.au com.bd com.bh com.bn com.bo com.br com.bz com.cn com.co com.cu com.do com.ec com.eg com.et com.fj com.gi com.gr com.gt com.hk com.jm com.kh com.kz com.lv com.ly com.mt com.mw com.mx com.my com.na com.nf com.ng com.ni com.np com.om com.pa com.pe com.ph com.pk com.pl com.pr com.py com.qa com.ru com.sa com.sb com.sg com.sl com.sv com.tj com.tr com.tt com.tw com.ua com.uy com.vc com.ve com.vn cz de dj dk dm ee es fi fm fr ge gg gl gm gp gr gy hk hn hr ht hu ie is it je jo kg ki kz la li lk lt lu lv md me mn ms mu mv mw ne.jp nl no nr nu off.ai ph pl pn pt ro ru rw sc se sg sh si sk sl sm sn st tk tl tm to tp tt us vg vn vu ws".split(" ");

function googleDomains(prefix) {
  var ret = [];
  for (var idx in GOOGLE_TLDS) {
    ret.push(prefix + GOOGLE_TLDS[idx]);
  }
  return ret;
}

var GOOGLE_DOMAINS = googleDomains("google.");

var READER_RE = /^\/reader\/(?:shared|public\/atom\/user)\/(\d{7,})(?:\/state\/com.google\/broadcast)?/;

var googleIdentProfileHandler = nodemapper.createPathRegexpHandler(
    "profiles.google.com",  // fake domain
    /^(?:\/s2)?\/(?:profiles\/|sharing\/stuff\?user=)([\w+\.]+)/,
    {keyName: "ident"});

var googleProfileHandler = nodemapper.createPathRegexpHandler(
    "profiles.google.com",  // fake domain
    /^(?:\/s2)?\/(?:profiles\/|sharing\/stuff\?user=)(\d+)/,
    {keyName: "pk", fallbackHandler: googleIdentProfileHandler });

var readerHandler = nodemapper.createPathRegexpHandler(
    "reader.google.com",  // fake domain
    READER_RE,
   {keyName: "pk"});

var profilesDomainIdentHandler = nodemapper.createPathRegexpHandler(
    "profiles.google.com",  // fake domain
    /^\/([\w+\.]+)(?:\?|$)/,
    {keyName: "ident"})

googleMasterHandler = function(url, host, path) {
  var handler = null;
  if (path.indexOf("/reader") == 0) {
    handler = readerHandler;
  } else if (path.indexOf("/s2/") == 0) {
    handler = googleProfileHandler;
  } else if (path.indexOf("/profiles/") == 0) {
    handler = googleProfileHandler;
  }
  // TODO: add more handlers for other google properties

  if (handler) return handler(url, host, path);

  // default: just pass raw url back
  return url;
};

nodemapper.registerDomain(GOOGLE_DOMAINS, {urlToGraphNode: googleMasterHandler});

nodemapper.registerDomain("reader.google.com", {
	name: "Google Reader",
	pkRegexp: /^\d{7,}$/
	});
nodemapper.addSimpleHandler("reader.google.com", "pk_to_content",
			    "http://www.google.com/reader/shared/", "");
nodemapper.addSimpleHandler("reader.google.com", "pk_to_profile",
			    "http://www.google.com/reader/shared/", "");
nodemapper.addSimpleHandler("reader.google.com", "pk_to_atom",
			    "http://www.google.com/reader/public/atom/user/",
                            "/state/com.google/broadcast");

var PROFILE_RE = /^\/profile\?user=(\w+)/;
var USER_RE = /^\/(?:(?:rss\/)?user\/)?(\w+)\b/;

var YOUTUBE_NOT_USERNAME = {
  'blog': true,
  'browse': true,
  'community': true,
  'dev': true,
  'feeds': true,
  'greetings': true,
  'inbox': true,
  'jobs': true,
  'members': true,
  'my_account': true,
  'my_favorites': true,
  'my_playlists': true,
  'my_subscriptions': true,
  'my_videos': true,
  'press_room': true,
  'support': true,
  't': true,
  'testtube': true,
  'watch': true,
  'watch_queue': true,
  'youtubeonyoursite': true
};

var youTubeToSgn = function(url, host, path) {
  var m;
  if ((m = PROFILE_RE.exec(path)) || (m = USER_RE.exec(path))) {
    var username = m[1].toLowerCase();
    if (YOUTUBE_NOT_USERNAME[username]) {
      return url;
    }
    return "sgn://youtube.com/?ident=" + username;
  }
  return url;
};

nodemapper.registerDomain(
  "youtube.com",
  {name: "YouTube",
   urlToGraphNode: youTubeToSgn});

nodemapper.registerDomain(
    "gdata.youtube.com",
    {urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler(
          "feeds/base/users",
          "youtube.com")});

nodemapper.addSimpleHandler(
    "youtube.com", "ident_to_profile",
    "http://youtube.com/user/");

nodemapper.addSimpleHandler(
    "youtube.com", "ident_to_rss",
    "http://youtube.com/rss/user/", "/videos.rss");

nodemapper.registerDomain(
    googleDomains("picasaweb.google."),
    {name: "Picasa Web Albums",
     primaryDomain: "picasaweb.google.com",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
        "picasaweb.google.com",
	/^\/([\w\.]+)\/?$/
     )});
nodemapper.addSimpleHandler("picasaweb.google.com", "ident_to_profile", 
    "http://picasaweb.google.com/");
nodemapper.addSimpleHandler("picasaweb.google.com", "ident_to_rss", 
    "http://picasaweb.google.com/data/feed/base/user/", 
    "?kind=album&alt=rss&hl=en_US&access=public");

nodemapper.registerDomain(
    "dodgeball.com",
    {name: "Dodgeball",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "dodgeball.com",
      /^\/user\?uid=(\d+)/, { keyName: "pk" })
   });
nodemapper.addSimpleHandler("dodgeball.com", "pk_to_profile",
    "http://www.dodgeball.com/user?uid=", "");

nodemapper.registerDomain(
    "orkut.com",
    {name: "Orkut",
     urlToGraphNode: nodemapper.createPathRegexpHandler(
      "orkut.com",
      /^\/Profile.aspx\?uid=(\d+)/, { keyName: "pk" })
   });
nodemapper.addSimpleHandler("orkut.com", "pk_to_profile",
                            "http://www.orkut.com/Profile.aspx?uid=");

nodemapper.registerDomain("profiles.google.com", {
        urlToGraphNode: profilesDomainIdentHandler,
	name: "Google Profile",
	pkRegexp: /^\d{7,}$/,
        identRegexp: /^[\w\.]{1,40}$/
  });
nodemapper.addSimpleHandler("profiles.google.com", "pk_to_profile",
                            "http://www.google.com/profiles/");
nodemapper.addSimpleHandler("profiles.google.com", "ident_to_profile",
                            "http://www.google.com/profiles/");


__END__

http://www.google.de/reader/shared/12649763491721032377 sgn://reader.google.com/?pk=12649763491721032377
http://www.google.com/reader/shared/12649763491721032377 sgn://reader.google.com/?pk=12649763491721032377
http://www.google.com/reader/public/atom/user/12649763491721032377/state/com.google/broadcast sgn://reader.google.com/?pk=12649763491721032377
content(sgn://reader.google.com/?pk=12649763491721032377) http://www.google.com/reader/shared/12649763491721032377
profile(sgn://reader.google.com/?pk=12649763491721032377) http://www.google.com/reader/shared/12649763491721032377
atom(sgn://reader.google.com/?pk=12649763491721032377) http://www.google.com/reader/public/atom/user/12649763491721032377/state/com.google/broadcast

http://youtube.com/jsmarr sgn://youtube.com/?ident=jsmarr
http://www.youtube.com/user/jsmarr sgn://youtube.com/?ident=jsmarr
http://www.youtube.com/profile?user=bradfitztube  sgn://youtube.com/?ident=bradfitztube
http://www.youtube.com/watch?v=pF20uyMTqqI  http://www.youtube.com/watch?v=pF20uyMTqqI
http://gdata.youtube.com/feeds/base/users/bradfitztube/uploads?alt=rss&v=2&client=ytapi-youtube-profile sgn://youtube.com/?ident=bradfitztube

profile(sgn://youtube.com/?ident=jsmarr) http://youtube.com/user/jsmarr
rss(sgn://youtube.com/?ident=jsmarr) http://youtube.com/rss/user/jsmarr/videos.rss


http://www.dodgeball.com/user?uid=54155    sgn://dodgeball.com/?pk=54155
profile(sgn://dodgeball.com/?pk=54155)     http://www.dodgeball.com/user?uid=54155

http://picasaweb.google.com/bradley.j.fitzpatrick/  sgn://picasaweb.google.com/?ident=bradley.j.fitzpatrick
http://picasaweb.google.com/bradley.j.FITZPATRICK/  sgn://picasaweb.google.com/?ident=bradley.j.fitzpatrick

http://picasaweb.google.com/jsmarr	sgn://picasaweb.google.com/?ident=jsmarr
profile(sgn://picasaweb.google.com/?ident=jsmarr) http://picasaweb.google.com/jsmarr
rss(sgn://picasaweb.google.com/?ident=jsmarr) http://picasaweb.google.com/data/feed/base/user/jsmarr?kind=album&alt=rss&hl=en_US&access=public

http://www.orkut.com/Profile.aspx?uid=123  sgn://orkut.com/?pk=123
profile(sgn://orkut.com/?pk=123)           http://www.orkut.com/Profile.aspx?uid=123

http://picasaweb.google.es/Abc.Def  sgn://picasaweb.google.com/?ident=abc.def
http://picasaweb.google.hu/abcdef   sgn://picasaweb.google.com/?ident=abcdef
http://www.picasaweb.google.hu/abcdef   sgn://picasaweb.google.com/?ident=abcdef


http://www.google.com/s2/profiles/115863474911002159675   sgn://profiles.google.com/?pk=115863474911002159675
http://www.google.com/profiles/115863474911002159675   sgn://profiles.google.com/?pk=115863474911002159675
http://www.google.co.uk/s2/profiles/115863474911002159675 sgn://profiles.google.com/?pk=115863474911002159675
http://www.google.de/s2/profiles/115863474911002159675    sgn://profiles.google.com/?pk=115863474911002159675

http://www.google.com/profiles/bradfitz   sgn://profiles.google.com/?ident=bradfitz
http://profiles.google.com/bradfitz     sgn://profiles.google.com/?ident=bradfitz
http://profiles.google.com/bradfitz?foo sgn://profiles.google.com/?ident=bradfitz

http://www.google.com/s2/sharing/stuff?user=123   sgn://profiles.google.com/?pk=123

profile(sgn://profiles.google.com/?pk=115863474911002159675)  http://www.google.com/profiles/115863474911002159675
profile(sgn://profiles.google.com/?ident=bradfitz)  http://www.google.com/profiles/bradfitz
