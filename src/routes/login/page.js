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
            if(logInRequest.response != "Admin" && logInRequest.response != "NoAcess") {
                console.log('Access granted');
                username = document.getElementById("username");
                getUserRequest = new XMLHttpRequest(); 
                getUserRequest.open("POST", "https://localhost:9443/v2/GetUser?username="+username.value,true);
                getUserRequest.setRequestHeader('Content-Type', 'application/xml');
                getUserRequest.send(null);
                getUserRequest.onreadystatechange = getCode;
                document.getElementById("error").hidden = true;
                document.getElementById("success").hidden = false;
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
            }
        }else {
            document.getElementById("information").hidden = false;
        }
    }
}

function getCode() {
    console.log("Get code method");
            getCodeRequest = new XMLHttpRequest(); 
            getCodeRequest.open("GET", "https://localhost:9443/token/ebayToken",true);
            getCodeRequest.setRequestHeader('Content-Type', 'application/xml');
            getCodeRequest.send(null);
            getCodeRequest.onreadystatechange = getAccessToken;
}

function getAccessToken() {
    console.log("Get Acess token");
    if (getCodeRequest.readyState === 4) {
		if (getCodeRequest.status === 200) {
            var authUrl =getCodeRequest.responseText; 
            console.log('Auth URL: ' + authUrl);
            window.open(authUrl, "_blank");
            var activeUserName = JSON.parse(getUserRequest.responseText); 
            console.log(activeUserName.username);
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
                window.location.href = "http://localhost:8080/admin";
            }else {
                console.log("Not Admin user");
            }
        }
    }
}

function setNormalUser() {
    if (getActiveUserRequest.readyState === 4) {
		if (getActiveUserRequest.status === 200) {
            console.log("Set active user");
            var activeUser = JSON.parse(getActiveUserRequest.responseText); 
            console.log(activeUser);
            localStorage.setItem("activeUser",JSON.stringify(activeUser));
            window.location.href = "http://localhost:8080/home";
        }
    }
}
