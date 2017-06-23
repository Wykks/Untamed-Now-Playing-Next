const PandoraTrackListener = function() {};
PandoraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PandoraTrackListener.prototype.isPlaying = function() {
    return $('button[data-qa=pause_button]').length ? true : false;
};

PandoraTrackListener.prototype.findSelector = function() {
    this.selector = $('div.NowPlaying__aboveFold');
};

PandoraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('a[data-qa=playing_artist_name]').text();

    // since track name and url are in the same selector, doing all stuff here
    this.trackSelector = this.selector.find('a[data-qa=playing_track_title]');
    this.trackName = this.trackSelector.text();
    this.url = 'https://pandora.com' + this.trackSelector.attr('href');
    return true;
};

PandoraTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.find('a[data-qa=playing_album_name]').text();
};

PandoraTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('div[data-qa=album_active_image]').css('background-image').replace('url("', '').replace('")', '');
};

PandoraTrackListener.prototype.scrapDuration = function() {
    return $('span[data-qa=remaining_time]').text();
};

window.UNPCommon.runTrackListenerInterval(new PandoraTrackListener());