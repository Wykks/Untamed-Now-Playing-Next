const AhFMTrackListener = function() {};
AhFMTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

AhFMTrackListener.prototype.isPlaying = function() {
    return $('.now_playing').length && $('#pause').is(':visible');
};

AhFMTrackListener.prototype.scrapPlayData = function() {
    const play = $('.now_playing > .status > a').text();
    const matches = play.match('^(.+) - (.+) on AH.FM.*$');
    if (!matches)
        this.trackName = play.match('^(.+) on AH.FM.*$')[1];
    else {
        this.artistName = matches[1];
        this.trackName = matches[2];
    }
    return true;
};

window.UNPCommon.runTrackListenerInterval(new AhFMTrackListener());
