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
        } else {
            panel.innerHTML += "No results found";
        }
    }

}
