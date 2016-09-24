const RadioYandexTrackListener = function() {};
RadioYandexTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

RadioYandexTrackListener.prototype.isPlaying = function () {
    this.music = unsafeWindow.Mu;
    return (this.music.Flow.getState() === 'playing');
};

RadioYandexTrackListener.prototype.scrapPlayData = function () {
    this.artistName = this.music.Flow.getCurrent().artists[0].name;
    this.trackName = this.music.Flow.getCurrent().title;
    return true;
};

RadioYandexTrackListener.prototype.scrapAlbumArt = function () {
    return 'https://'+this.music.Flow.getCurrent().albums[0].coverUri.replace('%%', '600x600');
};

RadioYandexTrackListener.prototype.scrapDuration = function () {
    var time = this.music.Flow.getDuration().toFixed(0);
    var hours = parseInt(time / 3600) % 24;
    var minutes = parseInt(time / 60) % 60;
    var seconds = time % 60;
    return (hours > 0 ? hours+':' : '') +
        + ((hours > 0 && minutes < 10) ? '0' + minutes : minutes) + ':'
        + ((minutes > 0 && seconds < 10) ? '0' + seconds : seconds);
};

RadioYandexTrackListener.prototype.scrapAlbumName = function () {
    return this.music.Flow.getCurrent().albums[0].title;
};

RadioYandexTrackListener.prototype.scrapUrl = function () {
    return link = 'https://music.yandex.ru/album/' + this.music.Flow.getCurrent().albums[0].id
        + "/track/" + this.music.Flow.getCurrent().id;
};

window.UNPCommon.runTrackListenerInterval(new RadioYandexTrackListener());
