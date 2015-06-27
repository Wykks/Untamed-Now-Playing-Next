var ExampleTrackListener = function() {};
ExampleTrackListener.prototype = new Common.WebsiteTrackListener();

ExampleTrackListener.prototype.isPlaying = function() {
	return true;
}

ExampleTrackListener.prototype.findSelector = function() {
	this.selector = undefined;
}

ExampleTrackListener.prototype.scrapPlayData = function() {
	this.artistName = "";
	this.trackName  = "";
	return true;
}

ExampleTrackListener.prototype.scrapAlbumName = function() {
	return ""; 
};

ExampleTrackListener.prototype.scrapAlbumArt = function() {
	return "";
};

ExampleTrackListener.prototype.scrapUrl = function() {
	return "";
}

ExampleTrackListener.prototype.scrapDuration = function() {
	return "";
}

Common.runTrackListenerInterval(new ExampleTrackListener());
