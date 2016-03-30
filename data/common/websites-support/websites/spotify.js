const SpotifyTrackListener = function() {};

SpotifyTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

SpotifyTrackListener.prototype.findSelector = function() {
    this.selector = $('#track-name').find('a');
};

SpotifyTrackListener.prototype.isPlaying = function() {
    return $('#play-pause').hasClass('playing');
};

SpotifyTrackListener.prototype.scrapPlayData = function() {
    this.artistName = '';
    const self = this;
    $('#track-artist').find('a').each(function() {
        self.artistName += (self.artistName === '') ? $(this).text() : ', ' + $(this).text();
    });
    this.trackName = this.selector.eq(0).text();
    return true;
};

SpotifyTrackListener.prototype.scrapAlbumArt = function() {
    return $('.sp-image-img').css('background-image').replace('url("', '').replace('")', '');
};

SpotifyTrackListener.prototype.scrapUrl = function() {
    return this.selector.attr('href');
};

SpotifyTrackListener.prototype.scrapDuration = function() {
    return $('#track-length').text();
};

/*
const updateTriggerer = new window.UNPCommon.MutationObserverUpdater(new SpotifyTrackListener());
updateTriggerer.setSelector('#cover-art');
updateTriggerer.setNodeAttributeName('class');
updateTriggerer.setNodeAttributeValue(new RegExp('sp-image-wrapper'));
updateTriggerer.runOnChildAttr();
*/
window.UNPCommon.runTrackListenerInterval(new SpotifyTrackListener());
