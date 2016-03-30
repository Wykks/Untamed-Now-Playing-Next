const PandoraTrackListener = function() {};
PandoraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PandoraTrackListener.prototype.isPlaying = function() {
    return $('.pauseButton').is(':visible');
};

PandoraTrackListener.prototype.findSelector = function() {
    this.selector = undefined;
};

PandoraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('.playerBarArtist').text();
    this.trackName = $('.playerBarSong').text();
    return true;
};

PandoraTrackListener.prototype.scrapAlbumName = function() {
    return $('.playerBarAlbum').text();
};

PandoraTrackListener.prototype.scrapAlbumArt = function() {
    return $('.playerBarArt').attr('src');
};

PandoraTrackListener.prototype.scrapUrl = function() {
    return $('.playerBarSong').attr('href');
};

PandoraTrackListener.prototype.scrapDuration = function() {
    let remainingTime = $('.remainingTime').text();
    remainingTime = remainingTime.substr(1, remainingTime.length);
    return window.UNPCommon.secToHms(window.UNPCommon.hmsToSec(remainingTime) + window.UNPCommon.hmsToSec($('.elapsedTime').text()));
};

window.UNPCommon.runTrackListenerInterval(new PandoraTrackListener());
