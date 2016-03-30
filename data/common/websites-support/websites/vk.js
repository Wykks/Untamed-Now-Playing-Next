const VkTrackListener = function() {};
VkTrackListener.prototype = new window.UNPCommon.WebsiteTrackListener();

VkTrackListener.prototype.isPlaying = function() {
    return $('#gp_play').hasClass('playing');
};

VkTrackListener.prototype.scrapPlayData = function() {
    this.artistName = $('#gp_performer').text();
    this.trackName = $('#gp_title').text();
    return true;
};

VkTrackListener.prototype.scrapUrl = function() {
    return 'http://vk.com/wall-' + $('#gp_play_btn').find('a').attr('onclick').replace(/playAudioNew\('(.*)-(.*)',(.*)/i, '$2');
};

window.UNPCommon.runTrackListenerInterval(new VkTrackListener());
