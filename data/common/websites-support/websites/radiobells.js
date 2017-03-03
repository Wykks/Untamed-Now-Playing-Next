const RadiobellsTrackListener = function() {};
RadiobellsTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadiobellsTrackListener.prototype.isPlaying = function() {
	return $('#play_btn').attr('src').includes('pause');
};

RadiobellsTrackListener.prototype.scrapPlayData = function() {
	const play = $('#informer_song').text();
	[this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(window.UNPCommon.toTitleCase(play));
	return true;
};

window.UNPCommon.runTrackListenerInterval(new RadiobellsTrackListener());