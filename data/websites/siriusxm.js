var SiriusxmTrackListener = function() {};
SiriusxmTrackListener.prototype = new Common.WebsiteTrackListener();

SiriusxmTrackListener.prototype.isPlaying = function() {
	return $('#player .scrub-controls .RegularPause').is(':visible');
}

SiriusxmTrackListener.prototype.findSelector = function() {
	this.selector = $('#nowPlaying .content-type-music-view > div:nth-child(3)');
}

SiriusxmTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.children('.np-track-artist').children().eq(0).text());
	this.trackName  = $.trim(this.selector.children('.np-track-artist').children().eq(2).text());
	return true;
}

SiriusxmTrackListener.prototype.scrapAlbumArt = function() {
	return this.selector.children('.np-track-art').children().attr('src');
};

Common.runTrackListenerInterval(new SiriusxmTrackListener());
