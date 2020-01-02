var searchTerm;

function init() {
    this.searchTerm = localStorage.getItem("searchProduct");
    document.getElementById("title").innerHTML += this.searchTerm;
    console.log(this.searchTerm);
    request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:9000/v1/SearchItem?searchTerm=' +this.charityId, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function displayData() {
    console.log("display data");
    if (request.readyState === 4) {
		if (request.status === 200) {
			if (request.status === 200) {
				parser = new DOMParser();
                xmlDoc = parser.parseFromString(request.responseText, "text/xml");
                console.log(request.responseText);
                panel.innerHTML += "<br> " + xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
			}
        }
    }
}