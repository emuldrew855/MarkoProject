var itemId;

function init() {
    console.log('View Item page');
    this.itemId = localStorage.getItem("viewItemId");
    console.log(this.itemId);
    getItemRequest = new XMLHttpRequest();
	getItemRequest.open("POST", 'https://localhost:9443/ebay/GetItem/'+'?input='+this.itemId, true);
	getItemRequest.setRequestHeader('Content-Type', 'application/xml');
	getItemRequest.send(null);
	getItemRequest.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function ebayItem(){
    console.log("Ebay Item");
    var jsonString = localStorage.getItem("activeUser");
    this.user = JSON.parse(jsonString);
    console.log(this.user);
    var viewItemObj = JSON.parse(getItemRequest.responseText);
    console.log(viewItemObj.item.listingDetails.viewItemUrl);
    window.open(viewItemObj.item.listingDetails.viewItemUrl);
    userActionRequest = new XMLHttpRequest();
    userActionRequest.open("POST", "https://localhost:9443/UserActions/AddUserAction"+"?userGroup="+this.user.userGroup + "&viewOnEbay=true", true);
	userActionRequest.setRequestHeader('Content-Type', 'application/xml');
	userActionRequest.send(null);
}

function displayData() {
    if (getItemRequest.readyState === 4) {
        if (getItemRequest.status === 200) {
            console.log(getItemRequest.responseText);
            this.obj = JSON.parse(getItemRequest.responseText); 
            console.log(this.obj);
            panel.innerHTML += "<h2> Charity Info </h2> " 
                            + "<h3>" + this.obj.item.charity.charityName + "</h3>"
                            + "<img src = \"" +  this.obj.item.charity.logoURL +"height=\"300\" width=\"300\"" +  "\">" + "<br>"
                            + "Mission: " + this.obj.item.charity.mission  +  "<br>"
                            + "Donation Percent: "+  this.obj.item.charity.donationPercent + "%"
                            + "<hr>"
                            + "<h2> Product Info </h2>" 
                            + "<h3>" + this.obj.item.title+ "</h3>" 
                            + "<img src = \"" +  this.obj.item.pictureDetails.pictureURL +"height=\"300\" width=\"300\"" +  "\">" + "<br>"
                            + "Category: " + this.obj.item.primarycategory.categoryname + "<br>"
                            + "Condition: " + this.obj.item.conditionDescription + "<br>"
                            +  "Quantity Sold: " + this.obj.item.sellingStatus.quantitySold + "<br>"
                            + "Quantity: " + this.obj.item.quantity + "<br>"
                            + "£" + this.obj.item.startPrice;

        } else {
                panel.innerHTML += "No results found";
            }
        }
}