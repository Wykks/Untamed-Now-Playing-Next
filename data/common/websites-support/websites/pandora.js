const PandoraTrackListener = function() {};
PandoraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PandoraTrackListener.prototype.isPlaying = function() {
    return $('button[data-qa=pause_button]').length ? true : false;
};

PandoraTrackListener.prototype.findSelector = function() {
    this.selector = $('div.nowPlayingTopInfo');
};

PandoraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('a.nowPlayingTopInfo__current__artistName').text();

    // since track name and url are in the same selector, doing all stuff here
    this.trackSelector = this.selector.find('a.nowPlayingTopInfo__current__trackName');
    this.trackName = this.trackSelector.text();
    this.url = 'https://pandora.com' + this.trackSelector.attr('href');
    return true;
};

PandoraTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.find('a.nowPlayingTopInfo__current__albumName').text();
};

PandoraTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('div.nowPlayingTopInfo__artContainer__art[data-qa=album_active_image]').css('background-image').replace('url("', '').replace('")', '');
};

PandoraTrackListener.prototype.scrapDuration = function() {
    return $('.Duration > span[data-qa=remaining_time]').text();
};

window.UNPCommon.runTrackListenerInterval(new PandoraTrackListener());
