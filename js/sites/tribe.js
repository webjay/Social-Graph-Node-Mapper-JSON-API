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

tribePkHandler = function(url, host, path) {
  var primaryKeyRegexp = /^\/([\w\-]{36})(?:\/(?:foaf|blog)|\/$|$)/;
  var m;
  if (!(m = primaryKeyRegexp.exec(path))) {
    return url;
  }
  return "sgn://tribe.net/?pk=" + m[1].toLowerCase();
};


tribeIdentHandler = nodemapper.createPathRegexpHandler(
    "tribe.net",
    /^\/(\w+)(?:\/(?:foaf|blog)|\/$|$)/,
  { fallbackHandler: tribePkHandler }
    );


nodemapper.registerDomain("tribe.net", {
 name: "Tribe.net",
 pkRegexp: /^[\w\-]{36}$/,
 identRegexp: /^\w+$/
});

nodemapper.registerDomain("people.tribe.net", {
 urlToGraphNode: tribeIdentHandler
});

nodemapper.addSimpleHandler("tribe.net", "ident_to_foaf",
			    "http://people.tribe.net/", "/foaf");

nodemapper.addSimpleHandler("tribe.net", "pk_to_foaf",
			    "http://people.tribe.net/", "/foaf");

nodemapper.addSimpleHandler("tribe.net", "ident_to_profile",
			    "http://people.tribe.net/");

nodemapper.addSimpleHandler("tribe.net", "pk_to_profile",
			    "http://people.tribe.net/");

