var ZaycevTrackListener = function() {};
ZaycevTrackListener.prototype = new Common.WebsiteTrackListener();

ZaycevTrackListener.prototype.isPlaying = function() {
	return $('.zp_play').hasClass('g-active');
};

ZaycevTrackListener.prototype.findSelector = function() {
	this.selector = $('#zp_current_song').find('span');
};

ZaycevTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $.trim(this.selector.find('.ontheair_artist').text().replace(/^(.+)\u00A0-\u00A0$/, '$1'));
	this.trackName  = $.trim(this.selector.find('.ontheair_song').text());
	return true;
};

ZaycevTrackListener.prototype.scrapAlbumArt = function() {
	var albumArt = this.selector.find('div').find('img').attr('src');
	return (albumArt == 'http://img1.zaycev.fm/media/images/nomp3s.jpg') ? '' : albumArt;
};

ZaycevTrackListener.prototype.scrapUrl = function() {
	return $('.ontheair_song').attr('href');
};

Common.runTrackListenerInterval(new ZaycevTrackListener());
