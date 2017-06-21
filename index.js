const buttons = require('sdk/ui/button/action');
const tabs = require('sdk/tabs');
const pageMod = require('sdk/page-mod');
const self = require('sdk/self');
const ss = require('sdk/simple-storage');
const system = require('sdk/system');
const sp = require('sdk/simple-prefs');
const nowPlayingIO = require('./lib/nowPlayingIO');

buttons.ActionButton({
    id: 'unp-action',
    label: 'Untamed Now Playing',
    icon: {
        '16': './ico/icon-16.png',
        '32': './ico/icon-32.png',
        '64': './ico/icon-64.png'
    },
    onClick: openPreferences
});

sp.on('options_button', function() {
    openPreferences();
});

pageMod.PageMod({
    include: self.data.url('common/options/index.html') + '*',
    contentScriptFile: [
        self.data.url('third-party/preact.min.js'),
        self.data.url('third-party/preact-router.min.js'),
        self.data.url('third-party/preact-markup.min.js'),
        self.data.url('third-party/history.min.js'),
        self.data.url('third-party/jquery-3.1.0.min.js'),
        self.data.url('browserFunc.js'),
        self.data.url('common/options/i18n.js'),
        self.data.url('common/options/components/infoButton.js'),
        self.data.url('common/options/components/header.js'),
        self.data.url('common/options/components/settingsForm.js'),
        self.data.url('common/options/pages/settings.js'),
        self.data.url('common/options/pages/about.js'),
        self.data.url('common/options/pages/changelog.js'),
        self.data.url('common/options/pages/contact.js'),
        self.data.url('common/options/pages/sites.js'),
        self.data.url('common/options/app.js')
    ],
    contentScriptWhen: 'ready',
    contentScriptOptions: {
        platform: system.platform
    },
    onAttach: function(worker) {
        worker.port.on('getPrefs', function() {
            worker.port.emit('prefs', ss.storage);
        });

        worker.port.on('setPref', function(message) {
            ss.storage[message.key] = message.value;
        });

        worker.port.on('writeFile', function(message) {
            nowPlayingIO.writeFile(message.filename, message.text).then(function() {
                worker.port.emit(message.filename, 'success');
            }, function(reason) {
                worker.port.emit(message.filename, reason);
            });
        });

        worker.port.on('createDirIfNotExists', function(message) {
            const status = nowPlayingIO.createDirIfNotExists(message.directory);
            if (status === 'success') {
                worker.port.emit(message.directory, 'success');
            } else {
                worker.port.emit(message.directory, status);
            }
        });

        worker.port.on('removeFile', function(filename) {
            nowPlayingIO.removeFile(filename);
        });
    }
});

function createMusicWebsiteWorker(includes, script, attachTo) {
    const param = {
        include: includes,
        contentScriptFile: [
            self.data.url('third-party/jquery-3.1.0.min.js'),
            self.data.url('browserFunc.js'),
            self.data.url('common/websites-support/website.js'),
            self.data.url('common/websites-support/websites/' + script)
        ],
        contentScriptWhen: 'ready',
        onAttach: onAttachNowPlaying
    };
    if (typeof attachTo !== 'undefined')
        param.attachTo = attachTo;
    pageMod.PageMod(param);
}

createMusicWebsiteWorker('*.music.163.com', 'netease.js', 'top');
createMusicWebsiteWorker('*.8tracks.com', '8tracks.js', 'top');
createMusicWebsiteWorker(/.*ah.fm\/player\/.*/, 'ahfm.js', 'top');
createMusicWebsiteWorker(/.*animenfo.com\/radio\/nowplaying.php/, 'animenfo.js', 'top');
createMusicWebsiteWorker(/.*www.beatport.com\/.*/, 'beatport.js', 'top');
createMusicWebsiteWorker('*.seoul.fm', 'seoulfm.js', 'top');
createMusicWebsiteWorker('*.deezer.com', 'deezer.js', 'top');
createMusicWebsiteWorker('*.di.fm', 'difm.js', 'top');
createMusicWebsiteWorker('*.distortionradio.com', 'distortionradio.js', 'top');
createMusicWebsiteWorker('*.hypem.com', 'hypem.js', 'top');
createMusicWebsiteWorker(
    [
        '*.last.fm',
        '*.lastfm.de',
        '*.lastfm.es',
        '*.lastfm.fr',
        '*.lastfm.it',
        '*.lastfm.jp',
        '*.lastfm.pl',
        '*.lastfm.com.br',
        '*.lastfm.ru',
        '*.lastfm.se',
        '*.lastfm.com.tr'
    ], 'lastfm.js', 'top');
createMusicWebsiteWorker('*.jamendo.com', 'jamendo.js', 'top');
createMusicWebsiteWorker('*.jango.com', 'jango.js', 'top');
createMusicWebsiteWorker('*.jombly.com', 'jombly.js', 'top');
createMusicWebsiteWorker('*.loopmasters.com', 'loopmasters.js', 'top');
createMusicWebsiteWorker('*.mixcloud.com', 'mixcloud.js', 'top');
createMusicWebsiteWorker(/.*music.amazon\..*/, 'musicamazon.js', 'top');
createMusicWebsiteWorker(/.*music.yandex\..*/, 'musicyandex.js', 'top');
createMusicWebsiteWorker('*.nightbot.tv', 'nightbottv.js', 'top');
createMusicWebsiteWorker('*.openwhyd.org','openwhyd.js','top');
createMusicWebsiteWorker('*.pandora.com', 'pandora.js', 'top');
createMusicWebsiteWorker('*.planeta.fm', 'planetafm.js', 'top');
createMusicWebsiteWorker(/.*play.google.com\/music.*/, 'playgoogle.js', 'top');
createMusicWebsiteWorker('*.player.epidemicsound.com', 'epidemicsound.js', 'top');
createMusicWebsiteWorker('*.player.siriusxm.com', 'siriusxm.js', 'top');
createMusicWebsiteWorker('*.pleer.com', 'pleer.js', 'top');
createMusicWebsiteWorker('*.plex.tv', 'plex.js', 'top');
createMusicWebsiteWorker(/.*open.spotify.com\/.*/, 'spotify.js', 'top');
createMusicWebsiteWorker('*.playmoss.com', 'playmoss.js', 'top');
createMusicWebsiteWorker('*.radio.yandex.ru', 'radioyandex.js', 'top');
createMusicWebsiteWorker(/.*radiorecord.ru\/player.*/, 'radiorecordplayer.js', 'top');
createMusicWebsiteWorker(/.*radiorecord.ru\/(?!player).*/, 'radiorecord.js', 'top');
createMusicWebsiteWorker('*.radiobells.com', 'radiobells.js', 'top');
createMusicWebsiteWorker(/.*player.radioultra.ru.*/, 'radioultra.js', 'top');
createMusicWebsiteWorker(/.*www\.radiotunes\.com\/.+/, 'radiotunes.js', 'top');
createMusicWebsiteWorker('*.slacker.com', 'slacker.js', 'top');
createMusicWebsiteWorker('*.soundcloud.com', 'soundcloud.js', 'top');
createMusicWebsiteWorker(/.*synchtu.be\/r\/Playhouse.*/, 'synchtube.js', 'top');
createMusicWebsiteWorker('*.themusicninja.com', 'themusicninja.js', 'top');
createMusicWebsiteWorker('*.tunein.com', 'tunein.js', 'top');
createMusicWebsiteWorker('*.vk.com', 'vk.js', 'top');
createMusicWebsiteWorker(/.*yggdrasilradio.net\/nowplaying.php/, 'yggdrasilradio.js', 'frame');
createMusicWebsiteWorker('*.youtube.com', 'youtube.js', 'top');
createMusicWebsiteWorker(/.*youtube.com\/tv.*/, 'youtubetv.js', 'top');
createMusicWebsiteWorker(/.*youtube-playlist-randomizer.valami.info.*/, 'youtubeplaylistrandomizer.js', 'top');
createMusicWebsiteWorker('*.zaycev.fm', 'zaycev.js', 'top');
createMusicWebsiteWorker('*.zvooq.com', 'zvooq.js', 'top');
createMusicWebsiteWorker(/.*listen.tidal.com\/.*/, 'tidal.js', 'top');
// Chinese sites
createMusicWebsiteWorker('*.play.baidu.com', 'playbaidu.js', 'top');
createMusicWebsiteWorker('*.player.kuwo.cn', 'kuwo.js', 'top');
createMusicWebsiteWorker('*.y.qq.com', 'qq.js', 'top');
createMusicWebsiteWorker(/.*xiami.com\/play.*/, 'xiami.js', 'top');
createMusicWebsiteWorker(/.*open.fm.*/, 'openfm.js', 'top');
createMusicWebsiteWorker(/.*www.eskago.pl\/radio.*/, 'eskago.js', 'top');

function onAttachNowPlaying(worker) {
    worker.port.on('getPrefs', function() {
        worker.port.emit('prefs', ss.storage);
    });

    worker.port.on('updateNowPlaying', function(data) {
        nowPlayingIO.updateNowPlaying(data).then(function() {
            worker.port.emit('updateNowPlaying', 'success');
        }, function(reason) {
            worker.port.emit('updateNowPlaying', 'failure: ' + reason);
        });
    });
    worker.on('detach', function() {
        if (ss.storage.unpAutoClear === true)
            nowPlayingIO.clearNowPlaying(ss.storage.unpNoMusicMessage);
    });
}

function openPreferences() {
    tabs.open(self.data.url('common/options/index.html'));
}
