var last = false;
var interval = 10000;

var host = window.location.host.replace('www.', '');

switch(host)
{
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
				$('body').append('<div style="position:fixed;bottom:0;right:0;z-index:999;border-top-left-radius:3px;background:linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(246,246,246,1) 66%,rgba(237,237,237,1) 100%);opacity:0.8;border:1px solid #EDEDED;padding:2px 5px;font-size:11px">UNP: YouTube parsing is disabled</div>');
				console.log('UNP: YouTube parsing disabled');
				return;
			}
			if (typeof $('#watch7-content > meta[itemprop="name"]').attr('content') !== 'undefined' &&
				last !== $('#watch7-content > meta[itemprop="name"]').attr('content'))
			{
				var duration = $('.ytp-time-duration').text();
				var play     = $('#watch7-content > meta[itemprop="name"]').attr('content');
				var parse;

				if ($('#eow-title').find('a').length) {
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

//Firefox specific
//================

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
