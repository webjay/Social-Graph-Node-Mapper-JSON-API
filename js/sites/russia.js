/**
 * Copyright 2009 Google Inc.
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

nodemapper.registerDomain(
    "gallery.ru",
    {urlToGraphNode: nodemapper.createUserIsSubdomainHandler("gallery.ru"),
          name: "Gallery.ru"
          });

nodemapper.addSimpleHandler("gallery.ru", "ident_to_foaf",
                            "http://", ".gallery.ru/foaf/");
nodemapper.addSimpleHandler("gallery.ru", "ident_to_profile",
                            "http://", ".gallery.ru/");


// LiveJournal-based site.
nodemapper.registerDomain(
    "blogonline.ru",
    {urlToGraphNode: nodemapper.createUserIsSubdomainHandler("blogonline.ru"),
     name: "blogonline.ru"
          });

nodemapper.addSimpleHandler("blogonline.ru", "ident_to_foaf",
                            "http://", ".blogonline.ru/data/foaf");
nodemapper.addSimpleHandler("blogonline.ru", "ident_to_profile",
                            "http://", ".blogonline.ru/profile");
nodemapper.addSimpleHandler("blogonline.ru", "ident_to_blog",
                            "http://", ".blogonline.ru/");

nodemapper.registerDomain(
    "privet.ru",
    {urlToGraphNode: nodemapper.createSomethingSlashUsernameHandler("user", "privet.ru"),
          name: "privet.ru"
          });

nodemapper.addSimpleHandler("privet.ru", "ident_to_foaf",
                            "http://www.privet.ru/user/", "/foaf");
nodemapper.addSimpleHandler("privet.ru", "ident_to_blog",
                            "http://blogs.privet.ru/user/");
nodemapper.addSimpleHandler("privet.ru", "ident_to_profile",
                            "http://www.privet.ru/user/");


__END__

http://allatigris.gallery.ru/        sgn://gallery.ru/?ident=allatigris
http://allatigris.gallery.ru/foaf/   sgn://gallery.ru/?ident=allatigris
http://allatigris.gallery.ru/?favs=1 sgn://gallery.ru/?ident=allatigris
foaf(sgn://gallery.ru/?ident=allatigris)  http://allatigris.gallery.ru/foaf/
profile(sgn://gallery.ru/?ident=allatigris)  http://allatigris.gallery.ru/

http://www.blogonline.ru/   http://www.blogonline.ru/
http://allis.blogonline.ru/  sgn://blogonline.ru/?ident=allis
foaf(sgn://blogonline.ru/?ident=allis)   http://allis.blogonline.ru/data/foaf
profile(sgn://blogonline.ru/?ident=allis)   http://allis.blogonline.ru/profile
blog(sgn://blogonline.ru/?ident=allis)   http://allis.blogonline.ru/

foaf(sgn://privet.ru/?ident=aleksina_647)    http://www.privet.ru/user/aleksina_647/foaf
blog(sgn://privet.ru/?ident=aleksina_647)    http://blogs.privet.ru/user/aleksina_647
profile(sgn://privet.ru/?ident=aleksina_647)    http://www.privet.ru/user/aleksina_647
