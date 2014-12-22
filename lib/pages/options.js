var plugin = document.createElement('embed'), isVisible = false, clickedAway = false, page = false;
plugin.setAttribute('type', 'application/x-npapifileioforchrome');
plugin.setAttribute('height', '0');
plugin.setAttribute('width', '0');
document.documentElement.appendChild(plugin);

$(document).ready(function()
{
	$('[data-i18n]').each(function() {
    var me = $(this);
    var key = me.data('i18n');
    me.html(chrome.i18n.getMessage(key));
  });

	if (!empty(localStorage['unpSaveDir']))
	{
		$('#save_dir').val(localStorage['unpSaveDir']);
	}
	else
	{
		Alert('warn', chrome.i18n.getMessage("warn_opt"));
		$('#save_dir').val('C:\\Users\\USERNAME\\Documents\\unp\\');
	}

	$('#filename').val( (!empty(localStorage['unpFilename'])) ? localStorage['unpFilename'] : 'unp_now_playing' );
	$('#txt_format').val( (!empty(localStorage['unpTxtFormat'])) ? localStorage['unpTxtFormat'] : '%s%' );
	$('#song_maxlen').val( (!empty(localStorage['unpSongMaxLen'])) ? localStorage['unpSongMaxLen'] : '60' );

	if (!empty(localStorage['unpSaveFormat']))
	{
		$('#save_format').val(localStorage['unpSaveFormat']);

		if (localStorage['unpSaveFormat'] == 'xml')
		{
			$('#txt_format_details').hide();
		}
		else if (localStorage['unpSaveFormat'] == 'multi')
		{
			$('#filename_details').hide();
		}
	}

	if (empty(localStorage['unpSongMaxLenApp']) || localStorage['unpSongMaxLenApp'] === 'true')
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

	if (localStorage['unpAutoClear'] === 'true')
	{
		$('#auto_clear').prop('checked', true);
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

				if (page == 'options' || page == 'about')
				{
					//FIXME Temporary disabled
					/*$.getJSON('http://ipaddr.me/unp/latest.php?json=1', function(data)
					{
						if (data != null && data['version'] > '0.6.1')
							Alert('error', chrome.i18n.getMessage("error_new_ver", [data['version'],data['update_url']]) );
					});*/
				}

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

	$('.opt-tt').click(function(e)
	{
		$('.opt-tt').not(this).popover('hide');
		clickedAway = false;
		isVisible   = true;
		e.preventDefault()
	}).each(function(i,e){
		$(this).popover(
		{
			placement: 'top',
			html: true,
			content: chrome.i18n.getMessage("opt_tt_" + i),
			trigger: 'click'
		}
		)
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
		plugin.removeRecursively(save_dir + 'unp_cache.txt');
	}

	localStorage['unpSaveDir']        = $('#save_dir').val();
	localStorage['unpSaveFormat']     = $('#save_format').val();
	localStorage['unpFilename']       = $('#filename').val();
	localStorage['unpTxtFormat']      = $('#txt_format').val();
	localStorage['unpSongMaxLen']     = $('#song_maxlen').val();
	localStorage['unpSongMaxLenApp']  = $('#song_maxlen_append').is(':checked');
	localStorage['unpCheckLive']      = $('#check_live').is(':checked');
	localStorage['unpStreamSite']     = (empty($('#stream_site').val()) ? '' : $('#stream_site').val());
	localStorage['unpStreamUser']     = $('#stream_user').val();
	localStorage['unpAlbumArtwork']   = $('#album_artwork').is(':checked');
	localStorage['unpDisableYoutube'] = $('#disable_youtube').is(':checked');
	localStorage['unpAutoClear']      = $('#auto_clear').is(':checked');
	localStorage['unpNightbotEnable'] = $('#nightbot_enable').is(':checked');
	localStorage['unpNightbotUser']   = $('#nightbot_user').val();
	localStorage['unpNightbotAPIKey'] = $('#nightbot_api_key').val();

	Alert('success',  chrome.i18n.getMessage("opt_saved") );
}

function validateOptions()
{
	if ($('#save_dir').val().indexOf('windows') != -1)
	{
		Alert('error', chrome.i18n.getMessage('err_directory_win'));
		return false;
	}

	if (!plugin.isDirectory($('#save_dir').val()))
	{
		Alert('error', chrome.i18n.getMessage('err_directory_unable'));
		return false;
	}

	plugin.saveBlobToFile($('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt', string2Bin('Just a quick test to ensure we can write to this directory! :)'));

	if (bin2String(plugin.contentsAtPath($('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt')) != 'Just a quick test to ensure we can write to this directory! :)')
	{
		Alert('error', chrome.i18n.getMessage('err_directory_inaccess'));
		return false;
	}

	plugin.removeRecursively($('#save_dir').val() + $('#filename').val() + '_write_test_53642784162133643354.txt');

	if ($('#save_format').val() != 'xml' && $('#save_format').val() != 'txt' && $('#save_format').val() != 'multi')
	{
		Alert('error', chrome.i18n.getMessage('err_fmt_invalid'));
		return false;
	}

	if ($('#save_format').val() == 'txt')
	{
		if ($('#txt_format').val().length > 512)
		{
			Alert('error', chrome.i18n.getMessage('err_fmt_toolong'));
			return false;
		}

		if (empty($('#song_maxlen').val()) || $('#song_maxlen').val() > 256 || $('#song_maxlen').val() < 10)
		{
			Alert('error', chrome.i18n.getMessage('err_maxlen_invalid'));
			return false;
		}
	}

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
