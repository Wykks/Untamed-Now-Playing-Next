const PlayNeteaseListener = function() {};
PlayNeteaseListener.prototype = new window.UNPCommon.WebsiteTrackListener();

PlayNeteaseListener.prototype.findSelector = function() {
    this.selector = $('#g_player');
};

PlayNeteaseListener.prototype.isPlaying = function() {
    return $('#g_player > .btns > .ply').hasClass('pas');
};

PlayNeteaseListener.prototype.scrapPlayData = function() {
    this.artistName = this.selector.find('.f-thide.name.fc1.f-fl').text();
    this.trackName = this.selector.find('.by.f-thide.f-fl').find('a').text();
    return true;
};

PlayNeteaseListener.prototype.scrapAlbumArt = function() {
    return this.selector.find('.head > img').attr('src').replace(/\?param.*$/, '');
};

PlayNeteaseListener.prototype.scrapUrl = function() {
    return 'http://music.163.com/' + this.selector.find('.mask').attr('href');
};

PlayNeteaseListener.prototype.scrapDuration = function() {
    return this.selector.find('.j-flag.time').contents()
        .filter(function () {
            return this.nodeType == Node.TEXT_NODE;
        })[0].nodeValue
        .replace(/^ \/ /, '');
};

window.UNPCommon.runTrackListenerInterval(new PlayNeteaseListener());
