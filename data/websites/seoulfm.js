var SeoulFMTrackListener = function() {};
SeoulFMTrackListener.prototype = new Common.WebsiteTrackListener();

SeoulFMTrackListener.prototype.isPlaying = function() {
	return $('#flashradiostopbutton').is(':visible');
}

SeoulFMTrackListener.prototype.scrapPlayData = function() {
	var play = $("#flashradiostatustext > span").text();
	[this.artistName, this.trackName] = Common.parseArtistTitle(play);
	return true;
}

SeoulFMTrackListener.prototype.scrapUrl = function() {
	return 'http://www.seoul.fm';
}

Common.runTrackListenerInterval(new SeoulFMTrackListener());
