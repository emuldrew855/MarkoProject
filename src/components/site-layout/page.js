var user;

function init() {
  console.log("Site layout");
  var jsonString = localStorage.getItem("activeUser");
  this.user = JSON.parse(jsonString);
  console.log(this.user);
  if(this.user == null) {
      console.log('No User Signed in');
      document.getElementById("userNotSignedIn").hidden = false;
      document.getElementById("userSignedIn").hidden = true;
       document.getElementById("adminUserSignIn").hidden = true;
  }else if (this.user.username != "admin"){
      console.log("User Signed In!");
      document.getElementById("userSignedIn").hidden = false;
      document.getElementById("userNotSignedIn").hidden = true;
      document.getElementById("adminUserSignIn").hidden = true;
  }else{ 
      console.log("Admin signed in");
      document.getElementById("adminUserSignIn").hidden = false;
      document.getElementById("userSignedIn").hidden = true;
      document.getElementById("userNotSignedIn").hidden = true;
  }
}

function signOut() {
    console.log("Sign Out!");
    var jsonString = localStorage.getItem("activeUser");
    var activeUser = JSON.parse(jsonString);
    console.log(activeUser);
    console.log(activeUser.username);
    logOutRequest = new XMLHttpRequest();
	logOutRequest.open("POST", 'https://localhost:9443/auth/SignOut?username=' + activeUser.username, true);
	logOutRequest.setRequestHeader('Content-Type', 'application/xml');
	logOutRequest.send(null);
	logOutRequest.onreadystatechange = signOutSubmission;
}

function signOutSubmission() {
    if (logOutRequest.readyState === 4) {
        if (logOutRequest.status === 200) {
            console.log("Sign out confirmed");
            localStorage.setItem("activeUser", null);
            window.location.href = "http://localhost:8080";
        }
    }
}

document.addEventListener("DOMContentLoaded", init, false);