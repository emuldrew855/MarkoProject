function init() {
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	btn.onclick = getItemRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

function getItemRequest() {
    console.log('Get Item Request')
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/FindNonProfit', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	console.log(request.responseText);
}


function showStatus() 
{
	if(request.readyState === 4)
	{
		if(request.status === 200) {
			panel.innerHTML += "<br> " + request.responseText ; 
		}
	}
}