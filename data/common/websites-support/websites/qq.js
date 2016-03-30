const QQTrackListener = function() {};
QQTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

QQTrackListener.prototype.isPlaying = function() {
    return true;
};

QQTrackListener.prototype.findSelector = function() {
    this.selector = $('#divsonginfo');
};

QQTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $.trim(this.selector.find('.music_name span').text());
    this.trackName = $.trim(this.selector.find('.singer_name').text());
    return true;
};

QQTrackListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.album_pic img').attr('src');
};

QQTrackListener.prototype.scrapUrl = function() {
    return 'http://y.qq.com/#type=song&mid=' + this.selector.find('.btn_like').attr('mid');
};

QQTrackListener.prototype.scrapDuration = function() {
    return $.trim(this.selector.find('#ptime').text());
};

window.UNPCommon.runTrackListenerInterval(new QQTrackListener());
