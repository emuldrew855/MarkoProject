var userData = [];
var numOfA,numOfB, numOfCharity, numOfProduct = 0;
var searchTypeObj, userActionsObj;
function init() {
	numOfA = 0;
	numOfB = 0;
	numOfCharity = 0;
	numOfProduct = 0;
	console.log("Admin Page");

	searchTypeRequest = new XMLHttpRequest();
	searchTypeRequest.open("GET", 'https://localhost:9443/SearchType/GetSearchTypes', true);
	searchTypeRequest.setRequestHeader('Content-Type', 'application/xml');
	searchTypeRequest.send(null);
	searchTypeRequest.onreadystatechange = searchType;

	userActionRequest = new XMLHttpRequest();
	userActionRequest.open("GET", 'https://localhost:9443/UserActions/GetUserActions', true);
	userActionRequest.setRequestHeader('Content-Type', 'application/xml');
	userActionRequest.send(null);
	userActionRequest.onreadystatechange = displayData;
}

function downloadData() {
	console.log("Download Data");
	var searchObj = localStorage.getItem("searchTypeObj");
	var userActionObj = localStorage.getItem("userActionsObj");
	var searchCSV = ConvertToCSV(searchObj, null);
	var headers = ["User Group", "Viewed Item?"]
	var userActionCSV = ConvertToCSV(userActionObj, headers);

	  // Convert JSON to CSV & Display CSV
	  $('#csv').text(ConvertToCSV(searchObj));

	  var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", searchCSV]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "UserSearch.csv";  //Name the file here
        document.body.appendChild(downloadLink);
        downloadLink.click();
		document.body.removeChild(downloadLink);
		
		var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", userActionCSV]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "UserAction.csv";  //Name the file here
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
}

function ConvertToCSV(objArray, headers) {
	var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	var str = '';
	if(headers == null) {
		str = '';
	}else {
		for(var j = 0; j < headers.length; j++) {
			console.log(headers[j]);
			str+= headers[j] + ",";
		}
	}
	str += '\r\n';

	for (var i = 0; i < array.length; i++) {
		var line = '';
		for (var index in array[i]) {
			if (line != '') line += ','

			line += array[i][index];
		}

		str += line + '\r\n';
	}
	return str;
}


function searchType() {
	var jsonString = searchTypeRequest.response; 
	this.searchTypeObj = JSON.parse(jsonString);
	localStorage.setItem("searchTypeObj", JSON.stringify(this.searchTypeObj))
	if (searchTypeRequest.readyState === 4) {
        if (searchTypeRequest.status === 200) {
				for (var i = 0; i < this.searchTypeObj.length; i++) { 
					for (let value of Object.values(this.searchTypeObj[i])) {
						if(value=="byProduct")	{
							numOfProduct = numOfProduct + 1;
						}else{
							numOfCharity = numOfCharity + 1;
						}
					}
				}			
		console.log('Num of Charity: ' + numOfCharity);
		console.log('Num of Product: ' + numOfProduct);
		var total = (numOfCharity + numOfProduct); 
		searchContainerTotal.innerHTML +=  "Total: " + total; 
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
            {y: (numOfCharity /total *100), label: "By Charity"},
            {y: (numOfProduct/total * 100), label: "By Product"},
        ]
	}]
});
searchTypeChart.render();
		}
	}
}

function displayData() {
	var jsonString = userActionRequest.response; 
	this.userActionsObj = JSON.parse(jsonString);
	console.log(this.userActionsObj);
	localStorage.setItem("userActionsObj", JSON.stringify(this.userActionsObj))
	if (userActionRequest.readyState === 4) {
		if (userActionRequest.status === 200) {
			for (var i = 0; i < this.userActionsObj.length; i++) { 
				console.log(this.userActionsObj[i].viewedOnEbay)
					if(this.userActionsObj[i].userGroup==="A" && this.userActionsObj[i].viewedOnEbay===true)	{
						numOfA= numOfA + 1;
					}else if(this.userActionsObj[i].userGroup==="B" && this.userActionsObj[i].viewedOnEbay===true){
						numOfB = numOfB + 1;
					}
			}
	console.log(numOfA);
	console.log(numOfB);
	var total = (numOfA + numOfB)
	chartContainerTotal.innerHTML += "Total: " + total; 

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
            {y: (numOfA / total *100), label: "User Group A"},
            {y: (numOfB / total * 100) , label: "User Group B"},
        ]
	}]
});
chart.render();

}
}
}

document.addEventListener("DOMContentLoaded", init, false);