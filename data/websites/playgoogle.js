var PlayGoogleTrackListener = function() {};
PlayGoogleTrackListener.prototype = new Common.WebsiteTrackListener();

PlayGoogleTrackListener.prototype.isPlaying = function() {
	return $('sj-icon-button.playing[data-id="play-pause"]').length;
}

PlayGoogleTrackListener.prototype.scrapPlayData = function() {
	this.artistName = $('#player-artist').text();
	this.trackName  = $('#player-song-title').text();
	return true;
}

PlayGoogleTrackListener.prototype.scrapAlbumName = function() {
	return $('.player-album').text(); 
};

PlayGoogleTrackListener.prototype.scrapAlbumArt = function() {
	return $('#playingAlbumArt').attr('src');
};

PlayGoogleTrackListener.prototype.scrapUrl = function() {
	return 'http://play.google.com';
}

PlayGoogleTrackListener.prototype.scrapDuration = function() {
	return $('#time_container_duration').text();
}

Common.runTrackListenerInterval(new PlayGoogleTrackListener());
