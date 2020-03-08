function init() {
    console.log("Admin Page")
}

window.onload = function() {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title: {
		text: "Did user group view page on ebay?"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: [
			{y: 60, label: "User Group A"},
			{y: 40, label: "User Group B"},
		]
	}]
});
chart.render();

}

document.addEventListener("DOMContentLoaded", init, false);