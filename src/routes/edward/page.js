$(document).ready(() => {
	alert('Page Ready');
	
var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:9000/v1/hello', true)
request.onload = function() {
  // Begin accessing JSON data here
  //var data = XMLDocument.parse(this.response)
  console.log(this.response);

  
}

request.send()
});

var panel, request; 

function init() {
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	btn.onclick = doRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

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
			panel.innerHTML += "<br> Request Succeeded" ; 
		}
	}
}
