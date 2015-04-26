[Untamed Now Playing](https://github.com/Wylk/Untamed-Now-Playing-Next)
=================

"Untamed Now Playing" is a Firefox extension which parses the song title and artist from popular online radio/music sites, and writes it to a file on your hard drive. Programs such as Xsplit or OBS can then read the file and display it on an overlay, allowing viewers to easily see what song is currently being played.
Support Windows / Linux / OSX.

Supported Sites
--------------------------------------
* [8tracks.com](http://8tracks.com)
* [ah.fm](http://ah.fm)
* [blinkboxmusic.com](http://blinkboxmusic.com)
* [deezer.com](http://deezer.com)
* [di.fm](http://di.fm)
* [distortionradio.com](http://distortionradio.com)
* [grooveshark.com](http://grooveshark.com)
* [retro.grooveshark.com](http://retro.grooveshark.com)
* [hypem.com](http://hypem.com)
* [iheart.com](http://iheart.com)
* [jango.com](http://jango.com)
* [last.fm](http://last.fm)
* [nightbot.tv](http://nightbot.tv)
* [pandora.com](http://pandora.com)
* [piki.fm](http://piki.fm)
* [play.google.com](http://play.google.com)
* [play.spotify.com](http://play.spotify.com)
* [plug.dj](http://plug.dj)
* [prostopleer.com](prostopleer.com)
* [seoul.fm](http://seoul.fm)
* [slacker.com](http://slacker.com)
* [songza.com](http://songza.com)
* [soundcloud.com](http://soundcloud.com)
* [themusicninja.com](themusicninja.com)
* [tunein.com](http://tunein.com)
* [turntable.fm](http://turntable.fm)
* [vk.com](http://vk.com)
* [youtube.com](http://youtube.com)
* [youtube.com/tv](http://youtube.com/tv)
* [zaycev.fm](http://zaycev.fm)
* [play.baidu.com](http://play.baidu.com)
* [player.kuwo.cn](http://player.kuwo.cn)
* [y.qq.com](http://y.qq.com)
* [rdio.com](http://www.rdio.com)
* [xiami.com](http://www.xiami.com/play)

Support for more sites will be added over time. If you have a suggestion for a site, please open an issue or reply to the obs topic.

Install
--------------------------------------
### Packed extension (v2.0.1)
Use the official extension page on Mozilla Add-ons (AMO) : [here](https://addons.mozilla.org/en-US/firefox/addon/untamed-now-playing/)

### Unpacked extension (Under development)
Instructions **SOON**

Configuration
--------------------------------------
Once you have installed the extension, you can find the options page by either right clicking the music note icon next to the address bar and selecting Options, or by finding "Untamed Now Playing" on the Extensions page and clicking Options.

The main option to configure is the "Save Directory". This is where the file containing the now playing data will be saved. The directory will also be used for caching if you enable the "Check stream is live" option. More information explaining each option can be found by clicking the info button on the right of each option.

Limitations
--------------------------------------
At the moment, now playing data is only saved when the song intially plays and is only updated when the next song starts playing. Thus if you stop playing music, the output file will still contain the last song played.

Firefox may limits what directories can be saved to, if you run into problems, try saving to a subdirectory of your profile (C:\Users\USERNAME\* or C:\Documents and Settings\USERNAME\*).

Known Issues
--------------------------------------
Nightbot support and Stream check feature disabled (not ported to Firefox yet), ask me if you need them !


Licence
--------------------------------------
This software is provided "AS IS" without warranty of any kind, either expressed or implied. Licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/deed).

This software uses the following libraries developed by third parties, and are licenced seperately;
* [Bootstrap](http://twitter.github.com/bootstrap) (Apache License v2.0)
* [jQuery](http://jquery.com) (MIT License)
* [Sammy.js](http://sammyjs.org) (MIT License)

Additionally, the main icon was designed by [CSS Creme](http://csscreme.com/freeicons/), and icons designed by [FatCow](http://www.fatcow.com/free-icons) are used on the options pages.
