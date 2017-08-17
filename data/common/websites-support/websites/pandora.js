const PandoraTrackListener = function() {};
PandoraTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PandoraTrackListener.prototype.isPlaying = function() {
    return $('button[data-qa=pause_button]').length ? true : false;
};

PandoraTrackListener.prototype.findSelector = function() {
    this.selector = $('div.Tuner__ContentWrapper');
};

PandoraTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('div.Tuner__Audio__TrackDetail__artist > a[data-qa=mini_track_artist_name]').text();

    // since track name and url are in the same selector, doing all stuff here
    this.trackSelector = this.selector.find('.Tuner__Audio__TrackDetail__title > a[data-qa=mini_track_title]');
    this.trackName = this.trackSelector.text();
    this.url = 'https://pandora.com' + this.trackSelector.attr('href');
    return true;
};

PandoraTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.find('a[data-qa=playing_album_name]').text();
};

PandoraTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('div.Tuner__Audio__TrackDetail__img').find('img').attr('src').replace('90W_90H', '500W_500H');
};

PandoraTrackListener.prototype.scrapDuration = function() {
    return $('span[data-qa=remaining_time]').text();
};

window.UNPCommon.runTrackListenerInterval(new PandoraTrackListener());
