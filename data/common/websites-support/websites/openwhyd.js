const OpenwhydTrackListener = function () { };
OpenwhydTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

OpenwhydTrackListener.prototype.isPlaying = function () {
    return true;
};

OpenwhydTrackListener.prototype.scrapPlayData = function () {
    if ($('#trackTitle').find('a').length) {
        [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle($('#trackTitle').find('a').text());
    } else {
        return false;
    }
    return true;
};

window.UNPCommon.runTrackListenerInterval(new OpenwhydTrackListener());
