var searchTerm, obj, itemId;
const colors = ["red", "green", "blue"];
var itemSummaries = [];

function init() {
    var limit = localStorage.getItem("limit");
    var offset = localStorage.getItem("offset");
    this.searchTerm = localStorage.getItem("searchProduct");
    document.getElementById("title").innerHTML += this.searchTerm;
    console.log("Search Term: " + this.searchTerm);
    searchProductRequest = new XMLHttpRequest();
    searchProductRequest.open("GET", 'https://localhost:9443/ebay/SearchItem?searchTerm=' + this.searchTerm 
    +"&limit=" + limit +"&offset=" + offset, true);
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
    itemId = obj.itemSummaries[num].itemId.substring(3, 15);
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
    localStorage.setItem("offset",num * 10);
    window.location.href = "http://localhost:8080/searchresults";  
}

function displayData() {
    console.log("display data");
    if (searchProductRequest.readyState === 4) {
        if (searchProductRequest.status === 200) {
            console.log(searchProductRequest.responseText);
            obj = JSON.parse(searchProductRequest.responseText);
            for (var i = 0; i < 10; i++) {
                itemSummaries = obj.itemSummaries[i];
                console.log(obj.itemSummaries[i].image.imageUrl);
                panel.innerHTML += " " + obj.itemSummaries[i].title + "<br>" 
                    + "<img src =\""+obj.itemSummaries[i].image.imageUrl+"\" + \">" + "<br>" 
                    + "<button class=\"btn btn--primary\" onclick=\"viewItem(" + i + ")\"> View Item!</button>" + "<br>" + "<hr>"
            }
           console.log(obj);
           pagination.innerHTML += "<nav class=\"pagination\" aria-labelledby=\"pagination-heading\" role=\"navigation\"> " + 
            + "<span aria-live=\"polite\" role=\"status\">"
            +"<h2 class=\"clipped\" id=\"pagination-heading\">Results Pagination - Page 1</h2> "
            +" </span> "
            + "<a aria-disabled=\"true\" aria-label=\"Previous Page\" class=\"pagination__previous\" href=\"http://www.ebay.com/sch/i.html?_nkw=guitars\"> "
            + "<svg class=\"icon icon--pagination-prev\" focusable=\"false\" height=\"24\" width=\"24\" aria-hidden=\"true\"> "
            + "<use xlink:href=\"#icon-pagination-prev\"></use>"
            + "</svg>"
            + "</a> "
            + "<ol class=\"pagination__items\"> "
            + "<li> "
            + "<a  onClick=\"updateSearchResults(1)\" aria-current=\"page\" class=\"pagination__item\">1</a>"
            + "</li>"
            + "<li>"
            + "<a onClick=\"updateSearchResults(2)\" class=\"pagination__item\">2</a>"
            + "</li>"
            + "<li>"
            + "<a onClick=\"updateSearchResults(3)\"  class=\"pagination__item\">3</a>"
            + "</li>"
            + "..."
            + "</ol>"
            + "<a  onClick=\"updateSearchResults()\" aria-label=\"Next Page\" class=\"pagination__next\" href=\"http://localhost:9000/v1/SearchItem?searchTerm=Drone&limitOffset=20\">"
            + "<svg class=\"icon icon--pagination-next\" focusable=\"false\" height=\"24\" width=\"24\" aria-hidden=\"true\"> ";
            + "<use xlink:href=\"#icon-pagination-next\"></use>"
            + "</svg>"
            + "</a>"
            + "</nav>"
        } else {
            panel.innerHTML += "No results found";
        }
    }
}