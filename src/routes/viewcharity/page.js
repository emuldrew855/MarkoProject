var nonProfitId, charityItemsObj, charityDataObj, user;

function init() {
    console.log('View Charity');
    this.nonProfitId = localStorage.getItem("nonprofitid");
    console.log(this.nonProfitId);
    charityRequest = new XMLHttpRequest();
    charityRequest.open("POST", 'http://localhost:9000/v1/FindSingleNonProfit?charityItemId=' + this.nonProfitId, true);
    charityRequest.setRequestHeader('Content-Type', 'application/xml');
    charityRequest.send(null);
    charityRequest.onreadystatechange = displayCharityData;

    charityItemsRequest = new XMLHttpRequest();
    charityItemsRequest.open("POST", 'http://localhost:9000/v1/AdvancedFindCharityItems?charityId=' + this.nonProfitId, true);
    charityItemsRequest.setRequestHeader('Content-Type', 'application/xml');
    charityItemsRequest.send(null);
    charityItemsRequest.onreadystatechange = displayCharityItemData;

    user = localStorage.getItem("activeUser", user);
    console.log(user);
}
document.addEventListener("DOMContentLoaded", init, false);

function displayCharityData() {
    console.log("Charity Data");
    if (charityRequest.readyState === 4) {
        if (charityRequest.status === 200) {
            console.log(charityRequest.responseText);
            charityDataObj = JSON.parse(charityRequest.responseText);
            charityPanel.innerHTML += charityDataObj.nonProfit.name + "<br>" +
                "<img src = \"" + charityDataObj.nonProfit.logoURL + " height=\"250\" width=\"250\">" + "<hr>"
        } else {
            charityPanel.innerHTML += "No Charity results found";
        }
    }
}

function viewItem(num) {
    charitySearchRequest = new XMLHttpRequest();
    charitySearchRequest.open("POST", 'http://localhost:9000/SearchType/AddSearchType?searchType=' + "byCharity", true);
    charitySearchRequest.setRequestHeader('Content-Type', 'application/xml');
    charitySearchRequest.send(null);
    console.log("View Item: " + num);
    console.log('Item Id: ' + charityItemsObj.items.items.item[num].itemId);
    localStorage.setItem("viewItemId", charityItemsObj.items.items.item[num].itemId);
    var jsonString = localStorage.getItem("activeUser");
    this.user = JSON.parse(jsonString);
    console.log(this.user.userGroup);
    if(this.user.userGroup == "A") {
        window.location.href = "http://localhost:8080/viewitem";
    }else {
        window.location.href ="http://localhost:8080/viewitemB";
    }
}

function displayCharityItemData() {
    console.log("Charity Product Data");
    if (charityItemsRequest.readyState === 4) {
        if (charityItemsRequest.status === 200) {
            console.log(charityItemsRequest.responseText);
            charityItemsObj = JSON.parse(charityItemsRequest.responseText);
            for (var i = 0; i < 10; i++) {
                charityItemsPanel.innerHTML += "<h4>" + charityItemsObj.items.items.item[i].title + " </h4> "
                    + "<img src =\"" + charityItemsObj.items.items.item[i].itemImageInfo[0].primaryImageURL + "\"" + ">" + "<br>"
                    + "<button onclick=\"viewItem(" + i + ")\"> View Item!</button>" + "<br>";
                if (typeof charityItemsObj.items.items.item[i].itemImageInfo[0] != undefined) {
                    console.log("image exists");
                }
            }
        } else {
            charityItemsPanel.innerHTML += "No Charity products results found";
        }
    }
}