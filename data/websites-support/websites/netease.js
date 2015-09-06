var PlayNeteaseListener = function() {};
PlayNeteaseListener.prototype = new Common.WebsiteTrackListener();

PlayNeteaseListener.prototype.isPlaying = function() {
	return true;
}

PlayNeteaseListener.prototype.findSelector = function() {
	this.selector = $('.play');
}

PlayNeteaseListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.find('.f-thide.name.fc1.f-fl').text());
	this.trackName  = $.trim(this.selector.find('.by.f-thide.f-fl').find('a').text());
	return true;
}

PlayNeteaseListener.prototype.scrapAlbumName = function() {
	return $('.album-wrapper .album-name').text(); 
};

PlayNeteaseListener.prototype.scrapAlbumArt = function() {
	return $('.#auto-id-zJDczHc61fcEWoXD').attr('src');
};

PlayNeteaseListener.prototype.scrapUrl = function() {
	return 'http://music.163.com/' + $('#g_player').find('.mask').attr('href');
}

PlayNeteaseListener.prototype.scrapDuration = function() {
	return '00:00';
}

Common.runTrackListenerInterval(new PlayNeteaseListener());
