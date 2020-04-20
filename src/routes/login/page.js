var username, password; 
function init() {
	console.log('Log In Page')
    document.getElementById("error").hidden = true;
    document.getElementById("success").hidden = true;
    document.getElementById("information").hidden = true;
    document.getElementById("NoAccessToken").hidden = true;
}
document.addEventListener("DOMContentLoaded", init, false);

function logIn() {
    console.log('Log In Method');
    username = document.getElementById("username");
    password = document.getElementById("password");
    logInRequest = new XMLHttpRequest();
	logInRequest.open("GET", 'https://localhost:9443/auth/LogIn?username=' + username.value + '&password=' +password.value, true);
	logInRequest.setRequestHeader('Content-Type', 'application/xml');
	logInRequest.send(null);
	logInRequest.onreadystatechange = permissionGranted;
}

var falseLogin = false;
function permissionGranted() {
    if (logInRequest.readyState === 4) {
		if (logInRequest.status === 200) {
            console.log("Login Request Response: " + logInRequest.response);
            if(logInRequest.response != "Admin" && logInRequest.response != "NoAccess") {
                console.log('Access granted');
                username = document.getElementById("username");
                getUserRequest = new XMLHttpRequest(); 
                getUserRequest.open("POST", "https://localhost:9443/v2/GetUser?username="+username.value,true);
                getUserRequest.setRequestHeader('Content-Type', 'application/xml');
                getUserRequest.send(null);
                getUserRequest.onreadystatechange = getAuthUrl;
                document.getElementById("error").hidden = true;
            }else if(logInRequest.response == "Admin") {
                console.log('Admin Access granted');
                getAdminUserRequest = new XMLHttpRequest(); 
                getAdminUserRequest.open("GET", "https://localhost:9443/auth/GetUser?username=admin",true);
                getAdminUserRequest.setRequestHeader('Content-Type', 'application/xml');
                getAdminUserRequest.send(null);
                getAdminUserRequest.onreadystatechange = setAdminUser;
                document.getElementById("error").hidden = true;
                document.getElementById("success").hidden = false;
            }else
            {
                console.log('Permission denied');
                this.falseLogin = true;
                document.getElementById("error").hidden = false;
                document.getElementById("success").hidden = true; 
                document.getElementById("information").hidden = true;  
            }
        }else {
            document.getElementById("information").hidden = false;
            document.getElementById("error").hidden = true;
            document.getElementById("success").hidden = true;
        }
    }
}

// If user exists on the system - get authorization url
function getAuthUrl() {
    console.log("Get code method");
    if (getUserRequest.readyState === 4) {
		if (getUserRequest.status === 200) {
            var getUserRequestResponse = getUserRequest.responseText; 
            this.username = JSON.parse(getUserRequestResponse);
            console.log(this.username);
            getAuthUrlRequest = new XMLHttpRequest(); 
            getAuthUrlRequest.open("GET", "https://localhost:9443/token/ebayToken",true);
            getAuthUrlRequest.setRequestHeader('Content-Type', 'application/xml');
            getAuthUrlRequest.send(null);
            getAuthUrlRequest.onreadystatechange = getAccessToken;
        }
    }
}

// Redirect part-authorized user to ebay to get access token
function getAccessToken() {
    console.log("Get Access token");
    if (getAuthUrlRequest.readyState === 4) {
		if (getAuthUrlRequest.status === 200) {
            var authUrl = getAuthUrlRequest.responseText; 
            console.log('Auth URL: ' + authUrl);
            window.open(authUrl, "_self");
            var activeUserName = JSON.parse(getUserRequest.responseText); 
            getActiveUserRequest = new XMLHttpRequest(); 
            getActiveUserRequest.open("GET", "https://localhost:9443/auth/GetUser?username="+activeUserName.username,true);
            getActiveUserRequest.setRequestHeader('Content-Type', 'application/xml');
            getActiveUserRequest.send(null);
            getActiveUserRequest.onreadystatechange = setNormalUser;
        }
    }
}


function setAdminUser() {
    if (getAdminUserRequest.readyState === 4) {
		if (getAdminUserRequest.status === 200) {
            var adminUser = JSON.parse(getAdminUserRequest.responseText); 
            console.log(adminUser);
            if(adminUser.username == "admin") {
                console.log("Set Admin User");
                localStorage.setItem("activeUser",JSON.stringify(adminUser));
                window.location.href = "https://localhost:8080/admin";
            }else {
                console.log("Not Admin user");
            }
        }
    }
}

// Set user & decide if it
function setNormalUser() {
    if (getActiveUserRequest.readyState === 4) {
		if (getActiveUserRequest.status === 200) {
            console.log("Set active user");
            console.log(getActiveUserRequest.responseText);
            var activeUser = JSON.parse(getActiveUserRequest.responseText); 
            console.log(activeUser);
            localStorage.setItem("activeUser",JSON.stringify(activeUser));
            document.getElementById("success").hidden = false;
        }
    }
}
