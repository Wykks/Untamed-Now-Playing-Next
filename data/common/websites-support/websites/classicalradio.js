const ClassicalradioTrackListener = function() {};
ClassicalradioTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

ClassicalradioTrackListener.prototype.isPlaying = function() {
    return $('#webplayer-region').attr('data-state') === 'playing';
};

ClassicalradioTrackListener.prototype.findSelector = function() {
    this.selector = $('#main-container');
};

ClassicalradioTrackListener.prototype.scrapPlayData = function() {
    const artistMatch = this.selector.find('.artist-name').text().match(/(.+) -/);
    if (!artistMatch)
        return false;
    this.artistName = artistMatch[1];
    this.trackName = $.trim(this.selector.find('.track-name').contents().filter(function () {
        return this.nodeType == Node.TEXT_NODE;
    }).text());
    return true;
};

ClassicalradioTrackListener.prototype.scrapAlbumArt = function() {
    var artwork_selector = this.selector.find('#art').find('img');
    // preventing error when track has no album art
    if (artwork_selector.length) {
            return 'http:' + artwork_selector.attr('src').match(/(.+)\?/)[1];
    }
};

ClassicalradioTrackListener.prototype.scrapDuration = function() {
    return this.selector.find('.timecode').find('.total').text();
};

window.UNPCommon.runTrackListenerInterval(new ClassicalradioTrackListener());
