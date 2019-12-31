var panel, request, clicked_id;

function init() {

}
document.addEventListener("DOMContentLoaded", init, false);

function charityCauseClick(clicked_id) {
    this.clicked_id = clicked_id;
    console.log(clicked_id);
    request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/Paypal/GetCharity?missionArea=' + clicked_id, true);
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
                window.location.href = "http://localhost:8080/charitycause";
                localStorage.setItem("charityId",clicked_id);
                console.log(localStorage.getItem("charityId"))
                window.alert(localStorage.getItem("charityId"));
				console.log(request.responseText);
			}
		}
	}
}