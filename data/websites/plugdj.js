var PlugdjTrackListener = function() {};
PlugdjTrackListener.prototype = new Common.WebsiteTrackListener();

PlugdjTrackListener.prototype.isPlaying = function() {
	return true;
};

PlugdjTrackListener.prototype.scrapPlayData = function() {
	var play = $("#now-playing-media").find('span.bar-value').text();
	[this.artistName, this.trackName] = Common.parseArtistTitle(play);
	return true;
};

Common.runTrackListenerInterval(new PlugdjTrackListener());
