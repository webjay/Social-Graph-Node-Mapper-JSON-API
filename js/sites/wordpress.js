// -*-java-*-

/**
 * Copyright 2009 Google Inc.
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

var DOMAIN_RE = /^(?:www\.)?([\w\-]+)\.wordpress\.com$/;

function wordpressHandler(url, host, path) {
  var m = DOMAIN_RE.exec(host);
  var ident = m ? m[1].toLowerCase() : "";
  if (!m || ident == "www" || ident.length == 2 ||
      (ident.length == 5 && ident.substr(2, 1) == "-")) {
    // Language or "www" subdomain.  Front-page, not user page.
    return url;
  }
  return "sgn://wordpress.com/?ident=" + ident;
}

nodemapper.registerDomain(
    "wordpress.com",
    {name: "WordPress",
     skipAutomaticHttpToSgn: true,
     urlToGraphNode: wordpressHandler});

nodemapper.addSimpleHandler("wordpress.com", "ident_to_blog",
			    "http://", ".wordpress.com/");

__END__

http://foo.wordpress.com/  sgn://wordpress.com/?ident=foo
http://www.foo.wordpress.com/  sgn://wordpress.com/?ident=foo
http://pt-br.wordpress.com/   http://pt-br.wordpress.com/
http://de.wordpress.com/   http://de.wordpress.com/
blog(sgn://wordpress.com/?ident=foo) http://foo.wordpress.com/
