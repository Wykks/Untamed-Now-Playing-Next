const HypemTrackListener = function() {};
HypemTrackListener.prototype = new Common.WebsiteTrackListener();

HypemTrackListener.prototype.isPlaying = function() {
    return $('#playerPlay').hasClass('pause');
};

HypemTrackListener.prototype.findSelector = function() {
    this.selector = $('#player-nowplaying');
};

HypemTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.children('a').eq(0).text();
    this.trackName = this.selector.children('a').eq(1).text();
    return true;
};

HypemTrackListener.prototype.scrapUrl = function() {
    return 'http://hypem.com' + this.selector.children('a').eq(1).attr('href');
};

HypemTrackListener.prototype.scrapDuration = function() {
    return $('#player-time-total').text();
};

Common.runTrackListenerInterval(new HypemTrackListener());
