const LoopMasterTrackListener = function() {};
LoopMasterTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

LoopMasterTrackListener.prototype.isPlaying = function() {
    return !!$('.player-controls').find('._pause').length;
};

LoopMasterTrackListener.prototype.findSelector = function() {
    this.selector = $('.playerbox-player > .player > .trackinfo > .trackinfo-line');
};

LoopMasterTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.trackinfo-description > h5').text();
    this.trackName = this.selector.find('.trackinfo-description > h4').text();
    return true;
};

LoopMasterTrackListener.prototype.scrapAlbumArt = function() {
    return 'http://www.loopmasters.com' + this.selector.find('.trackinfo-image > img').attr('src').replace('/big/','/huge/');
};

LoopMasterTrackListener.prototype.scrapDuration = function() {
    return $('.playerbox-player > .player > .player-position > ._time').text().match(/(.+)\s\/\s(.+)/)[2];
};

window.UNPCommon.runTrackListenerInterval(new LoopMasterTrackListener());
