var itemId, obj, title, viewItemUrl;


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

function ebayItem(){
    console.log("Ebay Item");
    var jsonString = localStorage.getItem("activeUser");
    this.user = JSON.parse(jsonString);
    console.log(this.user);
    var viewItemObj = JSON.parse(request.responseText);
    console.log(viewItemObj.item.listingDetails.viewItemUrl);
    window.open(viewItemObj.item.listingDetails.viewItemUrl);
    request.open("POST", 'http://localhost:9000/UserActions/AddUserAction/'+'?userGroup='+this.user.userGroup + "&?viewOnEbay="+true, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
}

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            const parser = new DOMParser()
            console.log(request.responseText);
            this.obj = JSON.parse(request.responseText); 
            console.log(this.obj);
            panel.innerHTML += "<h3>" + this.obj.item.title+ "</h3>" 
                            + "<img src = \"" +  this.obj.item.pictureDetails.pictureURL +"height=\"300\" width=\"300\"" +  "\">" + "<br>"
                            + this.obj.item.primarycategory.categoryname
                            + "<br>" + "£" + this.obj.item.startPrice;

        } else {
            panel.innerHTML += "No results found";
        }
    }
}