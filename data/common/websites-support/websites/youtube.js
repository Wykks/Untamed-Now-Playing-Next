const youtube = (options) => {
    if (options.unpDisableYoutube === true) {
        throw new Error('UNP disabled on youtube');
    }
    const YoutubeTrackListener = function () { };
    YoutubeTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

    YoutubeTrackListener.prototype.isPlaying = function () {
        return $('#movie_player').hasClass('playing-mode');
    };
    
    YoutubeTrackListener.prototype.scrapPlayData = function () {
        const play = $('#player-container').find('.ytp-title-text').text();
        [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
        if (!this.artistName) {
            this.artistName = $('#owner-name').text();
        }
        return true;
    };
    
    YoutubeTrackListener.prototype.scrapAlbumArt = function () {
        return $('#thumbnail').find('#img').attr('src');
    };
    
    YoutubeTrackListener.prototype.scrapUrl = function () {
        return $('.ytp-title-link ').attr('href');
    };
    
    YoutubeTrackListener.prototype.scrapDuration = function () {
        return $('.ytp-time-duration').text();
    };

    window.UNPCommon.runTrackListenerInterval(new YoutubeTrackListener());
};

window.UNPBrowserFunc.getOptions().then(youtube);
