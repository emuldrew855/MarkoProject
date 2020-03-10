var searchTerm, obj, user, itemId, userGroup;
const colors = ["red", "green", "blue"];
var itemSummaries = [];

function init() {
    this.searchTerm = localStorage.getItem("searchProduct");
    document.getElementById("title").innerHTML += this.searchTerm;
    console.log(this.searchTerm);
    request = new XMLHttpRequest();
    request.open("POST", 'http://localhost:9000/v1/SearchItem?searchTerm=' + this.searchTerm, true);
    request.setRequestHeader('Content-Type', 'application/xml');
    request.send(null);
    request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function viewItem(num) {
    itemId = obj.itemSummaries[num].itemId.substring(3, 15);
    console.log(itemId);
    var jsonString = localStorage.getItem("activeUser");
    this.user = JSON.parse(jsonString);
    byProductSearchRequest = new XMLHttpRequest();
    byProductSearchRequest.open("POST", 'http://localhost:9000/SearchType/AddSearchType?searchType=' + "byProduct", true);
    byProductSearchRequest.setRequestHeader('Content-Type', 'application/xml');
    byProductSearchRequest.send(null);
    console.log(this.user.userGroup);
    localStorage.setItem("viewItemId", itemId);
    if(this.user.userGroup == "A") {
        window.location.href = "http://localhost:8080/viewitem";
    }else {
        window.location.href ="http://localhost:8080/viewitemB";
    }
}

function displayData() {
    console.log("display data");
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            obj = JSON.parse(request.responseText);
            for (var i = 0; i < 10; i++) {
                itemSummaries = obj.itemSummaries[i];
                console.log(obj.itemSummaries[i].image.imageUrl);
                panel.innerHTML += " " + obj.itemSummaries[i].title + "<br>" +
                    "<img src =\""+obj.itemSummaries[i].image.imageUrl+"\" + \">" + "<br>" 
                    + "<button class=\"btn btn--primary\" onclick=\"viewItem(" + i + ")\"> View Item!</button>" + "<br>";
            }
        } else {
            panel.innerHTML += "No results found";
        }
    }
}