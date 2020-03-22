var username, password; 
function init() {
	console.log('Log In Page')
    document.getElementById("error").hidden = true;
    document.getElementById("success").hidden = true;
    document.getElementById("information").hidden = true;
}
document.addEventListener("DOMContentLoaded", init, false);

function logIn() {
    console.log('Log In Method');
    username = document.getElementById("username");
    password = document.getElementById("password");
    request = new XMLHttpRequest();
	request.open("GET", 'https://localhost:9443/auth/LogIn?username=' + username.value + '&password=' +password.value, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = permissionGranted;
}

var falseLogin = false;
function permissionGranted() {
    if (request.readyState === 4) {
		if (request.status === 200) {
            if(request.response != "Admin" || request.response != "NoAcess") {
                username = document.getElementById("username");
                console.log(username.value);
                console.log('Access granted');
                getUserRequest = new XMLHttpRequest(); 
                getUserRequest.open("POST", "https://localhost:9443/v2/GetUser?username="+username.value,true);
                getUserRequest.setRequestHeader('Content-Type', 'application/xml');
                getUserRequest.send(null);
                getUserRequest.onreadystatechange = getCode;
                document.getElementById("error").hidden = true;
                document.getElementById("success").hidden = false;
            }else if(request.response == "Admin") {
                console.log('Admin Access granted');
                window.location.href = "https://localhost:8080/admin";
                document.getElementById("error").hidden = true;
                document.getElementById("success").hidden = false;
            }else
            {
                console.log('Permission denied');
                this.falseLogin = true;
                document.getElementById("error").hidden = false;
                document.getElementById("success").hidden = true;
            }
        }else {
            document.getElementById("information").hidden = false;
        }
    }
}

function getCode() {
    console.log("Get code method");
    getCode = new XMLHttpRequest(); 
    getCode.open("GET", "https://localhost:9443/token/ebayToken",true);
    getCode.setRequestHeader('Content-Type', 'application/xml');
    getCode.send(null);
    getCode.onreadystatechange = getAccessToken;
}

function getAccessToken() {
    console.log("Get Acess token");
    if (getCode.readyState === 4) {
		if (getCode.status === 200) {
            var authUrl =getCode.responseText; 
            console.log('Auth URL: ' + authUrl);
            window.open(authUrl, "_blank"); 
            var requestText = getUserRequest.responseText; 
            var activeUser = JSON.parse(requestText);
            console.log(activeUser);
            localStorage.setItem("activeUser",JSON.stringify(activeUser));
            window.location.href = "http://localhost:8080/home";
        }
    }
   /*  accessToken = new XMLHttpRequest(); 
    accessToken.open("GET", "http://localhost:9000/token/accessToken",true);
    accessToken.setRequestHeader('Content-Type', 'application/xml');
    accessToken.send(null);
    accessToken.onreadystatechange = response; */
}

function setActiveUser() {
    console.log("Set active user");
    var requestText = getUserRequest.responseText; 
    var activeUser = JSON.parse(requestText);
    console.log(activeUser);
    localStorage.setItem("activeUser",JSON.stringify(activeUser));
    window.location.href = "http://localhost:8080/home";
}
