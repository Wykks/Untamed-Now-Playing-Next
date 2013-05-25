var PROXY_PORT_NAME_ = 'Proxy_UNP1_';

function setupProxy()
{
	chrome.extension.onConnect.addListener(function(port)
	{
		if (port.name != PROXY_PORT_NAME_)
			return;

		port.onMessage.addListener(function(opts)
		{
			switch(opts.type)
			{
				case 'ls':

					if (opts.method == 'r')
					{
						port.postMessage({
							status: 'ok',
							data: JSON.stringify(localStorage)
						});
					}

				break;
				case 'npapi':

					var status, data;

					if (localStorage['unpSaveDir'] == null)
					{
						status = 'fatal';
						data = 'Save directory is not set';
					}
					else
					{
						var base_path = localStorage['unpSaveDir'].split('/').join('\\');

						if (base_path.substr(base_path.length - 1) != '\\')
							base_path = base_path + '\\';

						if (base_path.indexOf('windows') != -1)
						{
							status = 'fatal';
							data = 'Save directory can not contain \'windows\'';
						}
						else if (!plugin.isDirectory(base_path))
						{
							status = 'fatal';
							data = 'Cannot read Save directory';
						}
						else
						{
							var path    = base_path + opts.filename + ((localStorage['unpSaveFormat'] == 'xml') ? '.xml' : '.txt');
							var imgPath = base_path + 'unp_album_art.jpg';

							switch (opts.method)
							{
								case 'w':

									if (localStorage['unpCheckLive'] === 'true')
									{
										var cache_path = base_path + 'unp_cache.txt', cache_refresh = false, cache_exists = true;

										if (!plugin.fileExists(cache_path))
										{
											cache_refresh = true;
											cache_exists  = false;
										}
										else
										{
											var cache_data = $.parseJSON(plugin.getTextFile(cache_path));

											if (cache_data[0] + 600 < Math.round(+new Date()/1000))
											{
												cache_refresh = true;
											}
											else if (cache_data[1] == 'on')
											{
												var output = writeNp(opts, path);
												status     = output[0];
												data       = output[1];

												cache_refresh = false;

												if (localStorage['unpAlbumArtwork'] === 'true')
												{
													writeAlbumArt(opts.albumArt, imgPath);
												}
											}
											else
											{
												status = 'error';
												data   = 'Stream offline';
											}
										}

										if (cache_refresh == true)
										{
											switch (localStorage['unpStreamSite'])
											{
												case 'justin':

													$.getJSON('http://api.justin.tv/api/stream/list.json?channel=' + encodeURIComponent(localStorage['unpStreamUser']), function(data)
													{
														if (data.length !== 0 && data[0]['format'] === 'live')
														{
															var output = writeNp(opts, path);
															status = output[0];
															data   = output[1];

															if (localStorage['unpAlbumArtwork'] === 'true')
															{
																writeAlbumArt(opts.albumArt, imgPath);
															}
														}
														else
														{
															status = 'error';
															data   = 'Stream offline';
														}

														if (cache_exists)
															plugin.removeFile(cache_path);

														if (plugin.fileExists(cache_path))
														{
															data += ', Error: Unable to remove old cache file';
														}
														else
														{
															plugin.saveTextFile(cache_path, JSON.stringify([Math.round(+new Date()/1000), ( (status == 'error') ? 'off' : 'on' )]));
														}

														port.postMessage({
															status: status,
															data: data,
														});
													});

												break;
												case 'own3d':

													$.get('http://api.own3d.tv/liveCheck.php?live_id=' + encodeURIComponent(localStorage['unpStreamUser']), function(data)
													{
														if (data.length !== 0 && $('isLive', data).text() === 'true')
														{
															var output = writeNp(opts, path);
															status = output[0];
															data   = output[1];

															if (localStorage['unpAlbumArtwork'] === 'true')
															{
																writeAlbumArt(opts.albumArt, imgPath);
															}
														}
														else
														{
															status = 'error';
															data   = 'Stream offline';
														}

														if (cache_exists)
															plugin.removeFile(cache_path);

														if (plugin.fileExists(cache_path))
														{
															data += ', Error: Unable to remove old cache file';
														}
														else
														{
															plugin.saveTextFile(cache_path, JSON.stringify([Math.round(+new Date()/1000), ( (status == 'error') ? 'off' : 'on' )]));
														}

														port.postMessage({
															status: status,
															data: data,
														});
													});

												break;
											}
										}
									}
									else
									{
										var output = writeNp(opts, path);
										status     = output[0];
										data       = output[1];

										if (localStorage['unpAlbumArtwork'] === 'true')
										{
											writeAlbumArt(opts.albumArt, imgPath);
										}
									}

								break;
								case 'r':

									if (!plugin.fileExists(path))
									{
										status = 'error';
										data = 'File doesn\'t exist';
									}
									else
									{
										status = 'ok';
										data = plugin.getTextFile(path);
									}

								break;
							}
						}
					}

					if (typeof status !== 'undefined')
					{
						port.postMessage({
							status: status,
							data: data,
						});
					}

				break;
				case 'xhr':

					var xhr = new XMLHttpRequest();
					xhr.open(opts.method || 'GET', opts.url, true);

					xhr.onreadystatechange = function()
					{
						if (this.readyState == 4)
						{
							port.postMessage({
								status: this.status,
								data: this.responseText
							});
						}
					}

					xhr.send();

				break;
			}
		});
	});
}

function proxyReq(opts)
{
	opts = opts || {};
	opts.onComplete = opts.onComplete || function(){};

	var port = chrome.extension.connect({name: PROXY_PORT_NAME_});

	port.onMessage.addListener(function(msg)
	{
		opts.onComplete(msg.status, msg.data);
	});

	port.postMessage(opts);
}

function writeNp(opts, path)
{
	if (plugin.fileExists(path))
		plugin.removeFile(path);

	if (plugin.fileExists(path))
	{
		status = 'error';
		data   = 'Unable to remove old now playing file';
	}
	else
	{
		opts.nowPlaying = opts.nowPlaying.replace(/\u2026/g, '...').replace(/[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g, '').trim();

		if (opts.nowPlaying.length > localStorage['unpSongMaxLen'])
		{
			opts.nowPlaying = opts.nowPlaying.substr(0, localStorage['unpSongMaxLen']);

			if (localStorage['unpSongMaxLenApp'])
				opts.nowPlaying += '...'
		}

		plugin.saveTextFile(path, (localStorage['unpSaveFormat'] == 'xml') ? '<?xml version="1.0" encoding="utf-8"?>' + "\n" + '<uNP><nowPlaying>' + opts.nowPlaying + '</nowPlaying><duration>' + opts.duration + '</duration><timeStarted>' + opts.timeStarted + '</timeStarted><artistName>' + opts.artistName + '</artistName><trackName>' + opts.trackName + '</trackName><albumName>' + opts.albumName + '</albumName><url>' + opts.url + '</url></uNP>' : localStorage['unpTxtFormat'].replace(/%s%/g, opts.nowPlaying).replace(/%a%/g, opts.artistName).replace(/%e%/g, opts.trackName).replace(/%b%/g, opts.albumName).replace(/%d%/g, opts.duration).replace(/%t%/g, opts.timeStarted).replace(/%u%/g, opts.url).replace(/%n%/g, "\n"));

		status = 'ok';
		data   = path;
	}

	return [ status , data ];
}

function writeAlbumArt(imgURL, imgPath)
{
	if (plugin.fileExists(imgPath))
		plugin.removeFile(imgPath);

	if (imgURL.split('.').pop().toLowerCase() == 'png')
		var imgURL = 'http://ipaddr.me/unp/png2jpg.php?q=' + imgURL;

	if (plugin.fileExists(imgPath))
	{
		status = 'error';
		data   = 'Unable to remove old album art';
	}
	else if (imgURL == '?')
	{
		writePlaceholderArt(imgPath);

		status = 'ok';
		data   = 'No album art found, using placeholder image';
	}
	else
	{
		var imgReq = new XMLHttpRequest();
		imgReq.open('GET', imgURL, true);
		imgReq.responseType = 'arraybuffer';
		imgReq.onload = function (oEvent)
		{
			var arrayBuffer = imgReq.response;

			if (arrayBuffer)
			{
				var byteArray = new Uint8Array(arrayBuffer);

				if (byteArray[0] == 255 && byteArray[1] == 216 && byteArray[2] == 255)
				{
					plugin.saveBinaryFile(imgPath, byteArray);

					status = 'ok';
					data   = imgPath;
				}
				else
				{
					writePlaceholderArt(imgPath);

					status = 'error';
					data   = 'Album art doesn\'t appear to be a valid jpg image';
				}
			}
		};
		imgReq.send(null);
	}

	return [ status , data ];
}

function writePlaceholderArt(imgPath)
{
	plugin.saveBinaryFile(imgPath, [255,216,255,224,0,16,74,70,73,70,0,1,1,1,0,96,0,96,0,0,255,225,0,140,69,120,105,102,0,0,77,77,0,42,0,0,0,8,0,7,1,26,0,5,0,0,0,1,0,0,0,98,1,27,0,5,0,0,0,1,0,0,0,106,1,40,0,3,0,0,0,1,0,2,0,0,1,49,0,2,0,0,0,18,0,0,0,114,81,16,0,1,0,0,0,1,1,0,0,0,81,17,0,4,0,0,0,1,0,0,0,0,81,18,0,4,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,96,0,0,0,1,0,0,0,96,0,0,0,1,80,97,105,110,116,46,78,69,84,32,118,51,46,53,46,49,48,0,255,219,0,67,0,24,16,18,21,18,15,24,21,19,21,26,25,24,28,35,59,38,35,32,32,35,72,51,54,43,59,85,75,90,88,84,75,82,81,94,106,135,115,94,100,128,101,81,82,118,160,119,128,140,144,151,153,151,91,113,166,178,165,147,176,135,148,151,146,255,219,0,67,1,25,26,26,35,31,35,69,38,38,69,146,97,82,97,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,255,194,0,17,8,0,128,0,128,3,1,34,0,2,17,1,3,17,1,255,196,0,25,0,0,2,3,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,4,5,3,255,196,0,20,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,218,0,12,3,1,0,2,16,3,16,0,0,1,157,35,137,28,10,43,86,46,37,72,91,122,12,105,54,109,130,212,98,39,62,232,71,70,23,56,241,1,16,105,8,28,49,1,81,180,50,220,213,66,9,90,197,3,154,178,128,200,25,110,193,154,218,40,81,70,82,50,146,205,188,205,1,56,244,7,4,181,10,93,214,232,157,9,23,160,64,102,235,101,129,139,11,107,135,65,184,89,164,60,64,29,76,171,199,102,85,2,130,61,75,20,139,77,193,206,139,9,219,55,82,161,82,72,66,9,123,190,84,53,171,209,81,226,145,138,195,165,218,183,72,202,230,74,234,103,8,67,138,142,128,33,137,36,11,13,33,163,161,31,147,140,178,20,248,105,161,152,47,115,42,27,78,82,177,113,192,235,6,67,204,255,196,0,35,16,0,2,1,4,2,2,3,1,1,0,0,0,0,0,0,0,1,2,0,3,17,18,50,16,32,33,51,19,48,49,34,65,255,218,0,8,1,1,0,1,5,2,68,92,48,89,130,204,22,96,179,20,133,169,9,157,57,157,56,26,148,197,12,193,102,11,48,89,130,199,69,193,52,224,155,71,173,9,39,168,241,22,169,16,16,121,125,19,72,204,20,59,150,250,85,138,148,96,194,62,137,161,54,14,217,31,169,78,37,77,195,232,154,86,111,182,139,88,190,139,235,253,234,136,57,106,64,198,4,30,132,222,145,244,90,90,91,132,28,90,126,79,50,170,228,189,23,210,125,124,90,90,90,14,67,222,94,17,102,180,183,11,171,250,175,47,47,47,5,143,45,2,129,193,253,180,180,180,255,0,27,209,210,137,200,121,159,212,243,47,42,53,132,188,202,94,15,90,249,166,124,116,4,169,90,129,185,103,11,11,100,121,188,34,212,83,74,235,231,174,68,76,137,237,69,110,207,162,104,69,195,46,39,234,3,34,171,136,125,19,72,234,24,50,149,60,30,192,22,52,211,1,31,68,211,130,1,13,72,142,235,72,152,170,20,112,250,43,46,57,44,201,102,75,50,88,112,48,211,167,62,53,159,18,193,78,156,24,9,146,204,150,100,179,37,142,195,15,255,196,0,20,17,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,255,218,0,8,1,3,1,1,63,1,1,255,196,0,20,17,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,255,218,0,8,1,2,1,1,63,1,1,255,196,0,37,16,0,1,1,7,3,5,1,0,0,0,0,0,0,0,0,0,0,1,2,17,32,33,49,50,113,16,48,145,3,34,81,97,161,18,255,218,0,8,1,1,0,6,63,2,78,212,161,106,112,90,156,22,167,5,169,193,107,37,19,130,207,133,159,10,39,5,25,45,78,11,83,130,212,224,181,56,23,181,40,51,136,59,73,195,35,184,150,173,96,103,26,61,118,165,171,88,25,198,235,208,120,214,6,112,126,119,93,228,107,2,96,124,51,158,178,144,229,133,87,208,152,133,250,203,79,105,11,71,79,109,96,234,96,99,97,209,245,48,38,33,119,141,20,82,177,54,190,68,192,232,30,132,229,175,178,112,170,122,19,7,234,41,41,85,137,254,6,176,38,7,14,219,114,14,26,192,152,214,123,50,213,172,9,141,102,74,113,206,68,181,107,2,77,10,161,84,42,133,80,154,161,119,210,244,47,66,239,164,156,85,10,161,84,42,131,83,74,31,255,196,0,37,16,0,2,1,3,3,5,1,1,1,1,0,0,0,0,0,0,0,1,17,33,49,65,16,81,161,32,97,129,145,241,113,177,240,48,255,218,0,8,1,1,0,1,63,33,97,174,88,99,165,206,115,154,175,232,50,79,224,123,111,65,109,253,6,113,254,133,100,239,11,165,206,115,144,106,150,88,56,205,80,146,220,35,15,179,42,44,216,245,68,170,102,159,98,137,82,221,11,101,165,107,206,28,102,160,24,214,219,12,93,9,107,34,244,37,75,214,156,225,198,8,99,118,67,230,198,16,244,90,33,8,99,36,120,137,90,100,231,14,48,153,195,206,143,161,41,33,161,50,70,37,165,71,97,206,15,15,237,29,77,178,53,170,171,161,117,22,216,133,16,145,250,42,200,64,136,125,22,170,186,59,216,227,194,119,68,48,195,16,45,41,82,69,49,75,197,197,12,208,126,71,65,45,203,209,92,93,142,132,61,29,147,63,147,248,74,40,64,169,144,69,154,42,41,120,23,66,143,101,115,216,136,108,197,161,5,183,249,66,231,243,249,162,100,202,24,136,109,187,105,19,24,43,220,217,132,174,228,110,217,22,239,184,150,8,145,18,143,240,176,147,219,71,208,206,234,13,43,116,166,6,153,65,188,20,84,235,52,252,28,30,201,220,169,171,187,9,136,173,26,251,192,176,222,84,73,54,186,232,89,101,75,138,91,21,19,130,123,59,16,233,2,209,50,202,92,236,67,156,17,12,25,191,66,68,10,232,94,71,116,239,61,85,37,135,56,112,66,156,214,99,231,120,213,12,122,46,135,34,224,164,161,206,28,22,144,167,236,129,127,196,140,32,158,230,94,156,225,193,107,26,73,42,52,182,30,206,140,125,23,177,95,164,64,19,94,112,237,57,100,251,71,218,62,209,246,134,186,124,140,89,16,120,137,4,133,209,140,242,249,62,209,246,143,180,125,161,216,175,50,127,255,218,0,12,3,1,0,2,0,3,0,0,0,16,144,194,32,34,193,24,82,13,56,19,207,40,1,200,0,130,2,44,18,3,32,210,72,36,19,76,52,194,11,60,227,72,12,99,207,40,178,134,52,161,128,40,227,13,52,147,12,36,255,196,0,20,17,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,255,218,0,8,1,3,1,1,63,16,1,255,196,0,20,17,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,255,218,0,8,1,2,1,1,63,16,1,255,196,0,36,16,1,0,2,1,3,4,3,1,1,1,0,0,0,0,0,0,1,0,17,33,49,65,81,16,113,240,241,97,129,161,193,145,209,255,218,0,8,1,1,0,1,63,16,107,4,138,155,113,61,106,122,212,245,169,235,80,187,33,202,102,34,247,194,255,0,32,52,121,43,81,134,21,71,194,127,33,150,103,36,189,106,122,212,245,169,235,80,172,2,8,108,196,243,92,29,82,136,53,88,150,158,60,168,138,91,126,88,37,99,160,185,99,228,37,81,128,62,35,39,212,2,68,220,235,230,184,103,154,224,232,205,40,52,57,151,183,71,67,161,20,125,43,16,51,42,154,70,88,58,231,99,45,125,38,171,81,233,230,184,103,154,224,136,157,5,172,78,240,62,130,41,172,193,142,147,68,25,130,97,20,109,15,125,135,36,76,108,19,205,112,207,53,193,28,23,6,127,146,48,92,170,132,182,162,44,11,216,185,184,19,185,81,79,152,148,143,56,232,20,76,185,188,124,51,205,112,194,107,65,63,35,117,147,184,196,88,176,32,11,93,161,193,17,244,37,21,21,198,144,165,194,199,102,42,123,211,71,185,21,210,33,152,48,130,209,41,44,239,4,45,199,228,80,53,255,0,104,37,56,35,241,31,136,161,150,6,218,26,133,58,154,65,55,99,128,90,10,13,38,6,183,129,124,176,180,53,85,99,40,110,24,173,114,110,65,132,8,37,252,95,249,113,209,58,36,172,153,69,120,149,163,150,38,0,11,67,181,65,169,41,114,144,171,205,252,84,2,27,112,42,197,187,200,86,246,133,224,177,228,107,43,13,16,152,180,132,94,58,249,135,245,44,19,98,74,230,124,147,228,130,6,244,110,99,110,44,57,184,230,88,39,35,74,141,32,4,110,127,159,216,104,2,155,74,110,93,114,142,48,69,174,173,74,174,208,232,24,158,133,127,82,248,107,248,68,184,178,224,168,54,156,84,252,155,49,4,213,48,75,173,226,146,42,218,233,219,238,35,172,219,5,193,108,255,0,33,3,117,109,217,82,245,3,8,9,152,139,204,231,129,97,248,115,59,5,65,209,64,127,200,218,224,166,44,184,183,42,12,63,99,197,148,234,104,250,150,20,217,52,149,155,205,205,76,38,230,126,248,141,91,59,27,4,21,45,52,138,77,141,76,29,231,141,10,103,156,226,85,6,48,238,135,70,89,20,79,201,101,47,139,142,84,33,6,12,88,149,31,217,158,107,134,121,206,33,147,97,81,174,142,238,78,149,4,209,212,33,210,225,209,107,243,230,108,51,171,204,243,92,51,206,113,209,89,211,182,225,149,143,179,179,2,216,24,138,58,67,88,116,97,171,207,225,40,134,95,217,211,205,112,207,57,199,87,70,15,49,231,186,181,63,236,84,208,134,201,76,215,19,18,179,8,10,0,171,177,28,59,14,236,175,96,221,221,235,230,184,97,129,52,187,30,39,163,207,71,158,143,61,30,21,93,232,76,223,105,19,250,194,127,217,185,250,19,254,207,214,208,74,63,231,9,232,243,209,231,163,207,71,131,8,80,0,231,19,255,217]);
}