
GET('/convert', function () {
	if (this.request.query['url[]'] || this.request.query['url']) {
		// start engine
		nodemapperLoad();
		// set vars
		var urls = (this.request.query['url[]']) ? this.request.query['url[]'] : this.request.query['url'];
		if (urls.constructor != Array) {
			urls = [urls];
		}
		var result = {};
		// convert
		for (var i in urls) {
			if (nodemapper.SGN_REGEX.exec(urls[i])) { /* if SGN */
				result[urls[i]] = urlFromGraphNode(urls[i]);
			} else { /* HTTP or non-HTTP, handled by nodemapper.urlToGraphNode */
				result[urls[i]] = urlToGraphNode(urls[i]);
			}
		}
		// any callback?
		var callback = false;
		if (this.request.query['callback'] || this.request.query['jsoncallback']) {
			callback = (this.request.query['callback']) ? this.request.query['callback'] : this.request.query['jsoncallback'];
			this.response.mime = 'text/javascript';
		} else {
			this.response.mime = 'application/json';
		}
		// prepare response
		result = JSON.stringify(result);
		if (callback != false) {
			result = callback + '([' + result + ']);';
		}
		if (this.request.query['debug']) {
			this.response.mime = 'text/plain';
		}
		// done
		return result;
	}
	// error
	this.response.mime = 'text/plain';
	this.response.code = 415;
	return 'Error 415: I need an url parameter.';
});

function nodemapperLoad () {
	// load nodemapper-base
	var file = system.filesystem.get('google-sgnodemapper-read-only/nodemapper-base.js');
	eval(file.contents);
	// load sites
	var sites = ['amazon', 'aol', 'blogspot', 'facebook', 'flickr', 'friendfeed', 'google', 'hi5', 'lastfm', 'livejournal', 'meetup', 'mybloglog', 'myspace', 'nonhttp', 'opera', 'russia', 'sapo', 'simple', 'spin-de', 'stumbleupon', 'threadless', 'tribe', 'twitter', 'wakoopa', 'wordpress', 'yelp', 'zooomr'];
	for (var i in sites) {
		var file = system.filesystem.get('google-sgnodemapper-read-only/sites/' + sites[i] + '.js');
		var source = file.contents;
		var cut = source.indexOf('__END__');
		if (cut) {
			source = source.substr(0, cut);
		}
		eval(source);
	}	
}

function urlToGraphNode (url) {
	var output = {};
	var result = nodemapper.urlToGraphNode(url);
	var type = (result.indexOf(':') > 0) ? result.substr(0, result.indexOf(':')).toLowerCase() : '';
	output[type] = result;
	return output;
}

function urlFromGraphNode (url) {
	var types = ["profile", "content", "atom", "rss", "blog", "openid", "foaf", "addfriend"];
	var output = {};
	for (var typeIdx in types) {
		var link = nodemapper.urlFromGraphNode(url, types[typeIdx]);
		if (!link) {
			output[types[typeIdx]] = '';
		} else {
			output[types[typeIdx]] = link;
		}
	}
	return output;
}
