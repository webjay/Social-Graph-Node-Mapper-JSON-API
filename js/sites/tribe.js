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


__END__

http://people.tribe.net/bayareadj/foaf          sgn://tribe.net/?ident=bayareadj
http://people.tribe.net/bayareadj/              sgn://tribe.net/?ident=bayareadj
http://people.tribe.net/bayareadj               sgn://tribe.net/?ident=bayareadj

http://people.tribe.net/079d0f9a-ed4b-4d2d-8290-a65a3df32342 sgn://tribe.net/?pk=079d0f9a-ed4b-4d2d-8290-a65a3df32342
http://people.tribe.net/079d0f9a-ed4b-4d2d-8290-a65a3df32342/foaf sgn://tribe.net/?pk=079d0f9a-ed4b-4d2d-8290-a65a3df32342
http://people.tribe.net/079d0f9a-ed4b-4d2d-8290-a65a3df32342/blog sgn://tribe.net/?pk=079d0f9a-ed4b-4d2d-8290-a65a3df32342

# bogus URL as seen in the wild
http://www.people.tribe.net/c72b358e-1f53-407e-aa98-5b18c70072e1/blog sgn://tribe.net/?pk=c72b358e-1f53-407e-aa98-5b18c70072e1

foaf(sgn://tribe.net/?ident=bayareadj)          http://people.tribe.net/bayareadj/foaf
foaf(sgn://tribe.net/?pk=079d0f9a-ed4b-4d2d-8290-a65a3df32342) http://people.tribe.net/079d0f9a-ed4b-4d2d-8290-a65a3df32342/foaf

profile(sgn://tribe.net/?ident=bayareadj)          http://people.tribe.net/bayareadj
profile(sgn://tribe.net/?pk=079d0f9a-ed4b-4d2d-8290-a65a3df32342) http://people.tribe.net/079d0f9a-ed4b-4d2d-8290-a65a3df32342
