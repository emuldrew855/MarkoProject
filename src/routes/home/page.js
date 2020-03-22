var panel, request, clicked_id;
var charityCauses;

function init() {
	productSearch = document.getElementById("searchTerm");
	request = new XMLHttpRequest();
	request.open("POST", 'https://localhost:9443/Paypal/GetCharityCauses', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = getCharityCauses;
}
document.addEventListener("DOMContentLoaded", init, false);

function getCharityCauses() {
	if (request.readyState === 4) {
		if (request.status === 200) {
			var obj = JSON.parse(request.responseText);
			console.log('Get Charity Causes');
			// Hardcoded 
			for (var i = 1; i<= 18; i++) {
				console.log(obj[i]);
				btnGroup.innerHTML += " " +  "<button id=\""+obj[i] +"\" onClick=\"charityCauseClick(this.id)\" class=\"btn btn--primary\" >" + obj[i] + "</button>";
			  }
			console.log(request.responseText);
		}else {
			btnGroup.innerHTML += "No response from server currently";
		}
	}
}

function searchProduct() {
    console.log('search product: ' + productSearch.value);
    localStorage.setItem("searchProduct",productSearch.value);
    window.location.href = "http://localhost:8080/searchresults";
}

function charityCauseClick(clicked_id) {
    this.clicked_id = clicked_id;
    console.log(clicked_id);
    request = new XMLHttpRequest();
	request.open("POST", 'https://localhost:9443/Paypal/GetCharity?missionArea=' + clicked_id, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus;
}

function showStatus() {
	if (request.readyState === 4) {
			if (request.status === 200) {
				parser = new DOMParser();
                xmlDoc = parser.parseFromString(request.responseText, "text/xml");
                window.location.href = "http://localhost:8080/charitycause";
                localStorage.setItem("charityId",clicked_id);
				console.log(request.responseText);
			}
	}
}