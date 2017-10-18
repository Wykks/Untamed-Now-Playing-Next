const PlexTrackListener = function () { };
PlexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlexTrackListener.prototype.isPlaying = function () {
    let play_btn = $('[class*=PlayerIconButton-playerButton] > i[class*=plex-icon-player-play]');
    return play_btn.length ? false : true; //if play-btn not found - song is playing
};

PlexTrackListener.prototype.findSelector = function () {
    this.selector = $('[class*=AudioVideoPlayerControls-buttonGroupLeft]');
};

PlexTrackListener.prototype.scrapPlayData = function () {
    this.artistName = this.selector.find('span[class*=MetadataPosterTitle-title] > a').first().text();
    this.trackName = this.selector.find('[class*=AudioVideoPlayerControlsMetadata-titlesContainer] > a').first().text();
    return true;
};

PlexTrackListener.prototype.scrapAlbumArt = function () {
    return this.selector.find('[class*=PosterCardImg-imageContainer] > div').css('background-image').replace('url("', '').replace('")', '');
};

PlexTrackListener.prototype.scrapAlbumName = function () {
    return this.selector.find('span[class*=MetadataPosterTitle-title] > a').slice(1,2).text();
};

PlexTrackListener.prototype.scrapDuration = function () {
    return this.selector.find('button[class*=DurationRemaining-container]').text().split('/')[1];
};

window.UNPCommon.runTrackListenerInterval(new PlexTrackListener());
