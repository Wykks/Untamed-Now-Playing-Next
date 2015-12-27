const SynchtubeTrackListener = function() {};
SynchtubeTrackListener.prototype = new Common.WebsiteTrackListener();

SynchtubeTrackListener.prototype.isPlaying = function() {
    return true;
};

SynchtubeTrackListener.prototype.findSelector = function() {
    this.selector = $('#queue > .queue_entry.queue_active');
};

SynchtubeTrackListener.prototype.scrapPlayData = function() {
    const play = this.selector.children('.qe_title').text();
    [this.artistName, this.trackName] = Common.parseArtistTitle(play);
    return true;
};

SynchtubeTrackListener.prototype.scrapUrl = function() {
    return this.selector.children('.qe_title').attr('href');
};

SynchtubeTrackListener.prototype.scrapDuration = function() {
    return this.selector.children('.qe_time').text();
};

Common.runTrackListenerInterval(new SynchtubeTrackListener());
