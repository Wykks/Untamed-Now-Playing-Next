const AnimenfoTrackListener = function() {};
AnimenfoTrackListener.prototype = new Common.WebsiteTrackListener();

AnimenfoTrackListener.prototype.isPlaying = function() {
    return true;
};

AnimenfoTrackListener.prototype.findSelector = function() {
    this.selector = $('#nowplaying > div > div.float-container > div.row > div.span6');
};

AnimenfoTrackListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.children('span[data-search-artist]').text();
    this.trackName = $.trim(this.selector.contents().filter(function () {
        return this.nodeType == Node.TEXT_NODE;
    })[3].nodeValue);
    if (this.trackName === '') //Sometimes, infos are moved
        this.trackName = $.trim(this.selector.contents().filter(function () {
        return this.nodeType == Node.TEXT_NODE;
    })[5].nodeValue);
    return true;
};

AnimenfoTrackListener.prototype.scrapAlbumName = function() {
    return this.selector.children('span[data-search-album]').text();
};

AnimenfoTrackListener.prototype.scrapAlbumArt = function() {
    return $('#nowplaying_albumart').attr('src');
};

AnimenfoTrackListener.prototype.scrapDuration = function() {
    return $('#np_time').text();
};

Common.runTrackListenerInterval(new AnimenfoTrackListener());
