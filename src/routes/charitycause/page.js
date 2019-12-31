var charityId;

function init() {
    this.charityId = localStorage.getItem("charityId");
    console.log(this.charityId);
    document.getElementById("title").innerHTML = this.charityId;
    request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:9000/Paypal/GetCharity?missionArea=' +this.charityId, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function displayData() {
    if (request.readyState === 4) {
		if (request.status === 200) {
			if (request.status === 200) {
				parser = new DOMParser();
                xmlDoc = parser.parseFromString(request.responseText, "text/xml");
                console.log(request.responseText);
                panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("nonprofit_id")[0].childNodes[0].nodeValue ;
			}
		}
}
}
