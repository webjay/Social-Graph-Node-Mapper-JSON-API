
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

var HAS_ID_REGEXP = /\b(?:ownerId=|userid=|friend\/|\/profile\/foaf\/)(\d+)/;

var FRIEND_ID_REGEXP = /^\/friend\/p(\d+)-/;

var DISPLAY_PROFILE = /^\/friend\/profile\/displayHi5URL\.do\?nickname=([\w\-]{6,})\b/;

var NUMERIC_DOMAIN = /^(\d+)\.hi5\.com$/;

function urlToGraphNodeHi5(url, host, path) {
    var m;
    if ((m = HAS_ID_REGEXP.exec(path)) ||
        (m = FRIEND_ID_REGEXP.exec(path))) {
	return "sgn://hi5.com/?pk=" + m[1];
    }

    // subdomain users have to be 6+ characters
    if (path == "/" && (m = /^([\w\-]{6,})\.hi5\.com$/.exec(host))) {
	var match = m[1];
	if (/[^\d]/.exec(match)) {
	    return "sgn://hi5.com/?ident=" + m[1].toLowerCase();
	} else {
	    return "sgn://hi5.com/?pk=" + m[1];
	}
    }

    // display nickname
    if (m = DISPLAY_PROFILE.exec(path)) {
	return "sgn://hi5.com/?ident=" + m[1].toLowerCase();
    }

    // numeric domain and no query string that might alter what's
    // being viewed
    if ((m = NUMERIC_DOMAIN.exec(host)) && !/\?/.exec(path)) {
      return "sgn://hi5.com/?pk=" + m[1];
    }

    return url;
}

nodemapper.registerDomain(
  "hi5.com", {
  name: "hi5",
  urlToGraphNode: urlToGraphNodeHi5
});

nodemapper.addSimpleHandler("hi5.com", "pk_to_foaf",
			    "http://api.hi5.com/rest/profile/foaf/", "");
nodemapper.addSimpleHandler("hi5.com", "pk_to_content",
			    "http://www.hi5.com/friend/profile/displayProfile.do?userid=", "");
nodemapper.addSimpleHandler("hi5.com", "pk_to_profile",
			    "http://www.hi5.com/friend/profile/displayProfile.do?userid=", "");
nodemapper.addSimpleHandler("hi5.com", "pk_to_atom",
			    "http://api.hi5.com/rest/feed/journal/", "");
nodemapper.addSimpleHandler("hi5.com", "pk_to_foaf",
			    "http://api.hi5.com/rest/profile/foaf/", "");
nodemapper.addSimpleHandler("hi5.com", "pk_to_blog",
			    "http://www.hi5.com/friend/profile/displayJournal.do?userid=", "");

nodemapper.addSimpleHandler("hi5.com", "ident_to_content",
			    "http://", ".hi5.com/");
nodemapper.addSimpleHandler("hi5.com", "ident_to_profile",
			    "http://", ".hi5.com/");


__END__

http://api.hi5.com/rest/profile/foaf/87628233   sgn://hi5.com/?pk=87628233

http://lindner.hi5.com/                         sgn://hi5.com/?ident=lindner

http://123455.hi5.com/  sgn://hi5.com/?pk=123455

# usernames must be 6 characters or more:
http://www.hi5.com/  http://www.hi5.com/
http://api.hi5.com/  http://api.hi5.com/


http://www.hi5.com/friend/profile/displayProfile.do?userid=127525866  sgn://hi5.com/?pk=127525866


http://lindner.hi5.com/friend/profile/displayJournal.do?viewother=true&ownerId=87628233  sgn://hi5.com/?pk=87628233

http://lindner.hi5.com/friend/photos/displayUserAlbum.do?viewother=true&ownerId=87628233 sgn://hi5.com/?pk=87628233
http://bradfitz.hi5.com/friend/photos/displayUserAlbum.do?viewother=true&ownerId=87628233 sgn://hi5.com/?pk=87628233


http://lindner.hi5.com/friend/87628233--Paul--Profile-html  sgn://hi5.com/?pk=87628233
http://bradfitz.hi5.com/friend/87628233--Paul--Profile-html  sgn://hi5.com/?pk=87628233


http://lindner.hi5.com/friend/87628233--Paul--Friends-html  sgn://hi5.com/?pk=87628233
http://lindner.hi5.com/friend/profile/displayFriends.do?userid=87628233&offset=24  sgn://hi5.com/?pk=87628233
http://bradfitz.hi5.com/friend/87628233--Paul--Friends-html  sgn://hi5.com/?pk=87628233

# Not lindner:

http://lindner.hi5.com/friend/30399640--Dan--Profile-html   sgn://hi5.com/?pk=30399640

# when logged in:
http://www.hi5.com/friend/profile/displaySameProfile.do?userid=87628233  sgn://hi5.com/?pk=87628233
http://www.hi5.com/friend/profile/displayHi5URL.do?nickname=koolby   sgn://hi5.com/?ident=koolby

http://www.hi5.com/friend/profile/displayHi5URL.do?nickname=bradfitz  sgn://hi5.com/?ident=bradfitz


# pk
content(sgn://hi5.com/?pk=123)  http://www.hi5.com/friend/profile/displayProfile.do?userid=123
profile(sgn://hi5.com/?pk=123)  http://www.hi5.com/friend/profile/displayProfile.do?userid=123
atom(sgn://hi5.com/?pk=123)      http://api.hi5.com/rest/feed/journal/123
foaf(sgn://hi5.com/?pk=87628233)  http://api.hi5.com/rest/profile/foaf/87628233
blog(sgn://hi5.com/?pk=12345)  http://www.hi5.com/friend/profile/displayJournal.do?userid=12345

# ident
content(sgn://hi5.com/?ident=bobfoo)  http://bobfoo.hi5.com/
profile(sgn://hi5.com/?ident=bobfoo)  http://bobfoo.hi5.com/

http://53835694.hi5.com/friend/profile/displayProfile.do  sgn://hi5.com/?pk=53835694

http://bobfoo.hi5.com/friend/p1234--Foo_Bar%20Bar--html  sgn://hi5.com/?pk=1234
http://bobfoo.hi5.com/friend/p5678--Paula--html sgn://hi5.com/?pk=5678
