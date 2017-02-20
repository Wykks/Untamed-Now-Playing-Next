const JomblyTrackListener = function() {};
JomblyTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

JomblyTrackListener.prototype.isPlaying = function() {
    return !!$('div.main-controls > i.fa-pause').length;
};

JomblyTrackListener.prototype.findSelector = function() {
    this.selector = $('div.controls');
};

JomblyTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('h5.artist').text();
    this.trackName = this.selector.find('h1.title').text();
    return true;
};

JomblyTrackListener.prototype.scrapDuration = function() {
    return this.selector.find('output.song-duration').text();
};

window.UNPCommon.runTrackListenerInterval(new JomblyTrackListener());
