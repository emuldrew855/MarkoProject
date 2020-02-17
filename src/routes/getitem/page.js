var panel, request, keyword;

function init() {
	panel = document.getElementById("panel");
	var getItemBtn = document.getElementById('submit')
	getItemBtn.onclick = doRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

function getInputValue(){
	// Selecting the input element and get its value 
	var inputVal = document.getElementById("keyword").value;
	
	// Displaying the value
	alert(inputVal);
}

function doRequest() {
	keyword = document.getElementById("keyword").value;
	console.log("Request");
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/GetItem/'+'?input='+keyword, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus;
}

function showStatus() {
	if (request.readyState === 4) {
		if (request.status === 200) {
				const parser = new DOMParser()
				var obj = request.responseXML; 
				console.log(obj);
				xmlDoc = parser.parseFromString(request.responseText, "text/xml");
				console.log(xmlDoc);
				console.log( '1st CharityName = ', xmlDoc.querySelector('Item CharityName').textContent )
				console.log("AutoPay" + obj.getElementsByTagName("AutoPay")[0].childNodes[0].nodeValue);
				xmlDoc = parser.parseFromString(request.responseText, "text/xml");
				panel.innerHTML += "<br> " + xmlDoc.querySelector('Item Description').textContent+ "<br> "
				 + "<img src = \"" +xmlDoc.querySelector('Item LogoURL').textContent+ "\">" 
				 + xmlDoc.querySelector('Item CharityName').textContent;
		}
	}
}
