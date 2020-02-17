var charityId;

function init() {
    this.charityId = localStorage.getItem("charityId");
    console.log(this.charityId);
    document.getElementById("title").innerHTML ="Charity Cause: " + this.charityId;
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
                console.log(request.responseText);
                var obj = JSON.parse(request.responseText);
                for (var i = 0; i < 10; i++) {
                    console.log(obj.results[i].name);
                    panel.innerHTML += " " + obj.results[i].name+ "<br>" +
                        "<img src = \"" + obj.results[i].logo_url + "\">" + "<br>"
                        + "<button onclick=\"myFunction()\"> View Charity</button>" + "<br>";
                }
               // panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("nonprofit_id")[0].childNodes[0].nodeValue;
			}else {
                panel.innerHTML += "No results found";
            }
		}
}
}
