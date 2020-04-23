# General Info
This is the frontend for a project made for the eBay For Charity program. It was written in MarkoJS and is used to communicated with the backend. 

## How to set up the Frontend
1) Download Node.js and set node as one of your environmental variables on your computer: https://nodejs.org/en/ . This site provides a good tutorial for this https://www.journaldev.com/7402/node-js-environment-setup-node-js-installation

2) Navigate to your project folder where you cloned the front-end and run ‘npm install’ to get the node modules required for the project. You will also be required to have git installed on your computer to retrieve all node modules.  

3) Navigate to your project folder where you cloned the front-end. Type the command “node server.js and you should see the following

4) Currently you will need to click Windows key and search run and enter ‘chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security’. This disables the CORS policy on chrome does not fully have the correct security policies in place.

5) Then navigate to https:\\localhost:8080 on the chrome tab which has opened. 

From this point you should be free to access the site, although it won't hit the API points in the backend unless you have set that up correctly. More information on that can be found here: https://github.com/emuldrew855/backend
