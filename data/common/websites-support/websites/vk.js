const VkTrackListener = function() {};
VkTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

VkTrackListener.prototype.isPlaying = function() {
    return $('.top_audio_player.top_audio_player_enabled').hasClass('top_audio_player_playing');
};

VkTrackListener.prototype.scrapPlayData = function() {
    const play = $('.top_audio_player_title').text();
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

VkTrackListener.prototype.scrapAlbumArt = function () {
    let coverBackgroundAttr = $('.audio_page_player__cover').css('background-image');
    // if "background-image" property doesn't exist - ".css" method will return "none" as a string
    if (coverBackgroundAttr !== 'none') {
        let coverURL = coverBackgroundAttr.replace('url("', '').replace('")', '');
        // if track has no cover - default SVG "music note" picture image will be retrieved
        if (!coverURL.startsWith('data')) {
            // we are interested only in cover URL
            return coverURL;
        }
    }
};

window.UNPCommon.runTrackListenerInterval(new VkTrackListener());
