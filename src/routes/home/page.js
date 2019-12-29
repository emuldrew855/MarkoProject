var panel, request;

function init() {
	var animalBtn = document.getElementById("animals");
    animalBtn.onclick = searchAnimalCharity;
    console.log('Animal Page reached');
}
document.addEventListener("DOMContentLoaded", init, false);

function searchAnimalCharity() {
    console.log("Animal button hit!");
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/Paypal/GetCharity?missionArea=animals', true);
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
				console.log(request.responseText);
			}
		}
	}
}