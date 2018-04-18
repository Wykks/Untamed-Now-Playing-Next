const DeezerTrackListener = function() {};
DeezerTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

DeezerTrackListener.prototype.isPlaying = function() {
    return $('#player .svg-icon-pause').length;
};

DeezerTrackListener.prototype.findSelector = function() {
    this.selector = $('#player');
};

DeezerTrackListener.prototype.scrapPlayData = function() {
    const that = this;
    this.selector.find('.player-track-artist > .player-track-link').each(function (i) {
        if (i === 0)
            that.artistName = $(this).text();
        else
            that.artistName += ', ' + $(this).text();
    });
    this.trackName = this.selector.find('.player-track-title > .player-track-link').text();
    return true;
};

DeezerTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.player-cover > img').attr('src');
};

DeezerTrackListener.prototype.scrapUrl = function() {
    return 'http://www.deezer.com' + this.selector.find('.player-track-title > .player-track-link').data('href');
};

DeezerTrackListener.prototype.scrapDuration = function() {
    return this.selector.find('.progress-length').text();
};

window.UNPCommon.runTrackListenerInterval(new DeezerTrackListener());
