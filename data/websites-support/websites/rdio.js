var RdioTrackListener = function() {};
RdioTrackListener.prototype = new Common.WebsiteTrackListener();

RdioTrackListener.prototype.isPlaying = function() {
	return $('.play_pause').hasClass('playing');
};

RdioTrackListener.prototype.findSelector = function() {
	this.selector = $('.player_bottom');
};

RdioTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.find('.artist_title').text());
	this.trackName  = $.trim(this.selector.find('.song_title').text());
	return true;
};

RdioTrackListener.prototype.scrapAlbumName = function() {
	return this.selector.find('.song_title').attr('href').match(".*/album/(.*)/track.*")[1].replace("_"," ");
};

RdioTrackListener.prototype.scrapAlbumArt = function() {
	return this.selector.find('.queue_art').attr('src');
};

RdioTrackListener.prototype.scrapUrl = function() {
	return 'http://www.rdio.com' + this.selector.find('.song_title').attr('href');
};

RdioTrackListener.prototype.scrapDuration = function() {
	return this.selector.find('.duration').text();
};

var updateTriggerer = new Common.MutationObserverUpdater(new RdioTrackListener());
updateTriggerer.setSelector('.queue_art');
updateTriggerer.setNodeAttributeName('src');
updateTriggerer.runOnAttr();
