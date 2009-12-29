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

var IDENT_REGEXP = /^[\w\-\%\.\:\*]+$/;

var SLASH_WHATEVER = /^\/([^\/]+)(?:\/|$)/;

var toSgn = function(url, host, path) {
  var m;
  if (!(m = SLASH_WHATEVER.exec(path))) {
    return;
  }
  var username = m[1];
  if (!(m = IDENT_REGEXP.exec(username))) {
    return url;
  }
  return "sgn://my.opera.com/?ident=" + username.toLowerCase();
};

nodemapper.registerDomain("my.opera.com", {
  name: "My Opera",
  identRegexp: IDENT_REGEXP,
  // HACK: numbers are valid usernames, so make this never match
  // proper fix would be to explicitly undefine/cancel matching as pk,
  // which we can't currently do because the base class backs off to \d+
  pkRegexp: /^ dontmatchme $/,
  urlToGraphNode: toSgn
});

nodemapper.addSimpleHandler("my.opera.com", "ident_to_profile",
                            "http://my.opera.com/", "/about/");

nodemapper.addSimpleHandler("my.opera.com", "ident_to_foaf",
                            "http://my.opera.com/", "/xml/foaf/");
