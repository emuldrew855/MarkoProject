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
            var user = JSON.parse(request.responseText);
            if(user.userGroup == "A" || user.userGroup == "B") {
                console.log('User Signed Up');
                window.alert("User: " + user.username + " signed up!")
                localStorage.setItem("activeUser",user);
                window.location.href = "http://localhost:8080/login";
            }else{
                console.log('User not signed up');
                userCreate.innerHTML += "Use not signed up"; 
            }
        }
    }
}
