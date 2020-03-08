var itemId, obj, title;


function init() {
    console.log('View Item page');
    this.itemId = localStorage.getItem("viewItemId");
    console.log(this.itemId);
    request = new XMLHttpRequest();
	request.open("POST", 'http://localhost:9000/v1/GetItem/'+'?input='+this.itemId, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            const parser = new DOMParser()
            console.log(request.responseText);
            var obj = request.responseXML; 
            console.log(obj);
            console.log("Title" + obj.getElementsByTagName("Title")[0].childNodes[0].nodeValue);
            console.log("CategoryName: " + obj.querySelector('Item PictureDetails PictureURL').textContent );
            console.log(obj.getElementsByTagName("CategoryName")[0].childNodes[0].nodeValue);
            xmlDoc = parser.parseFromString(request.responseText, "text/xml");
            panel.innerHTML += "<h3>" + obj.querySelector('Item Title').textContent+ "</h3>" 
                            + "<img src = \"" +  obj.querySelector('Item PictureDetails PictureURL').textContent +"height=\"300\" width=\"300\"" +  "\">" + "<br>"
                            +  obj.getElementsByTagName("CategoryName")[0].childNodes[0].nodeValue 
                            + "<br>" + "£" + obj.querySelector('Item StartPrice').textContent;

        } else {
            panel.innerHTML += "No results found";
        }
    }
}