// helpers
const getVideoId = function(video_url) {
    var match = video_url.match(/v=([\d\w]+)/);
    if (match) {
        return match[1]; // matching group 1 with ID
    }
}

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

    YoutubeTrackListener.prototype.scrapUrl = function () {
        return $('.ytp-title-link ').attr('href');
    };

    YoutubeTrackListener.prototype.scrapAlbumArt = function () {
        // since i didn't find thumbnail as usual, it is easier to get
        // video ID and substitute to the thumbnail's default url
        var id = getVideoId(this.scrapUrl());
        if (id) {
            return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'
        }
    };

    YoutubeTrackListener.prototype.scrapDuration = function () {
        return $('.ytp-time-duration').text();
    };

    window.UNPCommon.runTrackListenerInterval(new YoutubeTrackListener());
};

window.UNPBrowserFunc.getOptions().then(youtube);
