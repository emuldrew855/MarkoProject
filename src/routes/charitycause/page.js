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

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            obj = JSON.parse(request.responseText);
            for (var i = 0; i < 10; i++) {
                panel.innerHTML +=  obj[i].name + "<br>" +
                    "<img src = \"" + obj[i].logo_url + "\" height=\"250\" width=\"250\">" + "<br>"
                    + "<button class=\"btn btn--primary\" onclick=\"selectCharity(" + i + ")\"> View Charity</button>" + "<br><hr>" ;
            }
        } else {
            panel.innerHTML += "No results found";
        }
    }

}
