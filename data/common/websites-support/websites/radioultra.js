const RadioUltraTrackListener = function() {};
RadioUltraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadioUltraTrackListener.prototype.isPlaying = function() {
    return true;
};

RadioUltraTrackListener.prototype.findSelector = function() {
    this.selector = $('#song-info');
};

RadioUltraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.artist').text();
    this.trackName = this.selector.find('.title').text();
    return true;
};

window.UNPCommon.runTrackListenerInterval(new RadioUltraTrackListener());
