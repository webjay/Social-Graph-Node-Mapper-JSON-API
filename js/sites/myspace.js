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
 * Regular expression for MySpace action paths, capturing the action
 * in $1 and userid in $2.
 *
 * @type RegExp
 */
var ACTION_REGEX = /index\.cfm\?fuseaction=(.+)&friendID=(\d+)/i;


/**
 * Regular expression for MySpace pretty paths, capturing either
 * the userid in $1 or the username in $2 (but not both).  May
 * contain trailing query parameters.
 *
 * @type RegExp
 */
var SLASH_WHATEVER_REGEX = /^\/(\d+)|([a-z]\w*)(?:\?|$)/;


/**
 * MySpace actions which are particular to a user.
 *
 * @type Object
 */
var MYSPACE_USER_ACTIONS = {
  "user.viewprofile": 1,
  "user.viewfriends": 1,
  "blog.listall": 1,
  "blog.confirmsubscribe": 1
};


/**
 * MySpace-specific URL handler
 */
function urlToGraphNodeMySpace(url, host, path) {
  var m = ACTION_REGEX.exec(path);
  if (m) {
    var action = m[1].toLowerCase();
    var userid = m[2];
    if (MYSPACE_USER_ACTIONS[action]) {
      return "sgn://myspace.com/?pk=" + userid;
    }
  }
  if (host == "profile.myspace.com") {
    m = SLASH_WHATEVER_REGEX.exec(path);
    if (m) {
      if (m[1]) {
        return "sgn://myspace.com/?pk=" + m[1];
      }
      if (m[2]) {
        return "sgn://myspace.com/?ident=" + m[2];
      }
    }
  }

  // pass through non-recognized myspace URLs changed
  return url;
};

/**
 * MySpace handler which tries find a /username in
 * the URL, else falling back to the general
 * MySpace parser.
 *
 * @type Function
 */
var urlToGraphNodeMySpaceUsername =
    nodemapper.createSlashUsernameHandler(
        "myspace.com",
        {fallbackHandler: urlToGraphNodeMySpace});


nodemapper.registerDomain(
    "myspace.com",
    {name: "MySpace",
     urlToGraphNode: urlToGraphNodeMySpaceUsername,
     accountToSgn: { pk: ["myspace.com"], ident: ["myspace.com"] }
});

nodemapper.addSimpleHandler(
    "myspace.com", "ident_to_profile",
    "http://www.myspace.com/");

nodemapper.addSimpleHandler(
    "myspace.com", "ident_to_content",
    "http://www.myspace.com/");

nodemapper.addSimpleHandler(
    "myspace.com", "pk_to_profile",
    "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=");

nodemapper.addSimpleHandler(
    "myspace.com", "pk_to_content",
    "http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=");

nodemapper.addSimpleHandler(
    "myspace.com", "pk_to_rss",
    "http://blog.myspace.com/blog/rss.cfm?friendID=");

nodemapper.addSimpleHandler(
    "myspace.com", "pk_to_blog",
    "http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID=");

nodemapper.registerDomain(
    ["profile.myspace.com", "blog.myspace.com"],
    {urlToGraphNode: urlToGraphNodeMySpace});
