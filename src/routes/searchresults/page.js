var searchTerm;
const colors = ["red", "green", "blue"];
var itemSummaries = [];

function init() {
    this.searchTerm = localStorage.getItem("searchProduct");
    document.getElementById("title").innerHTML += this.searchTerm;
    console.log(this.searchTerm);
    request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:9000/v1/SearchItem?searchTerm=' + this.searchTerm, true);
    request.setRequestHeader('Content-Type', 'application/xml');
    request.send(null);
	request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function myFunction(num){
    console.log('My function! ' + num)
}

function displayData() {
    console.log("display data");
    if (request.readyState === 4) {
        if (request.status === 200) {
            if (request.status === 200) {
                console.log(request.responseText);
                var obj = JSON.parse(request.responseText);
                for (var i = 0; i < 10; i++) {
                    itemSummaries = obj.itemSummaries[i];
                    console.log(obj.itemSummaries[i].itemId);
                    panel.innerHTML += " " + obj.itemSummaries[i].title + "<br>" +
                        "<img src = \"" + obj.itemSummaries[i].image.imageUrl + "\">" + "<br>"
                        + "<button onclick=\"myFunction(i)\"> View Item!</button>" + "<br>";
                }
                panel.innerHTML += "Success"
            }
            else {
                panel.innerHTML += "No results found";
            }
        }
    }
}