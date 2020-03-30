var panel, request, clicked_id;
var charityCauses;

function init() {
	productSearch = document.getElementById("searchTerm");
	listCharityCausesRequest = new XMLHttpRequest();
	listCharityCausesRequest.open("POST", 'https://localhost:9443/Paypal/GetCharityCauses', true);
	listCharityCausesRequest.setRequestHeader('Content-Type', 'application/xml');
	listCharityCausesRequest.send(null);
	listCharityCausesRequest.onreadystatechange = getCharityCauses;
}
document.addEventListener("DOMContentLoaded", init, false);

function getCharityCauses() {
	if (listCharityCausesRequest.readyState === 4) {
		if (listCharityCausesRequest.status === 200) {
			var obj = JSON.parse(listCharityCausesRequest.responseText);
			console.log('Get Charity Causes');
			// Hardcoded for the 18 causes expected
			for (var i = 1; i<= 18; i++) {
				console.log(obj[i]);
				btnGroup.innerHTML += " " +  "<button id=\""+obj[i] +"\" onClick=\"charityCauseClick(this.id)\" class=\"btn btn--primary\" >" + obj[i] + "</button>";
			  }
			console.log(listCharityCausesRequest.responseText);
		}else {
			btnGroup.innerHTML += "No response from server currently";
		}
	}
}

function searchProduct() {
    console.log('search product: ' + productSearch.value);
	localStorage.setItem("searchProduct",productSearch.value);
	localStorage.setItem("searchResultsPage", 10);
    window.location.href = "http://localhost:8080/searchresults";
}

function charityCauseClick(clicked_id) {
    this.clicked_id = clicked_id;
    console.log(clicked_id);
    selectedCharityCauseRequest = new XMLHttpRequest();
	selectedCharityCauseRequest.open("GET", 'https://localhost:9443/Charity/GetCharityType?charityType=' + clicked_id, true);
	selectedCharityCauseRequest.setRequestHeader('Content-Type', 'application/xml');
	selectedCharityCauseRequest.send(null);
	selectedCharityCauseRequest.onreadystatechange = showStatus;
}

function showStatus() {
	if (selectedCharityCauseRequest.readyState === 4) {
			if (selectedCharityCauseRequest.status === 200) {
				parser = new DOMParser();
                xmlDoc = parser.parseFromString(selectedCharityCauseRequest.responseText, "text/xml");
                window.location.href = "http://localhost:8080/charitycause";
                localStorage.setItem("charityType",clicked_id);
				console.log(selectedCharityCauseRequest.responseText);
			}
	}
}