const youtubetv = (options) => {
    if (options.unpDisableYoutube === true) {
        throw new Error('UNP disabled on youtube');
    }

    const YoutubeTVTrackListener = function() {};
    YoutubeTVTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

    YoutubeTVTrackListener.prototype.isPlaying = function() {
        return $('#watch').hasClass('play');
    };

    YoutubeTVTrackListener.prototype.scrapPlayData = function() {
        const play = $('#title-tray .player-video-title').text();
        [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
        return true;
    };

    YoutubeTVTrackListener.prototype.scrapDuration = function() {
        return $('#bottom-half .player-time-total').text();
    };

    const updateTriggerer = new window.UNPCommon.MutationObserverUpdater(new YoutubeTVTrackListener());
    updateTriggerer.setSelector('#watch');
    updateTriggerer.setNodeAttributeName('class');
    updateTriggerer.setNodeAttributeValue(new RegExp('play'));
    updateTriggerer.runOnAttr();
};

BrowserFunc.getOptions().then(youtubetv);
