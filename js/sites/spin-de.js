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

spinPkHandler = function(url, host, path) {
  var primaryKeyRegexp = /^\/(?:hp|foaf)\/,([0-9a-fA-F]+)($|\/)/;
  var m;
  if (!(m = primaryKeyRegexp.exec(path))) {
    return url;
  }
  return "sgn://spin.de/?pk=" + m[1].toLowerCase();
};


spinIdentHandler = nodemapper.createPathRegexpHandler(
    "spin.de",
    /^\/(?:hp|foaf)\/([^\/,]+)/,
  { fallbackHandler: spinPkHandler,
    casePreserve: 0
  });


nodemapper.registerDomain("spin.de", {
    name: "spin.de",
    urlToGraphNode: spinIdentHandler,
    pkRegexp: /^,[0-9a-fA-F]+$/,
    identRegexp: /^\w+$/
});

nodemapper.addSimpleHandler("spin.de", "ident_to_foaf",
			    "http://www.spin.de/foaf/", "");

nodemapper.addSimpleHandler("spin.de", "pk_to_foaf",
			    "http://www.spin.de/foaf/,", "");

nodemapper.addSimpleHandler("spin.de", "ident_to_profile",
			    "http://www.spin.de/hp/", "/");

nodemapper.addSimpleHandler("spin.de", "pk_to_profile",
			    "http://www.spin.de/hp/,", "/");

nodemapper.addSimpleHandler("spin.de", "ident_to_blog",
			    "http://www.spin.de/hp/", "/blog");

nodemapper.addSimpleHandler("spin.de", "pk_to_blog",
			    "http://www.spin.de/hp/,", "/blog");

__END__

# Note: the pair tests need to come first, to signal to the test harness
# that we're explicitly testing the pair stuff, otherwise the implicit
# pair testing will run on all our other tests, and spin.de will fail,
# because given just "62b", it's ambiguous whether that is a pk= or
# and ident=.
pair(spin.de,Warp)                 sgn://spin.de/?ident=warp

http://www.spin.de/hp/Warp                      sgn://spin.de/?ident=warp
http://www.spin.de/hp/warp                      sgn://spin.de/?ident=warp
http://www.spin.de/hp/Warp/                     sgn://spin.de/?ident=warp
http://www.spin.de/hp/Warp/blog                 sgn://spin.de/?ident=warp
http://www.spin.de/foaf/Warp                    sgn://spin.de/?ident=warp
http://www.spin.de/hp/xITO!!!/                  sgn://spin.de/?ident=xito!!!
http://www.spin.de/hp/*xordon*/                 sgn://spin.de/?ident=*xordon*

http://www.spin.de/hp/,62b                      sgn://spin.de/?pk=62b
http://www.spin.de/hp/,62b/blog                 sgn://spin.de/?pk=62b

foaf(sgn://spin.de/?ident=warp)                 http://www.spin.de/foaf/warp
foaf(sgn://spin.de/?pk=62b)                     http://www.spin.de/foaf/,62b

profile(sgn://spin.de/?ident=warp)              http://www.spin.de/hp/warp/
blog(sgn://spin.de/?ident=warp)                 http://www.spin.de/hp/warp/blog
