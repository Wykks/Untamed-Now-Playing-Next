const BeatportTrackListener = function() {};
BeatportTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

BeatportTrackListener.prototype.isPlaying = function() {
    return $('.player-container.player-section .player-buttons-container .play-button').hasClass('pause');
};

BeatportTrackListener.prototype.findSelector = function() {
    this.selector = $('.player-current-track-container');
};

BeatportTrackListener.prototype.scrapPlayData = function() {
    this.artistName = '';
    const self = this;
    this.selector.find('.player-track-name-artist-standard > .track-artist').each(function() {
        self.artistName += (self.artistName === '') ? $.trim($(this).text()) : ', ' + $.trim($(this).text());
    });
    this.trackName = this.selector.find('.track-title .primary-title').text();
    return true;
};

BeatportTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.track-artwork').attr('src').replace('45x45', '300x300');
};

BeatportTrackListener.prototype.scrapUrl = function() {
    return this.selector.find('.track-artwork-link').attr('href');
};

window.UNPCommon.runTrackListenerInterval(new BeatportTrackListener());
