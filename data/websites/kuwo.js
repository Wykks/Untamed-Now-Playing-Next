var KuwoTrackListener = function() {};
KuwoTrackListener.prototype = new Common.WebsiteTrackListener();

KuwoTrackListener.prototype.isPlaying = function() {
	return true;
}

KuwoTrackListener.prototype.findSelector = function() {
	this.selector = $('.control_left');
}

KuwoTrackListener.prototype.scrapPlayData = function() {
	var play = this.selector.find('.dec_time span').text();
	if (parse = Common.parseArtistTitle(play)) {
		this.artistName = parse[0];
		this.trackName  = parse[1];
	}
	else
		this.trackName = play;
	return true;
}

KuwoTrackListener.prototype.scrapAlbumArt = function() {
	return this.selector.find('.control_img img').attr('src');
};

KuwoTrackListener.prototype.scrapUrl = function() {
	var data = $("#bdshare").attr("data");
	var musicid = data.substr(data.indexOf('MUSIC_') + 6,7)
	return 'http://www.kuwo.cn/yinyue/' + musicid;
}

KuwoTrackListener.prototype.scrapDuration = function() {
	return $.trim(this.selector.find('#wp_totalTime').text());
}

Common.runTrackListenerInterval(new KuwoTrackListener());
