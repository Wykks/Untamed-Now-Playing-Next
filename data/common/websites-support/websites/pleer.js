const PleerTrackListener = function() {};

PleerTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PleerTrackListener.prototype.isPlaying = function() {
    return $('#play').hasClass('pause');
};

PleerTrackListener.prototype.scrapPlayData = function() {
    const play = $.trim($('.now-playing').contents().filter(function () {
            return this.nodeType == Node.TEXT_NODE;
        })
        .text()).match(/^(.+) \u2014 (.+) \((.+)\)$/);
    this.artistName = play[1];
    this.trackName = play[2];
    return true;
};

PleerTrackListener.prototype.scrapUrl = function() {
    return 'http://pleer.com/tracks/' + $('li.current').attr('link');
};

PleerTrackListener.prototype.scrapDuration = function() {
    return window.UNPCommon.secToHms(window.UNPCommon.hmsToSec($.trim(
        $('.now-playing').contents().filter(
            function() {
                return this.nodeType == Node.TEXT_NODE;
            }
        ).text()
    ).match(/^(.+) \u2014 (.+) \((.+)\)$/)[3]));
};

const updateTriggerer = new window.UNPCommon.MutationObserverUpdater(new PleerTrackListener());
updateTriggerer.setSelector('#player .now-playing');
updateTriggerer.setCustomFilter(function (observedNode) {
    if (observedNode.parentNode.id === 'time')
        return false;
    return observedNode.nodeType === Node.TEXT_NODE;
});
updateTriggerer.runOnChildAttr();
