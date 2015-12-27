const SoundcloudTrackListener = function() {};
SoundcloudTrackListener.prototype = new Common.WebsiteTrackListener();

SoundcloudTrackListener.prototype.isPlaying = function() {
    return true;
};

SoundcloudTrackListener.prototype.scrapPlayData = function() {
    const play = $('.playbackSoundBadge__title').attr('title');
    [this.artistName, this.trackName] = Common.parseArtistTitle(play);
    return true;
};

SoundcloudTrackListener.prototype.scrapAlbumArt = function() {
    return $('.playControls__inner span.image__full').css('background-image')
        .replace('url("', '').replace('")', '')
        .replace(/50x50.jpg$/, '500x500.jpg');
};

SoundcloudTrackListener.prototype.scrapUrl = function() {
    return 'http://soundcloud.com' + $('.playbackSoundBadge__title').attr('href');
};

SoundcloudTrackListener.prototype.scrapDuration = function() {
    return $('.playbackTimeline__duration span:eq(1)').text();
};

const updateTriggerer = new Common.MutationObserverUpdater(new SoundcloudTrackListener());
updateTriggerer.setSelector('.playControls__soundBadge > .playbackSoundBadge');
updateTriggerer.setNodeAttributeName('class');
updateTriggerer.setNodeAttributeValue(new RegExp('playbackSoundBadge__avatar'));
updateTriggerer.runOnChildAttr();
