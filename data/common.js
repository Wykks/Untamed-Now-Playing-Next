var Common = (function() {
	var Common = {};

	var interval = 10000;

	function trackListenerLogic() {
		if (this.isPlaying()) {
			this.findSelector();
			if (!this.scrapPlayData())
				return;
			var play;
			if (!empty(this.artistName))
				play = this.artistName + ' - ' + this.trackName;
			else
				play = this.trackName;
			if (play !== this.play) {
				this.play = play;
				nowPlaying(
				{
					nowPlaying : play,
					trackName  : this.trackName,
					artistName : this.artistName,
					albumName  : this.scrapAlbumName(),
					albumArt   : this.scrapAlbumArt(),
					url        : this.scrapUrl(),
					duration   : this.scrapDuration()
				});
			}
		}
	}

	Common.runTrackListenerInterval = function(listener) {
		setInterval(trackListenerLogic.bind(listener), interval);
	};

	function mutationObserverAttrModified(mutation) {
		if (mutation.attributeName != this.mutationObserverAttributeName)
			return;
		var newValue = mutation.target.getAttribute(mutation.attributeName);
		if (!this.mutationObserverAttributeValue || newValue.match(this.mutationObserverAttributeValue))
			trackListenerLogic.bind(this)();
	}

	Common.runTrackListenerMutationObserverAttr = function(listener, element) {
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(mutationObserverAttrModified.bind(listener));
		});
		observer.observe(listener.mutationObserverElement, { attributes: true });
		trackListenerLogic.bind(listener)();
	};

	Common.WebsiteTrackListener = function() {
			this.play = "";
			this.artistName = "";
			this.trackName = "";
			this.selector = undefined;
			this.mutationObserverAttributeName = "";
			this.mutationObserverAttributeValue = undefined;
			this.mutationObserverElement = undefined;
	};
	Common.WebsiteTrackListener.prototype.isPlaying = function() { return true; };
	Common.WebsiteTrackListener.prototype.scrapAlbumName = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapAlbumArt = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapUrl = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapDuration = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapPlayData = function() { throw new Error("Not implemented"); };
	Common.WebsiteTrackListener.prototype.findSelector = function() { };

	Common.parseArtistTitle = function(input)
	{
		var match;

		if ((match = input.match(/(.+)[ ]?(-|\u[2012-2015]|\||:)[ ]?(.+)/)))
		{
			return [$.trim(match[1]), $.trim(match[3])];
		}
		else if ((match = input.match(/(.+)\|(.+)/)))
		{
			return [$.trim(match[1]), $.trim(match[2])];
		}
		else
		{
			return ["", input];
		}
	};

	Common.hmsToSec = function(hms)
	{
		var p = hms.split(':');
		var	s = 0;
		var m = 1;

		while (p.length > 0) {
			s += m * parseInt(p.pop());
			m *= 60;
		}

		return s;
	};

	Common.secToHms = function(sec)
	{
		var hours   = parseInt( sec / 3600 ) % 24;
		var	minutes = parseInt( sec / 60 ) % 60;
		var seconds = sec % 60;

		return ((hours !== 0) ? hours + ':' : '') + ((hours !== 0 && minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	};

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
	
	return Common;
}());
