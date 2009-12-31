
system.use('com.joyent.Sammy');

GET('/', function () {
	return redirect('/index.html');
});
