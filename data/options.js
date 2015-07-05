//Workaround for localization (because the sdk doesn't support it)
function l10n(key, data)
{
	self.port.emit('localization', key);
	return new Promise(function(resolve, reject) {
		self.port.once('l10n'+key, function(text)
		{
			resolve({text: text, data: data});
		});
	});
}

$('[data-l10n-html-id]').each(function(i)
{
	l10n($(this).data('l10n-html-id'), $(this)).then(function(msg)
	{
		msg.data.html(msg.text);
	});
});

self.port.on("prefs", function(storage)
{
    storage.setValue = function(key, value) {
        this[key] = value;
        self.port.emit('setValue',
        {
            'key': key,
            'value': value,
        });
    };

	clickedAway = false;
	isVisible   = false;

	$('.opt-tt').click(function(e)
	{
		$('.opt-tt').not(this).popover('hide');
		clickedAway = false;
		isVisible   = true;
		e.preventDefault();
	}).each(function(i,e)
	{
		if (i == 7)
			i = 11; //Hack because of nighbot & stream check skip
		if (i == 8)
			i = 12; //Yeah... That's beautiful
		l10n("opt_tt_" + i, $(this)).then(function(msg)
		{
			msg.data.popover(
			{
				placement: 'top',
				html: true,
				content: msg.text,
				trigger: 'click'
			});
		});
	});

	$(document).click(function(e)
	{
		if (isVisible & clickedAway)
		{
			$('.opt-tt').popover('hide');
			isVisible = false;
			clickedAway = false;
		}
		else
		{
			clickedAway = true;
		}
	});

	$.sammy(function()
	{
		this.get('#/:page?', function()
		{
			if ($('#' + this.params.page).length)
			{
				page = this.params.page;
				$('.active').removeClass('active');
				$('#nav-' + page).addClass('active');
				$('.main_content').slideUp();
				$('#' + page).slideDown();
				$('html, body').animate({ scrollTop: 0 }, 'slow');

				if (isVisible & clickedAway)
				{
					$('.opt-tt').popover('hide');
					isVisible = false;
					clickedAway = false;
				}
			}
		});
	}).run('#/options');

	if (storage.unpSaveDir !== undefined)
	{
		$('#save_dir').val(storage.unpSaveDir);
	}
	else
	{
		l10n("warn_opt").then(function(msg)
		{
			Alert('warn', msg.text);
		});
		if (self.options.platform === 'winnt')
			$('#save_dir').val('C:\\Users\\USERNAME\\Documents\\unp\\');
		else if (self.options.platform === 'linux')
			$('#save_dir').val('/home/USERNAME/unp/');
	}

	$('#filename').val( (!empty(storage.unpFilename)) ? storage.unpFilename : 'unp_now_playing' );
	$('#txt_format').val( (!empty(storage.unpTxtFormat)) ? storage.unpTxtFormat : '%s%' );
	$('#song_maxlen').val( (!empty(storage.unpSongMaxLen)) ? storage.unpSongMaxLen : '60' );

	if (!empty(storage.unpSaveFormat))
	{
		$('#save_format').val(storage.unpSaveFormat);

		if (storage.unpSaveFormat == 'xml' || storage.unpSaveFormat == 'json')
		{
			$('#txt_format_details').hide();
		}
		else if (storage.unpSaveFormat == 'multi')
		{
			$('#filename_details').hide();
		}
	}

	if (empty(storage.unpSongMaxLenApp) || storage.unpSongMaxLenApp === true)
	{
		$('#song_maxlen_append').prop('checked', true);
	}

	if (!empty(storage.unpStreamSite))
	{
		$('#stream_site').val(storage.unpStreamSite);
	}

	if (storage.unpCheckLive === true)
	{
		$('#stream_details').show();
		$('#check_live').prop('checked', true);
	}

	if (storage.unpAutoClear === true)
	{
		$('#auto_clear').prop('checked', true);
	}

	if (!empty(storage.unpStreamUser))
	{
		$('#stream_user').val(storage.unpStreamUser);
	}

	if (storage.unpAlbumArtwork === true)
	{
		$('#album_artwork').prop('checked', true);
	}

	if (storage.unpDisableYoutube === true)
	{
		$('#disable_youtube').prop('checked', true);
	}

	if (storage.unpNightbotEnable === true)
	{
		$('#nightbot_details').show();
		$('#nightbot_enable').prop('checked', true);
	}

	if (!empty(storage.unpNightbotUser))
	{
		$('#nightbot_user').val(storage.unpNightbotUser);
	}

	if (!empty(storage.unpNightbotAPIKey))
	{
		$('#nightbot_api_key').val(storage.unpNightbotAPIKey);
	}


	$('#save_format').change(function(e)
	{
		if ($(this).val() == 'txt')
		{
			$('#txt_format_details').fadeIn();
		}
		else
		{
			$('#txt_format_details').fadeOut();
		}
		if ($(this).val() != 'multi')
		{
			$('#filename_details').fadeIn();
		}
		else
		{
			$('#filename_details').fadeOut();
		}
	});

	$('#check_live').click(function(e)
	{
		if ($('#check_live').is(':checked'))
		{
			$('#stream_details').fadeIn();
		}
		else
		{
			$('#stream_details').fadeOut();
		}
	});

	$('#nightbot_enable').click(function(e)
	{
		if ($('#nightbot_enable').is(':checked'))
		{
			$('#nightbot_details').fadeIn();
		}
		else
		{
			$('#nightbot_details').fadeOut();
		}
	});

	$('#save_options').click(function(e)
	{
		$('#save_options').attr('disabled','disabled');

		var save_dir;
		
		if (self.options.platform === 'winnt')
		{
			save_dir = $('#save_dir').val().split('/').join('\\');
			if (save_dir.substr(save_dir.length - 1) != '\\')
			{
				save_dir = save_dir + '\\';
			}
		}
		else
		{
			save_dir = $('#save_dir').val();
			if (save_dir.substr(save_dir.length - 1) != '/')
			{
				save_dir = save_dir + '/';
			}
		}

		$('#save_dir').val(save_dir);

		validateOptions().then(function()
		{
			/* FIXME Nightbot stuff disabled for now...
			if ($('#nightbot_enable').is(':checked'))
			{
				$.ajax(
				{
					url  : 'https://www.nightbot.tv/api/1/auth',
					type : 'GET',
					data :
						{
							'channel' : $('#nightbot_user').val(),
							'key'     : $('#nightbot_api_key').val()
						},
					cache    : false,
					dataType : 'json',
					success  : function(response)
					{
						if (response['status'] == 'success')
						{
							saveOptions();
						}
						else
						{
							Alert('error', chrome.i18n.getMessage("err_nightbot", escapeHtml(response['result'])));
						}

						$('#save_options').removeAttr('disabled');
					}
				});
			}
			else
			{
				saveOptions();
				$('#save_options').removeAttr('disabled');
			}
			*/
			saveOptions();
			$('#save_options').removeAttr('disabled');
		}, function()
		{
			$('#save_options').removeAttr('disabled');
		});
	});

	function saveOptions()
	{
		storage.setValue('unpSaveDir', $('#save_dir').val());
		storage.setValue('unpSaveFormat', $('#save_format').val());
		storage.setValue('unpFilename', $('#filename').val());
		storage.setValue('unpTxtFormat', $('#txt_format').val());
		storage.setValue('unpSongMaxLen', $('#song_maxlen').val());
		storage.setValue('unpSongMaxLenApp', $('#song_maxlen_append').is(':checked'));
		storage.setValue('unpCheckLive', $('#check_live').is(':checked'));
		storage.setValue('unpStreamSite', (empty($('#stream_site').val()) ? '' : $('#stream_site').val()));
		storage.setValue('unpStreamUser', $('#stream_user').val());
		storage.setValue('unpAlbumArtwork', $('#album_artwork').is(':checked'));
		storage.setValue('unpDisableYoutube', $('#disable_youtube').is(':checked'));
		storage.setValue('unpAutoClear', $('#auto_clear').is(':checked'));
		storage.setValue('unpNightbotEnable', $('#nightbot_enable').is(':checked'));
		storage.setValue('unpNightbotUser', $('#nightbot_user').val());
		storage.setValue('unpNightbotAPIKey', $('#nightbot_api_key').val());

		l10n("opt_saved").then(function(msg)
		{
			Alert('success', msg.text);
		});
	}

});

function validateOptions()
{
	if ($('#save_dir').val().indexOf('windows') != -1)
	{
		l10n("err_directory_win").then(function(msg)
		{
			Alert('error', msg.text);
		});
		return false;
	}

	/* FIXME Not needed, but can help
	if (!plugin.isDirectory($('#save_dir').val()))
	{
		l10n("err_directory_unable").then(function(msg)
		{
			Alert('error', msg.text);
		});
		return false;
	}*/

	self.port.emit("writeFile", 
	{
		filename: $('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt',
		text: 'Just a quick test to ensure we can write to this directory! :)'
	});

	return new Promise(function(resolve, reject) {
		self.port.once($('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt', function(status)
		{
			if (status !== "success")
			{
				l10n("err_directory_inaccess").then(function(msg)
				{
					Alert('error', msg.text);
				});
				console.log("UNP: "+ status);
				reject();
				return;
			}

			self.port.emit("removeFile", $('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt');
			
			if ($('#save_format').val() != 'xml' && $('#save_format').val() != 'txt' && $('#save_format').val() != 'json' && $('#save_format').val() != 'multi')
			{
				l10n("err_fmt_invalid").then(function(msg)
				{
					Alert('error', msg.text);
				});
				reject();
				return;
			}

			if ($('#save_format').val() == 'txt')
			{
				if ($('#txt_format').val().length > 512)
				{
					l10n("err_fmt_toolong").then(function(msg)
					{
						Alert('error', msg.text);
					});
					reject();
					return;
				}

				if (empty($('#song_maxlen').val()) || $('#song_maxlen').val() > 256 || $('#song_maxlen').val() < 10)
				{
					l10n("err_maxlen_invalid").then(function(msg)
					{
						Alert('error', msg.text);
					});
					reject();
					return;
				}
			}

			/* FIXME Nightbot stuff disabled for now...
			if ($('#nightbot_enable').is(':checked'))
			{
				if (empty($('#nightbot_user').val()) || $('#nightbot_user').val().length > 256)
				{
					Alert('error', chrome.i18n.getMessage('err_nightbot_user'));
					return false;
				}

				if (empty($('#nightbot_api_key').val()) || $('#nightbot_api_key').val().length > 256)
				{
					Alert('error', chrome.i18n.getMessage('err_nightbot_key'));
					return false;
				}
			}

			// FIXME Check stream disabled for now...
			if ($('#check_live').is(':checked'))
			{
				if ($('#stream_site').val() !== 'justin' && $('#stream_site').val() !== 'twitch')
				{
					Alert('error', chrome.i18n.getMessage('err_stream_service'));
					return false;
				}

				if (empty($('#stream_user').val()) || $('#stream_user').val().length > 256)
				{
					Alert('error', chrome.i18n.getMessage('err_stream_user'));
					return false;
				}
			}
			*/
			resolve();
		});
	});
}

function Alert(type, data)
{
	$('.alert').fadeOut();
	$('.alert').remove();

	if (page == 'about')
	{
		$('<div class="alert alert-block alert-' + type + '" style="display:none;"><p>' + data + '</p></div>').prependTo('#about');
	}
	else
	{
		$('<div class="alert alert-block alert-' + type + '" style="display:none;"><p>' + data + '</p></div>').insertBefore('#options_table');
	}

	$('.alert').fadeIn();
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

function escapeHtml(str)
{
	return $('<div/>').text(str).html();
}

function string2Bin(str) {
	var result = [];
	for (var i = 0; i < str.length; i++) {
		result.push(str.charCodeAt(i));
	}
	return result;
}

function bin2String(array) {
	return String.fromCharCode.apply(String, array);
}

