const SeoulFMTrackListener = function() {};
SeoulFMTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

SeoulFMTrackListener.prototype.isPlaying = function() {
    return $('#flashradiostopbutton').is(':visible');
};

SeoulFMTrackListener.prototype.scrapPlayData = function() {
    const play = $('#flashradiostatustext > span').text();
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

SeoulFMTrackListener.prototype.scrapUrl = function() {
    return 'http://www.seoul.fm';
};

window.UNPCommon.runTrackListenerInterval(new SeoulFMTrackListener());
