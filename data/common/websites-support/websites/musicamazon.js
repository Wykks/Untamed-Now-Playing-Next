const MusicAmazonTrackListener = function() {};
MusicAmazonTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

MusicAmazonTrackListener.prototype.isPlaying = function() {
    return $('#dragonflyTransport .playbackControls > .playButton').hasClass('playerIconPause');
};

MusicAmazonTrackListener.prototype.findSelector = function() {
    this.selector = $('#dragonflyTransport .rightSide > .playbackControlsView');
};

MusicAmazonTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.trackInfoContainer > .trackInfoWrapper > .trackArtist > a > span').text();
    this.trackName = this.selector.find('.trackInfoContainer > .trackTitleWrapper > .trackTitle').text();
    return true;
};

MusicAmazonTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.find('.trackInfoContainer > .trackInfoWrapper > .trackSourceLink a').text();
};

MusicAmazonTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.trackAlbumArt .albumArtWrapper').css('background-image')
        .replace('url("', '').replace('")', '');
};

window.UNPCommon.runTrackListenerInterval(new MusicAmazonTrackListener());
