// Copyright (c) 2012 Untamed. All rights reserved.
var play = false, last = false;

$(document).ready(function()
{
	var host = window.location.host.replace('www.', '');

	switch(host)
	{
		case 'ah.fm':
			setInterval(function() {
				if ($('.now_playing').length && $('#pause').is(':visible'))
				{
					play = 'AH.FM - ' + $('.now_playing > div > .blank').html();

					if (last !== play)
					{
						last = play;

						now_playing(
						{
							song     : play,
							duration : ((duration == null) ? '?' : duration[1])
						});
					}
				};
			}, 10000);
		break;
		case 'grooveshark.com':
			setInterval(function() {
				if ($('#playerDetails_current_song').length && $('#player_play_pause').hasClass('pause'))
				{
					var playerDetails = $('#playerDetails_current_song'), artistName = playerDetails.find('.artist').attr('title'), trackName = playerDetails.find('.song').attr('title'), albumName = playerDetails.find('.album');
					play = artistName + ' - ' + trackName;

					if (last !== play)
					{
						var duration = $('#player_duration').html();
						last = play;

						now_playing(
						{
							song       : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : albumName.attr('title'),
							duration   : ( (duration.substr(0,1) == '0') ? duration.substr(1, duration.length) : duration ),
							url        : 'http://grooveshark.com/' + albumName.attr('href')
						});
					}
				}
				else if ($('#play-pause').hasClass('playing'))
				{
					var artistName = $('.now-playing-link.artist').attr('title'), trackName = $('.now-playing-link.song').attr('title'), albumName = $('.now-playing-link.album');
					play = artistName + ' - ' + trackName;

					if (last !== play)
					{
						var duration = $('#time-total').html();
						last = play;

						now_playing(
						{
							song       : play,
							trackName  : trackName,
							artistName : artistName,
							albumName  : albumName.attr('title'),
							duration   : ( (duration.substr(0,1) == '0') ? duration.substr(1, duration.length) : duration ),
							url        : 'http://grooveshark.com/' + albumName.attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'pandora.com':
			setInterval(function() {
				if ($('.pauseButton').is(':visible'))
				{
					var artist = $('.playerBarArtist').html(), song = $('.playerBarSong').html();
					play = artist + ' - ' + song;

					if (last !== play)
					{
						var elapsedTime = $('.elapsedTime').html(), remainingTime = $('.remainingTime').html();
						remainingTime   = remainingTime.substr(1,remainingTime.length);
						last            = play;

						now_playing(
						{
							song       : play,
							trackName  : song,
							artistName : artist,
							albumName  : $('.playerBarAlbum').html(),
							duration   : secToHms(hmsToSec(remainingTime) + hmsToSec(elapsedTime)),
							url        : $('.playerBarSong').attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'soundcloud.com':
			setInterval(function() {
				if ($('.playing').length)
				{
					var header = $('.playing').parent().parent().find('div').find('h1, h3');
					var header1 = header.find('em').html();

					if (header1 !== null)
					{
						play = header1;
						url  = window.location.href;
					}
					else
					{
						play = header.find('a');
						url = 'http://soundcloud.com' + play.attr('href');
						play = play.html();
					}

					if (last !== play)
					{
						last = play;

						now_playing(
						{
							song     : play,
							duration : $('.playing').parent().find('.timecodes').find('.duration').html().replace(/\./g, ':'),
							url      : url
						});
					}
				}
			}, 10000);
		break;
		case 'youtube.com':
			if (typeof $('meta[name=title]').attr('content') !== 'undefined' && last !== $('meta[name=title]').attr('content'))
			{
				var duration = $('body').html().match(/\"length_seconds\"\: (\d+)/)[1];

				play = $('meta[name=title]').attr('content');
				last = play;

				now_playing(
				{
					song     : play,
					duration : ( (duration !== null) ? secToHms(duration) : duration = '?' ),
					url      : $('link[itemprop="url"]').attr('href')
				});
			}
		break;
	}
});

function now_playing(np)
{
	if (np.song !== null && np.song !== false && typeof np.song !== 'undefined')
	{
		var currentTime = new Date(), minutes = currentTime.getMinutes(), hours = currentTime.getHours();

		proxyReq(
		{
			type        : 'npapi',
			method      : 'w',
			filename    : 'unp_now_playing',
			song        : np.song,
			duration    : np.duration,
			trackName   : ( (typeof np.trackName !== 'undefined') ? np.trackName : '?' ),
			artistName  : ( (typeof np.artistName !== 'undefined') ? np.artistName : '?' ),
			albumName   : ( (typeof np.albumName !== 'undefined') ? np.albumName : '?' ),
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

function hmsToSec(hms)
{
	var p = hms.split(':'), s = 0, m = 1;

	while (p.length > 0) {
		s += m * parseInt(p.pop());
		m *= 60;
	}

	return s;
}

function secToHms(sec)
{
	var hours = parseInt( sec / 3600 ) % 24, minutes = parseInt( sec / 60 ) % 60, seconds = sec % 60;
	return ((hours != 0) ? hours + ':' : '') + ((hours != 0 && minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
}