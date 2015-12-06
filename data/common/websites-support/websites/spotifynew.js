var SpotifyNewTrackListener = function() { };
SpotifyNewTrackListener.prototype = new Common.WebsiteTrackListener();

SpotifyNewTrackListener.prototype.isPlaying = function() {
	return $('#play').hasClass('playing');
};

SpotifyNewTrackListener.prototype.findSelector = function() {
	this.selector = $('#view-now-playing > div.caption');
};

SpotifyNewTrackListener.prototype.scrapPlayData = function() {
	this.artistName = "";
	var self = this;
	this.selector.find('div.text > p.artist > span > span > a:gt(0)').each(function() {
		self.artistName += (self.artistName == '') ? $(this).text() : ', ' + $(this).text();
	});
	this.trackName = this.selector.find('div.text > p.track > span > span > a').text();
	return true;
};

SpotifyNewTrackListener.prototype.scrapAlbumArt = function() {
	return this.selector.find('div.cover-image').css('background-image').replace('url("','').replace('")','');
};

SpotifyNewTrackListener.prototype.scrapDuration = function() {
	return $('#remaining').text();
};

Common.runTrackListenerInterval(new SpotifyNewTrackListener());