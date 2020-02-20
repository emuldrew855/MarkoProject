var charityId, obj;

function init() {
    this.charityId = localStorage.getItem("charityId");
    console.log(this.charityId);
    document.getElementById("title").innerHTML = "Charity Cause: " + this.charityId;
    request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:9000/Paypal/GetCharity?missionArea=' + this.charityId, true);
    request.setRequestHeader('Content-Type', 'application/xml');
    request.send(null);
    request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function viewCharity(num) {
    console.log('View Charity');
    console.log(obj.results[num].nonprofit_id);
    localStorage.setItem("nonprofitid", obj.results[num].nonprofit_id);
    window.location.href = "http://localhost:8080/viewcharity";
}

function displayData() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            obj = JSON.parse(request.responseText);
            for (var i = 0; i < 10; i++) {
                panel.innerHTML += " <h3> " + obj.results[i].name + "</h3><br>" +
                    "<img src = \"" + obj.results[i].logo_url + "\" height=\"250\" width=\"250\">" + "<br>"
                    + "<button onclick=\"viewCharity(" + i + ")\"> View Charity</button>" + "<br>";
            }
        } else {
            panel.innerHTML += "No results found";
        }
    }

}
