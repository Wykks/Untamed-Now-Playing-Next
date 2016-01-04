if (BrowserFunc.getOption('unpDisableYoutube') === true)
    throw new Error('UNP disabled on youtube');

const YoutubeTVTrackListener = function() {};
YoutubeTVTrackListener.prototype = new Common.WebsiteTrackListener();

YoutubeTVTrackListener.prototype.isPlaying = function() {
    return $('#watch').hasClass('play');
};

YoutubeTVTrackListener.prototype.scrapPlayData = function() {
    const play = $('#title-tray .player-video-title').text();
    [this.artistName, this.trackName] = Common.parseArtistTitle(play);
    return true;
};

YoutubeTVTrackListener.prototype.scrapDuration = function() {
    return $('#bottom-half .player-time-total').text();
};

const updateTriggerer = new Common.MutationObserverUpdater(new YoutubeTVTrackListener());
updateTriggerer.setSelector('#watch');
updateTriggerer.setNodeAttributeName('class');
updateTriggerer.setNodeAttributeValue(new RegExp('play'));
updateTriggerer.runOnAttr();
