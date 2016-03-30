const BlinkboxmusicTrackListener = function() {};
BlinkboxmusicTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

BlinkboxmusicTrackListener.prototype.isPlaying = function() {
    return $('.control-button[data-play-button]').hasClass('playing');
};

BlinkboxmusicTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('.track-artist').text();
    this.trackName = $('.track-name').text();
    return true;
};

BlinkboxmusicTrackListener.prototype.scrapDuration = function() {
    return $('.total').text();
};

window.UNPCommon.runTrackListenerInterval(new BlinkboxmusicTrackListener());
