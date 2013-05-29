chrome.browserAction.onClicked.addListener(function()
{
	chrome.tabs.create(
	{
		url : chrome.extension.getURL('options.html')
	})
});

chrome.runtime.onInstalled.addListener(function(details)
{
	if (details.reason == 'install')
	{
		chrome.tabs.create(
		{
			url : chrome.extension.getURL('options.html')
		})
	}
	else if (details.reason == 'update')
	{
		if (details.previousVersion != chrome.runtime.getManifest().version)
		{
			chrome.tabs.create(
			{
				url    : chrome.extension.getURL('options.html#/changelog/update=true&old=' + details.previousVersion + '&new=' + chrome.runtime.getManifest().version),
				active : false
			})
		}
	}
});

var plugin = document.createElement('embed');
plugin.setAttribute('type', 'application/x-npapi-file-io');
plugin.setAttribute('height', '0');
plugin.setAttribute('width', '0');
document.documentElement.appendChild(plugin);

setupProxy();