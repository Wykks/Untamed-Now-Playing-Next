var SeoulFMTrackListener = function() {};
SeoulFMTrackListener.prototype = new Common.WebsiteTrackListener();

SeoulFMTrackListener.prototype.isPlaying = function() {
	return $('#flashradiostopbutton').is(':visible');
}

SeoulFMTrackListener.prototype.scrapPlayData = function() {
	var play = $("#flashradiostatustext > span").text();
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName = play;
	return true;
}

SeoulFMTrackListener.prototype.scrapUrl = function() {
	return 'http://www.seoul.fm';
}

Common.runTrackListenerInterval(new SeoulFMTrackListener());
