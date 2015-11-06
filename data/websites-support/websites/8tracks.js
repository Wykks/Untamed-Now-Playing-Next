var HeightTracksTrackListener = function() {};
HeightTracksTrackListener.prototype = new Common.WebsiteTrackListener();

HeightTracksTrackListener.prototype.findSelector = function() {
	this.selector = $('li.now_playing').find('.title_container').find('.title_artist');
};

HeightTracksTrackListener.prototype.isPlaying = function() {
	return $('#player_pause_button').css('display') == 'block';
};

HeightTracksTrackListener.prototype.scrapPlayData = function() {
	this.artistName = this.selector.find('.a').eq(0).text();
	this.trackName  = this.selector.find('.t').eq(0).text();
	return true;
};

HeightTracksTrackListener.prototype.scrapAlbumName = function() {
	return $('#now_playing').find('.album').find('.detail').text();
};

HeightTracksTrackListener.prototype.scrapAlbumArt = function() {
	return $('#player_mix > a > img').attr('src').replace(/(.*)\?(.*)/i, '$1');
};

HeightTracksTrackListener.prototype.scrapUrl = function() {
	return 'http://8tracks.com' + $('#player_mix > a').attr('href');
};

Common.runTrackListenerInterval(new HeightTracksTrackListener());
