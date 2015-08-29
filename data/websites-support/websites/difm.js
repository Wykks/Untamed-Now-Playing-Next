var DiFMTrackListener = function() {};
DiFMTrackListener.prototype = new Common.WebsiteTrackListener();

DiFMTrackListener.prototype.isPlaying = function() {
	return $('#webplayer-region .track-region').find('.icon-pause').length;
};

DiFMTrackListener.prototype.findSelector = function() {
	this.selector = $('#webplayer-region .track-region');
};

DiFMTrackListener.prototype.scrapPlayData = function() {
	var artistMatch = this.selector.find('.artist-name').text().match(/(.+) -/);
	if (!artistMatch)
		return false;
	this.artistName = artistMatch[1];
	this.trackName  = $.trim(this.selector.find('.track-name').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text());
	return true;
};

DiFMTrackListener.prototype.scrapAlbumArt = function() {
	return "http:" + this.selector.find('.artwork img').attr('src').match(/(.+)\?/)[1];
};

DiFMTrackListener.prototype.scrapUrl = function() {
	return this.selector.find('.track-name').attr('href');
};

DiFMTrackListener.prototype.scrapDuration = function() {
	return this.selector.find('.progress .timecode').text().match(/(.+) \/ (.+)/)[2];
};

Common.runTrackListenerInterval(new DiFMTrackListener());
