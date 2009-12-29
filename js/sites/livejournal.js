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


/**
 * Regular expression for user URLs hosted on www.livejournal.com or
 * livejournal.com.
 *
 * @type RegExp
 */
var LJCOM_MAIN_DOMAIN_REGEX = /^\/(?:~|users\/|community\/)(\w+)(?:\/|$)/;


/**
 * Regular expression for the old URL of profile pages hosted on
 * www.livejournal.com or livejournal.com.  Nowadays they redirect.
 *
 * @type RegExp
 */
var LJCOM_USERINFO_BML_REGEX = /^\/userinfo\.bml\?(user|userid)=(\w+)/;


/**
 * Regular expression for the previous/next links between blog
 * entries, and old entry URLs.
 *
 * @type RegExp
 */
var LJCOM_MISC_BML_REGEX = /^\/(?:go|talkread)\.bml\?.*\bjournal=(\w+)/;


/**
 * Regular expression for the fdata (friend data) endpoint.
 *
 * @type RegExp
 */
var LJCOM_MISC_FDATA_REGEX = /^\/misc\/fdata2?\.bml\?.*\buser=(\w+)/;


/**
 * Handler for URLs on 'users.' or 'community.' subdomains.
 *
 * @type Function
 */
var urlToGraphNodeUsersCommunity = function(url, host, path) {
  var slashUserMaybeProfile = /^\/(\w+)(?:\/|\/profile|$)/;
  var m;
  if (!(m = slashUserMaybeProfile.exec(path))) {
    return url;
  }
  return "sgn://livejournal.com/?ident=" + m[1].toLowerCase();
};


nodemapper.registerDomain(["users.livejournal.com",
                           "community.livejournal.com"],
                          {urlToGraphNode:urlToGraphNodeUsersCommunity});


/**
 * Handler for URLs on all other livejournal domains which aren't
 * otherwise handled by urlToGraphNodeUsersCommunity.
 *
 * @type Function
 */
var urlToGraphNodeGeneral = function(url, host, path) {
  var m;

  // If we're getting a pics URL at this point, that just means the pics-specific
  // one already failed, so we want to fail here too.
  if (host == "pics.livejournal.com") {
    return url;
  }

  if (host == "www.livejournal.com" || host == "livejournal.com") {
    if (m = LJCOM_MAIN_DOMAIN_REGEX.exec(path)) {
      return "sgn://livejournal.com/?ident=" + m[1].toLowerCase();
    }

    if (m = LJCOM_USERINFO_BML_REGEX.exec(path)) {
      if (m[1] == "user") {
        return "sgn://livejournal.com/?ident=" + m[2].toLowerCase();
      } else {
        return "sgn://livejournal.com/?pk=" + m[2];
      }
    }

    if (m = LJCOM_MISC_BML_REGEX.exec(path)) {
      return "sgn://livejournal.com/?ident=" + m[1].toLowerCase();
    }

    if (m = LJCOM_MISC_FDATA_REGEX.exec(path)) {
      return "sgn://livejournal.com/?ident=" + m[1].toLowerCase();
    }

    // fall through... couldn't match
    return url;
  }

  var hostparts = host.split(".");
  var user = hostparts[0].replace(/-/g, "_");
  return "sgn://livejournal.com/?ident=" + user;
};

var journalBase = function (ident) {
    if (ident.indexOf("_") == 0) {
	return "http://www.livejournal.com/~" + ident + "/";
    }
    return "http://" + ident.replace("_", "-") + ".livejournal.com/";
};

var appendToBase = function (suffix) {
    return function(ident) { return journalBase(ident) + suffix; };
};

var identToContent = journalBase;
var identToRss = appendToBase("data/rss");
var identToAtom = appendToBase("data/atom");
var identToFoaf = appendToBase("data/foaf");
var identToProfile = appendToBase("profile");
var identToOpenid = journalBase;

nodemapper.registerDomain("livejournal.com",
                          {urlToGraphNode: urlToGraphNodeGeneral,
			  ident_to_content: identToContent,
			  ident_to_rss: identToRss,
			  ident_to_atom: identToAtom,
			  ident_to_foaf: identToFoaf,
			  ident_to_profile: identToProfile,
			  ident_to_openid: identToOpenid,
 	 	          identRegexp: /^\w+$/,
                          name: "LiveJournal"
			 });

nodemapper.registerDomain(
    "pics.livejournal.com",
    {urlToGraphNode: nodemapper.createSlashUsernameHandler(
          "livejournal.com",
          { slashAnything: 1 })});
