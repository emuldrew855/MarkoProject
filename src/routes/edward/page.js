$(document).ready(() => {
	alert('Page Ready');
});

var panel, request; 

function init() {
	document.getElementById("sub").onclick = submit; 
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	btn.onclick = doRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

function submit() {
	console.log("submit method");
	var form = document.getElementById("userDetails");
	var formData = JSON.stringify(Object.fromEntries(form));
	
	console.log(form);
	console.log(formData);
	form.action = "http://localhost:9000/v1"
	form.method = "POST";
	form.submit();
	console.log(form.responseText);
}

function doRequest() {
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/hello', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = showStatus; 
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
