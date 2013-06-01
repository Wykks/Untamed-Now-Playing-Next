var plugin = document.createElement('embed'), isVisible = false, clickedAway = false, page = false;
plugin.setAttribute('type', 'application/x-npapi-file-io');
plugin.setAttribute('height', '0');
plugin.setAttribute('width', '0');
document.documentElement.appendChild(plugin);

$(document).ready(function()
{
	if (!empty(localStorage['unpSaveDir']))
	{
		$('#save_dir').val(localStorage['unpSaveDir']);
	}
	else
	{
		Alert('warn', '<strong>Warning!</strong><br />You need to configure UNP! The main option is the "Save to directory", set a directory where the now playing information will be saved. If you run into any problems, make a reply in either the Teamliquid, Xsplit or OBS topic, or contact me directly (my contact info is available <a href="#/contact" style="color:#7C6238">here</a>).');
		$('#save_dir').val('C:\\Users\\USERNAME\\Documents\\unp\\');
	}

	$('#txt_format').val( (!empty(localStorage['unpTxtFormat'])) ? localStorage['unpTxtFormat'] : '%s%' );
	$('#song_maxlen').val( (!empty(localStorage['unpSongMaxLen'])) ? localStorage['unpSongMaxLen'] : '60' );

	if (!empty(localStorage['unpSaveFormat']))
	{
		$('#save_format').val(localStorage['unpSaveFormat']);

		if (localStorage['unpSaveFormat'] == 'xml')
		{
			$('#txt_format_details').hide();
		}
	}

	if (empty(localStorage['unpSongMaxLenApp']) || localStorage['unpSongMaxLenApp'])
	{
		$('#song_maxlen_append').prop('checked', true);
	}

	if (!empty(localStorage['unpStreamSite']))
	{
		$('#stream_site').val(localStorage['unpStreamSite']);
	}

	if (localStorage['unpCheckLive'] === 'true')
	{
		$('#stream_details').show();
		$('#check_live').prop('checked', true);
	}

	if (!empty(localStorage['unpStreamUser']))
	{
		$('#stream_user').val(localStorage['unpStreamUser']);
	}

	if (localStorage['unpAlbumArtwork'] === 'true')
	{
		$('#album_artwork').prop('checked', true);
	}

	if (localStorage['unpDisableYoutube'] === 'true')
	{
		$('#disable_youtube').prop('checked', true);
	}

	if (localStorage['unpNightbotEnable'] === 'true')
	{
		$('#nightbot_details').show();
		$('#nightbot_enable').prop('checked', true);
	}

	if (!empty(localStorage['unpNightbotUser']))
	{
		$('#nightbot_user').val(localStorage['unpNightbotUser']);
	}

	if (!empty(localStorage['unpNightbotAPIKey']))
	{
		$('#nightbot_api_key').val(localStorage['unpNightbotAPIKey']);
	}

	$.sammy(function()
	{
		this.get('#/:page(/:args)?', function()
		{
			if (this.params['args'] != '')
			{
				var queryArgs = {};

				this.params['args'].substring(1).split('&').forEach(function(key) {
					key = key.split('=');
					queryArgs[key[0]] = key[1] || '';
				});
			}

			if ($('#' + this.params['page']).length)
			{
				page = this.params['page'];
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
/*
				if (page == 'about')
				{
					$.getJSON('http://ipaddr.me/unp/latest.php?json=1', function(data)
					{
						if (data != null && data['version'] > '0.5')
							Alert('error', 'There is a new version (' + data['version'] + ') of Untamed Now Playing available, please <a href="' + data['update_url'] + '" target="_blank">update</a>');
					});
				}
*/
				if (page == 'changelog' && queryArgs['update'] === 'true')
				{
					$('h4[title="' + queryArgs['new'] + '"]').append(' <span id="unpUpdateLabel" class="label label-success">new!</span>');

					(function(){
						$('#unpUpdateLabel').animate({ marginLeft: 5 }, 'slow').animate({ marginLeft: 0 }, 'slow', arguments.callee);
					}());
				}
			}
		});
	}).run('#/options');

	$('.opt-tt').popover(
	{
		placement: 'top',
		html: true,
		trigger: 'click'
	}
	).click(function(e)
	{
		$('.opt-tt').not(this).popover('hide');
		clickedAway = false;
		isVisible   = true;
		e.preventDefault()
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

		var save_dir = $('#save_dir').val().split('/').join('\\');
		var error;

		if (save_dir.substr(save_dir.length - 1) != '\\')
		{
			save_dir = save_dir + '\\';
		}

		$('#save_dir').val(save_dir);

		if (validateOptions())
		{
			if ($('#nightbot_enable').is(':checked'))
			{
				$.ajax(
				{
					url  : 'https://nightbot.tv/api/auth',
					type : 'POST',
					data :
						{
							'username' : $('#nightbot_user').val(),
							'key'      : $('#nightbot_api_key').val()
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
							Alert('error', 'Error: Nightbot API returned: "' + escapeHtml(response['result']) + '"');
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
		}
		else
		{
			$('#save_options').removeAttr('disabled');
		}
	});
});

function saveOptions()
{
	if (plugin.fileExists(save_dir + 'unp_cache.txt'))
	{
		plugin.removeFile(save_dir + 'unp_cache.txt');
	}

	localStorage['unpSaveDir']        = $('#save_dir').val();
	localStorage['unpSaveFormat']     = $('#save_format').val();
	localStorage['unpTxtFormat']      = $('#txt_format').val();
	localStorage['unpSongMaxLen']     = $('#song_maxlen').val();
	localStorage['unpSongMaxLenApp']  = $('#song_maxlen_append').is(':checked');
	localStorage['unpCheckLive']      = $('#check_live').is(':checked');
	localStorage['unpStreamSite']     = $('#stream_site').val();
	localStorage['unpStreamUser']     = $('#stream_user').val();
	localStorage['unpAlbumArtwork']   = $('#album_artwork').is(':checked');
	localStorage['unpDisableYoutube'] = $('#disable_youtube').is(':checked');
	localStorage['unpNightbotEnable'] = $('#nightbot_enable').is(':checked');
	localStorage['unpNightbotUser']   = $('#nightbot_user').val();
	localStorage['unpNightbotAPIKey'] = $('#nightbot_api_key').val();

	Alert('success', 'Settings have been saved');
}

function validateOptions()
{
	if ($('#save_dir').val().indexOf('windows') != -1)
	{
		Alert('error', 'Error: Save directory cannot have \'windows\' in the path');
		return false;
	}

	if (!plugin.isDirectory($('#save_dir').val()))
	{
		Alert('error', 'Error: Unable to read save directory.<br><br>Chrome can limit readable/writable directories, if you run into problems, try changing the folder to your \'My Documents\' or a subdirectory of that folder eg: \'C:\\Users\\Sam\\Documents\\unp\\\'');
		return false;
	}

	plugin.saveTextFile($('#save_dir').val() + 'unp_write_test_53642784162133643354.txt', 'Just a quick test to ensure we can write to this directory! :)');

	if (plugin.getTextFile($('#save_dir').val() + 'unp_write_test_53642784162133643354.txt') != 'Just a quick test to ensure we can write to this directory! :)')
	{
		Alert('error', 'Error: Unable to write to save directory');
		return false;
	}

	plugin.removeFile($('#save_dir').val() + 'unp_write_test_53642784162133643354.txt');

	if ($('#save_format').val() != 'xml' && $('#save_format').val() != 'txt')
	{
		Alert('error', 'Error: Save as format is invalid');
		return false;
	}

	if ($('#save_format').val() == 'txt')
	{
		if ($('#txt_format').val().length > 512)
		{
			Alert('error', 'Error: Plain text format must be less than 512 chars');
			return false;
		}

		if (empty($('#song_maxlen').val()) || $('#song_maxlen').val() > 256 || $('#song_maxlen').val() < 10)
		{
			Alert('error', 'Error: Song maximum length must be a number between 10 and 256');
			return false;
		}
	}

	if ($('#nightbot_enable').is(':checked'))
	{
		if (empty($('#nightbot_user').val()) || $('#nightbot_user').val().length > 256)
		{
			Alert('error', 'Error: Nightbot user is missing or invalid format');
			return false;
		}

		if (empty($('#nightbot_api_key').val()) || $('#nightbot_api_key').val().length > 256)
		{
			Alert('error', 'Error: Nightbot API key is missing or invalid format');
			return false;
		}
	}

	if ($('#check_live').is(':checked'))
	{
		if ($('#stream_site').val() != 'justin')
		{
			Alert('error', 'Error: Stream service is missing or invalid');
			return false;
		}

		if (empty($('#stream_user').val()) || $('#stream_user').val().length > 256)
		{
			Alert('error', 'Error: Stream user is missing or invalid');
			return false;
		}
	}

	return true;
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