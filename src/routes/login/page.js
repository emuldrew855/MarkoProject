var username, password; 

function init() {
	console.log('Log In Page')
}
document.addEventListener("DOMContentLoaded", init, false);

function logIn() {
    console.log('Log In Method');
    username = document.getElementById("username");
    password = document.getElementById("password");
    request = new XMLHttpRequest();
	request.open("GET", '	http://localhost:9000/auth/LogIn?username=' + username.value + '&password=' +password.value, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = permissionGranted;
}


function permissionGranted() {
    if (request.readyState === 4) {
		if (request.status === 200) {
            if(request.response == "GrantAccess") {
                console.log('Access granted');
                panel.innerHTML += "Access Granted"; 
                window.location.href = "http://localhost:8080/home";
            }else if(request.response == "Admin") {
                console.log('Admin Access granted');
                panel.innerHTML += "Adnmin Access Granted"; 
                window.location.href = "http://localhost:8080/admin";
            }else
            {
                console.log('Permission denied');
                panel.innerHTML += "Permission denied"; 
            }
        }
    }
}
