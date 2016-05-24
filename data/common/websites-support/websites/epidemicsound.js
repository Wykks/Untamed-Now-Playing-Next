const EpidemicSoundTrackListener = function() {};
EpidemicSoundTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

EpidemicSoundTrackListener.prototype.isPlaying = function() {
    return $('#controls > .player-button-pause').is(':visible');
};

EpidemicSoundTrackListener.prototype.findSelector = function() {
    this.selector = $('#track-info');
};

EpidemicSoundTrackListener.prototype.scrapPlayData = function() {
    const infos = this.selector.children('.esp_title');
    this.artistName = infos.contents()[3].nodeValue;
    this.trackName = infos.contents()[0].innerText;
    return true;
};

EpidemicSoundTrackListener.prototype.scrapDuration = function() {
    return this.selector.children('.esp_play_duration').text();
};

window.UNPCommon.runTrackListenerInterval(new EpidemicSoundTrackListener());
