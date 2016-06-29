document.addEventListener("DOMContentLoaded", function(){	
	save.addEventListener("click", saveSettings);
	
	chrome.storage.sync.get(undefined, function(items){
		for (i = 0; i < items.contexts.length; i++){
			var item = items.contexts[i];
			var row = document.createElement("tr");
			row.setAttribute("id", item.title);
			for (colN = 1; colN <= 2; colN++){
				var col = document.createElement("td");
				var input = document.createElement("input");
				input.setAttribute("type", "text");
				input.setAttribute("value", colN==1?item.title:item.url);
				if (colN==1) input.setAttribute("size", "10");
				input.setAttribute("class", "borderless");
				input.setAttribute("id", item.title+colN.toString());
				col.appendChild(input);
				row.appendChild(col);
			}
			var colDelete = document.createElement("td");
			var img = document.createElement("img");
			img.setAttribute("class", "deleteImg");
			img.setAttribute("alt", "X");
			img.src = "close.png";
			img.addEventListener("click", function(){
				console.log(document.getElementById(item.title));
				document.getElementById(item.title).remove();
			});
			colDelete.appendChild(img);
			row.appendChild(colDelete);
			th.parentNode.insertBefore(row, th.nextSibling);
		}
	});
	
});

function saveSettings(){
	console.log("Saved");
	var contexts = [{"title":"Google", "url":"https://www.google.com/search?q=%s"},
					{"title":"Reddit", "url":"http://www.reddit.com/search?q=%s"},
					{"title":"Yahoo", "url":"https://search.yahoo.com/search?p=%s"},
					{"title":"Bing", "url":"https://www.bing.com/search?q=%s"}]
	chrome.storage.sync.set({
		"contexts": contexts},
		function(){
			var status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(function() {
				status.textContent = '';
			}, 1750);
		}
	);	
}