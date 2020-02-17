var itemId, obj, title;


function init() {
    console.log('View Item page');
    this.itemId = localStorage.getItem("viewItemId");
    console.log(this.itemId);
    request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v1/GetItem/'+'?input='+this.itemId, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            const parser = new DOMParser()
            var obj = request.responseXML; 
            console.log(obj);
            console.log("Title" + obj.getElementsByTagName("Title")[0].childNodes[0].nodeValue);
            xmlDoc = parser.parseFromString(request.responseText, "text/xml");
            panel.innerHTML += "<br> " + xmlDoc.querySelector('Item Title').textContent+ "<br> "
        } else {
            panel.innerHTML += "No results found";
        }
    }
}