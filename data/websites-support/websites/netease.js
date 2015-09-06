var PlayNeteaseListener = function() {};
PlayNeteaseListener.prototype = new Common.WebsiteTrackListener();

PlayNeteaseListener.prototype.isPlaying = function() {
	return true;
}

PlayNeteaseListener.prototype.findSelector = function() {
	this.selector = $('.play');
}

PlayNeteaseListener.prototype.scrapPlayData = function() {
	this.artistName = $('.f-thide.name.fc1.f-fl').text();
	this.trackName  = $('.by.f-thide.f-fl').find('a').text();
	return true;
}

PlayNeteaseListener.prototype.scrapAlbumName = function() {
	return 'http://music.163.com/';
};

PlayNeteaseListener.prototype.scrapAlbumArt = function() {
	return $('#auto-id').attr('src');
};

PlayNeteaseListener.prototype.scrapUrl = function() {
	return 'http://music.163.com/' + $('#g_player').find('.mask').attr('href');
}

PlayNeteaseListener.prototype.scrapDuration = function() {
	return '00:01';
}

Common.runTrackListenerInterval(new PlayNeteaseListener());
