const NewVkTrackListener = function() {};
NewVkTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

NewVkTrackListener.prototype.isPlaying = function() {
    return $('.top_audio_player.top_audio_player_enabled').hasClass('top_audio_player_playing');
};

NewVkTrackListener.prototype.scrapPlayData = function() {
    const play = $('.top_audio_player_title').text();
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

window.UNPCommon.runTrackListenerInterval(new NewVkTrackListener());
