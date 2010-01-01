
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('convert');

GET('/', function () {
	return redirect('/index.html');
});
