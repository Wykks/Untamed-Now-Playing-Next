var MixcloudTrackListener = function() { };
MixcloudTrackListener.prototype = new Common.WebsiteTrackListener();

MixcloudTrackListener.prototype.isPlaying = function() {
	return $('.player-wrapper > .player > .player-control')
			.hasClass('pause-state');
};

MixcloudTrackListener.prototype.findSelector = function() {
	this.selector = $('.player-wrapper > .player');
};

MixcloudTrackListener.prototype.scrapPlayData = function() {
	this.artistName = this.selector
			.find('.player-cloudcast-author > a.player-cloudcast-author-link')
			.text();
	this.trackName  = this.selector.find('.player-cloudcast-title').text();
	return true;
};

MixcloudTrackListener.prototype.scrapAlbumArt = function() {
	return 'https:' + this.selector.find('.player-cloudcast-image > img')
			.attr('src')
			.replace(/\/w\/60\/h\/60/,"/w/500/h/500");
};

MixcloudTrackListener.prototype.scrapUrl = function() {
	return 'https://www.mixcloud.com' + this.selector.find('.player-cloudcast-title').attr('ng-href');
};

MixcloudTrackListener.prototype.scrapDuration = function() {
	var remainingTime = this.selector.find('.player-time.end-time > span').text();
	return Common.secToHms(Common.hmsToSec(remainingTime) + Common.hmsToSec(this.selector.find('.player-scrubber > .player-time:eq(0)').text()));
};

Common.runTrackListenerInterval(new MixcloudTrackListener());
