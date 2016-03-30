const RadioRecordTrackListener = function() {};
RadioRecordTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadioRecordTrackListener.prototype.isPlaying = function() {
    return $('div.play-pause').hasClass('play');
};

RadioRecordTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#nowplay-artist').text();
    this.trackName = $('#nowplay-title').text();
    return true;
};

RadioRecordTrackListener.prototype.scrapAlbumArt = function() {
    return $('#nowplay-image > img').attr('src');
};

window.UNPCommon.runTrackListenerInterval(new RadioRecordTrackListener());
