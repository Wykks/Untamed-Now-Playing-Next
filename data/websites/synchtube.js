var SynchtubeTrackListener = function() {};
SynchtubeTrackListener.prototype = new Common.WebsiteTrackListener();

SynchtubeTrackListener.prototype.isPlaying = function() {
	return true;
}

SynchtubeTrackListener.prototype.findSelector = function() {
	this.selector = $('#queue > .queue_entry.queue_active');
}

SynchtubeTrackListener.prototype.scrapPlayData = function() {
	var play = this.selector.children('.qe_title').text();
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName  = play;
	return true;
}

SynchtubeTrackListener.prototype.scrapUrl = function() {
	return this.selector.children('.qe_title').attr('href');
}

SynchtubeTrackListener.prototype.scrapDuration = function() {
	return this.selector.children('.qe_time').text();
}

Common.runTrackListenerInterval(new SynchtubeTrackListener());
