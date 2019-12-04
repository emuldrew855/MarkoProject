var panel, request;

function init() {
	panel = document.getElementById("panel");
	var btn = document.getElementById("findCharityItemsBtn");
	btn.onclick = doRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

function doRequest() {
	request = new XMLHttpRequest();
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/FindCharityItems?charityItemId=10484', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus;
}

function showStatus() {
	if (request.readyState === 4) {
		if (request.status === 200) {
			if (request.status === 200) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(request.responseText, "text/xml");
				//	panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("ItemId")[0].childNodes[0].nodeValue ;
				console.log(request.responseText);
			}
		}
	}
}