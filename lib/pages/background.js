chrome.browserAction.onClicked.addListener(function()
{
	chrome.tabs.create(
	{
		url: chrome.extension.getURL('options.html')
	})
});

var plugin = document.createElement('embed');
plugin.setAttribute('type', 'application/x-npapi-file-io');
plugin.setAttribute('height', '0');
plugin.setAttribute('width', '0');
document.documentElement.appendChild(plugin);

setupProxy();