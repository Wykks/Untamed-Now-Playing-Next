var play = false, last = false;

$(document).ready(function()
{
	var host = window.location.host.replace('www.', '');

	switch(host)
	{
		case 'ah.fm':
			setInterval(function()
			{
				if ($('.now_playing').length && $('#pause').is(':visible'))
				{
					play = 'AH.FM - ' + $('.now_playing > div > .blank').text();

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
		case 'di.fm':
			setInterval(function()
			{
				if ($('#ctl-play').hasClass('pause'))
				{
					play = $('.title').text();

					if (last !== play)
					{
						var remainingTime = $('.remaining').text();
						last              = play;

						now_playing(
						{
							song     : play,
							duration : (remainingTime == '') ? $('.elapsed').text() : secToHms(hmsToSec(remainingTime.substr(1,remainingTime.length)) + hmsToSec($('.elapsed').text()))
						});
					}
				};
			}, 10000);
		break;
		case 'grooveshark.com':
			setInterval(function()
			{
				var artistName = $('.now-playing-link.artist').attr('title'), trackName = $('.now-playing-link.song').attr('title'), albumName = $('.now-playing-link.album');
				play = artistName + ' - ' + trackName;

				if (last !== play)
				{
					var duration = $('#time-total').text();
					last = play;

					now_playing(
					{
						song       : play,
						trackName  : trackName,
						artistName : artistName,
						albumName  : albumName.attr('title'),
						albumArt   : $('#now-playing-image').attr('src').replace(/(.*)\/([0-9]+)_(.*)(\.jpg$)/i, '$1/142_$3.jpg'),
						duration   : ( (duration.substr(0,1) == '0') ? duration.substr(1, duration.length) : duration ),
						url        : 'http://grooveshark.com/' + albumName.attr('href')
					});
				}
			}, 10000);
		break;
		case 'pandora.com':
			setInterval(function()
			{
				if ($('.pauseButton').is(':visible'))
				{
					var artist = $('.playerBarArtist').text(), song = $('.playerBarSong').text();
					play = artist + ' - ' + song;

					if (last !== play)
					{
						var remainingTime = $('.remainingTime').text();
						remainingTime     = remainingTime.substr(1,remainingTime.length);
						last              = play;

						now_playing(
						{
							song       : play,
							trackName  : song,
							artistName : artist,
							albumName  : $('.playerBarAlbum').text(),
							albumArt   : $('.playerBarArt').attr('src'),
							duration   : secToHms(hmsToSec(remainingTime) + hmsToSec($('.elapsedTime').text())),
							url        : $('.playerBarSong').attr('href')
						});
					}
				};
			}, 10000);
		break;
		case 'soundcloud.com':
			setInterval(function()
			{
				selector = $('.sc-button-pause').parent().parent();
				if (selector.length)
				{
					play = selector.parent().find('.sc-type-light').find('.soundTitle__username').text() + ' - ' + selector.find('.sc-media-content').find('.soundTitle__title').text();

					if (last !== play)
					{
						last = play;

						art = selector.parent().parent().parent().find('a').find('div').find('img').attr('src');
						if (typeof art === 'undefined')
							art = $('.image__full').attr('src');
						else
							art = art.replace(/(.*)\/(.*)-t([0-9x]+)(\.jpg)\?(.*)$/i, '$1/$2-t200x200.jpg');

						now_playing(
						{
							song     : play,
							albumArt : art,
							duration : selector.parent().parent().parent().find('.sound__body').find('.sound__waveform').find('.waveform__visibleLayers').find('.waveform__layer').find('.timeIndicator__total').text().replace(/\./g, ':'),
							url      : url
						});
					}
				}
			}, 10000);
		break;
		case 'youtube.com':
			if (typeof $('meta[name=title]').attr('content') !== 'undefined' && last !== $('meta[name=title]').attr('content'))
			{
				var duration = $('body').text().match(/\"length_seconds\"\: (\d+)/)[1];

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