
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('nodemapper-base');

Sammy.debug = true;
// uneval(this);

GET('/', function () {
	return redirect('/index.html');
});

GET('/convert', function () {
	if (this.request.query['from'] || this.request.query['from[]'] || this.request.query['to'] || this.request.query['to[]']) {
		sitesLoad();
		var result = [];
		// convert to URL?
		if (this.request.query['from'] || this.request.query['from[]']) {
			var from = (this.request.query['from[]']) ? this.request.query['from[]'] : this.request.query['from'];
			if (!isArray(from)) {
				from = [from];
			}
			for (var i in from) {
				var url = from[i];
				result[url] = urlFromGraphNode(url);
			if (isArray(from)) {
				for (var i in from) {
					result.push(urlFromGraphNode(from[i]));
				}
			} else {
				result.push(urlFromGraphNode(from));
			}
		}
		// convert to SGN?
		if (this.request.query['to'] || this.request.query['to[]']) {
			var to = (this.request.query['to[]']) ? this.request.query['to[]'] : this.request.query['to'];
			if (!isArray(to)) {
				to = [to];
			}
			for (var i in to) {
				var url = to[i];
				if (nodemapper.HTTP_REGEX.exec(url)) {
					result[url] = urlToGraphNode(url);
				} else {
					result[url] = urlToGraphNodeNotHTTP(url);
				}
			if (isArray(to)) {
				for (var i in to) {
					result.push(urlToGraphNode(to[i]));
				}
			} else {
				result.push(urlToGraphNode(to));
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
			result = callback + '(' + result + ');';
		}
		if (this.request.query['debug']) {
			this.response.mime = 'text/plain';
			return result;
		}
		// done
		return result;
	}
	// error
	this.response.mime = 'text/plain';
	this.response.code = 415;
	return 'Error 415: I need a from or to parameter.';
});

function sitesLoad () {
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

function isArray (obj) {
	return obj.constructor == Array;
}

function urlToGraphNode (url) {
	var output = {};
	output[url] = {};
	var result = nodemapper.urlToGraphNode(url);
	var type = (result.indexOf('://') > 0) ? result.substr(0, result.indexOf('://')).toLowerCase() : '';
	output[type] = result;
	var type = (result.indexOf('://') > 0) ? result.substr(0, result.indexOf('://')).toLowerCase() : '?';
	output[url][type] = result;
	return output;
}

function urlFromGraphNode (url) {
	var types = ["profile", "content", "atom", "rss", "blog", "openid", "foaf", "addfriend"];
	var output = {};
	output[url] = {};
	for (var typeIdx in types) {
		var link = nodemapper.urlFromGraphNode(url, types[typeIdx]);
		if (!link) {
			output[types[typeIdx]] = '';
			output[url][types[typeIdx]] = 'none';
		} else {
			output[url][types[typeIdx]] = link;
		}
	}
	return output;
}

function urlToGraphNodeNotHTTP (url) {
	var output = {};
	var result = nodemapper.urlToGraphNodeNotHTTP(url);
	var type = (result.indexOf(':') > 0) ? result.substr(0, result.indexOf(':')).toLowerCase() : '';
	output[type] = result;
	return output;
}
