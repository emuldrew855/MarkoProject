var charityId, obj;

function init() {
    this.charityType = localStorage.getItem("charityType");
    console.log(this.charityType);
    document.getElementById("title").innerHTML = "Charity Cause: " + this.charityType;
    request = new XMLHttpRequest();
    request.open("GET", 'https://localhost:9443/Charity/GetCharityType?charityType=' + this.charityType, true);
    request.setRequestHeader('Content-Type', 'application/xml');
    request.send(null);
    request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function selectCharity(num) {
    console.log('Select Charity');
    localStorage.setItem("nonprofitid", obj[num].nonprofit_id);
    window.location.href = "http://localhost:8080/viewcharity";
}

function updateSearchResults(num) {
    console.log("Update Search Results: " + num);
    localStorage.setItem("searchIndex",num * 10);
    var searchIndex = localStorage.getItem("searchIndex");
    localStorage.setItem("searchIndexMax", (parseFloat(searchIndex) + parseFloat(10)));
    window.location.href = "http://localhost:8080/charitycause";  
}

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            obj = JSON.parse(request.responseText);
            var searchIndex = localStorage.getItem("searchIndex");
            var searchIndexMax = localStorage.getItem("searchIndexMax");
            console.log("searchIndex : " + searchIndex + " searchIndexMax: " + searchIndexMax);
            for (var i = searchIndex; i < searchIndexMax; i++) {
                var description = "";
                if(obj[i].description == null) {
                    description = "No description Available"
                 } else{
                   description = obj[i].description;
                 }
                panel.innerHTML +=  "<h2>" + obj[i].name + "</h2> <br>" +
                    "<img src = \"" + obj[i].logo_url + "\" height=\"250\" width=\"250\">" + "<br>"
                    + description + "<br>"
                    + "<button class=\"btn btn--primary\" onclick=\"selectCharity(" + i + ")\"> View Charity</button>" + "<br><hr>" ;
            }
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
