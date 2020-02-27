var username, password; 

function init() {
	console.log('Sign Up Page')
}
document.addEventListener("DOMContentLoaded", init, false);

function signUp() {
    console.log('Sign Up Method');
    username = document.getElementById("username");
    password = document.getElementById("password");
    request = new XMLHttpRequest();
	request.open("GET", '	http://localhost:9000/signup/RegisterUser?username=' + username.value + "&password=" + password.value, true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = userCreated;
}

function userCreated() {
    if (request.readyState === 4) {
		if (request.status === 200) {
            console.log(request.response);
            if(request.response == "User Signed Up") {
                console.log('User Signed Up');
                userCreate.innerHTML += "User Signed Up"; 
            }else{
                console.log('User not signed up');
                userCreate.innerHTML += "Use not signed up"; 
            }
        }
    }
}
