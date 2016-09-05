const RadioUltraTrackListener = function() {};
RadioUltraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadioUltraTrackListener.prototype.isPlaying = function() {
    return true;
};

RadioUltraTrackListener.prototype.findSelector = function() {
    this.selector = $('.track-info');
};

RadioUltraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.artist').text();
    this.trackName = this.selector.find('.song').text();
    return true;
};

RadioUltraTrackListener.prototype.scrapAlbumArt = function() {
    return $(".cover").find(".pic").css('background-image').replace('url("', '').replace('")', '');
};

window.UNPCommon.runTrackListenerInterval(new RadioUltraTrackListener());
