var userData = [];
var numOfA,numOfB, numOfCharity, numOfProduct = 0;
function init() {
	numOfA = 0;
	numOfB = 0;
	numOfCharity = 0;
	numOfProduct = 0;
    console.log("Admin Page");

	searchTypeRequest = new XMLHttpRequest();
	searchTypeRequest.open("GET", 'http://localhost:9000/SearchType/GetSearchTypes', true);
	searchTypeRequest.setRequestHeader('Content-Type', 'application/xml');
	searchTypeRequest.send(null);
	searchTypeRequest.onreadystatechange = searchType;

	userActionRequest = new XMLHttpRequest();
	userActionRequest.open("GET", 'http://localhost:9000/UserActions/GetUserActions', true);
	userActionRequest.setRequestHeader('Content-Type', 'application/xml');
	userActionRequest.send(null);
	userActionRequest.onreadystatechange = displayData;
}

function searchType() {
	var jsonString = searchTypeRequest.response; 
	var obj = JSON.parse(jsonString);
	console.log(obj);
	if (searchTypeRequest.readyState === 4) {
        if (searchTypeRequest.status === 200) {
				for (var i = 0; i < obj.length; i++) { 
					for (let value of Object.values(obj[i])) {
						if(value=="byProduct")	{
							numOfProduct = numOfProduct + 1;
						}else{
							numOfCharity = numOfCharity + 1;
						}
					}
				}			
		console.log('Num of Charity: ' + numOfCharity);
		console.log('Num of Product: ' + numOfProduct);
		
		var searchTypeChart = new CanvasJS.Chart("searchChartContainer", {
	animationEnabled: true,
	title: {
		text: "Which user search path was most popular?"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: [
            {y: numOfCharity, label: "By Charity"},
            {y: numOfProduct, label: "By Product"},
        ]
	}]
});
searchTypeChart.render();
		}
	}
}

function displayData() {
	var jsonString = userActionRequest.response; 
	var obj = JSON.parse(jsonString);
	if (userActionRequest.readyState === 4) {
        if (userActionRequest.status === 200) {
			for (var i = 0; i < obj.length; i++) { 
					if(obj[i].userGroup=="A")	{
						numOfA= numOfA + 1;
					}else{
						numOfB = numOfB + 1;
					}
			}
	console.log(numOfA);
	console.log(numOfB);

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