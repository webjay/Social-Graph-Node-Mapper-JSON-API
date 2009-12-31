
system.use('com.joyent.Sammy');
system.use('org.json.json2');
system.use('convert');

//Sammy.debug = true;
// uneval(this);

GET('/', function () {
	return redirect('/index.html');
});
