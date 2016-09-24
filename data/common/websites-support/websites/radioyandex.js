const RadioYandexTrackListener = function() {};
RadioYandexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadioYandexTrackListener.prototype.isPlaying = function() {
    return $('body').hasClass('body_state_playing');
};

RadioYandexTrackListener.prototype.findSelector = function() {
    this.selector = $('.slider__item_playing');
};

RadioYandexTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.track__artists').attr('title');
    this.trackName = this.selector.find('.track__title').attr('title');
    return true;
};

RadioYandexTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find(".track__cover").css('background-image').replace('url("', '').replace('")', '');
};

window.UNPCommon.runTrackListenerInterval(new RadioYandexTrackListener());
