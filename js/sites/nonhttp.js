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

var XMPP_REGEX = /^(?:xmpp|jabber):(.+)/i;
var MAILTO_REGEX = /^mailto:(.+)/i;

nodemapper.registerNonHTTPHandler(function(url) {
  var m;
  if (m = XMPP_REGEX.exec(url)) {
    return "xmpp:" + m[1].replace(/%40/, "@");
  }
  if (m = MAILTO_REGEX.exec(url)) {
    return "mailto:" + m[1].replace(/%40/, "@");
  }
});

__END__

xmpp:foo%40bar.com    xmpp:foo@bar.com
jabber:foo%40bar.com    xmpp:foo@bar.com
Xmpp:foo@bar.com    xmpp:foo@bar.com
jabber:foo@bar.com    xmpp:foo@bar.com

Mailto:brad%40bar.com   mailto:brad@bar.com

# TODO(bradfitz): skype.  but need to investigate sgn->??? options.
#callto://brad.fitzpatrick  sgn://skype.com/?ident=brad.fitzpatrick
#callto:brad.fitzpatrick    sgn://skype.com/?ident=brad.fitzpatrick
