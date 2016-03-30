const NightbotTVTrackListener = function() {};
NightbotTVTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

NightbotTVTrackListener.prototype.isPlaying = function() {
    return $('.pause-play-container .fa-pause').is(':visible');
};

NightbotTVTrackListener.prototype.findSelector = function() {
    this.selector = $('div[ng-show="queue.current"]');
};

NightbotTVTrackListener.prototype.scrapPlayData = function() {
    this.trackName = this.selector.find('h4 > strong').contents().filter(function() {
        return this.nodeType == Node.TEXT_NODE;
    }).text();
    this.artistName = this.selector.find('h4 > strong > span').text().replace(/\s—\s+/, '');
    return true;
};

NightbotTVTrackListener.prototype.scrapAlbumName = function() {
    return $.trim(this.selector.children('p:eq(2)').text());
};

NightbotTVTrackListener.prototype.scrapDuration = function() {
    return $.trim(this.selector.children('p:first').text());
};

window.UNPCommon.runTrackListenerInterval(new NightbotTVTrackListener());
