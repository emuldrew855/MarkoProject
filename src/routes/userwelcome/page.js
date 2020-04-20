function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log('User Welcome Page')
    const code = urlParams.get('code')
    const expires_in = urlParams.get('expires_in')
    console.log("Code: " + encodeURIComponent(code));
    setAccessTokenRequest = new XMLHttpRequest();
    setAccessTokenRequest.open("GET", 'https://localhost:9443/token/accessToken?code=' + encodeURIComponent(code), true);
    setAccessTokenRequest.setRequestHeader('ContentType', 'application/xml');
    setAccessTokenRequest.send(null);
    setAccessTokenRequest.onreadystatechange = setAccessToken; 
    document.getElementById("success").hidden = true;
    document.getElementById("NoAccessToken").hidden = true;
}
document.addEventListener("DOMContentLoaded", init, false);

function checkAccessToken() {
    if (verifyUserWithAccessTokenRequest.readyState === 4) {
		if (verifyUserWithAccessTokenRequest.status === 200) {
            var verifyUserAcessTokenResponse = verifyUserWithAccessTokenRequest.responseText;
            if(verifyUserAcessTokenResponse =="ValidAccessToken") {
                var jsonString = localStorage.getItem("activeUser");
                var user = JSON.parse(jsonString);
                document.getElementById("title").innerHTML +=" " + user.username;
                console.log("Valid Access Token");
                document.getElementById("success").hidden = false;
            }else {
                console.log("No Access Token");
                document.getElementById("NoAccessToken").hidden = false;
            }
        }
    }
}

function setAccessToken() { 
    console.log("Access Token");
    if (setAccessTokenRequest.readyState === 4) {
		if (setAccessTokenRequest.status === 200) {
            console.log(setAccessTokenRequest.responseText);
            verifyUserWithAccessTokenRequest = new XMLHttpRequest(); 
            verifyUserWithAccessTokenRequest.open("GET", "https://localhost:9443/auth/CheckAccessToken",true);
            verifyUserWithAccessTokenRequest.setRequestHeader('Content-Type', 'application/xml');
            verifyUserWithAccessTokenRequest.send(null);
            verifyUserWithAccessTokenRequest.onreadystatechange = checkAccessToken;
        }
    }
}
