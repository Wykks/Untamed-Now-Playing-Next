var SoundcloudTrackListener = function() {};
SoundcloudTrackListener.prototype = new Common.WebsiteTrackListener();

SoundcloudTrackListener.prototype.isPlaying = function() {
	return true;
}

SoundcloudTrackListener.prototype.scrapPlayData = function() {
	var play = $('.playbackSoundBadge__title').attr('title');
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName = play;
	return true;
}

SoundcloudTrackListener.prototype.scrapAlbumArt = function() {
	return $(".playControls__inner span.image__full").css('background-image').replace('url("','').replace('")','');
};

SoundcloudTrackListener.prototype.scrapUrl = function() {
	return "http://soundcloud.com" + $('.playbackSoundBadge__title').attr('href');
}

SoundcloudTrackListener.prototype.scrapDuration = function() {
	return $('.playbackTimeline__duration span:eq(1)').text();
}

Common.runTrackListenerInterval(new SoundcloudTrackListener());
