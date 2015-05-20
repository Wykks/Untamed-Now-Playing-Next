var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
var system = require("sdk/system");
var _ = require("sdk/l10n").get;
var nowPlayingIO = require("./lib/nowPlayingIO");

var button = buttons.ActionButton(
{
	id: "unp-action",
	label: "Untamed Now Playing",
	icon: {
		"16": "./ico/icon-16.png",
		"32": "./ico/icon-32.png",
		"64": "./ico/icon-64.png"
	},
	onClick: openPreferences
});

pageMod.PageMod(
{
	include: self.data.url('options.html'),
	contentScriptFile: [
		self.data.url('third-party/jquery-2.1.3.min.js'),
		self.data.url('third-party/sammy-latest.min.js'),
		self.data.url('third-party/bootstrap/js/bootstrap.min.js'),
		self.data.url('options.js')
	],
	contentScriptWhen: 'ready',
	contentScriptOptions:
	{
		platform: system.platform
	},
    onAttach: function(worker) {
    	worker.port.emit("prefs", ss.storage);
    	worker.port.on("setValue", function(message)
    	{
    		ss.storage[message.key] = message.value;
    	});
    	
    	worker.port.on("writeFile", function(message)
    	{
    		nowPlayingIO.writeFile(message.filename, message.text).then(function(test)
    		{
    			worker.port.emit(message.filename, "success");
    		}, function(reason)
    		{
    			worker.port.emit(message.filename, "failure: " + reason);
    		});
    	});

    	worker.port.on("removeFile", function(filename)
    	{
    		nowPlayingIO.removeFile(filename);
    	});
    	
    	worker.port.on("localization", function(key)
    	{
    		worker.port.emit('l10n'+key, _(key));
    	});
    }
});

pageMod.PageMod(
{
    include:
    [
        "*.8tracks.com",
		"*.ah.fm",
		"*.blinkboxmusic.co",
		"*.blinkboxmusic.com",
		"*.deezer.com",
		"*.di.fm",
		"*.distortionradio.com",
		"*.hypem.com",
		"*.iheart.com",
		"*.jango.com",
		"*.last.fm",
		"*.lastfm.de",
		"*.lastfm.es",
		"*.lastfm.fr",
		"*.lastfm.it",
		"*.lastfm.jp",
		"*.lastfm.pl",
		"*.lastfm.com.br",
		"*.lastfm.ru",
		"*.lastfm.se",
		"*.lastfm.com.tr",
		"*.nightbot.tv",
		"*.pandora.com",
		"*.play.google.com",
		"*.player.siriusxm.com",
		"*.plug.dj",
		"*.pleer.com",
		"*.slacker.com",
		"*.songza.com",
		"*.soundcloud.com",
		/.*synchtu.be\/r\/Playhouse.*/,
		"*.themusicninja.com",
		"*.tunein.com",
		"*.vk.com",
		"*.youtube.com",
		"*.zaycev.fm",
		"*.rdio.com",
		/.*radiorecord.ru\/player.*/,
		/.*radioultra.ru\/player.*/,
		// Chinese sites
		"*.play.baidu.com",
		"*.player.kuwo.cn",
		"*.y.qq.com",
		/.*xiami.com\/play.*/
	],
	contentScriptFile:
	[
		self.data.url('third-party/jquery-2.1.3.min.js'),
		self.data.url('content.js')
	],
	contentScriptWhen: 'ready',
	attachTo: 'top',
	contentScriptOptions:
	{
		prefs: ss.storage //Read only
	},
    onAttach: onAttachNowPlaying
});

pageMod.PageMod( //Iframe player
{
    include:
    [
		/.*assets.seoul.fm\/play\/art.html/,
		/.*play.spotify.com\/apps\/player.*/,
	],
	contentScriptFile:
	[
		self.data.url('third-party/jquery-2.1.3.min.js'),
		self.data.url('content.js')
	],
	contentScriptWhen: 'ready',
	contentScriptOptions:
	{
		prefs: ss.storage //Read only
	},
    onAttach: onAttachNowPlaying
});

function onAttachNowPlaying(worker)
{
	worker.port.on("updateNowPlaying", function(data)
	{
		nowPlayingIO.updateNowPlaying(data).then(function()
		{
			worker.port.emit('updateNowPlaying', "success");
		}, function(reason)
		{
			worker.port.emit('updateNowPlaying', "failure: " + reason);
		});
	});
	worker.on('detach', function()
	{
		if (ss.storage.unpAutoClear === true)
			nowPlayingIO.clearNowPlaying();
	});
}

function openPreferences(state)
{
	tabs.open(self.data.url('options.html'));
}



