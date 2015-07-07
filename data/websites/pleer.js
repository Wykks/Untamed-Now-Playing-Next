var PleerTrackListener = function() { };

PleerTrackListener.prototype = new Common.WebsiteTrackListener();

PleerTrackListener.prototype.isPlaying = function() { return $('#play').hasClass('pause'); };

PleerTrackListener.prototype.scrapPlayData = function() {
	var play = $.trim($('.now-playing').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; })
				.text()).match(/^(.+) \u2014 (.+) \((.+)\)$/);
	this.artistName = play[1];
	this.trackName  = play[2];
	return true;
};

PleerTrackListener.prototype.scrapUrl = function() {
	return 'http://pleer.com/tracks/' + $('li.current').attr('link');
};

PleerTrackListener.prototype.scrapDuration = function() {
	return Common.secToHms(Common.hmsToSec($.trim(
				$('.now-playing').contents().filter(
					function() { return this.nodeType == Node.TEXT_NODE; }
				).text()
			).match(/^(.+) \u2014 (.+) \((.+)\)$/)[3]));
};

var updateTriggerer = new Common.MutationObserverUpdater(new PleerTrackListener());
updateTriggerer.setSelector('#player .now-playing');
updateTriggerer.setCustomFilter(function(observedNode) {
	if (observedNode.parentNode.id === "time")
		return false;
	return observedNode.nodeType === Node.TEXT_NODE;
});
updateTriggerer.runOnChildAttr();
