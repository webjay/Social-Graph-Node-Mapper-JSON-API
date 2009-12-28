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

nodemapper.registerDomain("friendfeed.com",
{
 name: "FriendFeed",
 urlToGraphNode: nodemapper.createPathRegexpHandler(
     "friendfeed.com", /^\/(\w+)/)
});

nodemapper.addSimpleHandler("friendfeed.com", "ident_to_profile",
    "http://friendfeed.com/");
nodemapper.addSimpleHandler("friendfeed.com", "ident_to_atom",
    "http://friendfeed.com/", "?format=atom");


__END__

http://friendfeed.com/ade       sgn://friendfeed.com/?ident=ade
http://www.friendfeed.com/ade   sgn://friendfeed.com/?ident=ade

http://friendfeed.com/daveman692/comments  sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?num=30  sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=blog sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=digg sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=flickr sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=magnolia sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=pownce sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=twitter sgn://friendfeed.com/?ident=daveman692
http://friendfeed.com/daveman692?service=upcoming sgn://friendfeed.com/?ident=daveman692

profile(sgn://friendfeed.com/?ident=ade)	http://friendfeed.com/ade
atom(sgn://friendfeed.com/?ident=ade)		http://friendfeed.com/ade?format=atom
