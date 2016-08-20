const RadiotunesTrackListener = function() {};
RadiotunesTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadiotunesTrackListener.prototype.isPlaying = function() {
    return $('#ctl-play').find('.icon').hasClass('icon-stop');
};

RadiotunesTrackListener.prototype.scrapPlayData = function() {
    const play = $('.title-container.title').text();
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    return true;
};

RadiotunesTrackListener.prototype.scrapAlbumArt = function() {
        const link = $('#art').find('img').attr('src');
        if (link.substring(0, 4) != 'http')
            return 'https:' + link;
        return link;
    };

window.UNPCommon.runTrackListenerInterval(new RadiotunesTrackListener());
