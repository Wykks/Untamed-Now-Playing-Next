const NoAdRadioTrackListener = function() {};
NoAdRadioTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

NoAdRadioTrackListener.prototype.isPlaying = function() {
    return $('#btn-playpause').hasClass('pause');
};

NoAdRadioTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#player_current_artist > a').text();
    this.trackName = $.trim($('#current-song').text());
    return true;
};

NoAdRadioTrackListener.prototype.scrapAlbumArt = function() {
    return 'http:' + $('#player_main_pic_img').attr('src');
};

NoAdRadioTrackListener.prototype.scrapUrl = function() {
    return 'http://www.noadradio.com' + $('#player_vid_link > a').attr('href');
};

window.UNPCommon.runTrackListenerInterval(new NoAdRadioTrackListener());
