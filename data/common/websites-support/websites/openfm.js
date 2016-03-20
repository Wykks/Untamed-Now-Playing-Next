const OpenFMTrackListener = function() {};
OpenFMTrackListener.prototype = new Common.WebsiteTrackListener();

OpenFMTrackListener.prototype.isPlaying = function() {
    return $('.controls-con > input').attr('class') == "stop-btn";
};

OpenFMTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#station-view > .station-details > h3').text();
    this.trackName = $('#station-view > .station-details > h2').text();
    return true;
};

OpenFMTrackListener.prototype.scrapAlbumName = function() {
    return $('#station-view > .station-details > h4').text();
};

OpenFMTrackListener.prototype.scrapAlbumArt = function() {
    return "http://open.fm" + $('#station-view > .img-holder > img').attr('src');
};

Common.runTrackListenerInterval(new OpenFMTrackListener());
