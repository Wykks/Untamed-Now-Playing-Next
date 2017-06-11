const MusicYandexTrackListener = function() {};
MusicYandexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

MusicYandexTrackListener.prototype.isPlaying = function() {
    return $('div.player-controls__btn_play').hasClass('player-controls__btn_pause');
};

MusicYandexTrackListener.prototype.findSelector = function() {
    this.selector = $('div.player-controls__track-container');
};

MusicYandexTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('div.track__artists > a').text();
    this.trackName = this.selector.find('a.track__title').text();
    return true;
};

MusicYandexTrackListener.prototype.scrapAlbumArt = function() {
    const link = this.selector.find('img.track-cover').attr('src').replace('50x50', '400x400');
    if (link.substring(0, 4) != 'http')
        return 'https:' + link;
    return link;
};

MusicYandexTrackListener.prototype.scrapUrl = function() {
    return 'https://music.yandex.ru' + this.selector.find('a.track__title').attr('href');
};

MusicYandexTrackListener.prototype.scrapDuration = function() {
    return $('.progress').find('.progress__text').find('.progress__right').text();
};

window.UNPCommon.runTrackListenerInterval(new MusicYandexTrackListener());
