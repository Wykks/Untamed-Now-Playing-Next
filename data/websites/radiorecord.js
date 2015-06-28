var RadioRecordTrackListener = function() {};
RadioRecordTrackListener.prototype = new Common.WebsiteTrackListener();

RadioRecordTrackListener.prototype.isPlaying = function() {
	return true;
}

RadioRecordTrackListener.prototype.findSelector = function() {
	this.selector = $('.nowtrack');
}

RadioRecordTrackListener.prototype.scrapPlayData = function() {
	this.artistName = this.selector.find('.artist').text();
	this.trackName  = this.selector.find('.title').text();
	return true;
}

Common.runTrackListenerInterval(new RadioRecordTrackListener());
