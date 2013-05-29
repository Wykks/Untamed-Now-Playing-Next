var last = false;

$(document).ready(function()
{
	var host = window.location.host.replace('www.', '');

	if (/^([a-z0-9]+)-player.spapps.co$/.test(host))
		host = 'player.spapps.co';

	switch(host)
	{
		case '8tracks.com':
			setInterval(function()
			{
				if ($('#player_pause_button').css('display') == 'block')
				{
					var artistName = $('.title_artist').find('.a').text();
					var trackName  = $('.title_artist').find('.t').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : $('.album').find('.detail').text(),
							albumArt   : $('.mix_art_wrapper').find('a').find('img').attr('src').replace(/(.*)\?(.*)/i, '$1'),
							duration   : $('#time-total').text()
						});
					}
				};
			}, 10000);
		break;
		case 'ah.fm':
			setInterval(function()
			{
				if ($('.now_playing').length && $('#pause').is(':visible'))
				{
					var play = 'AH.FM - ' + $('.now_playing > div > .blank').text();

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							duration   : ((duration == null) ? '?' : duration[1])
						});
					}
				};
			}, 10000);
		break;
		case 'deezer.com':
			setInterval(function()
			{
				if ($('.h_icn_pause').is(':visible'))
				{
					var artistName = $('#current-artist').text();
					var trackName  = $('#current-track').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumArt   : $('#naboo_menu_infos_cover').attr('src'),
							duration   : $('#end-track').text(),
							url        : 'http://deezer.com/track/' + $('#h_love').find('a').attr('onclick').replace(/(.*)"SNG_ID":"([0-9]+)"(.*)/i, '$2'),
						});
					}
				};
			}, 10000);
		break;
		case 'di.fm':
			setInterval(function()
			{
				if ($('#ctl-play').hasClass('pause'))
				{
					var play = $('.title').text();

					if (last !== play)
					{
						last = play;

						var remainingTime = $('.remaining').text();

						nowPlaying(
						{
							nowPlaying : play,
							duration   : (remainingTime == '') ? $('.elapsed').text() : secToHms(hmsToSec(remainingTime.substr(1,remainingTime.length)) + hmsToSec($('.elapsed').text()))
						});
					}
				};
			}, 10000);
		break;
		case 'grooveshark.com':
			setInterval(function()
			{
				if ($('#play-pause').hasClass('playing'))
				{
					var artistName = $('.now-playing-link.artist').attr('title');
					var trackName  = $('.now-playing-link.song').attr('title');
					var albumName  = $('.now-playing-link.album');
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
				};
			}, 10000);
		break;
		case 'retro.grooveshark.com':
			setInterval(function()
			{
				if ($('#playerDetails_current_song').length && $('#player_play_pause').hasClass('pause'))
				{
					var playerDetails = $('#playerDetails_current_song');
					var artistName    = playerDetails.find('.artist').attr('title');
					var trackName     = playerDetails.find('.song').attr('title');
					var albumName     = playerDetails.find('.album');
					var play          = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
				};
			}, 10000);
		break;
		case 'iheart.com':
			setInterval(function()
			{
				if ($('#playerPlay').hasClass('pause'))
				{
					var artistName = $('h2.artist').find('a').attr('title');
					var trackName  = $('h1.title').find('a').attr('title');
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumArt   : $('.playerArt').find('a').find('img').attr('src').replace('imscale?w=54', 'imscale?w=150'),
							url        : 'http://iheart.com' + $('.liveStn').find('.title').find('a').attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'jango.com':
			setInterval(function()
			{
				if ($('#btn-playpause').hasClass('pause'))
				{
					var artistName = $('#player_current_artist').find('a').text();
					var trackName  = $('#current-song').find('a').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumArt   : $('#player_main_pic_img').attr('src'),
							url        : 'http://jango.com' + $('#station_info').find('a').attr('href')
						});
					}
				};
			}, 10000);
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
			setInterval(function()
			{
				if (!$('#radioControlPlay').is(':visible') && $('#nowPlayingMeta').is(':visible'))
				{
					var artistName        = $('strong.artist').find('a').text();
					var trackNameSelector = $('strong.track').find('a');
					var trackName         = trackNameSelector.text();
					var play              = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;
	
						var remainingTime = $('#trackRemaining').text();
						var remainingTime = remainingTime.substr(1, remainingTime.length);

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : $('.album').find('.title').text(),
							albumArt   : $('span.albumCover').find('img.art').attr('src').replace(/(.*)\/serve\/(.*)\/(.*)\.(jpg|jpeg|png)$/i, '$1/serve/126/$3.$4'),
							duration   : secToHms(hmsToSec(remainingTime) + hmsToSec($('#trackPlayed').text())),
							url        : trackNameSelector.attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'nightbot.tv':
			setInterval(function()
			{
				if ($('#pause').is(':visible'))
				{
					var play = $('#currentTitle').text();

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							duration   : secToHms(hmsToSec($('#duration').text()))
						});
					}
				}
			}, 10000);
		break;
		case 'pandora.com':
			setInterval(function()
			{
				if ($('.pauseButton').is(':visible'))
				{
					var artistName = $('.playerBarArtist').text();
					var trackName  = $('.playerBarSong').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;
	
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
				};
			}, 10000);
		break;
		case 'play.google.com':
			setInterval(function()
			{
				if ($('#playPause').attr('title') == 'Pause')
				{
					var artistName = $('#player-artist').text();
					var trackName  = $('#playerSongTitle').find('.tooltip').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : $('.player-album').text(),
							albumArt   : 'http:' + $('#playingAlbumArt').attr('src'),
							duration   : $('#duration').text(),
							url        : 'http://play.google.com'
						});
					}
				};
			}, 10000);
		break;
		// play.spotify.com
		case 'player.spapps.co':
			setInterval(function()
			{
				if ($('#play-pause').hasClass('playing'))
				{
					var artistName        = $('#track-artist').find('a').text();
					var trackNameSelector = $('#track-name').find('a');
					var trackName         = trackNameSelector.text();
					var play              = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
				};
			}, 10000);
		break;
		case 'plug.dj':
			setInterval(function()
			{
				var play = $('#now-playing-value').text();

				if (last !== play)
				{
					last = play;

					nowPlaying(
					{
						nowPlaying : play
					});
				}
			}, 10000);
		break;
		case 'prostopleer.com':
			setInterval(function()
			{
				if ($('#play').hasClass('pause'))
				{
					var nPSelector = $.trim($('.now-playing').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text()).match(/^(.+) \u2014 (.+) \((.+)\)$/);
					var artistName = nPSelector[1];
					var trackName  = nPSelector[2];
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
			}, 10000);
		break;
		// seoul.fm iframe
		case 'up.seoul.fm':
			var artistName = $('#title').contents().filter(function(){ return this.nodeType == Node.TEXT_NODE; }).text();
			var trackName  = $('#title').find('font').find('b').text();
			var play       = artistName + ' - ' + trackName;

			last = play;

			nowPlaying(
			{
				nowPlaying : play,
				trackName  : trackName,
				artistName : artistName,
				albumArt   : 'http://up.seoul.fm/' + $('#cpPictureMainSong').attr('src'),
				url        : 'http://seoul.fm'
			});
		break;
		case 'slacker.com':
			setInterval(function()
			{
				if ($('#playerPlayPauseButton').find('div').css('background-position') == '-960px 0px')
				{
					var artistName        = $('#player-artist-name').text();
					var trackNameSelector = $('#player-track-name');
					var trackName         = trackNameSelector.text();
					var play              = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : $('#player-album-name').text(),
							albumArt   : $('#track-art-current-img').attr('src'),
							duration   : $('#total-length').text(),
							url        : 'http://slacker.com/#song/' + trackNameSelector.attr('itemid') + '/' + trackNameSelector.attr('perfid') + '/'
						});
					}
				};
			}, 10000);
		break;
		case 'songza.com':
			setInterval(function()
			{
				if ($('div.sz-player-revamp').hasClass('sz-player-state-play'))
				{
					var artistName = $('.szi-roll-song').find('.szi-info').find('.szi-artist').text();
					var trackName  = $('.szi-roll-song').find('.szi-info').find('.szi-title').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumArt   : $('.szi-roll-song').find('img').attr('src'),
							url        : 'http://songza.com' + $('.szi-station-info').find('a').attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'soundcloud.com':
			setInterval(function()
			{
				var selector = $('.sc-button-pause').parent().parent();

				if (selector.eq(1).hasClass('soundActions'))
				{
					var selector2  = selector.eq(1).parent().parent().parent();
					var artistName = $.trim(selector2.find('.soundTitle').find('.sc-truncate').find('a').text());
					var trackName  = $('.sc-button-pause').parent().parent().eq(1).parent().parent().parent().find('.soundTitle').find('div:eq(2)').find('div').find('a').text();
					var albumArt   = selector2.find('.sc-media-image').find('img').attr('src').replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
					var duration   = '?';
					var url        = window.location.href;
				}
				else if (selector.length)
				{
					if (selector.parent().hasClass('carouselItem'))
					{
						var selector2         = selector.parent().find('.carouselItem__info');
						var trackNameSelector = selector2.find('div').eq(1).find('a');
						var artistName        = selector2.find('div').eq(0).find('a').text();
						var trackName         = trackNameSelector.text();
						var albumArt          = selector.parent().find('.carouselItem__artworkContainer').find('.image__hasPlaceholder').find('img').attr('src').replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
						var duration          = '?';
						var url               = 'http://soundcloud.com' + trackNameSelector.attr('href');
					}
					else if (selector.parent().parent().parent().hasClass('playlist'))
					{
						var artistName = $.trim(selector.parent().find('.sc-type-light').find('.soundTitle__username').text());
						var trackName  = document.title.substring(2).replace(/^(.*) in (.*)$/, '$1');
						var albumArt   = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
						var albumArt   = (typeof albumArt === 'undefined') ? $('.image__full').attr('src') : albumArt.replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
						var duration   = '?';
						var url        = window.location.href;
					}
					else
					{
						var artistName = $.trim(selector.parent().find('.sc-type-light').find('.soundTitle__username').text());
						var trackName  = $.trim(selector.find('.sc-media-content').find('.soundTitle__title').text());
						var albumArt   = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
						var albumArt   = (typeof albumArt === 'undefined') ? $('.image__full').attr('src') : albumArt.replace(/(.*)\/(.*)-t([0-9x]+)\.(jpg|jpeg|png)\?(.*)$/i, '$1/$2-t200x200.$4');
						var duration   = selector.parent().parent().parent().find('.sound__body').find('.sound__waveform').find('.waveform__visibleLayers').find('.waveform__layer').find('.timeIndicator__total').text().replace(/\./g, ':');
						var url        = window.location.href;
					}
				}
				else if ($('.nowPlaying').hasClass('playing'))
				{
						var artistName = document.title.replace(/^(.*) by (.*)$/i, '$2');
						var trackName  = $('.nowPlaying').attr('title');
						var albumArt   = '?';
						var duration   = '?';
						var url        = 'http://soundcloud.com' + $('.nowPlaying').attr('href');
				}
				else
				{
					return;
				}

				var play = artistName + ' - ' + trackName;

				if (last !== play)
				{
					last = play;

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
			}, 10000);
		break;
		case 'themusicninja.com':
			setInterval(function()
			{
				if ($('#player-features').hasClass('tmn_playing'))
				{
					var artistName = $.trim($('.track_name').find('a').find('.artist').text());
					var trackName  = $.trim($('.track_name').find('a').find('.title').text());
					var play       = artistName + ' - ' + trackName;
					
					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							duration   : $('.sm2_total').text()
						});
					}
				}
			}, 10000);
		break;
		case 'tunein.com':
			setInterval(function()
			{
				if ($('#tuner').hasClass('playing'))
				{
					var play = $('.line1').find('.info').text() + ' - ' + $('.line2').find('.title').text();

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play
						});
					}
				};
			}, 10000);
		break;
		case 'turntable.fm':
			setInterval(function()
			{
				if ($('#songboard-title').length)
				{
					var selector   = $('#song-log').find('.song').eq(0);
					var details    = selector.find('.details').find('span').html();
					var trackName  = selector.find('.title').text();
					var artistName = details.replace(/(.*)<span class(.*)<\/span>(.*)$/i, '$1');
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
				};
			}, 10000);
		break;
		case 'vk.com':
			setInterval(function()
			{
				if ($('#gp_play').hasClass('playing'))
				{
					var artistName = $('#gp_performer').text();
					var trackName  = $('#gp_title').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							url        : 'http://vk.com/wall-' + $('#gp_play_btn').find('a').attr('onclick').replace(/playAudioNew\('(.*)-(.*)',(.*)/i, '$2')
						});
					}
				};
			}, 10000);
		break;
		case 'we7.com':
			setInterval(function()
			{
				if ($('.main-action').hasClass('pause-mode'))
				{
					var artistName = $('.chugger-current').find('.artist').attr('title');
					var trackName  = $('.chugger-current').find('.song').attr('title');
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

						nowPlaying(
						{
							nowPlaying : play,
							trackName  : trackName,
							artistName : artistName,
							albumArt   : $('.chugger-current').find('.chugger-artwork').find('img').attr('src'),
							url        : $('#now-playing-like-bar').find('.fb-like').attr('data-href')
						});
					}
				};
			}, 10000);
		break;
		case 'youtube.com':
			optionGet(function(data)
			{
				if (data['unpDisableYoutube'] === 'true')
				{
					$('body').append('<div style="position:fixed;bottom:0;right:0;z-index:999;border-top-left-radius:3px;background:linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 66%,rgba(237,237,237,1) 100%);opacity:0.8;border:1px solid #EDEDED;padding:2px 5px;font-size:11px">UNP: YouTube parsing is disabled, to change <a href="chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/options.html" target="_blank" style="color:#000">click here</a></div>');
					console.log('UNP: YouTube parsing disabled');
					return;
				}

				if (typeof $('meta[name=title]').attr('content') !== 'undefined' && last !== $('meta[name=title]').attr('content'))
				{
					var duration = $('body').text().match(/\"length_seconds\"\: (\d+)/)[1];
					var play     = $('meta[name=title]').attr('content');

					last = play;

					nowPlaying(
					{
						nowPlaying : play,
						duration   : secToHms(duration),
						albumArt   : $('link[itemprop="thumbnailUrl"]').attr('href'),
						url        : $('link[itemprop="url"]').attr('href')
					});
				}
			});
		break;
		case 'zaycev.fm':
			setInterval(function()
			{
				if ($('.zp_play').hasClass('g-active'))
				{
					var selector   = $('#zp_current_song').find('span');
					var artistName = selector.find('.ontheair_artist').text().replace(/^(.+)\u00A0-\u00A0$/, '$1');
					var trackName  = selector.find('.ontheair_song').text();
					var play       = artistName + ' - ' + trackName;

					if (last !== play)
					{
						last = play;

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
			}, 10000);
		break;
	}
});

function nowPlaying(np)
{
	if (np.nowPlaying !== null && np.nowPlaying !== false && typeof np.nowPlaying !== 'undefined')
	{
		var currentTime = new Date();
		var minutes     = currentTime.getMinutes();
		var	hours       = currentTime.getHours();

		proxyReq(
		{
			type        : 'npapi',
			method      : 'w',
			filename    : 'unp_now_playing',
			nowPlaying  : np.nowPlaying,
			duration    : ( (typeof np.duration !== 'undefined') ? np.duration : '?' ),
			trackName   : ( (typeof np.trackName !== 'undefined') ? np.trackName : '?' ),
			artistName  : ( (typeof np.artistName !== 'undefined') ? np.artistName : '?' ),
			albumName   : ( (typeof np.albumName !== 'undefined') ? np.albumName : '?' ),
			albumArt    : ( (typeof np.albumArt !== 'undefined' && np.albumArt.substring(0,4) == 'http') ? np.albumArt : '?' ),
			timeStarted : ( (hours < 10) ? '0' + hours : hours ) + ':' + ( (minutes < 10) ? '0' + minutes : minutes ),
			url         : ( (typeof np.url !== 'undefined') ? np.url : window.location.href ),
			onComplete  : function(status, data)
			{
				if (status == 'ok')
					console.log('UNP: Now Playing Success - ' + data);
				else
					console.log('UNP: Now Playing Error - ' + data);
			}
		});
	}
}

function optionGet(callback)
{
	proxyReq(
	{
		type       : 'ls',
		method     : 'r',
		onComplete : function(status, data)
		{
			callback(JSON.parse(data));
		}
	});
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