var searchTerm, obj;
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

function viewItem(num) {
    var itemId = obj.itemSummaries[num].itemId.substring(3,15);
    console.log('Buying options: ' + obj.itemSummaries[num].epid);
    console.log(obj.itemSummaries[num].itemId);
    console.log(itemId);
    localStorage.setItem("viewItemId",itemId);
    window.location.href = "http://localhost:8080/viewitem";
}

function displayData() {
    console.log("display data");
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            obj = JSON.parse(request.responseText);
            for (var i = 0; i < 10; i++) {
                itemSummaries = obj.itemSummaries[i];
                panel.innerHTML += " " + obj.itemSummaries[i].title + "<br>" +
                    "<img src = \"" + obj.itemSummaries[i].image.imageUrl  + " height=\"250\" width=\"250\">" + "<br>"
                    + "<button onclick=\"viewItem("+i+")\"> View Item!</button>" + "<br>";
            }
        } else {
            panel.innerHTML += "No results found";
        }
    }
}