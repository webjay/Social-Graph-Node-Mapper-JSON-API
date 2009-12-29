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

meetupHandler = function(url, host, path) {
  var primaryKeyRegexp = /\/members\/(\d+)(?:\/|$)/;
  var m;
  if (!(m = primaryKeyRegexp.exec(path))) {
    return url;
  }
  return "sgn://meetup.com/?pk=" + m[1];
};


nodemapper.registerDomain("meetup.com", {
 name: "Meetup",
 urlToGraphNode: meetupHandler
});

nodemapper.addSimpleHandler("meetup.com", "pk_to_profile",
			    "http://www.meetup.com/members/", "/");
