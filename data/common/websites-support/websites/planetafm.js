const PlanetaFMTrackListener = function() {};
PlanetaFMTrackListener.prototype = new Common.WebsiteTrackListener();

PlanetaFMTrackListener.prototype.isPlaying = function() {
    return $('#eplayer-online .playpause').hasClass('pause');
};

PlanetaFMTrackListener.prototype.findSelector = function() {
    this.selector = $('#eplayer-online > .now');
};

PlanetaFMTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.artist').text();
    this.trackName = this.selector.find('.album').text();
    return true;
};

PlanetaFMTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('dt > img').attr('src');
};

Common.runTrackListenerInterval(new PlanetaFMTrackListener());
