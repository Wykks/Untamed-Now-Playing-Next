var NightbotTVTrackListener = function() {};
NightbotTVTrackListener.prototype = new Common.WebsiteTrackListener();

NightbotTVTrackListener.prototype.isPlaying = function() {
	return $('#pause').is(':visible');
}

NightbotTVTrackListener.prototype.scrapPlayData = function() {
	var play = $('#currentTitle').text();
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName  = play;
	return true;
}

NightbotTVTrackListener.prototype.scrapDuration = function() {
	return secToHms(hmsToSec($('#duration').text()));
}

Common.runTrackListenerInterval(new NightbotTVTrackListener());
