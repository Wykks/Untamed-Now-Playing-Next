var BeatportTrackListener = function() { };
BeatportTrackListener.prototype = new Common.WebsiteTrackListener();

BeatportTrackListener.prototype.isPlaying = function() {
	return $('.omniplayer').hasClass('is-playing');
};

BeatportTrackListener.prototype.findSelector = function() {
	this.selector = $('.omniplayer');
};

BeatportTrackListener.prototype.scrapPlayData = function() {
	this.artistName = "";
	var self = this;
	this.selector.find('.omniplayer--artist > div > a').each(function() {
		self.artistName += (self.artistName === '') ? $.trim($(this).text()) : ', ' + $.trim($(this).text());
	});
	this.trackName = $.trim(this.selector.find('a.omniplayer--title').contents().filter(
		function() { return this.nodeType == Node.TEXT_NODE; }
	).text());
	return true;
};

BeatportTrackListener.prototype.scrapAlbumArt = function() {
	return this.selector.find('img.audio-control--art').attr('src').replace('60x60', '');
};

BeatportTrackListener.prototype.scrapUrl = function() {
	return 'https://www.beatport.com' + this.selector.find('a.omniplayer--title').attr('href');
};

BeatportTrackListener.prototype.scrapDuration = function() {
	return $.trim(this.selector.find('.omniplayer--extendable > .omniplayer--progress > .omniplayer--duration:nth-child(1)').text());
};

Common.runTrackListenerInterval(new BeatportTrackListener());
