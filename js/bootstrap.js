
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('nodemapper-base');

//Sammy.debug = true;

/*before(function(){
	this.response.headers['X-Request'] = uneval(this);
});*/

GET('/', function () {
	return redirect('/index.html');
});

GET('/convert', function () {
	if (this.request.query['from'] || this.request.query['from[]'] || this.request.query['to'] || this.request.query['to[]']) {
		sitesLoad();
		var result = {};
		// convert to URL?
		if (this.request.query['from'] || this.request.query['from[]']) {
			var from = (this.request.query['from[]']) ? this.request.query['from[]'] : this.request.query['from'];
			if (isArray(from)) {
				for (var i in from) {
					result[from[i]] = urlFromGraphNode(from[i]);
				}
			} else {
				result[from] = urlFromGraphNode(from);
			}
		}
		// convert to SGN?
		if (this.request.query['to']) {
			var to = (this.request.query['to[]']) ? this.request.query['to[]'] : this.request.query['to'];
			if (isArray(to)) {
				for (var i in to) {
					result[to[i]] = urlToGraphNode(to[i]);
				}
			} else {
				result[to] = urlToGraphNode(to);
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
		system.use('sites.' + sites[i]);
	}	
}

function isArray (obj) {
	return obj.constructor == Array;
}

function urlToGraphNode (url) {
	var output = {};
	var result = nodemapper.urlToGraphNode(url);
	var type = (result.indexOf('://') > 0) ? result.substr(0, result.indexOf('://')).toLowerCase() : '?';
	output[type] = result;
	return output;
}

function urlFromGraphNode (url) {
	var types = ["profile", "content", "atom", "rss", "blog", "openid", "foaf", "addfriend"];
	var output = {};
	for (var typeIdx in types) {
		var link = nodemapper.urlFromGraphNode(url, types[typeIdx]);
		if (!link) {
			output[types[typeIdx]] = 'none';
		} else {
			output[types[typeIdx]] = link;
		}
	}
	return output;
}
