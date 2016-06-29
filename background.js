chrome.contextMenus.create({"title":"Search for '%s'", "contexts":["selection"], "id":"searchAnyParent"});

chrome.contextMenus.onClicked.addListener(function(info){
	if (info.parentMenuItemId == "searchAnyParent") {
		chrome.storage.sync.get(function(items){
			var title = info.menuItemId.substring(9);
			var url;
			for (i = 0; i < items.contexts.length; i++) {
				if (items.contexts[i].title == title) url = items.contexts[i].url;
			}
			url = url.replace("%s", info.selectionText);
			console.log(url);
			chrome.tabs.create({"url":url});
		});
	}
});

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get(undefined, function(items){
		//if (!items.contexts){
			chrome.storage.sync.set({
				"contexts": [{"title":"Google", "url":"https://www.google.com/search?q=%s"},
							{"title":"Reddit", "url":"http://www.reddit.com//search?q=%s"},
							{"title":"Yahoo", "url":"https://search.yahoo.com/search?p=%s"},
							{"title":"Bing", "url":"https://www.bing.com/search?q=%s"}]});
		//}
	});
	chrome.storage.sync.get(function(items){
		for (i = 0; i < items.contexts.length; i++) {
			chrome.contextMenus.create({"title":"on "+items.contexts[i].title, "parentId":"searchAnyParent", "contexts":["selection"], "id":"searchAny"+items.contexts[i].title}, function() {
					if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
				}
			);
		}
	});
});