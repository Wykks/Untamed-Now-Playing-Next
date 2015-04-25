var last = false;
var interval = 10000;

var host = window.location.host.replace('www.', '');

switch(host)
{
	case '8tracks.com':
		setInterval(function(){
			if ($('#player_pause_button').css('display') == 'block'){
				var selector   = $('li.now_playing').find('.title_container').find('.title_artist');
				var artistName = selector.find('.a').eq(0).text();
				var trackName  = selector.find('.t').eq(0).text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $('li.now_playing').find('.album').find('.detail').text(),
						albumArt   : $('#mix_player_details').find('a').find('img').attr('src').replace(/(.*)\?(.*)/i, '$1'),
						url        : 'http://8tracks.com' + $('.mixname').find('a').attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'ah.fm':
		setInterval(function(){
			if ($('.now_playing').length && $('#pause').is(':visible')){
				var play    = $('.now_playing > div > .blank').text();
				var matches = play.match('^(.+) - (.+) on AH.FM$');

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : matches[2],
						artistName : matches[1]
					});
				}
			}
		}, interval);
	break;
	case 'blinkboxmusic.com':
		setInterval(function(){
			if ($('.control-button[data-play-button]').hasClass('playing')){
				var artistName = $('.track-artist').text();
				var trackName  = $('.track-name').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : $('.total').text()
					});
				}
			}
		}, interval);
	break;
	case 'deezer.com':
		setInterval(function()
		{

			if ($('#player_control_pause').is(':visible'))
			{
				var artistName = $('#player_track_artist').slice(0,1).text();
				var trackName  = $('#player_track_title').slice(0,1).text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : $('#player_track_length').text(),
					});
				}
			}
		}, interval);
	break;
	case 'di.fm':
		setInterval(function(){
			if ($('#ctl-play > i').hasClass('icon-stop')){
				var play    = $('#now-playing .title').text();

				if (last !== play){
					var remainingTime = $('.timestamps .remaining').text();
					var matches = play.match('^(.+) - (.+)$');
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : matches[2],
						artistName : matches[1],
						albumArt   : $('#art').find('img').attr('src'),
						duration   : (remainingTime == '') ? $('.timestamps .elapsed').text() : secToHms(hmsToSec(remainingTime.substr(1,remainingTime.length)) + hmsToSec($('.timestamps .elapsed').text()))
					});
				}
			}
		}, interval);
	break;
	case 'distortionradio.com':
		setInterval(function()
		{
			var currentPlaying = $('.item_info').slice(0,1);
			var artistName     = currentPlaying.find('.artist').text();
			var trackName      = currentPlaying.find('.title').text();
			var play           = artistName + ' - ' + trackName;

			if (last !== play){
				nowPlaying(
				{
					nowPlaying : play,
					trackName  : artistName,
					artistName : trackName,
				});
			}
		}, interval);
	break;
	case 'grooveshark.com':
		setInterval(function(){
			if ($('#play-pause').hasClass('playing')){
				var artistName = $('.now-playing-link.artist').attr('title');
				var trackName  = $('.now-playing-link.song').attr('title');
				var albumName  = $('.now-playing-link.album');
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					var duration = $('#time-total').text();
					var albumArt = $('#now-playing-image').attr('src').replace(/(.*)\/([0-9]+)_(.*)\.(jpg|jpeg|png)$/i, '$1/142_$3.$4');

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : albumName.attr('title'),
						albumArt   : (albumArt == 'http://images.gs-cdn.net/static/albums/142_album.png') ? '?' : albumArt,
						duration   : $('#time-total').text(),
						url        : 'http://grooveshark.com/' + albumName.attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'retro.grooveshark.com':
		setInterval(function(){
			if ($('#playerDetails_current_song').length && $('#player_play_pause').hasClass('pause')){
				var playerDetails = $('#playerDetails_current_song');
				var artistName    = playerDetails.find('.artist').attr('title');
				var trackName     = playerDetails.find('.song').attr('title');
				var albumName     = playerDetails.find('.album');
				var play          = artistName + ' - ' + trackName;

				if (last !== play){
					var duration = $('#player_duration').html();
					var albumArt = $('.queue-item-active').find('.queue-item-content').find('.queueSong').find('.albumart').find('img').attr('src').replace(/(.*)\/([0-9]+)_(.*)\.(jpg|jpeg|png)$/i, '$1/142_$3.$4');

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : albumName.attr('title'),
						albumArt   : (albumArt == 'http://images.gs-cdn.net/static/albums/142_album.png') ? '?' : albumArt,
						duration   : ( (duration.substr(0,1) == '0') ? duration.substr(1, duration.length) : duration ),
						url        : 'http://retro.grooveshark.com/' + albumName.attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'hypem.com':
		setInterval(function(){
			if ($('#playerPlay').hasClass('pause')){
				var playerDetails     = $('#player-nowplaying');
				var artistName        = playerDetails.children('a').eq(0).text();
				var trackNameSelector = playerDetails.children('a').eq(1);
				var trackName         = trackNameSelector.text();
				var play              = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : $('#player-time-total').text(),
						url        : 'http://hypem.com' + trackNameSelector.attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'iheart.com':
		setInterval(function(){
			if ($('#playerPlay').hasClass('pause')){
				var artistName = $('h2.artist').find('a').attr('title');
				var trackName  = $('h1.title').find('a').attr('title');
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumArt   : $('.playerArt').find('a').find('img').attr('src').replace('imscale?w=54', 'imscale?w=150'),
						url        : 'http://iheart.com' + $('.liveStn').find('.title').find('a').attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'jango.com':
		setInterval(function(){
			if ($('#btn-playpause').hasClass('pause')){
				var artistName = $('#player_current_artist').find('a').text();
				var trackName  = $('#current-song').find('a').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $.trim($('#player_current_artist').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text()),
						albumArt   : $('#player_main_pic_img').attr('src'),
						url        : 'http://jango.com' + $('#station_info').find('a').attr('href')
					});
				}
			}
		}, interval);
		break;
		case 'last.fm':
		case 'lastfm.de':
		case 'lastfm.es':
		case 'lastfm.fr':
		case 'lastfm.it':
		case 'lastfm.jp':
		case 'lastfm.pl':
		case 'lastfm.com.br':
		case 'lastfm.ru':
		case 'lastfm.se':
		case 'lastfm.com.tr':
		case 'cn.last.fm':
		setInterval(function(){
			if (!$('#radioControlPlay').is(':visible') && $('#nowPlayingMeta').is(':visible')){
				var artistName        = $('.artist').find('a').text();
				var trackNameSelector = $('.track').find('a');
				var trackName         = trackNameSelector.text();
				var play              = artistName + ' - ' + trackName;

				if (last !== play){

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $('.album').find('.title').text(),
						albumArt   : $('span.albumCover').find('img.art').attr('src').replace(/(.*)\/serve\/(.*)\/(.*)\.(jpg|jpeg|png)$/i, '$1/serve/126/$3.$4'),
						url        : trackNameSelector.attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'nightbot.tv':
		setInterval(function(){
			if ($('#pause').is(':visible')){
				var play = $('#currentTitle').text();
				var parse;

				if (parse = parseArtistTitle(play)){
					var artistName = parse[0];
					var trackName  = parse[1];
				}
				else
				{
					var artistName = '?';
					var trackName  = play;
				}

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : secToHms(hmsToSec($('#duration').text()))
					});
				}
			}
		}, interval);
	break;
	case 'pandora.com':
		setInterval(function(){
			if ($('.pauseButton').is(':visible')){
				var artistName = $('.playerBarArtist').text();
				var trackName  = $('.playerBarSong').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					var remainingTime = $('.remainingTime').text();
					var remainingTime = remainingTime.substr(1,remainingTime.length);

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $('.playerBarAlbum').text(),
						albumArt   : $('.playerBarArt').attr('src'),
						duration   : secToHms(hmsToSec(remainingTime) + hmsToSec($('.elapsedTime').text())),
						url        : $('.playerBarSong').attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'piki.fm':
		setInterval(function(){
			if ($('.btn-player-pause').is(':visible')){
				var artistName = $('.artist-name').text();
				var trackName  = $('.song-name').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					var remainingTime = $('.song-time-left').text();
					var remainingTime = remainingTime.substr(1,remainingTime.length);

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : secToHms(hmsToSec($('.song-time-past').text()) + hmsToSec(remainingTime)),
						url        : 'http://piki.fm'
					});
				}
			}
		}, interval);
	break;
	case 'play.google.com':
		setInterval(function(){
			if ($('button.playing[data-id="play-pause"]').length){
				var artistName = $('#player-artist').text();
				var trackName  = $('#playerSongTitle').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $('.player-album').text(),
						albumArt   : 'http:' + $('#playingAlbumArt').attr('src'),
						duration   : $('#time_container_duration').text(),
						url        : 'http://play.google.com'
					});
				}
			}
		}, interval);
	break;
	case 'play.spotify.com':
		setInterval(function(){
			if ($('#play-pause').hasClass('playing')){
				var artistName = '';

				$('#track-artist').find('a').each(function(){
					artistName += (artistName == '') ? $(this).text() : ', ' + $(this).text();
				});

				var trackNameSelector = $('#track-name').find('a');
				var trackName         = trackNameSelector.eq(0).text();
				var play              = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumArt   : $('.sp-image-img').css('background-image').replace('url(','').replace(')',''),
						duration   : $('#track-length').text(),
						url        : trackNameSelector.attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'plug.dj':
		setInterval(function(){
			var play = $("#now-playing-media").find('span.bar-value').text();
			var parse;

			if (parse = parseArtistTitle(play)){
				var artistName = parse[0];
				var trackName  = parse[1];
			}
			else
			{
				var artistName = '?';
				var trackName  = play;
			}

			if (last !== play){
				nowPlaying(
				{
					nowPlaying : play,
					trackName  : trackName,
					artistName : artistName
				});
			}
		}, interval);
	break;
	case 'prostopleer.com':
		setInterval(function(){
			if ($('#play').hasClass('pause')){
				var nPSelector = $.trim($('.now-playing').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text()).match(/^(.+) \u2014 (.+) \((.+)\)$/);
				var artistName = nPSelector[1];
				var trackName  = nPSelector[2];
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : secToHms(hmsToSec(nPSelector[3])),
						url        : 'http://prostopleer.com/tracks/' + $('li.current').attr('link')
					});
				}
			}
		}, interval);
	break;
	// seoul.fm iframe
	case 'yuri.seoul.fm':
		var artistName = $.trim($('#title').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text());
		var trackName  = $.trim($('#title').find('font').find('b').text());
		var play       = artistName + ' - ' + trackName;

		nowPlaying(
		{
			nowPlaying : play,
			trackName  : trackName,
			artistName : artistName,
			albumArt   : $('#cpPictureMainSong').attr('src'),
			url        : 'http://seoul.fm'
		});
	break;
	// radiorecord.ru
	case 'radiorecord.ru':
		setInterval(function()
		{
			var currentPlaying = $('.nowtrack');
			var artistName     = currentPlaying.find('.artist').text();
			var trackName      = currentPlaying.find('.title').text();
			var play           = artistName + ' - ' + trackName;

			if (last !== play){
				nowPlaying(
				{
					nowPlaying : play,
					trackName  : artistName,
					artistName : trackName,
				});
			}
		}, interval);
	break;
	case 'slacker.com':
		setInterval(function(){
			if ($('#mini-play').hasClass('pause')) {
				var artistName        = $('#player-artist-name').text();
				var trackNameSelector = $('#player-track-name');
				var trackName         = trackNameSelector.text();
				var play              = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : $('#player-album-name').text(),
						albumArt   : $('#track-art-current-img').attr('src'),
						duration   : $('#progress-total').text(),
						url        : 'http://slacker.com/#song/' + trackNameSelector.attr('itemid') + '/' + trackNameSelector.attr('perfid') + '/' + trackNameSelector.attr('trackid')
					});
				}
			}
		}, interval);
	break;
	case 'songza.com':
        setInterval(function(){
            if ($('div.miniplayer-info').find('.miniplayer-info-track-title').length > 0){
                var selector   = $('div.miniplayer-info');
                var artistName = selector.find('.miniplayer-info-artist-name').find('a').attr('title');
                var trackName  = selector.find('.miniplayer-info-track-title').find('a').attr('title');
                var play       = artistName + ' - ' + trackName;

                if (last !== play){
                    nowPlaying(
                    {
                        nowPlaying : play,
                        trackName  : trackName,
                        artistName : artistName,
                        albumArt   : $('div.miniplayer-album-art-wrapper').find('img').attr('src'),
                        url        : $('div.miniplayer-info-playlist-title').find('a').attr('href')
                    });
                }
            }
        }, interval);
    break;
	case 'soundcloud.com':
		setInterval(function(){
			var selector = $('.sc-button-pause').parent().parent();
			var trackName = $('.playbackSoundBadge__title').text();
			var duration = $('playbackTimeline__duration').text();
			var url = "http://soundcloud.com" + $('.playbackSoundBadge__title').attr('href');


			if (selector.eq(1).hasClass('soundActions')){
				var selector2  = selector.eq(1).parent().parent().parent();
				var artistName = $.trim(selector2.find('.soundTitle').find('.sc-truncate').find('a').text());
				var albumArt   = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
				var albumArt   = (typeof albumArt === 'undefined') ? $('.image__full').attr('src') : albumArt.replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
			}
			else if (selector.length){
				if (selector.parent().hasClass('carouselItem')){
					var selector2         = selector.parent().find('.carouselItem__info');
					var trackNameSelector = selector2.find('div').eq(1).find('a');
					var artistName        = selector2.find('div').eq(0).find('a').text();
					var albumArt          = selector.parent().find('.carouselItem__artworkContainer').find('.image__hasPlaceholder').find('img').attr('src').replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
				}
				else if (selector.parent().parent().parent().hasClass('playlist')){
					var selector2  = selector.eq(1).parent().parent().parent();
					var artistName = $.trim(selector.parent().find('.sc-type-light').find('.soundTitle__username').text());
					var albumArt   = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
					var albumArt   = (typeof albumArt === 'undefined') ? $('.image__full').attr('src') : albumArt.replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
				}
				else
				{
					var artistName = $.trim(selector.parent().find('.sc-type-light').find('.soundTitle__username').text());
					var albumArt   = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
					var albumArt   = (typeof albumArt === 'undefined') ? $('.image__full').attr('src') : albumArt.replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
				}
			}
			else if ($('.nowPlaying').hasClass('playing')){
					var artistName = document.title;
					var albumArt   = '?';
			}
			else
			{
				return;
			}

			var play = artistName + ' - ' + trackName;

			if (last !== play){
				nowPlaying(
				{
					nowPlaying : play,
					trackName  : trackName,
					artistName : artistName,
					albumArt   : albumArt,
					duration   : duration,
					url        : url
				});
			}
		}, interval);
	break;
	case 'themusicninja.com':
		setInterval(function(){
			if ($('#player-features').hasClass('tmn_playing')){
				var selector   = $('.track_name').find('a');
				var artistName = $.trim(selector.find('.artist').text());
				var trackName  = $.trim(selector.find('.title').text());
				var play       = artistName + ' - ' + trackName;
				
				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						duration   : $('.sm2_total').text()
					});
				}
			}
		}, interval);
	break;
	case 'tunein.com':
		setInterval(function(){
			if ($('.playbutton-cont').find('a').hasClass('playing')){
				var play = $('.line1').text();
				var parse;

				if (parse = parseArtistTitle(play)){
					var artistName = parse[1];
					var trackName  = parse[0] + ' [' + $('.line2').find('.title').text() + ']';
				}
				else
				{
					var artistName = $('.line2').find('.title').text();
					var trackName  = play;
				}

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumArt   : $('.image').find('img').attr('src')
					});
				}
			}
		}, interval);
	break;
	case 'turntable.fm':
		setInterval(function(){
			if ($('#songboard-title').length){
				var selector   = $('#song-log').find('.song').eq(0);
				var details    = selector.find('.details').find('span').html();
				var trackName  = selector.find('.title').text();
				var artistName = details.replace(/(.*)<span class(.*)<\/span>(.*)$/i, '$1');
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					var albumArt = selector.find('.thumb').css('background-image').replace('url(','').replace(')','');

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumArt   : (albumArt == 'https://s3.amazonaws.com/static.turntable.fm/images/playlist/empty-record.png') ? '?' : albumArt,
						duration   : details.replace(/(.*)<span class(.*)<\/span>(.*)$/i, '$3')
					});
				}
			}
		}, interval);
	break;
	case 'vk.com':
		setInterval(function(){
			if ($('#gp_play').hasClass('playing')){
				var artistName = $('#gp_performer').text();
				var trackName  = $('#gp_title').text();
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						url        : 'http://vk.com/wall-' + $('#gp_play_btn').find('a').attr('onclick').replace(/playAudioNew\('(.*)-(.*)',(.*)/i, '$2')
					});
				}
			}
		}, interval);
	break;
	case 'youtube.com':
		if (window.location.pathname.match(/^\/tv.*/)) //Youtube tv support
		{
			if (self.options.prefs.unpDisableYoutube === 'true')
			{
				console.log('UNP: YouTube parsing disabled');
			}
			else
			{
				setInterval(function(){
					if ($('#watch').hasClass('play')){
						var duration = $('#watch .player-time-total').text();
						var play     = $('#watch .player-video-title').text();
						if (last !== play){
							var match = window.location.hash.match(/#.*[?&]v=([^&]+)(&|$)/);
							var url = match ? 'http://youtu.be/' + match[1] : "";
							var parse;
							if (parse = parseArtistTitle(play)){
								var artistName = parse[0];
								var trackName  = parse[1];
							}
							else
							{
								var artistName = '?';
								var trackName  = play;
							}
							nowPlaying(
							{
								nowPlaying : play,
								trackName  : trackName,
								artistName : artistName,
								duration   : duration,
								url        : url
							});
						}
					}
				}, interval);
			}
		}
		function youtubeSupport() {
			if (self.options.prefs.unpDisableYoutube === 'true') {
				$('body').append('<div style="position:fixed;bottom:0;right:0;z-index:999;border-top-left-radius:3px;background:linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 66%,rgba(237,237,237,1) 100%);opacity:0.8;border:1px solid #EDEDED;padding:2px 5px;font-size:11px">UNP: YouTube parsing is disabled, to change <a href="chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/options.html" target="_blank" style="color:#000">click here</a></div>');
				console.log('UNP: YouTube parsing disabled');
				return;
			}
			if (typeof $('#watch7-content > meta[itemprop="name"]').attr('content') !== 'undefined' &&
				last !== $('#watch7-content > meta[itemprop="name"]').attr('content'))
			{
				var duration = $('.ytp-time-duration').text();
				var play     = $('#watch7-content > meta[itemprop="name"]').attr('content');
				var parse;

				if ($('#eow-title').find('a').length){
					var artistName = $('#eow-title').find('a').text();
					var trackName  = $.trim($('#eow-title').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text());
					var matches;

					if (matches = trackName.match('^(-|\u2012|\u2013|\u2014|\u2015]|\|)'))
					{
						if (matches[0] != '')
						{
							trackName = $.trim(trackName.substring(1));
						}
					}
				}
				else if (parse = parseArtistTitle(play)){
					var artistName = parse[0];
					var trackName  = parse[1];
				}
				else
				{
					var artistName = '?';
					var trackName  = play;
				}

				nowPlaying(
				{
					nowPlaying : play,
					trackName  : trackName,
					artistName : artistName,
					duration   : secToHms(duration),
					albumArt   : $('link[itemprop="thumbnailUrl"]').attr('href'),
					url        : $('link[itemprop="url"]').attr('href')
				});
			}
		}

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(ytAttrModified);
		});
		observer.observe(document.body, { attributes: true });
		var re = new RegExp('page-loaded');
		function ytAttrModified(mutation) {
			if (mutation.attributeName != 'class')
				return;
			var newValue = mutation.target.getAttribute(mutation.attributeName);
			if (newValue.match(re))
				youtubeSupport();
		}
		youtubeSupport();
	break;
	case 'zaycev.fm':
		setInterval(function(){
			if ($('.zp_play').hasClass('g-active')){
				var selector   = $('#zp_current_song').find('span');
				var artistName = $.trim(selector.find('.ontheair_artist').text().replace(/^(.+)\u00A0-\u00A0$/, '$1'));
				var trackName  = $.trim(selector.find('.ontheair_song').text());
				var play       = artistName + ' - ' + trackName;

				if (last !== play){
					var albumArt = selector.find('div').find('img').attr('src');

					nowPlaying(
					{
						nowPlaying : play,
						trackName  : trackName,
						artistName : artistName,
						albumArt   : (albumArt == 'http://img1.zaycev.fm/media/images/nomp3s.jpg') ? '?' : albumArt,
						url        : $('.ontheair_song').attr('href')
					});
				}
			}
		}, interval);
	break;
	case 'play.baidu.com':
	setInterval(function(){
		var selector   = $('#playTitle').find('.title');
		var artistName = $.trim(selector.find('.songname').text());
		var trackName  = $.trim(selector.find('.artist').text());
		var play       = artistName + ' - ' + trackName;

		if (last !== play)
		{
			var albumArt = $('.album').find('img').attr('src');

			nowPlaying(
			{
				nowPlaying : play,
				trackName  : trackName,
				artistName : artistName,
				albumName  : $('.album-wrapper .album-name').text(),
				albumArt   : albumArt,
				duration   : $.trim($('#timeWrap').find('.totalTime').text()),
				url        : selector.find('.songname').attr('href')
			});
		}
		}, interval);
	break;
	case 'y.qq.com':
	setInterval(function(){
		var selector   = $('#divsonginfo');
		var artistName = $.trim(selector.find('.music_name span').text());
		var trackName  = $.trim(selector.find('.singer_name').text());
		var play       = artistName + ' - ' + trackName;

		if (last !== play)
		{
			var albumArt = selector.find('.album_pic img').attr('src');

			nowPlaying(
			{
				nowPlaying : play,
				trackName  : trackName,
				artistName : artistName,
				albumArt   : albumArt,
				duration   : $.trim(selector.find('#ptime').text()),
				url        : 'http://y.qq.com/#type=song&mid=' + selector.find('.btn_like').attr('mid')
			});
		}
		}, interval);
	break;
	case 'player.kuwo.cn':
	setInterval(function(){
		var selector   = $('.control_left');
		var play       = selector.find('.dec_time span').text();

		if (last !== play)
		{
			if (parse = parseArtistTitle(play)){
				var artistName = parse[0];
				var trackName  = parse[1];
			}
			else
			{
				var artistName = '?';
				var trackName  = play;
			}
			var albumArt = selector.find('.control_img img').attr('src');

			var data = $("#bdshare").attr("data");
			var musicid = data.substr(data.indexOf('MUSIC_') + 6,7)

			nowPlaying(
			{
				nowPlaying : play,
				trackName  : trackName,
				artistName : artistName,
				albumArt   : albumArt,
				duration   : $.trim(selector.find('#wp_totalTime').text()),
				url        : 'http://www.kuwo.cn/yinyue/' + musicid
			});
		}
		}, interval);
	break;
	case 'fm.5sing.com':
	setInterval(function(){
		var selector   = $('.box_player');
		var artistName = $.trim(selector.find('.sing_remark span').eq(0).text());
		var track = selector.find('#_sing_title a')
		var trackName  = $.trim(track.text());
		var play       = artistName + ' - ' + trackName;

		if (last !== play)
		{
			var albumArt = $('.album').find('img').attr('src');

			nowPlaying(
			{
				nowPlaying : play,
				trackName  : trackName,
				artistName : artistName,
				albumArt   : albumArt,
				url        : track.attr('href')
			});
		}
		}, interval);
	break;
	case 'rdio.com':
	setInterval(function(){
		if ($('.play_pause').hasClass('playing')) {
			var selector = $('.player_bottom');
			var artistName = $.trim(selector.find('.artist_title').text());
			var track = selector.find('.song_title');
			var trackName  = $.trim(track.text());
			var play       = artistName + ' - ' + trackName;

			if (last !== play)
			{
				var albumArt = selector.find('.queue_art').attr('src');
				var url = 'http://www.rdio.com' + track.attr('href');
				var albumName = track.attr('href').match(".*/album/(.*)/track.*")[1].replace("_"," ");

				nowPlaying(
				{
					nowPlaying : play,
					trackName  : trackName,
					artistName : artistName,
					albumName  : albumName,
					albumArt   : albumArt,
					duration   : selector.find('.duration').text(),
					url        : url
				});
			}
		}
		}, interval);
	break;
	case 'xiami.com':
	setInterval(function(){
		if ($('#J_playBtn').hasClass('pause-btn')) {
			var selector   = $('#J_trackInfo').find('#J_trackName');
			var trackName  = $.trim(selector.attr('title'));
			var url        = selector.attr('href');
			var info       = $('#J_trackList'+ url.match(".*/song/(.*)")[1]);
			var artistName = $.trim(info.find('.ui-row-item-body div:nth-child(2)').text());
			var play       = artistName + ' - ' + trackName;

			if (last !== play)
			{
				var albumArt = $('#J_playerCover').find('img').attr('src');
				var albumName = $.trim(info.find('.ui-row-item-body div:nth-child(3)').text());

				nowPlaying(
				{
					nowPlaying : play,
					trackName  : trackName,
					artistName : artistName,
					albumName  : albumName,
					albumArt   : albumArt,
					duration   : $('#J_durationTime').text(),
					url        : url
				});
			}
		}
		}, interval);
	break;
}

function nowPlaying(np)
{
	last = np.nowPlaying;

	if (np.nowPlaying !== null && np.nowPlaying !== false && typeof np.nowPlaying !== 'undefined')
	{
		var currentTime = new Date();
		var minutes     = currentTime.getMinutes();
		var	hours       = currentTime.getHours();

		updateNowPlaying(
		{
			nowPlaying  : np.nowPlaying,
			duration    : ( (!empty(np.duration)) ? np.duration : '?' ),
			trackName   : ( (!empty(np.trackName)) ? np.trackName : '?' ),
			artistName  : ( (!empty(np.artistName)) ? np.artistName : '?' ),
			albumName   : ( (!empty(np.albumName)) ? np.albumName : '?' ),
			albumArt    : ( (!empty(np.albumArt) && np.albumArt.substring(0,4) == 'http') ? np.albumArt : '?' ),
			timeStarted : ( (hours < 10) ? '0' + hours : hours ) + ':' + ( (minutes < 10) ? '0' + minutes : minutes ),
			url         : ( (!empty(np.url)) ? np.url : window.location.href ),
		}).then(function()
		{
			console.log('UNP: Now Playing Success');
		}, function(reason) {
			console.log('UNP: Now Playing Error - ' + reason);
		});
	}
}

function updateNowPlaying(data)
{
	self.port.emit('updateNowPlaying', data);
	return new Promise(function(resolve, reject) {
		self.port.once('updateNowPlaying', function(status)
		{
			if (status === "success")
			{
				resolve(status);
			}
			else
			{
				reject(status);
			}
		});
	});
}

function parseArtistTitle(input)
{
	var match;

	if (match = input.match(/(.+)[ ]?(-|\u[2012-2015]|\||:)[ ]?(.+)/))
	{
		return [ $.trim(match[1]) , $.trim(match[3]) ];
	}
	else if (match = input.match(/(.+)\|(.+)/))
	{
		return [ $.trim(match[1]) , $.trim(match[2]) ];
	}
	else
	{
		return false;
	}
}

function empty(mixed_var)
{
	var undef, key, i, len;
	var emptyValues = [undef, null, false, 0, '', '0'];

	for (i = 0, len = emptyValues.length; i < len; i++)
	{
		if (mixed_var === emptyValues[i])
		{
			return true;
		}
	}

	if (typeof mixed_var === 'object')
	{
		for (key in mixed_var)
		{
			return false;
		}

		return true;
	}

	return false;
}

function hmsToSec(hms)
{
	var p = hms.split(':');
	var	s = 0
	var m = 1;

	while (p.length > 0) {
		s += m * parseInt(p.pop());
		m *= 60;
	}

	return s;
}

function secToHms(sec)
{
	var hours   = parseInt( sec / 3600 ) % 24;
	var	minutes = parseInt( sec / 60 ) % 60;
	var seconds = sec % 60;

	return ((hours != 0) ? hours + ':' : '') + ((hours != 0 && minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
}
