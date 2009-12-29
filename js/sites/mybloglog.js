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

var BUZZ_MEMBER_REGEXP = /^\/buzz\/members\/(?:mybloglog([0-9a-f]{20,20})|([\w\-]+))(?:\/|$)/;

var toSgn = function(url, host, path) {
  var m;
  if (!(m = BUZZ_MEMBER_REGEXP.exec(path))) {
    return url;
  }
  if (m[1]) {
    return "sgn://mybloglog.com/?pk=" + m[1].toLowerCase();
  } else {
    return "sgn://mybloglog.com/?ident=" + m[2].toLowerCase();
  }

};

var PK_REGEXP = /^(?:mybloglog)?([0-9a-f]{20,20})$/;

nodemapper.registerDomain("mybloglog.com", {
  urlToGraphNode: toSgn,
  accountToSgn: { pk: ["mybloglog.com", PK_REGEXP],
                  ident: ["mybloglog.com", /^[\w-]+$/] },
  pkRegexp: PK_REGEXP,
  name: "MyBlogLog"
});

nodemapper.addSimpleHandler("mybloglog.com", "ident_to_foaf",
                            "http://www.mybloglog.com/buzz/members/", "/foaf");
nodemapper.addSimpleHandler("mybloglog.com", "ident_to_profile",
                            "http://www.mybloglog.com/buzz/members/", "/");

nodemapper.addSimpleHandler("mybloglog.com", "pk_to_foaf",
                            "http://www.mybloglog.com/buzz/members/mybloglog", "/foaf");
nodemapper.addSimpleHandler("mybloglog.com", "pk_to_profile",
                            "http://www.mybloglog.com/buzz/members/mybloglog", "/");
