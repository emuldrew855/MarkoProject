var searchTerm, obj, itemId;
const colors = ["red", "green", "blue"];
var itemSummaries = [];

function init() {
    this.searchTerm = localStorage.getItem("searchProduct");
    document.getElementById("information").hidden = false;  
    document.getElementById("title").innerHTML += this.searchTerm;
    console.log("Search Term: " + this.searchTerm);
    searchProductRequest = new XMLHttpRequest();
    searchProductRequest.open("GET", 'https://localhost:9443/ebay/SearchItem?searchTerm=' + this.searchTerm , true);
    searchProductRequest.setRequestHeader('Content-Type', 'application/xml');
    searchProductRequest.send(null);
    searchProductRequest.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function viewItem(num) {
    byProductSearchRequest = new XMLHttpRequest();
    byProductSearchRequest.open("POST", 'https://localhost:9443/SearchType/AddSearchType?searchType=' + "byProduct", true);
    byProductSearchRequest.setRequestHeader('Content-Type', 'application/xml');
    byProductSearchRequest.send(null);
    var jsonString = localStorage.getItem("activeUser");
    this.user = JSON.parse(jsonString);
    console.log(this.user.userGroup);
    itemId = obj.items.items.item[num].itemId;
    console.log(itemId);
    localStorage.setItem("viewItemId", itemId);
    if(this.user.userGroup == "A") {
        window.location.href = "http://localhost:8080/viewitem";
    }else {
        window.location.href ="http://localhost:8080/viewitemB";
    }
}

function updateSearchResults(num) {
    console.log("Update Search Results: " + num);
    localStorage.setItem("searchResultsIndex",num * 10);
    var searchIndex = localStorage.getItem("searchResultsIndex");
    localStorage.setItem("searchResultsIndexMax", (parseFloat(searchIndex) + parseFloat(10)));
    window.location.href = "http://localhost:8080/searchresults";  
}

function displayData() {
    console.log("display data");
    if (searchProductRequest.readyState === 4) {
        if (searchProductRequest.status === 200) {
            document.getElementById("information").hidden = false;  
            obj = JSON.parse(searchProductRequest.responseText);
            console.log(obj);
            var searchIndex = localStorage.getItem("searchResultsIndex");
            var searchIndexMax = localStorage.getItem("searchResultsIndexMax");
            console.log("Search Index: " + searchIndex + " Search Results Index Max: " + searchIndexMax);
            for (var i = searchIndex; i < searchIndexMax; i++) {
                panel.innerHTML += " " + obj.items.items.item[i].title  + "<br>" 
                    + "<img src =\""+obj.items.items.item[i].itemImageInfo[0].primaryImageURL+ "\" + \">" + "<br>" 
                    + "Price: £" + obj.items.items.item[i].sellingStatus.currentPrice.value + "<br>"
                    + "<button class=\"btn btn--primary\" onclick=\"viewItem(" + i + ")\"> View Item!</button>" + "<br>" + "<hr>"
            }
           console.log(obj);
        } else {
            document.getElementById("information").hidden = true;  
        }
    }
}