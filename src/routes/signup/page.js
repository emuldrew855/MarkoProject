var username, password; 

function init() {
    console.log('Sign Up Page');
    document.getElementById("userSignedUp").hidden = true;
    document.getElementById("fail").hidden = true;
    document.getElementById("error").hidden = true;
}
document.addEventListener("DOMContentLoaded", init, false);

function signUp() {
    console.log('Sign Up Method');
    username = document.getElementById("username");
    password = document.getElementById("password");
    request = new XMLHttpRequest();
	request.open("POST", '	https://localhost:9443/signup/RegisterUser?username=' + username.value + "&password=" + password.value, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = userCreated;
}

function userCreated() {
    if (request.readyState === 4) {
		if (request.status === 200) {
            var signUp = request.responseText;
            if(signUp == "UserSignedUp") {
                console.log('User Signed Up');
                document.getElementById("fail").hidden = true;
                document.getElementById("error").hidden = true;
                document.getElementById("userSignedUp").hidden = false;
                window.location.href = "http://localhost:8080/login";
            }else if(signUp == "UserExists"){
                console.log('User not signed up');
                document.getElementById("error").hidden = false;
            }
        }else {
            document.getElementById("fail").hidden = false;
        }
    }
}
