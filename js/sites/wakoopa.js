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

var SOFTWARE_REGEXP = /^\/software\/([\w-]+)/;
var USER_REGEXP = /^\/(\w+)(?:\/|$)/;

var toSgn = function(url, host, path) {
    var m;
    if (m = SOFTWARE_REGEXP.exec(path)) {
        return "sgn://software.wakoopa.com/?ident=" + m[1].toLowerCase();
    }
    if (m = USER_REGEXP.exec(path)) {
        return "sgn://wakoopa.com/?ident=" + m[1].toLowerCase();
    }
    return url;
};

nodemapper.registerDomain("wakoopa.com", {
  name: "Wakoopa",
  urlToGraphNode: toSgn
});

nodemapper.registerDomain("software.wakoopa.com", {
  name: "Wakoopa Software",
  notMassMarketSite: true,
  identRegexp: /^[\w-]+$/
});

nodemapper.addSimpleHandler("wakoopa.com", "ident_to_profile",
    "http://wakoopa.com/");
nodemapper.addSimpleHandler("software.wakoopa.com", "ident_to_profile",
    "http://wakoopa.com/software/");
