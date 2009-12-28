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

var FRIENDS_API1_RE = /^\/friends\/ids\/(\w+)\.(?:xml|json)/;
var FRIENDS_API2_RE = /^\/friends\/ids\.(?:xml|json)\?screen_name=(\w+)/;
var twitterFallbackHandler = function(url, host, path) {
  var m;
  if ((m = FRIENDS_API1_RE.exec(path)) ||
      (m = FRIENDS_API2_RE.exec(path))) {
    var username = m[1].toLowerCase();
    return "sgn://twitter.com/?ident=" + username;
  }
  return url;
};

var NOT_USERNAMES = {
  "statuses": 1,
  "friends": 1
};

nodemapper.registerDomain(
    "twitter.com",
    { httpsLikeHttp: 1,
      name: "Twitter",
      accountToSgn: { pk: ["twitter.com"], ident: ["twitter.com"] },
      notUsernames: NOT_USERNAMES,
      urlToGraphNode: nodemapper.createSlashUsernameHandler(
          "twitter.com",
          {slashAnything: 1,
           notUsernames: NOT_USERNAMES,
           fallbackHandler: twitterFallbackHandler
	  })
   });


nodemapper.addSimpleHandler("twitter.com", "ident_to_profile",
    "http://twitter.com/");
nodemapper.addSimpleHandler("twitter.com", "ident_to_rss",
    "http://twitter.com/statuses/user_timeline/", ".rss");
nodemapper.addSimpleHandler("twitter.com", "ident_to_atom",
    "http://twitter.com/statuses/user_timeline/", ".atom");

nodemapper.addSimpleHandler("twitter.com", "pk_to_rss",
    "http://twitter.com/statuses/user_timeline/", ".rss");
nodemapper.addSimpleHandler("twitter.com", "pk_to_atom",
    "http://twitter.com/statuses/user_timeline/", ".atom");
