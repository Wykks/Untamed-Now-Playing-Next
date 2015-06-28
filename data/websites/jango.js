var JangoTrackListener = function() {};
JangoTrackListener.prototype = new Common.WebsiteTrackListener();

JangoTrackListener.prototype.isPlaying = function() {
	return $('#btn-playpause').hasClass('pause');
}

JangoTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $('#player_current_artist').find('a').text();
	this.trackName  = $.trim($('#current-song').text());
	return true;
}

JangoTrackListener.prototype.scrapAlbumArt = function() {
	return 'http:' + $('#player_main_pic_img').attr('src');
};

JangoTrackListener.prototype.scrapUrl = function() {
	return 'http://www.jango.com' + $('#station_info').find('a').attr('href');
}

Common.runTrackListenerInterval(new JangoTrackListener());
