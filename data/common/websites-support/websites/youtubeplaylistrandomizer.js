const YoutubePlaylistRandomizerTrackListener = function() {};
YoutubePlaylistRandomizerTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

YoutubePlaylistRandomizerTrackListener.prototype.isPlaying = function() {
    return true;
};

YoutubePlaylistRandomizerTrackListener.prototype.scrapPlayData = function() {
    const play = $('#videotitle').text();
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

window.UNPCommon.runTrackListenerInterval(new YoutubePlaylistRandomizerTrackListener());
