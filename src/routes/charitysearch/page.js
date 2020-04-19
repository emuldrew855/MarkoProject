function init() {
    console.log("Charity Search");
    var charitySearch = localStorage.getItem("charitySearch");
    request = new XMLHttpRequest();
    request.open("GET", 'https://localhost:9443/Paypal/SearchCharity?searchCharity=' + charitySearch, true);
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
            console.log(obj)
            for(var i = 0; i < obj.length; i++) {
                panel.innerHTML +=  "<h2>" + obj[i].name + "</h2> <br>" +
                "<img src = \"" + obj[i].logo_url + "\" height=\"250\" width=\"250\">" + "<br>"
                + obj[i].description + "<br>"
                + "<button class=\"btn btn--primary\" onclick=\"selectCharity(" + i + ")\"> View Charity</button>" + "<br><hr>" ;
            }
        }
    }
}