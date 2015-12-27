const LastFMTrackListener = function() {};
LastFMTrackListener.prototype = new Common.WebsiteTrackListener();

LastFMTrackListener.prototype.isPlaying = function() {
    return !$('#radioControlPlay').is(':visible') && $('#nowPlayingMeta').is(':visible');
};

LastFMTrackListener.prototype.findSelector = function() {
    this.selector = $('.track').find('a');
};

LastFMTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('.artist').find('a').text();
    this.trackName = this.selector.text();
    return true;
};

LastFMTrackListener.prototype.scrapAlbumName = function() {
    return $('.album').find('.title').text();
};

LastFMTrackListener.prototype.scrapAlbumArt = function() {
    return $('span.albumCover').find('img.art').attr('src').replace(/(.*)\/serve\/(.*)\/(.*)\.(jpg|jpeg|png)$/i, '$1/serve/126/$3.$4');
};

LastFMTrackListener.prototype.scrapUrl = function() {
    return this.selector.attr('href');
};

Common.runTrackListenerInterval(new LastFMTrackListener());
