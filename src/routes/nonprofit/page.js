function init() {
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	btn.onclick = getItemRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

function getItemRequest() {
	var responseText = document.getElementById('response');
    console.log('Get Item Request')
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/FindNonProfit', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus; 
}

var img, img1;
function showStatus() 
{
	console.log('Show Status')
	if(request.readyState === 4)
	{
		if(request.status === 200) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(request.responseText,"text/xml");
			panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue + "<br>" +
			xmlDoc.getElementsByTagName("mission")[0].childNodes[0].nodeValue +
			xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue 
			var img = 	xmlDoc.getElementsByTagName("logoURL")[0].childNodes[0].nodeValue;
			var charityImage = document.getElementById("charityImage");
			charityImage.src = img;
			console.log(request.responseText);
		}
	}
}