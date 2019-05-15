const MonstercatTrackListener = function() {};
MonstercatTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

MonstercatTrackListener.prototype.isPlaying = function() {
    return !$('i[role="play"]').hasClass('fa-play');
};

MonstercatTrackListener.prototype.findSelector = function() {
    this.selector = $('header div.player .controls');
};

MonstercatTrackListener.prototype.scrapPlayData = function() {
    const songName = this.selector.find('span[role="track-title"]').text();
    [this.trackName, this.artistName] = window.UNPCommon.parseArtistTitle(songName);
    return true;
};

MonstercatTrackListener.prototype.scrapUrl = function() {
    return 'https://www.monstercat.com' + this.selector.find('a[role="track-link"]').attr('href');
};

window.UNPCommon.runTrackListenerInterval(new MonstercatTrackListener());
