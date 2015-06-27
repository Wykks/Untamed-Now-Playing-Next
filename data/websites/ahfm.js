var AhFMTrackListener = function() {};
AhFMTrackListener.prototype = new Common.WebsiteTrackListener();

AhFMTrackListener.prototype.isPlaying = function() {
	return $('.now_playing').length && $('#pause').is(':visible');
}

AhFMTrackListener.prototype.scrapPlayData = function() {
	var play = $('.now_playing > .status > a').text();
	var matches = play.match('^(.+) - (.+) on AH.FM.*$');
	if (!matches)
		this.trackName = play.match('^(.+) on AH.FM.*$')[1];
	else {
		this.artistName = matches[1];
		this.trackName  = matches[2];
	}
}

Common.runTrackListenerInterval(new AhFMTrackListener());
