var SlackerTrackListener = function() {};
SlackerTrackListener.prototype = new Common.WebsiteTrackListener();

SlackerTrackListener.prototype.isPlaying = function() {
	return $('#mini-play').hasClass('pause');
}

SlackerTrackListener.prototype.findSelector = function() {
	this.selector = $('#player-track-name');
}

SlackerTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $('#player-artist-name').text();
	this.trackName  = this.selector.text();
	return true;
}

SlackerTrackListener.prototype.scrapAlbumName = function() {
	return $('#player-album-name').text(); 
};

SlackerTrackListener.prototype.scrapAlbumArt = function() {
	return $('#track-art-current-img').attr('src');
};

SlackerTrackListener.prototype.scrapUrl = function() {
	return 'http://slacker.com/#song/' + this.selector.attr('itemid') + '/' + this.selector.attr('perfid') + '/' + this.selector.attr('trackid');
}

SlackerTrackListener.prototype.scrapDuration = function() {
	return $('#progress-total').text();
}

Common.runTrackListenerInterval(new SlackerTrackListener());
