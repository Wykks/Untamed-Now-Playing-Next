var TuneInTrackListener = function() {};
TuneInTrackListener.prototype = new Common.WebsiteTrackListener();

TuneInTrackListener.prototype.isPlaying = function() {
	return $('#tuner').hasClass('playing');
}

TuneInTrackListener.prototype.scrapPlayData = function() {
	var play = $('#tuner div.line1').text();
	[this.trackName, this.artistName] = Common.parseArtistTitle(play);
	if (this.trackName !== "")
		this.trackName += ' [' + $('#tuner div.line2 > .title').text() + ']';
	else {
		this.artistName = $('#tuner div.line2 > .title').text();
		this.trackName = play;
	}
	return true;
}

TuneInTrackListener.prototype.scrapAlbumArt = function() {
	return $('.image > img').attr('src');
};

Common.runTrackListenerInterval(new TuneInTrackListener());
