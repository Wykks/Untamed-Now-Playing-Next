const PlaymossTrackListener = function() {};
PlaymossTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlaymossTrackListener.prototype.isPlaying = function() {
    return $('body').hasClass('playing');
};

PlaymossTrackListener.prototype.findSelector = function() {
    this.selector = $('#player');
};

PlaymossTrackListener.prototype.scrapPlayData = function() {
    const play = this.selector.find('#playlist > .track.playing').attr('title');
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

PlaymossTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.find('.playlist-image > a').attr('title');
};

PlaymossTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.playlist-image').css('background-image').replace('url("', '').replace('")', '');
};

PlaymossTrackListener.prototype.scrapUrl = function() {
    return this.selector.find('#playlist > .track.playing a').attr('href');
};

window.UNPCommon.runTrackListenerInterval(new PlaymossTrackListener());
