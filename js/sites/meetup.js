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

__END__

http://www.meetup.com/members/2949792/                 sgn://meetup.com/?pk=2949792
http://coffee.meetup.com/171/members/2949792/?gj=sj3   sgn://meetup.com/?pk=2949792
http://coffee.meetup.com/171/members/2949792/          sgn://meetup.com/?pk=2949792

http://www.meetup.com/members/65         sgn://meetup.com/?pk=65
http://www.meetup.com/members/65/        sgn://meetup.com/?pk=65
http://MEETup.com/members/65             sgn://meetup.com/?pk=65
http://meetup.com/members/65/            sgn://meetup.com/?pk=65
profile(sgn://meetup.com/?pk=65)         http://www.meetup.com/members/65/
