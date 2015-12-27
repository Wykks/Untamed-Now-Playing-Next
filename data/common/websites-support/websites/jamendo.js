const JamendoTrackListener = function() {};
JamendoTrackListener.prototype = new Common.WebsiteTrackListener();

JamendoTrackListener.prototype.isPlaying = function() {
    return $('.playpause.pause').is(':visible');
};

JamendoTrackListener.prototype.findSelector = function() {
    this.selector = $('#player div.currenttrack');
};

JamendoTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('p.artist > a').text();
    this.trackName = $.trim(this.selector.find('p.title > a').text());
    return true;
};

JamendoTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.artwork > img').attr('src').replace(/1.100/, '1.400');
};

JamendoTrackListener.prototype.scrapUrl = function() {
    return 'https://www.jamendo.com' + this.selector.find('p.artist > a').attr('href');
};

Common.runTrackListenerInterval(new JamendoTrackListener());
