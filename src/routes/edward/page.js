
$(document).ready(() => {
	alert('Page Ready');
});

var panel, request; 

const axios = require('axios');

function init() {
	document.getElementById("sub").onclick = submit; 
	panel = document.getElementById("panel");
	var btn = document.getElementById("btn");
	var btnPost = document.getElementById("btnPost");
	btnPost.onclick = postRequest;
	btn.onclick = doRequest;
}
document.addEventListener("DOMContentLoaded", init, false);

async function postRequest() {
	//axios.post("http://localhost:9000/v1");
	console.log("submit method");
	params = {
			"firstName": "Edward",
			"lastName": "Muldrew"   
      }
	let res = await axios.post('http://localhost:9000/v1', params);

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(`Date: ${res.headers.date}`);
    console.log(`Data: ${res.data}`);
//	var formData = JSON.stringify(Object.fromEntries(form));
//	console.log(form);
//	console.log(formData);
//	form.action = "http://localhost:9000/v1"
//	form.method = "POST";
//	form.submit();
//	console.log(form.responseText);
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
