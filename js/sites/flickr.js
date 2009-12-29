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
