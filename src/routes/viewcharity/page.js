var nonProfitId;

function init() {
    console.log('View Charity');
    this.nonProfitId = localStorage.getItem("nonprofitid");
    console.log(this.nonProfitId);
    request = new XMLHttpRequest();
    request.open("GET", 'http://localhost:9000/v1/FindNonProfit?nonProfitInput=' + this.nonProfitId, true);
    request.setRequestHeader('Content-Type', 'application/xml');
    request.send(null);
    request.onreadystatechange = displayData;
}
document.addEventListener("DOMContentLoaded", init, false);

function displayData() {
    console.log(request.responseText);
}