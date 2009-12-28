
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('nodemapper-base');
system.use('sites.twitter');

Sammy.debug = true;

/*before(function(){
	this.response.headers['X-Request'] = uneval(this);
});*/

GET('/', function () {
	return redirect('/index.html');
});

GET('/convert', function () {
	if (this.request.query['from'] || this.request.query['to']) {
		var result = [];
		// convert to URL?
		if (this.request.query['from']) {
			var from = this.request.query['from'];
			if (isArray(from)) {
				for (var i in from) {
					result.push(urlFromGraphNode(from[i]));
				}
			} else {
				result.push(urlFromGraphNode(from));
			}
		}
		// convert to SGN?
		if (this.request.query['to']) {
			var to = this.request.query['to'];
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
		// done
		return result;
	}
	// error
	this.response.mime = 'text/plain';
	this.response.code = 415;
	return 'Error 415: I need a from or to parameter.';
});

function isArray (obj) {
	return obj.constructor == Array;
}

function urlToGraphNode (url) {
	var output = {};
	output[url] = {};
	var result = nodemapper.urlToGraphNode(url);
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
			output[url][types[typeIdx]] = 'none';
		} else {
			output[url][types[typeIdx]] = link;
		}
	}
	return output;
}
