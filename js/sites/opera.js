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

__END__

http://my.opera.com/jsmarr sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/jsmarr/ sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/jSMArr/ sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/jsmarr/about sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/jsmarr/info/ sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/jsmarr/xml/foaf/ sgn://my.opera.com/?ident=jsmarr
http://my.opera.com/1966/xml/foaf/ sgn://my.opera.com/?ident=1966
profile(sgn://my.opera.com/?ident=jsmarr) http://my.opera.com/jsmarr/about/
profile(sgn://my.opera.com/?ident=1966) http://my.opera.com/1966/about/
foaf(sgn://my.opera.com/?ident=jsmarr) http://my.opera.com/jsmarr/xml/foaf/

http://my.opera.com/%3EFoo/ sgn://my.opera.com/?ident=%3efoo
http://my.opera.com/.:Foo%20Bar:./ sgn://my.opera.com/?ident=.:foo%20bar:.

http://my.opera.com/Milla***/xml/foaf  sgn://my.opera.com/?ident=milla***
http://my.opera.com/Molly-Jayne/xml/foaf sgn://my.opera.com/?ident=molly-jayne
foaf(sgn://my.opera.com/?ident=molly-jayne) http://my.opera.com/molly-jayne/xml/foaf/
