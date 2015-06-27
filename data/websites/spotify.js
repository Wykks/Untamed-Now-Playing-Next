var SpotifyTrackListener = function() {};
SpotifyTrackListener.prototype = new WebsiteTrackListener();

SpotifyTrackListener.prototype.findSelector = function() { return $('#track-name').find('a'); }

SpotifyTrackListener.prototype.isPlaying = function() { return $('#play-pause').hasClass('playing'); }

SpotifyTrackListener.prototype.scrapPlayData = function() {
	this.artistName = "";
	$('#track-artist').find('a').each(function(){
		this.artistName += (artistName == '') ? $(this).text() : ', ' + $(this).text();
	});
	this.trackName = this.selector.eq(0).text();
}

SpotifyTrackListener.prototype.scrapAlbumArt = function() {
	return $('.sp-image-img').css('background-image').replace('url("','').replace('")','');
}

SpotifyTrackListener.prototype.scrapUrl = function() { return this.selector.attr('href'); }

SpotifyTrackListener.prototype.scrapDuration = function() { return $('#track-length').text(); }

runTrackListenerInterval(new PleerTrackListener());s
