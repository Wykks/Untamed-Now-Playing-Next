const RadioRecordPlayerTrackListener = function() {};
RadioRecordPlayerTrackListener.prototype = new Common.WebsiteTrackListener();

RadioRecordPlayerTrackListener.prototype.isPlaying = function() {
    return true;
};

RadioRecordPlayerTrackListener.prototype.findSelector = function() {
    this.selector = $('.nowtrack');
};

RadioRecordPlayerTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.artist').text();
    this.trackName = this.selector.find('.title').text();
    return true;
};

Common.runTrackListenerInterval(new RadioRecordPlayerTrackListener());
