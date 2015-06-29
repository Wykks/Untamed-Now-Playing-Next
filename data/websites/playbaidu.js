var PlayBaiduTrackListener = function() {};
PlayBaiduTrackListener.prototype = new Common.WebsiteTrackListener();

PlayBaiduTrackListener.prototype.isPlaying = function() {
	return true;
}

PlayBaiduTrackListener.prototype.findSelector = function() {
	this.selector = $('#playTitle').find('.title');
}

PlayBaiduTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.find('.songname').text());
	this.trackName  = $.trim(this.selector.find('.artist').text());
	return true;
}

PlayBaiduTrackListener.prototype.scrapAlbumName = function() {
	return $('.album-wrapper .album-name').text(); 
};

PlayBaiduTrackListener.prototype.scrapAlbumArt = function() {
	return $('.album').find('img').attr('src');
};

PlayBaiduTrackListener.prototype.scrapUrl = function() {
	return this.selector.find('.songname').attr('href');
}

PlayBaiduTrackListener.prototype.scrapDuration = function() {
	return $.trim($('#timeWrap').find('.totalTime').text());
}

Common.runTrackListenerInterval(new PlayBaiduTrackListener());
