var XiamiTrackListener = function() {};
XiamiTrackListener.prototype = new Common.WebsiteTrackListener();

XiamiTrackListener.prototype.isPlaying = function() {
	return $('#J_playBtn').hasClass('pause-btn');
}

XiamiTrackListener.prototype.findSelector = function() {
	var url = $('#J_trackName').attr('href');
	this.selector = $('#J_trackList' + url.match(".*/song/(.*)")[1]);
}

XiamiTrackListener.prototype.scrapPlayData = function() {

	this.artistName = $.trim(this.selector.find('.ui-row-item-body div:nth-child(2)').text());
	this.trackName  = $.trim($('#J_trackName').attr('title'));
	return true;
}

XiamiTrackListener.prototype.scrapAlbumName = function() {
	return $.trim(this.selector.find('.ui-row-item-body div:nth-child(3)').text());
};

XiamiTrackListener.prototype.scrapAlbumArt = function() {
	return  $('#J_playerCover').find('img').attr('src');
};

XiamiTrackListener.prototype.scrapUrl = function() {
	return $('#J_trackName').attr('href');
}

XiamiTrackListener.prototype.scrapDuration = function() {
	return $('#J_durationTime').text();
}

Common.runTrackListenerInterval(new XiamiTrackListener());
