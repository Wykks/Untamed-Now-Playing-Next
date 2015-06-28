var PlugdjTrackListener = function() {};
PlugdjTrackListener.prototype = new Common.WebsiteTrackListener();

PlugdjTrackListener.prototype.isPlaying = function() {
	return true;
}

PlugdjTrackListener.prototype.scrapPlayData = function() {
	var play = $("#now-playing-media").find('span.bar-value').text();
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName = play;
	return true;
}

Common.runTrackListenerInterval(new PlugdjTrackListener());
