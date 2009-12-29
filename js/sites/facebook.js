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

var FACEBOOK_ALT_DOMAINS = [
    "facebook.at",
    "facebook.ca",
    "facebook.co.nz",
    "facebook.co.za",
    "facebook.com.au",
    "facebook.de",
    "facebook.dk",
    "facebook.es",
    "facebook.ie",
    "facebook.jp",
    "facebook.net.nz",
    "facebook.no",
    "facebook.pl",
    "facebook.se",
    "facebook.vn"
];

// $1: facebook ID (pk)
var PRIVATE_PROFILE_RE = /^(?:\/home\.php\#)?\/profile\.php\?id=(\d+)/;

// $1: "First_Last/ID" (ident, form 1 for facebook)
var PUBLIC_PROFILE_RE = /^\/(?:p|people)\/([^\/]+\/(\d+))/;

// $1: "sarahpalin" (ident, form 2 for facebook)
var USERNAME_RE = /^\/(\w[\w\.\-]{2,30}\w)(?:$|[\/\?])/;

var NOT_USERNAME = {
  people: 1,
  pages: 1,
  directory: 1,
  video: 1,
  apps: 1,
  discography: 1,
  networks: 1,
  help: 1,
  applications: 1,
  reviews: 1,
  ext: 1,
  marketplace: 1
};

var facebookHandler = function(url, host, path) {
  var m;
  if (m = PRIVATE_PROFILE_RE.exec(path)) {
    return "sgn://facebook.com/?pk=" + m[1];
  }
  if (m = PUBLIC_PROFILE_RE.exec(path)) {
    return "sgn://facebook.com/?ident=" + m[1];
  }
  if (m = USERNAME_RE.exec(path)) {
    if (m[1].lastIndexOf(".php") == m[1].length - 4 ||
        NOT_USERNAME[m[1].toLowerCase()]) {
      return url;
    }
    return "sgn://facebook.com/?ident=" + m[1].toLowerCase().replace(/[\-\.]/g, "");
  }
  return url;
};


nodemapper.registerDomain(
    FACEBOOK_ALT_DOMAINS,
    { urlToGraphNode: facebookHandler });

nodemapper.registerDomain(
    "facebook.com",
    {name: "Facebook",
     urlToGraphNode: facebookHandler,
     ident_to_profile: function (ident) {
        if (/\//.exec(ident)) {
          return "http://www.facebook.com/people/" + ident;
        } else {
          return "http://www.facebook.com/" + ident;
        }
      },
     pk_to_profile: function (pk) { return "http://www.facebook.com/profile.php?id=" + pk; },
     pkRegexp: /^\d+$/,
     identRegexp: /^(?:.+\/\d+)|(?:\w[\w\.\-]{2,30}\w)$/,
     identCasePreserve: 1
     });
