var TheMusicNinjaTrackListener = function() {};
TheMusicNinjaTrackListener.prototype = new Common.WebsiteTrackListener();

TheMusicNinjaTrackListener.prototype.isPlaying = function() {
	return $('#player-features').hasClass('tmn_playing');
}

TheMusicNinjaTrackListener.prototype.findSelector = function() {
	this.selector = $('.track_name').find('a');
}

TheMusicNinjaTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.find('.artist').text());
	this.trackName  = $.trim(this.selector.find('.title').text());
	return true;
}

TheMusicNinjaTrackListener.prototype.scrapDuration = function() {
	return $('.sm2_total').text();
}

Common.runTrackListenerInterval(new TheMusicNinjaTrackListener());
