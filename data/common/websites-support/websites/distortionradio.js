const DistortionRadioTrackListener = function() {};
DistortionRadioTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

DistortionRadioTrackListener.prototype.isPlaying = function() {
    return $('#pause').length;
};

DistortionRadioTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#current_artist > a').text();
    this.trackName = $('#current_title').text();
    return true;
};

window.UNPCommon.runTrackListenerInterval(new DistortionRadioTrackListener());
