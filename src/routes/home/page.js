var panel, request, clicked_id;
var charityCauses;

function init() {
	productSearch = document.getElementById("searchTerm");
	listCharityCausesRequest = new XMLHttpRequest();
	listCharityCausesRequest.open("POST", 'https://localhost:9443/Paypal/GetCharityCauses', true);
	listCharityCausesRequest.setRequestHeader('ContentType', 'application/xml');
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
			test.innerHTML += " <ul class=\"gallery\">";
			for (var i = 1; i<= 18; i++) {
				console.log(obj[i]);
				//btnGroup.innerHTML += " " +  "<button id=\""+obj[i] +"\" onClick=\"charityCauseClick(this.id)\" class=\"btn btnprimary\" >" + obj[i] + "</button>";
				test.innerHTML += "<li>"
				+ "<a onClick=charityCauseClick(" + i+ ")><span>"
				+  "<img src = \"" + obj[i].image + "\" height=\"200\" width=\"200\">" + "<br>"
				+ "</span></a>"
				+ "<h2><a onClick=charityCauseClick("+ i +")> "+obj[i].name+" </a></h2>" 
			    + "</li>"
			}
			test.innerHTML += "</ul>";
			console.log(listCharityCausesRequest.responseText);
		}else {
			btnGroup.innerHTML += "No response from server currently";
		}
	}
}

function searchProduct() {
    console.log('search product: ' + productSearch.value);
	localStorage.setItem("searchProduct",productSearch.value);
	localStorage.setItem("searchResultsIndex",0);
	localStorage.setItem("searchResultsIndexMax", 10);
    window.location.href = "https://localhost:8080/searchresults";
}

function charityCauseClick(clicked_id) {
    var obj = JSON.parse(listCharityCausesRequest.responseText);
    var name = obj[clicked_id].name;
    console.log(clicked_id);
    console.log(name.value);
    localStorage.setItem("charityType",obj[clicked_id].name);
    selectedCharityCauseRequest = new XMLHttpRequest();
	selectedCharityCauseRequest.open("GET", 'https://localhost:9443/Charity/GetCharityType?charityType=' + name, true);
	selectedCharityCauseRequest.setRequestHeader('ContentType', 'application/xml');
	selectedCharityCauseRequest.send(null);
	selectedCharityCauseRequest.onreadystatechange = showStatus;
}

function showStatus() {
	if (selectedCharityCauseRequest.readyState === 4) {
			if (selectedCharityCauseRequest.status === 200) {
				localStorage.setItem("searchIndex",0);
   				localStorage.setItem("searchIndexMax", 10);
				parser = new DOMParser();
                xmlDoc = parser.parseFromString(selectedCharityCauseRequest.responseText, "text/xml");
                window.location.href = "https://localhost:8080/charitycause";
			}
	}
}
