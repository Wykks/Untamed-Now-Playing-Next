const RadiotunesTrackListener = function() {};
RadiotunesTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadiotunesTrackListener.prototype.isPlaying = function() {
	return $('#play-button').find('.icon').hasClass('icon-stop');
};

RadiotunesTrackListener.prototype.scrapPlayData = function() {
	const play = $('#now-playing').find('.title').text();
	[this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
	return true;
};

RadiotunesTrackListener.prototype.scrapAlbumArt = function() {
	const link = $('#art').find('img').first().attr('src');
	if (link.substring(0, 4) != 'http')
		return 'https:' + link;
	return link;
};

window.UNPCommon.runTrackListenerInterval(new RadiotunesTrackListener());
