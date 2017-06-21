const TidalTrackListener = function () {};
TidalTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

TidalTrackListener.prototype.isPlaying = function () {
    return $('.play-controls__main-button--playing').length ? true : false;
};

TidalTrackListener.prototype.scrapPlayData = function () {
    this.artistName = $('.info-box__table').find('td[data-bind=artist] > a').text()
    // if [td] does not contain [a] with title - get [td's] text instead
    var title_a = $('.info-box__table').find('td[data-bind=title] > a').text()
    this.trackName = title_a ? title_a : $('.info-box__table').find('td[data-bind=title]').text()
    return true;
};

TidalTrackListener.prototype.scrapAlbumArt = function () {
    return $('.player__metadata').find('.player__image-container__image').attr('src').replace('80x80', '640x640');
};

TidalTrackListener.prototype.scrapAlbumName = function() {
    return $('.info-box__table').find('td[data-bind=album] > a').text()
};

TidalTrackListener.prototype.scrapDuration = function () {
    return $('.player__elapsed-time__duration').text();
};

window.UNPCommon.runTrackListenerInterval(new TidalTrackListener());
