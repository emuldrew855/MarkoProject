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
         if(username.value == "userA") {
               localStorage.setItem("activeUser",JSON.stringify(userA));
            }else if(username.value == "userB"){
               localStorage.setItem("activeUser",JSON.stringify(userB));
            }
    request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/auth/LogIn?username=' + username.value + '&password=' +password.value, true);
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
                getUserRequest.open("POST", "http://localhost:9000/v2/GetUser?username="+username.value,true);
                getUserRequest.setRequestHeader('Content-Type', 'application/xml');
                getUserRequest.send(null);
                getUserRequest.onreadystatechange = setActiveUser;
                document.getElementById("error").hidden = true;
                document.getElementById("success").hidden = false;
            }else if(request.response == "Admin") {
                console.log('Admin Access granted');
                localStorage.setItem("activeUser",JSON.stringify(admin));
                window.location.href = "http://localhost:8080/admin";
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

function setActiveUser() {
    console.log("Set active user");
    var requestText = getUserRequest.responseText; 
    var activeUser = JSON.parse(requestText);
    console.log(activeUser);
    localStorage.setItem("activeUser",JSON.stringify(activeUser));
    window.location.href = "http://localhost:8080/home";
}
