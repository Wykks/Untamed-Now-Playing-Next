var Common = (function() {
	var Common = {};

	Common.MutationObserverUpdater = (function() {
		var listener;
		var nodeAttrName = '';
		var nodeAttrValue;
		var nodeType;
		var selector;
		var customFilter;
		var element;
		
		function MutationObserverUpdater(l) {
			listener = l;
		}

		MutationObserverUpdater.prototype.setNodeAttributeName = function(l) {
		    nodeAttrName = l;
		};
		
		MutationObserverUpdater.prototype.setNodeAttributeValue = function(l) {
		    nodeAttrValue = l;
		};

		MutationObserverUpdater.prototype.setNodeType = function(l) {
		    nodeType = l;
		};
	
		MutationObserverUpdater.prototype.setSelector = function(l) {
		    selector = l;
		};
		
		MutationObserverUpdater.prototype.setCustomFilter = function(fn) {
		    customFilter = fn;
		};
		
		function builtinFilter(currentNode) {
			if (nodeAttrName !== '') {
				var attr = currentNode.getAttribute(nodeAttrName);
				if (!nodeAttrValue || attr.match(nodeAttrValue)) {
					return true;
				}
			}
			else if (nodeType && currentNode.nodeType === nodeType) {
				return true;
			}
			return false;
		}
		
		//Wait until what we want to observ is in the dom
		function getElement(fn) {
			var timed = false;
			
			function innerGetElement() {
				if (!$(selector).get(0)) {
					timed = true;
					return function() {
						setTimeout(innerGetElement.bind(this, fn), 10000);
					}
				}
				element = $(selector).get(0);
				if (timed)
					fn.call(this);
				else {
					return function() {
						fn.call(this);
					}
				}
			}
			
			return innerGetElement();
		}
		
		function innerRunOnChildAttr() {
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (!mutation.addedNodes[0])
						return;
					for (var i = 0; i < mutation.addedNodes.length; i++) {
						if ((customFilter && customFilter(mutation.addedNodes[i]))
						|| builtinFilter(mutation.addedNodes[i])) {
							listener.updateTrack();
						}
					}
				});
			});
			observer.observe(element, { childList: true, subtree: true, characterData: true });
		}

		function innerRunOnAttr() {
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.attributeName != nodeAttrName)
						return;
					var newValue = mutation.target.getAttribute(mutation.attributeName);
					if (!nodeAttrValue || newValue.match(nodeAttrValue))
						listener.updateTrack();
				});
			});
			observer.observe(element, { attributes: true });
			listener.updateTrack();
		}

//If the childs of the node are removed/added;
//Filter the good node by nodeAttribute / nodeType or use a customFilter
		MutationObserverUpdater.prototype.runOnChildAttr = getElement.call(this, innerRunOnChildAttr);

//ONLY if the attr of the node change
		MutationObserverUpdater.prototype.runOnAttr = getElement.call(this, innerRunOnAttr);
		
		return MutationObserverUpdater;
	}());
	
	Common.IntervalUpdater = (function() {
		var listener;
		var interval = 10000;
		
		function IntervalUpdater(l) {
			listener = l;
		}

		IntervalUpdater.prototype.setInterval = function(l) {
		    interval = l;
		};

		IntervalUpdater.prototype.run = function() {
			setInterval(listener.updateTrack.bind(listener), interval);
		};
		
		return IntervalUpdater;
	}());
	
	//Deprecated
	Common.runTrackListenerInterval = function(listener) {
		setInterval(listener.updateTrack.bind(listener), 10000);
	};

	Common.WebsiteTrackListener = function() {
			this.play = "";
			this.artistName = "";
			this.trackName = "";
			this.selector;
			this.mutationObserverAttributeName = "";
			this.mutationObserverAttributeValue;
			this.mutationObserverElement;
	};
	Common.WebsiteTrackListener.prototype.isPlaying = function() { return true; };
	Common.WebsiteTrackListener.prototype.scrapAlbumName = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapAlbumArt = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapUrl = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapDuration = function() { return ""; };
	Common.WebsiteTrackListener.prototype.scrapPlayData = function() { throw new Error("Not implemented"); };
	Common.WebsiteTrackListener.prototype.findSelector = function() { };

	Common.WebsiteTrackListener.prototype.updateTrack = function() {
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
