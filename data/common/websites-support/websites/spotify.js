const SpotifyTrackListener = function () {};
SpotifyTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

SpotifyTrackListener.prototype.isPlaying = function () {
    return $('.player-controls__buttons').find('.spoticon-pause-16').length ? true : false;
};

SpotifyTrackListener.prototype.scrapPlayData = function () {
    this.artistName = $('.now-playing').find('.track-info').find('.track-info__artists').find('a').text();
    this.trackName = $('.now-playing').find('.track-info').find('.track-info__name').find('a').text();
    return true;
};

SpotifyTrackListener.prototype.scrapAlbumArt = function () {
    return $('.now-playing').find('.cover-art-image').css('background-image').replace('url("', '').replace('")', '');
};

SpotifyTrackListener.prototype.scrapDuration = function () {
    return $('.playback-bar').find('.playback-bar__progress-time').last().text();
};

window.UNPCommon.runTrackListenerInterval(new SpotifyTrackListener());
