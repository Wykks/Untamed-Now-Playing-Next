window.UNPCommon = (function() { //eslint-disable-line no-var
    Common = {};

    Common.MutationObserverUpdater = (function() {
        let listener;
        let nodeAttrName = '';
        let nodeAttrValue;
        let nodeType;
        let selector;
        let customFilter;
        let element;

        function MutationObserverUpdater(l) {
            listener = l;
        }

        MutationObserverUpdater.prototype.setNodeAttributeName = (l) => {
            nodeAttrName = l;
        };

        MutationObserverUpdater.prototype.setNodeAttributeValue = (l) => {
            nodeAttrValue = l;
        };

        MutationObserverUpdater.prototype.setNodeType = (l) => {
            nodeType = l;
        };

        MutationObserverUpdater.prototype.setSelector = (l) => {
            selector = l;
        };

        MutationObserverUpdater.prototype.setCustomFilter = (fn) => {
            customFilter = fn;
        };

        function builtinFilter(currentNode) {
            if (nodeAttrName !== '') {
                if (!currentNode.getAttribute)
                    return false;
                const attr = currentNode.getAttribute(nodeAttrName);
                if (!nodeAttrValue || attr.match(nodeAttrValue)) {
                    return true;
                }
            } else if (nodeType && currentNode.nodeType === nodeType) {
                return true;
            }
            return false;
        }

        //Wait until what we want to observ is in the dom
        function findElementThenRun(fn) {
            element = $(selector).get(0);
            if (!element) {
                setTimeout(() => {
                    findElementThenRun.call(this, fn);
                }, 2000);
                //setTimeout(findElementThenRun.bind(this, fn), 2000);
                return;
            }
            fn.call(this);
        }

        function innerRunOnChildAttr() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (!mutation.addedNodes[0])
                        return;
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        if ((customFilter && customFilter(mutation.addedNodes[i])) || builtinFilter(mutation.addedNodes[i])) {
                            listener.updateTrack();
                            return;
                        }
                    }
                });
            });
            observer.observe(element, {
                childList: true,
                subtree: true,
                characterData: true
            });
            listener.updateTrack();
        }

        function innerRunOnAttr() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName != nodeAttrName)
                        return;
                    const newValue = mutation.target.getAttribute(mutation.attributeName);
                    if (!nodeAttrValue || newValue.match(nodeAttrValue))
                        listener.updateTrack();
                });
            });
            observer.observe(element, {
                attributes: true
            });
            listener.updateTrack();
        }

        //If the childs of the node are removed/added;
        //Filter the good node by nodeAttribute / nodeType or use a customFilter
        MutationObserverUpdater.prototype.runOnChildAttr = findElementThenRun.bind(this, innerRunOnChildAttr);

        //ONLY if the attr of the node change
        MutationObserverUpdater.prototype.runOnAttr = findElementThenRun.bind(this, innerRunOnAttr);

        return MutationObserverUpdater;
    }());

    Common.IntervalUpdater = (function() {
        let listener;
        let interval = 5000;

        function IntervalUpdater(l) {
            listener = l;
        }

        IntervalUpdater.prototype.setInterval = (l) => {
            interval = l;
        };

        IntervalUpdater.prototype.run = () => {
            setInterval(() => {
                listener.updateTrack.call(listener);
            }, interval);
            //setInterval(listener.updateTrack.bind(listener), interval);
        };

        return IntervalUpdater;
    }());

    //Deprecated
    Common.runTrackListenerInterval = (listener) => {
        setInterval(() => {
            listener.updateTrack.call(listener);
        }, 5000);
        //setInterval(listener.updateTrack.bind(listener), 5000);
    };

    Common.WebsiteTrackListener = (function() {
        function WebsiteTrackListener() {
            this.play = '';
            this.artistName = '';
            this.trackName = '';
            this.selector = undefined;
            this.mutationObserverAttributeName = '';
            this.mutationObserverAttributeValue = undefined;
            this.mutationObserverElement = undefined;
        }

        WebsiteTrackListener.prototype.isPlaying = () => {
            return true;
        };

        WebsiteTrackListener.prototype.scrapAlbumName = () => {
            return '';
        };

        WebsiteTrackListener.prototype.scrapAlbumArt = () => {
            return '';
        };

        WebsiteTrackListener.prototype.scrapUrl = () => {
            return '';
        };

        WebsiteTrackListener.prototype.scrapDuration = () => {
            return '';
        };

        WebsiteTrackListener.prototype.scrapPlayData = () => {
            throw new Error('Not implemented');
        };

        WebsiteTrackListener.prototype.findSelector = () => {};

        WebsiteTrackListener.prototype.updateTrack = function() {
            if (!this.isPlaying()) {
                return;
            }
            this.findSelector();
            if (!this.scrapPlayData())
                return;
            let play;
            if (!$.isEmptyObject(this.artistName))
                play = this.artistName + ' - ' + this.trackName;
            else
                play = this.trackName;
            if (play === this.play || $.isEmptyObject(play)) {
                return;
            }
            this.play = play;
            nowPlaying.call(this, play);
        };

        function getValue(value, def = '?', predicat = $.isEmptyObject) {
            return predicat(value) ? def : value;
        }

        function nowPlaying(play) {
            const currentTime = new Date();
            const minutes = currentTime.getMinutes();
            const hours = currentTime.getHours();
           window.UNPBrowserFunc.updateNowPlaying({
                nowPlaying: play,
                trackName: getValue(this.trackName),
                artistName: getValue(this.artistName),
                albumName: getValue(this.scrapAlbumName()),
                albumArt: getValue(this.scrapAlbumArt(), '?', (v) => {
                    return $.isEmptyObject(v) || v.substring(0, 4) !== 'http';
                }),
                url: getValue(this.scrapUrl(), window.location.href),
                timeStarted: ((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes),
                duration: getValue(this.scrapDuration())
            });
        }

        return WebsiteTrackListener;
    }());

    Common.parseArtistTitle = (input) => {
        // Removes [whatever] from whole title as it is usually not important
        // and just contains the [genre] or [premiere/release]
        const str = input.replace(/\[.*?\]|【.*?】/g, '');

        const match = str.match(/^\s*[-~_]?\s*(.+?)\s*[-~_]+\s+(.+)/);

        if (match && match.length === 3) {
            return [$.trim(match[1]), $.trim(match[2])];
        } else {
            return ['', input];
        }
    };

    Common.hmsToSec = (hms) => {
        const p = hms.split(':');
        let s = 0;
        let m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop());
            m *= 60;
        }

        return s;
    };

    Common.secToHms = (sec) => {
        const hours = parseInt(sec / 3600) % 24;
        const minutes = parseInt(sec / 60) % 60;
        const seconds = sec % 60;

        return ((hours !== 0) ? hours + ':' : '') + ((hours !== 0 && minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    };

    Common.toTitleCase = (str) => {
        return str.replace(/(?:^|\s)\w/g, (match) => {
            return match.toUpperCase();
        });
    };

    return Common;
}());
