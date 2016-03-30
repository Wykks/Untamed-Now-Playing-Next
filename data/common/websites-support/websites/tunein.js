const TuneInTrackListener = function() {};
TuneInTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

TuneInTrackListener.prototype.isPlaying = function() {
    return $('#tuner').hasClass('playing');
};

TuneInTrackListener.prototype.scrapPlayData = function() {
    const play = $('#tuner div.line1').text();
    [this.trackName, this.artistName] = window.UNPCommon.parseArtistTitle(play);
    if (this.trackName !== '')
        this.trackName += ' [' + $('#tuner div.line2 > .title').text() + ']';
    else {
        this.artistName = $('#tuner div.line2 > .title').text();
        this.trackName = play;
    }
    return true;
};

TuneInTrackListener.prototype.scrapAlbumArt = function() {
    return $('.image > img').attr('src');
};

window.UNPCommon.runTrackListenerInterval(new TuneInTrackListener());
