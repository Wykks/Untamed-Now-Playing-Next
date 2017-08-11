const SoundcloudTrackListener = function() {};
SoundcloudTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

SoundcloudTrackListener.prototype.isPlaying = function() {
    return $('header').hasClass('playing');
};

SoundcloudTrackListener.prototype.scrapPlayData = function() {
    const play = $('.playbackSoundBadge__titleLink ').attr('title');
    [this.artistName, this.trackName] = window.UNPCommon.parseArtistTitle(play);
    if (!this.artistName) {
        this.artistName = $('.playbackSoundBadge__lightLink').attr('title');
    }
    return true;
};

SoundcloudTrackListener.prototype.scrapAlbumArt = function() {
    return $('.playControls__inner .playbackSoundBadge__avatar span.image__full').css('background-image')
        .replace('url("', '').replace('")', '')
        .replace(/50x50.jpg$/, '500x500.jpg');
};

SoundcloudTrackListener.prototype.scrapUrl = function() {
    return 'http://soundcloud.com' + $('.playbackSoundBadge__titleLink').attr('href');
};

SoundcloudTrackListener.prototype.scrapDuration = function() {
    return $('.playbackTimeline__duration span:eq(1)').text();
};

const updateTriggerer = new window.UNPCommon.MutationObserverUpdater(new SoundcloudTrackListener());
updateTriggerer.setSelector('.playControls__soundBadge > .playbackSoundBadge');
updateTriggerer.setNodeAttributeName('class');
updateTriggerer.setNodeAttributeValue(new RegExp('playbackSoundBadge__avatar'));
updateTriggerer.runOnChildAttr();
