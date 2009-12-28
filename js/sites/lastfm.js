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

////////////////////////////////////////////////////////////////////////////
// Last.fm
//
// Although they have many domains, they appear to all be in the same namespace,
// with possible friendships between all domains.  So we map them all into
// last.fm.  In the future we'll keep track of where we tend to see a user most,
// and put that in node metadata, so when we link _back_ to an http:// URL for
// an sgn:// URL, we map back to the preferred domain.
//
////////////////////////////////////////////////////////////////////////////

/**
 * Domains that last.fm runs on
 *
 * @type Array.<String>
 */
var LAST_FM_ALT_DOMAINS = [
  "cn.last.fm",
  "lastfm.excite.co.jp",
  "lastfm.spiegel.de",
  "www.last.fm",
  "www.lastfm.com.br",
  "www.lastfm.at",
  "www.lastfm.ch",
  "www.lastfm.co.kr",
  "www.lastfm.com.br",
  "www.lastfm.com.tr",
  "www.lastfm.de",
  "www.lastfm.es",
  "www.lastfm.fr",
  "www.lastfm.it",
  "www.lastfm.jp",
  "www.lastfm.pl",
  "www.lastfm.pt",
  "www.lastfm.ru",
  "www.lastfm.se"
];

var lastFmHttpToSgn = nodemapper.createPathRegexpHandler(
    "last.fm", /^\/user\/([\w\-]+)(?:\/|$)/);

nodemapper.registerDomain(
    "last.fm",
    {name: "Last.fm",
     urlToGraphNode: lastFmHttpToSgn});

nodemapper.registerDomain(
    LAST_FM_ALT_DOMAINS,
    {urlToGraphNode: lastFmHttpToSgn});

nodemapper.addSimpleHandler("last.fm", "ident_to_profile",
			    "http://www.last.fm/user/", "/");

__END__

http://www.last.fm/user/aa123/             sgn://last.fm/?ident=aa123
http://www.last.fm/user/aa123              sgn://last.fm/?ident=aa123
http://lastfm.excite.co.jp/user/SomeCaps/  sgn://last.fm/?ident=somecaps
http://www.last.fm/user/after/addedevents/ sgn://last.fm/?ident=after
http://www.lastfm.pl/user/foo/?setlang=pl  sgn://last.fm/?ident=foo

http://www.lastfm.com.br/user/Steph-Tara/?setlang=tr  sgn://last.fm/?ident=steph-tara
http://www.lastfm.com.tr/user/Steph-Tara/charts/?setlang=tr sgn://last.fm/?ident=steph-tara
http://cn.last.fm/user/Steph-Tara/neighbours/  sgn://last.fm/?ident=steph-tara

profile(sgn://last.fm/?ident=foo)              http://www.last.fm/user/foo/
