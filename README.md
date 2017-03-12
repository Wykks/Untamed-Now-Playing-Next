[Untamed Now Playing](https://github.com/Wylk/Untamed-Now-Playing-Next)
=================

"Untamed Now Playing" is a Firefox extension which parses the song title and artist from popular online radio/music sites, and writes it to a file on your hard drive. Programs such as Xsplit or OBS can then read the file and display it on an overlay, allowing viewers to easily see what song is currently being played.
Support Windows / Linux / OSX.

Supported Sites
--------------------------------------
* [8tracks.com](http://8tracks.com)
* [ah.fm](http://ah.fm)
* [beatport.com](https://www.beatport.com/listen)
* [deezer.com](http://deezer.com)
* [di.fm](http://di.fm)
* [distortionradio.com](http://distortionradio.com)
* [hypem.com](http://hypem.com)
* [jamendo.com](http://www.jamendo.com)
* [jango.com](http://jango.com)
* [last.fm](http://last.fm)
* [music.amazon.*](https://music.amazon.com)
* [mixcloud.com](http://www.mixcloud.com)
* [music.163.com](http://music.163.com)
* [music.yandex.*](http://music.yandex.ru)
* [beta.nightbot.tv](http://beta.nightbot.tv)
* [pandora.com](http://pandora.com)
* [piki.fm](http://piki.fm)
* [planeta.fm](http://www.planeta.fm)
* [play.google.com](http://play.google.com/music)
* [play.spotify.com](http://play.spotify.com)
* [player.epidemicsound.com](http://player.epidemicsound.com)
* [player.siriusxm.com](http://player.siriusxm.com)
* [pleer.com](http://pleer.com)
* [plex.tv](http://plex.tv)
* [seoul.fm](http://seoul.fm)
* [slacker.com](http://slacker.com)
* [soundcloud.com](http://soundcloud.com)
* [synchtu.be](http://synchtu.be/r/Playhouse)
* [themusicninja.com](themusicninja.com)
* [tunein.com](http://tunein.com)
* [vk.com](http://vk.com)
* [yggdrasilradio.net](http://yggdrasilradio.net)
* [youtube.com](http://youtube.com)
* [youtube.com/tv](http://youtube.com/tv)
* [youtube-playlist-randomizer.valami.info](http://youtube-playlist-randomizer.valami.info)
* [zaycev.fm](http://zaycev.fm)
* [play.baidu.com](http://play.baidu.com)
* [player.kuwo.cn](http://player.kuwo.cn)
* [y.qq.com](http://y.qq.com)
* [radio.yandex.ru](http://radio.yandex.ru)
* [radiobells.com](https://www.radiobells.com)
* [radiorecord.ru](http://www.radiorecord.ru/player)
* [radiotunes.com](http://www.radiotunes.com)
* [radioultra.ru](http://www.radioultra.ru/player)
* [xiami.com](http://www.xiami.com/play)
* [open.fm](http://open.fm)
* [eskago.pl](http://www.eskago.pl)
* [zvooq.com](http://zvooq.com)
* [jombly.com](http://www.jombly.com)

Support for more sites will be added over time. If you have a suggestion for a site, please open an issue or reply to the obs topic.

Install
--------------------------------------
### Latest Mozilla reviewed version
On Mozilla Add-ons (AMO) :
[![amo-button_1](https://cloud.githubusercontent.com/assets/1236069/11095684/7c37b7d4-8896-11e5-9e3e-6b7913983a8c.png)](https://addons.mozilla.org/en-US/firefox/addon/untamed-now-playing/)

### Latest unreviewed release:
Get it here : https://github.com/Wykks/Untamed-Now-Playing-Next/releases.
Then drag the downloaded file onto a Firefox extension page (about:addons).

### Build Latest dev version:
To build UNP you'll need npm and jpm.

To install npm, read this: https://github.com/npm/npm#super-easy-install

Then install jpm:

    npm install jpm -g
And finally build UNP (do this where package.json is located):

    jpm xpi

Then drag the xpi generated file onto a Firefox extension page (about:addons).

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
* [jQuery](http://jquery.com) (MIT License)
* [Preact](https://preactjs.com) (MIT License)

Additionally, the main icon was designed by [CSS Creme](http://csscreme.com/freeicons/), and icons designed by [FatCow](http://www.fatcow.com/free-icons) are used on the options pages.
