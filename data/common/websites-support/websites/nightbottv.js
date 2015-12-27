const NightbotTVTrackListener = function() {};
NightbotTVTrackListener.prototype = new Common.WebsiteTrackListener();

NightbotTVTrackListener.prototype.isPlaying = function() {
    return $('#pause').is(':visible');
};

NightbotTVTrackListener.prototype.scrapPlayData = function() {
    const play = $('#currentTitle').text();
    [this.artistName, this.trackName] = Common.parseArtistTitle(play);
    return true;
};

NightbotTVTrackListener.prototype.scrapDuration = function() {
    return secToHms(hmsToSec($('#duration').text()));
};

Common.runTrackListenerInterval(new NightbotTVTrackListener());
