//Browser specific code
//Firefox version
//self is coming from pageMod (see index.js)
var BrowserFunc = (function() {
	var BrowserFunc = {};

	BrowserFunc.updateNowPlaying = function(data)
	{
		self.port.emit('updateNowPlaying', data);
		return new Promise(function(resolve, reject) {
			self.port.once('updateNowPlaying', function(status)
			{
				if (status === "success")
				{
					resolve(status);
				}
				else
				{
					reject(status);
				}
			});
		});
	};

	BrowserFunc.option = function(key)
	{
		return self.options.prefs[key];
	};

	return BrowserFunc;
}());