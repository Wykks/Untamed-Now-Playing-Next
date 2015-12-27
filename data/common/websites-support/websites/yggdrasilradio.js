const YggdrasilRadioTrackListener = function() {};
YggdrasilRadioTrackListener.prototype = new Common.WebsiteTrackListener();

YggdrasilRadioTrackListener.prototype.isPlaying = function() {
    return true;
};

YggdrasilRadioTrackListener.prototype.findSelector = function() {
    this.selector = undefined;
};

YggdrasilRadioTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#currartist').text();
    this.trackName = $('#currtitle').text();
    return true;
};

YggdrasilRadioTrackListener.prototype.scrapAlbumName = function() {
    return $('#curranime').text(); //Not really the album name (anime name), but still usefull
};

YggdrasilRadioTrackListener.prototype.scrapAlbumArt = function() {
    if ($('#art > a').length) {
        return 'http://yggdrasilradio.net' + $('#art > a').attr('href');
    } else {
        return '';
    }
};

YggdrasilRadioTrackListener.prototype.scrapDuration = function() {
    return $('#currduration').text();
};

Common.runTrackListenerInterval(new YggdrasilRadioTrackListener());
