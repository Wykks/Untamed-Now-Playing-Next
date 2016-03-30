const PlayGoogleTrackListener = function() {};
PlayGoogleTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlayGoogleTrackListener.prototype.isPlaying = function() {
    return $('div.material-player-middle > paper-icon-button[data-id="play-pause"]').hasClass('playing');
};

PlayGoogleTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#player-artist').text();
    this.trackName = $('#currently-playing-title').text();
    return true;
};

PlayGoogleTrackListener.prototype.scrapAlbumName = function() {
    return $('.player-album').text();
};

PlayGoogleTrackListener.prototype.scrapAlbumArt = function() {
    return $('#playerBarArt').attr('src');
};

PlayGoogleTrackListener.prototype.scrapUrl = function() {
    return 'http://play.google.com';
};

PlayGoogleTrackListener.prototype.scrapDuration = function() {
    return $('#time_container_duration').text();
};

const updateTriggerer = new window.UNPCommon.MutationObserverUpdater(new PlayGoogleTrackListener());
updateTriggerer.setSelector('#playerSongInfo');
updateTriggerer.setNodeAttributeName('src');
updateTriggerer.runOnChildAttr();
