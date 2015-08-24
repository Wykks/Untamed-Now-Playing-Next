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
    		nowPlayingIO.writeFile(message.filename, message.text).then(function()
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

function createMusicWebsiteWorker(includes, script, attachTo)
{
	var param =	{
		include: includes,
		contentScriptFile:
		[
			self.data.url('third-party/jquery-2.1.3.min.js'),
			self.data.url('browserFunc.js'),
			self.data.url('common.js'),
			self.data.url('websites/'+ script)
		],
		contentScriptWhen: 'ready',
		contentScriptOptions:
		{
			prefs: ss.storage //Read only
		},
		onAttach: onAttachNowPlaying
	};
	if (typeof attachTo !== 'undefined')
		param.attachTo = attachTo;	
	pageMod.PageMod(param);
}

createMusicWebsiteWorker("*.8tracks.com", "8tracks.js", "top");
createMusicWebsiteWorker(/.*ah.fm\/player\/.*/, "ahfm.js", "top");
createMusicWebsiteWorker(/.*animenfo.com\/radio\/nowplaying.php/, "animenfo.js", "top");
createMusicWebsiteWorker("*.seoul.fm", "seoulfm.js", "top");
createMusicWebsiteWorker("*.blinkboxmusic.com", "blinkboxmusic.js", "top");
createMusicWebsiteWorker("*.deezer.com", "deezer.js", "top");
createMusicWebsiteWorker("*.di.fm", "difm.js", "top");
createMusicWebsiteWorker("*.distortionradio.com", "distortionradio.js", "top");
createMusicWebsiteWorker("*.hypem.com", "hypem.js", "top");
createMusicWebsiteWorker(
[
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
	"*.lastfm.com.tr"
], "lastfm.js", "top");
createMusicWebsiteWorker("*.jamendo.com", "jamendo.js", "top");
createMusicWebsiteWorker("*.jango.com", "jango.js", "frame");
createMusicWebsiteWorker("*.mixcloud.com", "mixcloud.js", "top");
createMusicWebsiteWorker("*.music.yandex.ru", "musicyandex.js", "top");
createMusicWebsiteWorker("*.nightbot.tv", "nightbottv.js", "top");
createMusicWebsiteWorker("*.noadradio.com", "noadradio.js", "frame");
createMusicWebsiteWorker("*.pandora.com", "pandora.js", "top");
createMusicWebsiteWorker(/.*play.google.com\/music.*/, "playgoogle.js", "top");
createMusicWebsiteWorker("*.player.siriusxm.com", "siriusxm.js", "top");
createMusicWebsiteWorker("*.plug.dj", "plugdj.js", "top");
createMusicWebsiteWorker("*.pleer.com", "pleer.js", "top");
createMusicWebsiteWorker(/.*play.spotify.com\/apps\/player.*/, "spotify.js", "frame");
createMusicWebsiteWorker(/.*player.spotify.com\/app.*/, "spotifynew.js", "frame");
createMusicWebsiteWorker("*.radio.yandex.ru", "radioyandex.js", "top");
createMusicWebsiteWorker(/.*radiorecord.ru\/player.*/, "radiorecord.js", "top");
createMusicWebsiteWorker(/.*radioultra.ru\/player.*/, "radioultra.js", "top");
createMusicWebsiteWorker("*.rdio.com", "rdio.js", "top");
createMusicWebsiteWorker("*.slacker.com", "slacker.js", "top");
createMusicWebsiteWorker("*.soundcloud.com", "soundcloud.js", "top");
createMusicWebsiteWorker(/.*synchtu.be\/r\/Playhouse.*/, "synchtube.js", "top");
createMusicWebsiteWorker("*.themusicninja.com", "themusicninja.js", "top");
createMusicWebsiteWorker("*.tunein.com", "tunein.js", "top");
createMusicWebsiteWorker("*.vk.com", "vk.js", "top");
createMusicWebsiteWorker("*.youtube.com", "youtube.js", "top");
createMusicWebsiteWorker("*.zaycev.fm", "zaycev.js", "top");
// Chinese sites
createMusicWebsiteWorker("*.play.baidu.com", "playbaidu.js", "top");
createMusicWebsiteWorker("*.player.kuwo.cn", "kuwo.js", "top");
createMusicWebsiteWorker("*.y.qq.com", "qq.js", "top");
createMusicWebsiteWorker(/.*xiami.com\/play.*/, "xiami.js", "top");

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
