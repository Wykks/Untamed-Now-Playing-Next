var SlackerTrackListener = function() {};
SlackerTrackListener.prototype = new Common.WebsiteTrackListener();

SlackerTrackListener.prototype.isPlaying = function() {
	return $('#transport > li.playpause').hasClass('play');
};

SlackerTrackListener.prototype.findSelector = function() {
	this.selector = $('#bar > div.container table > tbody > tr > td.fullwidth');
};

SlackerTrackListener.prototype.scrapPlayData = function() {
	this.artistName = this.selector.find('.metadata > span.link:eq(0)').text();
	this.trackName  = this.selector.find('.metadata > span.link:eq(1)').text();
	return true;
};

SlackerTrackListener.prototype.scrapAlbumName = function() {
	//Not really the album name but still usefull
	return this.selector.find('.stationname > p > span.link').text();
};

SlackerTrackListener.prototype.scrapAlbumArt = function() {
	return $('tr > td.art > img').attr('src').replace(/300\.jpg$/, "500.jpg");
};

SlackerTrackListener.prototype.scrapDuration = function() {
	return $('#progressContainer > span:eq(1)').text();
};

Common.runTrackListenerInterval(new SlackerTrackListener());
