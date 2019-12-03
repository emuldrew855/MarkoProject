function init() {
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	btn.onclick = getNonProfitRequest;
	document.getElementById("response").style.display = "hidden";
}
document.addEventListener("DOMContentLoaded", init, false);

function getNonProfitRequest() {
    console.log('Get Non Profit Request')
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
			"<h3> Mission:  </h3>" + xmlDoc.getElementsByTagName("mission")[0].childNodes[0].nodeValue +
			"<h3> Description: </h3>" + xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue 
			var img = 	xmlDoc.getElementsByTagName("logoURL")[0].childNodes[0].nodeValue;
			var charityImage = document.getElementById("charityImage");
			document.getElementById("response").style.display = "block";
			charityImage.src = img;
			getNonProfitItems();
			console.log(request.responseText);
		}
	}
}

function getNonProfitItems() {
	console.log('Get Non Profit Items');
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/AdvancedCharityItems?charityItemId=19790&listingType=FixedPrice', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayNonProfitItems;
}

function displayNonProfitItems() {
	console.log(request.responseText);
	console.log('Display Non Profit Items Method')
	if(request.status === 200) {
		console.log('Request Succsess');
		console.log(request.responseText);
	}
	var obj = JSON.parse(request.responseText);
	document.getElementById("responseText").innerHTML = obj.items.items.item[0].title
	
}