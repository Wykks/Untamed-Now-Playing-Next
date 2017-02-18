const ZvooqTrackListener = function() {};
ZvooqTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

ZvooqTrackListener.prototype.isPlaying = function() {
    return $('div.topPanel-center').find('div.topPanelPause');
};

ZvooqTrackListener.prototype.findSelector = function() {
    this.selector = $('div.topPanelTimeline-progress').find('div.topPanelTimeline-info');
};

ZvooqTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('a.topPanelTimeline-intitleArtist').text();
    this.trackName = this.selector.find('a.topPanelTimeline-intitleRelease').text();
    return true;
};

ZvooqTrackListener.prototype.scrapDuration = function() {
    return this.selector.find('div.topPanelTimeline-length').text();
};

window.UNPCommon.runTrackListenerInterval(new ZvooqTrackListener());
