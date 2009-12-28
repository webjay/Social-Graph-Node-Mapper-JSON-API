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
 * Regular expression for AOL's aim: URL scheme.
 *
 * @type RegExp
 */
var AIM_REGEX = /^aim:(?:goim\?(?:message=[^&\s]+&)?screenname=)?([%\w \+]+)$/i;

nodemapper.registerNonHTTPHandler(function(url) {
  var m = AIM_REGEX.exec(url);
  if (m) {
    var screenname = m[1].toLowerCase().replace(/(?:[\s\+]|%20)/g, "");
    return "sgn://aol.com/?ident=" + screenname;
  }
});


nodemapper.registerDomain(["openid.aol.com", "profiles.aim.com"], {
 urlToGraphNode: nodemapper.createSlashUsernameHandler("aol.com")
});


var aimPagesHandler = function(url, host, path) {
  var slashProfile = /^\/{1,2}([\w\+]+)(?:\/(?:profile\.html)?|$)/;
  var m;
  if (!(m = slashProfile.exec(path)))
  return url;
  return "sgn://aol.com/?ident=" + m[1].toLowerCase().replace(/[\s\+]/g, "");
};


nodemapper.registerDomain(
    "aimpages.com",
    {urlToGraphNode: aimPagesHandler});


nodemapper.registerDomain(
   "aol.com",
{
 name: "AIM/AOL",
 identRegexp: /^\w+$/,
 ident_to_openid: function (ident) { return "http://openid.aol.com/" + ident; },
 ident_to_chat: function (ident) { return "aim:GoIM?screenname=" + ident; },
 ident_to_profile: function (ident) {
   return "http://profiles.aim.com/" + ident;
 }
});

// TODO(jsmarr): unify this with core AOL.com sgn?
// But then how can I specify these custom profile/atom handlers?
nodemapper.registerDomain("pictures.aol.com",
  {name: "AOL Pictures",
   urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler("galleries",
      "pictures.aol.com")});
nodemapper.addSimpleHandler("pictures.aol.com", "ident_to_profile",
      "http://pictures.aol.com/galleries/");
nodemapper.addSimpleHandler("pictures.aol.com", "ident_to_atom",
      "http://pictures.aol.com/galleries/", "/atom.xml");

__END__

aim:goim?message=Hi!+I+found+you+on+Xxxx...&screenname=Foo%20Bar sgn://aol.com/?ident=foobar
aim:GoIM?screenname=fooBar			sgn://aol.com/?ident=foobar
aim:goim?Screenname=foo+Bar			sgn://aol.com/?ident=foobar
aim:goim?screenname=foo%20bar                   sgn://aol.com/?ident=foobar
aim:fooBar					sgn://aol.com/?ident=foobar
aim:foo+Bar					sgn://aol.com/?ident=foobar
http://www.aimpages.com/foobar/profile.html	sgn://aol.com/?ident=foobar
http://www.aimpages.com//foobar/profile.html	sgn://aol.com/?ident=foobar
http://www.aimpages.com/foobar/		sgn://aol.com/?ident=foobar
http://www.aimpages.com/foo+bar/		sgn://aol.com/?ident=foobar
http://www.aimpages.com/foobar		sgn://aol.com/?ident=foobar
http://openid.aol.com/foobar			sgn://aol.com/?ident=foobar
http://openid.aol.com/foobar/		sgn://aol.com/?ident=foobar

http://profiles.aim.com/foobar          sgn://aol.com/?ident=foobar

openid(sgn://aol.com/?ident=foobar)		http://openid.aol.com/foobar
chat(sgn://aol.com/?ident=foobar)		aim:GoIM?screenname=foobar
profile(sgn://aol.com/?ident=foobar)		http://profiles.aim.com/foobar

http://pictures.aol.com/galleries/josephsmarr sgn://pictures.aol.com/?ident=josephsmarr
profile(sgn://pictures.aol.com/?ident=josephsmarr) http://pictures.aol.com/galleries/josephsmarr
atom(sgn://pictures.aol.com/?ident=josephsmarr) http://pictures.aol.com/galleries/josephsmarr/atom.xml
