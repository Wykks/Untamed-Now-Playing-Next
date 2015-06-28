var RadioYandexTrackListener = function() { };
RadioYandexTrackListener.prototype = new Common.WebsiteTrackListener();

RadioYandexTrackListener.prototype.isPlaying = function() {
	return $('body').hasClass('body_state_playing');
}

RadioYandexTrackListener.prototype.findSelector = function() {
	this.selector = $('div.slider__item.slider__item_track:eq(2)');
}

RadioYandexTrackListener.prototype.scrapPlayData = function() {
	this.artistName = this.selector.find('div.track__artists').attr('title');
	this.trackName  = this.selector.find('div.track__title > a').text();
	return true;
}

RadioYandexTrackListener.prototype.scrapAlbumArt = function() {
	var link = this.selector.find('img.track__cover').attr('src');
	if (link.substring(0,4) != 'http')
		return 'https:' + link;
	return link;
};

RadioYandexTrackListener.prototype.scrapUrl = function() {
	return 'https:' + this.selector.find('div.track__title > a').attr('href');
}


Common.runTrackListenerInterval(new RadioYandexTrackListener());
