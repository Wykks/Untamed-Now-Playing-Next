const PlexTrackListener = function() {};
PlexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlexTrackListener.prototype.isPlaying = function() {
    return $('.play-btn').hasClass('hidden');
};

PlexTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('.grandparent-title').text();
    this.trackName = $('.item-title').text();
    return true;
};

PlexTrackListener.prototype.scrapAlbumArt = function() {
    return $('.media-poster-container > .media-poster').attr('data-image-url').concat('.jpeg').replace('&width=80&height=80','&width=250&height=250');
};

PlexTrackListener.prototype.scrapDuration = function() {
    return $('.player-duration').text();
};

window.UNPCommon.runTrackListenerInterval(new PlexTrackListener());
