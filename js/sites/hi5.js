
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
