var userData = [];
var numOfA,numOfB = 0;
function init() {
	numOfA = 0;
	numOfB = 0;
    console.log("Admin Page")
	request = new XMLHttpRequest();
	request.open("GET", 'http://localhost:9000/v2/GetUserActions', true);
	request.setRequestHeader('Content-Type', 'application/xml');
	request.send(null);
	request.onreadystatechange = displayData;
}

function displayData() {
	var jsonString = request.response; 
	var obj = JSON.parse(jsonString);
	if (request.readyState === 4) {
        if (request.status === 200) {
			for (var i = 0; i < obj.length; i++) { 
				userData[i] = obj[i];
				for (let key of Object.keys(obj[i])) {
					if(key=="A")	{
						numOfA= numOfA + 1;
					}else{
						numOfB = numOfB + 1;
					}
				}
			}
	console.log(numOfA);
	console.log(numOfB);
	console.log(userData);

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Which user group viewed page on ebay?"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: [
            {y: numOfA, label: "User Group A"},
            {y: numOfB, label: "User Group B"},
        ]
	}]
});
chart.render();

}
}
}

document.addEventListener("DOMContentLoaded", init, false);