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

/**
 * Flickr-specific URL handler.
 */
function urlToGraphNodeFlickrFallback(url, host, path) {
  var flickerPathRE = /^\/(?:people|photos)\/(\d+@\w+)(?:\/|$)/;
  var m = flickerPathRE.exec(path);
  if (m) {
      return "sgn://flickr.com/?pk=" + m[1];
  }
  return; // undef
};

var urlToGraphNodeFlickr =
    nodemapper.createPathRegexpHandler(
        "flickr.com",
        /^(?:\/(?:people|photos))?\/([\w\-]+)(?:\/|$)/,
        {fallbackHandler: urlToGraphNodeFlickrFallback,
	 notUsernames: {
		photos: 1,
		groups: 1,
		people: 1,
		search: 1,
		places: 1,
		help: 1,
		services: 1,
		explore: 1,
		groups_topics: 1,
		photo: 1,
		creativecommons: 1,
		commons: 1,
		cameras: 1,
		photo_zoom: 1,
		signin: 1,
		forums: 1,
		apps: 1,
		slideShow: 1,
		map: 1,
		account: 1,
		groups_topic: 1
	    },
         pathTransform: function(path) { return path.replace('%40', '@'); }
        });

nodemapper.registerDomain(
  "flickr.com", {
  name: "Flickr",
  urlToGraphNode: urlToGraphNodeFlickr,
  pkRegexp: /^\d+@\w\d+$/,
  accountToSgn: { pk: ["flickr.com", /^\d+@\w\d+$/],
                  ident: ["flickr.com", /^[\-\w]+$/] }
});

nodemapper.addSimpleHandler("flickr.com", "pk_to_rss",
			    "http://api.flickr.com/services/feeds/photos_public.gne?id=", "&lang=en-us&format=rss_200");
nodemapper.addSimpleHandler("flickr.com", "pk_to_atom",
			    "http://api.flickr.com/services/feeds/photos_public.gne?id=", "&lang=en-us&format=atom");

for (var i = 0; i < 2; i++) {
    var type = ["pk", "ident"][i];
    nodemapper.addSimpleHandler("flickr.com", type + "_to_profile",
				"http://www.flickr.com/people/", "/");
    nodemapper.addSimpleHandler("flickr.com", type + "_to_addfriend",
				"http://www.flickr.com/people/", "/relationship/");
    nodemapper.addSimpleHandler("flickr.com", type + "_to_content",
				"http://www.flickr.com/photos/", "/");
}


__END__

http://www.flickr.com/people/crucially		sgn://flickr.com/?ident=crucially
http://www.flickr.com/people/crucially/		sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially		sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/		sgn://flickr.com/?ident=crucially

http://www.flickr.com/photos/15738836@N00/      sgn://flickr.com/?pk=15738836@N00
http://www.flickr.com/people/15738836@N00/ 	sgn://flickr.com/?pk=15738836@N00

profile(sgn://flickr.com/?ident=crucially)	http://www.flickr.com/people/crucially/
content(sgn://flickr.com/?ident=crucially)	http://www.flickr.com/photos/crucially/
addfriend(sgn://flickr.com/?ident=crucially)	http://www.flickr.com/people/crucially/relationship/

rss(sgn://flickr.com/?pk=15738836@N00)		http://api.flickr.com/services/feeds/photos_public.gne?id=15738836@N00&lang=en-us&format=rss_200
atom(sgn://flickr.com/?pk=15738836@N00)	http://api.flickr.com/services/feeds/photos_public.gne?id=15738836@N00&lang=en-us&format=atom

content(sgn://flickr.com/?pk=15738836@N00)   http://www.flickr.com/photos/15738836@N00/
profile(sgn://flickr.com/?pk=15738836@N00)   http://www.flickr.com/people/15738836@N00/

http://www.flickr.com/photos/84536344%40N00/  sgn://flickr.com/?pk=84536344@N00

# matches nothing:
pair(flickr.com,brad@danga.com)   

# hyphenated stuff:
http://www.flickr.com/people/hyph-enated       sgn://flickr.com/?ident=hyph-enated
content(sgn://flickr.com/?ident=hyph-enated)   http://www.flickr.com/photos/hyph-enated/

# With trailing stuff:
http://flickr.com/photos/15738836@N00/with/3026663345/ sgn://flickr.com/?pk=15738836@N00
http://flickr.com/photos/15738836@N00/page3/           sgn://flickr.com/?pk=15738836@N00
http://www.flickr.com/people/15738836@N00/contacts     sgn://flickr.com/?pk=15738836@N00
http://flickr.com/photos/crucially/with/3026663345/    sgn://flickr.com/?ident=crucially
http://flickr.com/photos/crucially/page3/              sgn://flickr.com/?ident=crucially
http://www.flickr.com/people/crucially/contacts        sgn://flickr.com/?ident=crucially
http://www.flickr.com/people/crucially/contacts/?page=2&filter=default sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/sets/        sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/favorites/        sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/page2/        sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/map/        sgn://flickr.com/?ident=crucially
http://www.flickr.com/photos/crucially/show/        sgn://flickr.com/?ident=crucially

# Redirect short URL:
http://flickr.com/hyph-enated  sgn://flickr.com/?ident=hyph-enated
http://flickr.com/bob  sgn://flickr.com/?ident=bob

# These aren't usernames:
http://flickr.com/photos http://flickr.com/photos
http://flickr.com/groups http://flickr.com/groups
http://flickr.com/search http://flickr.com/search
http://flickr.com/places http://flickr.com/places
http://flickr.com/people http://flickr.com/people
http://flickr.com/photo http://flickr.com/photo
http://flickr.com/explore http://flickr.com/explore
http://flickr.com/photo_zoom http://flickr.com/photo_zoom
http://flickr.com/commons http://flickr.com/commons
http://flickr.com/services http://flickr.com/services
http://flickr.com/groups_topics http://flickr.com/groups_topics

