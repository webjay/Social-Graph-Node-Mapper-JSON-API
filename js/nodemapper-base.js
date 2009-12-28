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
 */


/**
 * @fileoverview Maps URLs to/from socialgraph identifiers.
 * @author Brad Fitzpatrick (bradfitz@google.com)
 */


/**
 * The namespace object for all other node mapper methods and
 * registration data from site handlers.
 *
 * @type Object
 */
nodemapper = {};


/**
 * Default regular expressions used if a domain is registered
 * without specifying their own.
 */

nodemapper.IDENT_REGEXP = /^\w*[a-zA-Z]+\w*$/;
nodemapper.PK_REGEXP = /^\d+$/;

nodemapper.pkRegexp = function(handler) {
    return handler.pkRegexp ? handler.pkRegexp : nodemapper.PK_REGEXP;
};

nodemapper.identRegexp = function(handler) {
    return handler.identRegexp ? handler.identRegexp : nodemapper.IDENT_REGEXP;
};

/**
 * Mapping of domain names to handler objects, maintained by
 * NodeMapper.registerDomain().
 *
 * @see NodeMapper#registerDomain
 * @type Object
 */
nodemapper.handlers = {};


/**
 * Register a handler for a domain.
 *
 * @param {String|Array.<String>} domain Domain name (e.g. "foo.com.cn",
 *     "myspace.com") or an array of domain names to register handlers for.
 *
 * @param {Object} handler Object with functions as properties:
 *     'urlToGraphNode': function(url,host,path) -> ident/URL (more coming
 *     in the future).  A handler deals with parsing a URL to an sgn://
 *     URL, and also mapping from sgn:// URLs back to different classes of
 *     http:// URLs for that sgn:// resource.
 *     'caseSensitiveIdent': if true, username is case-sensitive.
 *     'pk_to_foo': function that maps primary key to 'foo' http URL
 *     'ident_to_foo': function that maps primary key to 'foo' http URL
 *     'identRegexp'
 *     'pkRegexp'
 *     'httpsLikeHttp': bool.  if true, https should be treated like http.
 */
nodemapper.registerDomain = function(domain, handler) {
  if (!handler.identRegexp) {
    handler.identRegexp = nodemapper.IDENT_REGEXP;
  }
  if (!handler.pkRegexp) {
    handler.pkRegexp = nodemapper.PK_REGEXP;
  }
  if (domain instanceof Array) {
    for (var i = 0; i < domain.length; i++) {
      nodemapper.handlers[domain[i]] = handler;
    }
  } else {
    nodemapper.handlers[domain] = handler;
  }
};


/**
 * Registers a simple sgn:// to http:// handler for a domain,
 * auto-generating a handler function which simply appends
 * its argument (a primary key or identifier) to your provided
 * prefix.
 *
 * @param {String} domain Domain name (e.g. "myspace.com")
 *
 * @param {String} handlerName Name of handler (e.g. "pk_to_rss")
 *
 * @param {String} prefix Prefix that goes before the pk= or ident=
 *                        value of the sgn:// node, when generating
 *                        the http:// URL.
 *
 * @param {String} suffix Suffix that goes after the pk= or ident=
 *                        value of the sgn:// node, when generating
 *                        the http:// URL.
 */
nodemapper.addSimpleHandler = function(domain, handlerName,
				       prefix, suffix) {
    var handlers = nodemapper.handlers[domain];
    if (!handlers) {
	handlers = nodemapper.handlers[domain] = {};
    }
    if (!suffix) { suffix = ""; }

    var sgnType;
    var m;
    if (m = /^(ident|pk)_to_/.exec(handlerName)) {
	sgnType = m[1];
    }
    
    if (!handlers.sgnToHttpPatterns) {
	handlers.sgnToHttpPatterns = [];
    }
    handlers.sgnToHttpPatterns.push([prefix, suffix, sgnType]);

    handlers[handlerName] = function (pk_or_ident) {
	return prefix + pk_or_ident + suffix;
    };
};


/**
 * Regular expression to test if URL is http or https, capturing: 1) the scheme,
 * 2) the domain (including port) and 3) the path, if any.
 *
 * @type RegExp
 */
nodemapper.HTTP_REGEX = new RegExp("^(https?)://([^/]+)(.*)");


/**
 * Returns a social graph URL (sgn://) for a given URL.
 * This is the main entry point from C++/Java/Perl/etc.
 * If the URL isn't recognized as having a site-specific
 * parser, the URL is returned unchanged.
 *
 * @param {String} url URL of (presumably) a person
 * @return {String} Clean socialgraph sgn:// URL, if URL type is
 *     known, else same URL back.
 */
nodemapper.urlToGraphNode = function(url) {
  var m = nodemapper.HTTP_REGEX.exec(url);
  if (!m) {
    // non-HTTP is rare; pass it to separate handler.  the rest
    // of this function deals with HTTP specifically
    return nodemapper.urlToGraphNodeNotHTTP(url);
  }
  var scheme = m[1];
  var host = m[2].toLowerCase();
  var path = m[3];

  // from user.site.co.uk, lookup handlers for
  // "user.site.co.uk", "site.co.uk", "co.uk", "uk"
  // until first handler is found, then stop.
  var hostparts = host.split(".");
  var handler;
  var matchedDomain; // the domain that matched tightest
  for (var i = 0; i < hostparts.length; ++i) {
    var subhost = hostparts.slice(i, hostparts.length);
    matchedDomain = subhost.join(".");
    debug("urlToGraphNode: " + [url, matchedDomain]); // FINE
    handler = nodemapper.handlers[matchedDomain];
    if (!handler) continue;
    debug(" ... are handlers"); // FINE

    var graphNode;

    // if this is https, and the domain hasn't declare that
    // its https is the same as http, use the normal
    // non-HTTP handler.
    if (scheme == "https" && !handler.httpsLikeHttp) {
	graphNode = nodemapper.urlToGraphNodeNotHTTP(url);
    }

    // Try the registered http-to-sgn handler.
    if (handler.urlToGraphNode) {
	graphNode = handler.urlToGraphNode(url, host, path);
    }

    // If the http-to-sgn handler didn't do anything (or didn't
    // exist), try matching using all the registered sgn-to-http rules
    // in reverse.
    if ((!graphNode || graphNode == url) && !handler.skipAutomaticHttpToSgn) {
	graphNode = nodemapper.sgnFromHttpUsingToHttpRules(matchedDomain, url);
    }

    // If still nothing, try the next domain.
    if (!graphNode || graphNode == url) {
	continue;
    }

    // We mapped to something different.
    return graphNode;
  }

  // wasn't handled above?  return http URL unmodified.
  return url;
};

// Returns an sgn:// URL from a (host, account) pair.  The host
// may be "domain.com", "www.domain.com", "http://domain.com",
// "http://www.domain.com/", etc.
// The 'account' is the account on that host, which may be
// an identifier or a primary key (ident or pk).  The 'account'
// may also be a full-on URL, in which case the host part
// of the pair is ignored.
nodemapper.pairToGraphNode = function (host, account) {
    if (!account) {
	return;
    }

    // for both http and https URLs:
    if (account.substr(0, 4) == "http") {
	var sgn = nodemapper.urlToGraphNode(account);
	if (sgn && sgn.length >= 3 && sgn.substr(0, 3) == "sgn") {
	    return sgn;
	}
	return;
    }

    if (!host) {
	return;
    }

    var domain = nodemapper.parseDomain(host);
    if (!domain) {
	return;
    }

    var accountToSgn = {};
    var handler;

    handler = nodemapper.lookupHandlerWithProperty(domain, "accountToSgn");
    if (handler) {
	accountToSgn = handler.accountToSgn;
    } else {
	handler = nodemapper.lookupHandlerWithProperty(domain, "pkRegexp");
	if (handler) {
	    accountToSgn.pk = [handler._registeredOnDomain, handler.pkRegexp];
	}
	handler = nodemapper.lookupHandlerWithProperty(domain, "identRegexp");
	if (handler) {
	    accountToSgn.ident = [handler._registeredOnDomain, handler.identRegexp];
	}
    }

    if (accountToSgn.pk) {
	var sgnDomain = accountToSgn.pk[0];
	var sgnRegexp = accountToSgn.pk[1] || /^\d+$/;
        var m;
	if (m = sgnRegexp.exec(account)) {
          if (m[1]) {
            return "sgn://" + sgnDomain + "/?pk=" + m[1];
          } else {
            return "sgn://" + sgnDomain + "/?pk=" + account;
          }
	}
    }

    if (accountToSgn.ident) {
	var sgnDomain = accountToSgn.ident[0];
	var sgnRegexp = accountToSgn.ident[1] || /^\w+$/;
	if (sgnRegexp.exec(account)) {
	    // need to lowercase it?
	    if (nodemapper.lookupHandlerWithProperty(host, "identCasePreserve")) {
		// we found a handler with identCasePreserve on,
		// so don't touch the account
	    } else {
		// else lowercase it:
		account = account.toLowerCase();
	    }
	    return "sgn://" + sgnDomain + "/?ident=" + account;
	}
    }

    // TODO: support an accountToSgn.customFunc?  code to run
    // to do the mapping for special cases?
    return;
};

nodemapper.lookupHandlerWithProperty = function (host, property) {
    return nodemapper.lookupHandler(host, function (h) {
	if (h[property]) {
	    return h;
	}
	return;
    });
};

nodemapper.lookupHandler_unittest = function (host, property) {
    var handler = nodemapper.lookupHandlerWithProperty(host, property);
    if (handler) {
	return handler._name_for_testing;
    }
    return;
}

// Returns the first matching handler for a host's list
// of handlers (sorted from most specific to least specific)
// that matches the provided filterFunc.  filterFunc is run
// with one handler (the handler) and must return true to
// have that handler returned.
nodemapper.lookupHandler = function (host, filterFunc) {
  var hostparts = host.split(".");
  var handler;
  var matchedDomain; // the domain that matched tightest
  for (var i = 0; i < hostparts.length; ++i) {
    var subhost = hostparts.slice(i, hostparts.length);
    matchedDomain = subhost.join(".");
    handler = nodemapper.handlers[matchedDomain];
    if (!handler) continue;
    if (filterFunc(handler)) {
	handler._registeredOnDomain = matchedDomain;
	return handler;
    }
  }
  return;
};

// Match optional scheme and slashes (\w+:/{0,2}), then capture
// the domain name (everything until we hit a colon, forward slash,
// or the end)
nodemapper.DOMAIN_RE = /^(?:\w+:\/{0,2})?([^:\/]*?)(?:[:\/]|$)/;

// parses a domain name out of an argument which may be of several
// formats:  domain.com, http://domain.com, scheme:domain.com,
// http://domain.com:8080/some/path
nodemapper.parseDomain = function (arg) {
    var m;
    if ((m = nodemapper.DOMAIN_RE.exec(arg)) && m[1].length > 0) {
	return m[1];
    }
    return;
};

/**
 * Attempts to do http->sgn mapping based on all the installed
 * simple forward mappings (from addSimpleHandler).  This is
 * called then the normal parser for an http URL fails.
 *
 * Note that this will only return a successful mapping if it's
 * unambigous.  Sometimes a domain's pk= and ident= regexps
 * need to be overridden from their default value to resolve
 * ambiguity.
 */
nodemapper.sgnFromHttpUsingToHttpRules = function(domain, url) {
    var handler = nodemapper.handlers[domain];
    debug("sgnFromHttp for: " + [domain, url, handler]); // FINE
    if (!handler || !handler.sgnToHttpPatterns) {
	return;
    }
    debug(" ... are patterns"); // FINE
    var m;
    var matches = [];
    for (var i = 0; i < handler.sgnToHttpPatterns.length; i++) {
	var pattern = handler.sgnToHttpPatterns[i];
	var prefix = pattern[0];
	var suffix = pattern[1];
	var type = pattern[2];
	debug("Considering pattern: " + [prefix, suffix, type]); // FINE
	if (url.substr(0, prefix.length) == prefix &&
	    url.substr(url.length - suffix.length, suffix.length) == suffix) {
	    var midLength = url.length - prefix.length - suffix.length;
	    if (midLength >= 1) {
		var match = url.substr(prefix.length, midLength);
		debug(" ... matched: " + match); // FINE
		if (type == "pk" &&
		    (m = nodemapper.pkRegexp(handler).exec(match))) {
		    matches.push("sgn://" + domain + "/?pk=" + match);
	        } else if (type == "ident" &&
			   (m = nodemapper.identRegexp(handler).exec(match))) {
		    if (! handler.caseSensitiveIdent) {
			match = match.toLowerCase();
		    }
                    if (!(match == "www" ||
                          (handler.notUsernames && handler.notUsernames[match]))) {
                      matches.push("sgn://" + domain + "/?ident=" + match);
                    }
		}
	    }
	}
    }
    if (matches.length == 1) {
	return matches[0];
    } else {
        debug("More/less than 1 match for " + url + ".  Potential matches: [" + matches + "]");
    }
    return;
};

nodemapper.SGN_REGEX = new RegExp("^sgn://([^/]+)/\\?(ident|pk)=(.*)");

/**
 * Parses the given sgn:// url and returns the constituent parts as an object.
 * e.g. nodemapper.parseSgnUrl("sgn://twitter.com/?ident=jsmarr") returns
 * { "domain": "twitter.com", "keyName": "ident", "value": "jsmarr" }.
 * Returns null if the input can not be parsed as an sgn url.
 */
nodemapper.parseSgnUrl = function(sgnUrl) {
    var m = nodemapper.SGN_REGEX.exec(sgnUrl);
    if (!m)  return null;

    return { 
        "domain": m[1], 
        "keyName": m[2], 
        "value": m[3] 
    };
}

nodemapper.urlFromGraphNode = function(sgnUrl, type) {
    // is it even an sgn URL?
    var node = nodemapper.parseSgnUrl(sgnUrl);
    if (!node) {
	return;
    }

    // see if there's a handler.
    var handler = nodemapper.handlers[node.domain];
    if (!handler) {
	return;
    }

    // see if there's a to<Type> handler
    var attrName = node.keyName + "_to_" + type;
    var toFunc = handler[attrName];
    if (!toFunc) {
	return;
    }

    return toFunc(node.value);
};


/**
 * List of functions registered with RegisterNonHTTPHandler
 *
 * @type Array.<Function>
 */
nodemapper.nonHTTPHandlers = [];


/**
 * Registers handlers for non-HTTP URLs
 *
 * @param {Function} Function taking URL, returning either a social
 *     graph node identifier, or nothing if parse didn't match.
 */
nodemapper.registerNonHTTPHandler = function(handler) {
  nodemapper.nonHTTPHandlers.push(handler);
};


/**
 * Returns a social graph node URL, given a non-HTTP URL, or
 * returns the same URL, if scheme/pattern isn't recognized.
 *
 * @param {String} url non-HTTP URL of a person
 * @return {String} Clean socialgraph identifier, if URL type is
 *     known, else same URL back.
 */
nodemapper.urlToGraphNodeNotHTTP = function(url) {
  for (var i=0; i < nodemapper.nonHTTPHandlers.length; ++i) {
    var ident = nodemapper.nonHTTPHandlers[i](url);
    if (ident) return ident;
  }
  return url;
};


/**
 * Returns an sgn parser function, given a domain and regular
 * expression that operates on the path of a URL.
 *
 * @param {String} domain sgn:// domain to return on match
 * @param {RegExp} re Regular expression to match.  Capture #1
 *     must match the username.
 * @param {Object} opt_opts Optional object with extra options:
 *     - casePreserve: if true, don't lowercase the ident/pk
 *     - fallbackHandler: to run if no match (rather than returning URL back)
 *     - keyName: type of identifier in the URL (default: "ident", or "pk")
 *     - slashAnything: if true, allow (and ignore) any /xyz/abc after the match
 * @return {Function} function of (url, host, path) which returns
 *     an sgn:// URL (ideally, if recognized), or the same provided
 *     URL back if URL isn't recognized by a registered parser.
 */
nodemapper.createPathRegexpHandler = function(domain, re, opt_opts) {
  if (!opt_opts) opt_opts = {};
  return function(url, host, path) {
    if (opt_opts.pathTransform) {
      path = opt_opts.pathTransform(path);
    }
    var m = re.exec(path);
    if (!m) {
      return opt_opts.fallbackHandler ?
          opt_opts.fallbackHandler(url, host, path) :
          url;
    }
    var keyName = opt_opts.keyName || 'ident'; // ident= or pk=; TODO: enforce valid key names?
    var value = (opt_opts.casePreserve ? m[1] : m[1].toLowerCase());
    if (opt_opts.notUsernames && opt_opts.notUsernames[value]) {
      // fail.  this username is marked as not a real username.
      return opt_opts.fallbackHandler ?
          opt_opts.fallbackHandler(url, host, path) :
          url;
    }
    return "sgn://" + domain + "/?" + keyName + "=" + value;
  };
};


/**
 * Returns an sgn parser function, given a domain and regular
 * expression that operates on the hostname of a URL.
 *
 * @param {String} domain sgn:// domain to return on match
 * @param {RegExp} re Regular expression to match.  Capture #1
 *     must match the username.
 * @param {Object} opt_opts Optional object with extra options
 *     (see list options in nodemapper.createPathRegexpHandler method comment)
 */
nodemapper.createHostRegexpHandler = function(domain, re, opt_opts) {
  if (!opt_opts) opt_opts = {};
  return function(url, host, path) {
    var m = re.exec(host);
    var ident = m ? m[1].toLowerCase() : "";
    if (!m || ident == "www") {
      return opt_opts.fallbackHandler ?
          opt_opts.fallbackHandler(url, host, path) :
          url;
    }
    return "sgn://" + domain + "/?ident=" + ident;
  };
};

/**
 * Returns an sgn parser function which parses URLs with
 * paths of the form /[username]/ (with optional trailing slash)
 *
 * @param {String} domain sgn:// domain to return on match
 * @param {Object} opt_opts Optional object with extra options
 *     (see list options in nodemapper.createPathRegexpHandler method comment)
 * @return {String} Clean socialgraph identifier, if URL type is
 *     known, else same URL back.
 * @see nodemapper#createPathRegexpHandler
 */
nodemapper.createSlashUsernameHandler = function(domain, opt_opts) {
  var slashUsernameRE = /^\/(\w+)\/?$/;
  if (opt_opts && opt_opts.slashAnything) {
      slashUsernameRE = /^\/(\w+)(?:\/|$)/;
  }
  return nodemapper.createPathRegexpHandler(domain, slashUsernameRE, opt_opts);
};


/**
 * Returns an sgn parser function which parses URLs with
 * paths of the form /[prefix]/[username]/ (with optional trailing slash)
 *
 * @param {String} prefix The prefix path before the username
 * @param {String} domain sgn:// domain to return on match
 * @param {Object} opt_opts Optional object with extra options
 *     (see list options in nodemapper.createPathRegexpHandler method comment)
 * @return {String} Clean socialgraph identifier, if URL type is
 *     known, else same URL back.
 * @see nodemapper#createPathRegexpHandler
 */
nodemapper.createSomethingSlashUsernameHandler = function(prefix,
                                                          domain,
                                                          opt_opts) {
  var slashSomethingUserRE = new RegExp("^/" + prefix + "/" +
                                        "(\\w+)(?:/|$)");
  return nodemapper.createPathRegexpHandler(domain,
                                            slashSomethingUserRE,
                                            opt_opts);
};


/**
 * Creates a URL handler that parses out the subdomain
 * of a given domain, returning an sgn:// node of the
 * given subdomain, lowercased.
 *
 * @param {String} domain Domain name base, e.g. "livejournal.com"
 *     if you want to match "brad" in "brad.livejournal.com".
 * @return {Function} URL to sgn:// handler.
 */
nodemapper.createUserIsSubdomainHandler = function(domain) {
  // yes, domain isn't escaped, but that doesn't matter,
  // as nobody will call this outside of a registerDomain'd
  // block of code, where the domain has already been matched
  var subdomainRE = new RegExp("([\\w\\-]+)\." + domain + "$", "i");
  return nodemapper.createHostRegexpHandler(domain, subdomainRE);
};

// return a composed handler, returning the result of the first one that
// returns a different value from its inputs.
nodemapper.createFirstMatchHandler = function(handlerList) {
    return function (url, host, path) {
	for (var i = 0; i < handlerList.length; i++) {
	    var out = handlerList[i](url, host, path);
	    if (out != url) {
		return out;
	    }
	}
	return url;  // unchanged
    };
};

/**
 * Returns an array of objects representing sites with known display
 * names, e.g.:
 * [ { domain: "site.com", name: "Site!" [, notMassMarketSite: 1] }, ... ]
 */
nodemapper.namedSites = function() {
  if (nodemapper._memoizedNamedSites) {
    return nodemapper._memoizedNamedSites;
  }

  var ret = [];
  for (var domain in nodemapper.handlers) {
    var handler = nodemapper.handlers[domain];
    if (handler.name) {
      if (handler.primaryDomain && handler.primaryDomain != domain) {
        continue;
      }
      var canGenerateFeedUrl = false;
      if (handler.ident_to_atom || handler.ident_to_rss
          || handler.pk_to_atom || handler.pk_to_rss) {
        canGenerateFeedUrl = true;
      }
      ret.push({
        domain: domain,
        name: handler.name,
        notMassMarketSite: nodemapper.handlers[domain].notMassMarketSite,
        canGenerateFeedUrl: canGenerateFeedUrl
      });
    }
  }

  // Sort by display name (which is probably the same
  // as the domain, but the display name is what users
  // will see in e.g. drop-downs)
  ret.sort(function(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  nodemapper._memoizedNamedSites = ret;
  return ret;
}

// Get the number of named sites.
nodemapper.namedSitesCount = function() {
  return nodemapper.namedSites().length;
}

/**
 * Getting a property of a named site.
 *
 * @param {integer} n number in range [0, n), where n
 *                  is from nodemapper.namedSitesCount()
 * @param {String} property one of {domain, name,
 *                 notMassMarketSite, canGenerateFeedUrl}
 */
nodemapper.namedSiteProperty = function(n, property) {
  return nodemapper.namedSites()[n][property];
}

/* install null debug handler, if host container hasn't */
try {
    // access debug and see if it fails:
    if (debug) { }
} catch (e) {
    debug = function() {};
}
