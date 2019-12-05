function init() {
	panel = document.getElementById("panel");
	warningResponse = document.getElementById("warningResponse");
	var getNonProfitBtn = document.getElementById("getNonProfit");
	var searchNonProfitBtn = document.getElementById('searchNonProfit')
	searchNonProfitBtn.onclick = getNonProfitRequest;
	//getNonProfitBtn.onclick = getNonProfitRequest;
	document.getElementById("response").style.display = "hidden";
}
document.addEventListener("DOMContentLoaded", init, false);
var nonProfitId

function getNonProfitRequest() {
	nonProfitId = document.getElementById("nonProfitInput").value;
	console.log('Get Non Profit Request')
	request = new XMLHttpRequest();
	var requestUrl = 'http://localhost:9000/v1/FindNonProfit?nonProfitInput=' + nonProfitId;
	request.open("GET", requestUrl, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus;
}

var img, img1;
function showStatus() {
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(request.responseText, "text/xml");
	console.log(xmlDoc.getElementsByTagName("findNonprofitResponse"))
	console.log(xmlDoc.getElementsByTagName("ack"))
	console.log(xmlDoc.getElementsByTagName("mission")[0].childNodes[0].nodeValue)
	if (request.readyState === 4) {
		if (request.status === 200) {
			if (xmlDoc.getElementsByTagName("ack")[0].childNodes[0].nodeValue == "Warning") {
				console.log('Warning');
				warningResponse.innerHTML += "<br> " + "Warning - Ignoring invalid value for the field ExternalId";
				panel.innerHTML += "";
			} else {
				warningResponse.innerHTML += "";
				panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue + "<br>" +
					"<h3> Mission:  </h3>" + xmlDoc.getElementsByTagName("mission")[0].childNodes[0].nodeValue +
					"<h3> Description: </h3>" + xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue
				var img = xmlDoc.getElementsByTagName("logoURL")[0].childNodes[0].nodeValue;
				var charityImage = document.getElementById("charityImage");
				document.getElementById("response").style.display = "block";
				charityImage.src = img;
				getNonProfitItems();
				console.log(request.responseText);
			}
		} else {
			console.log('Failure Clause');
			panel.innerHTML += "<br> " + "Sorry this request was incorrect";
			panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("ack")[0].childNodes[0].nodeValue + "<br>";
		}
	}
}

function getNonProfitItems() {
	console.log('Get Non Profit Items');
	request = new XMLHttpRequest();
	var requestUrl = 'http://localhost:9000/v1/AdvancedCharityItems?charityItemId=' +'19790' + '&listingType=FixedPrice';
	request.open("GET", requestUrl, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayNonProfitItems;
}

function displayNonProfitItems() {
	console.log(request.responseText);
	console.log('Display Non Profit Items Method')
	if (request.status === 200) {
		console.log('Request Succsess');
		console.log(request.responseText);
	}
	var obj = JSON.parse(request.responseText);
	//document.getElementById("productOne").innerHTML = obj.items.items.item[0].title;
	//document.getElementById("productTwo").innerHTML = obj.items.items.item[1].title
	var product1Img = document.getElementById("product1Img");
	product1Img.src = obj.items.items.item[0].itemImageInfo[0].primaryImageURL
	//document.getElementById("product1Img").innerHTML = obj.items.items.item[0].itemImageInfo[0].primaryImageURL


}