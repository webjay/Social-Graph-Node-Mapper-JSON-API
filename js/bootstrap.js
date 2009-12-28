
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('nodemapper-base');
system.use('sites.twitter');

Sammy.debug = true;

/*before(function(){
	this.response.headers['X-Request'] = uneval(this);
});*/

GET('/', function () {
	return template('index.html');
});

GET('/convert', function () {
	if (this.request.query['from'] || this.request.query['to']) {
		if (this.request.query['from']) {
			var result = urlFromGraphNode(this.request.query['from']);
		} else if (this.request.query['to']) {
			var result = urlToGraphNode(this.request.query['to']);
		}
		this.response.mime = 'application/json';
		return '[' + result + ']';
	}
	return 'I need a from or to parameter.';
});

//function main (aRequest) {}

function urlToGraphNode (url) {
	var output = {};
	output[url] = nodemapper.urlToGraphNode(url);
	return JSON.stringify(output);
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
	return JSON.stringify(output);
}
