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

// $1: first slash word in URL
// $2: second part
var SLASH_WORD_MAYBEWORD = /^\/(\w+)(?:\/(\w+))?(?:\/|$)/;

var SLASH_PK_REGEXP = /\b(\d+\@Z\d\d)\b/;

var userFirstPaths = {
  'people': 1,
  'photos': 1,
  'zipline': 1
};

var userSecondPaths = {
    'fans': 1,
    'statuses': 1,
    'favorites': 1,
    'mutual': 1,
    'with_friends': 1
};

var toSgn = function(url, host, path) {
  var m;
  if (m = SLASH_PK_REGEXP.exec(path)) {
    return  "sgn://zooomr.com/?pk=" + m[1];
  }
  if (!(m = SLASH_WORD_MAYBEWORD.exec(path))) {
    return url;
  }
  if (userFirstPaths[m[1]]) {
    if (!m[2]) {
      return url;
    }
    return "sgn://zooomr.com/?ident=" + m[2].toLowerCase();
  }
  if (!m[2] || userSecondPaths[m[2]] || m[2].substr(0, 4) == "page") {
    return "sgn://zooomr.com/?ident=" + m[1].toLowerCase();
  }
  return url;
};

nodemapper.registerDomain("zooomr.com",
  {name: "Zooomr",
   urlToGraphNode: toSgn,
   pkRegexp: /^\d+\@Z\d\d$/

});

nodemapper.addSimpleHandler("zooomr.com", "ident_to_profile",
    "http://www.zooomr.com/people/", "/");
nodemapper.addSimpleHandler("zooomr.com", "ident_to_content",
    "http://www.zooomr.com/photos/", "/");
nodemapper.addSimpleHandler("zooomr.com", "ident_to_rss",
    "http://www.zooomr.com/services/feeds/public_photos/?id=",
    "&format=rss_200");

nodemapper.addSimpleHandler("zooomr.com", "pk_to_profile",
    "http://www.zooomr.com/people/", "/");
nodemapper.addSimpleHandler("zooomr.com", "pk_to_content",
    "http://www.zooomr.com/photos/", "/");
nodemapper.addSimpleHandler("zooomr.com", "pk_to_rss",
    "http://www.zooomr.com/services/feeds/public_photos/?id=",
    "&format=rss_200");
