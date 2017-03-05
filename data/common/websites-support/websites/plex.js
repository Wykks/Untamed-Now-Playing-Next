const PlexTrackListener = function () { };
PlexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlexTrackListener.prototype.isPlaying = function () {
    return $('.play-btn').hasClass('hidden');
};

PlexTrackListener.prototype.findSelector = function () {
    this.selector = $('.mini-controls');
};

PlexTrackListener.prototype.scrapPlayData = function () {
    this.artistName = this.selector.find('.grandparent-title').text();
    this.trackName = this.selector.find('.item-title').text();
    return true;
};

PlexTrackListener.prototype.scrapAlbumArt = function () {
    var album_selector = this.selector.find('.media-poster-container > .media-poster');
    if (album_selector.hasClass('loaded')) {
        return album_selector.attr('data-image-url').replace('&width=80&height=80', '&width=250&height=250').concat('&format=.jpeg');
    }
};

PlexTrackListener.prototype.scrapAlbumName = function () {
    return this.selector.find('.media-poster-container > .media-poster').attr('data-image-title');
};

PlexTrackListener.prototype.scrapDuration = function () {
    return this.selector.find('.player-duration').text();
};

window.UNPCommon.runTrackListenerInterval(new PlexTrackListener());
