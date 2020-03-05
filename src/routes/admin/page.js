function init() {
    console.log("Admin Page")
}

<script src="https://static.anychart.com/js/8.0.1/anychart-core.min.js"></script>
<script src="https://static.anychart.com/js/8.0.1/anychart-pie.min.js"></script>

anychart.onDocumentReady(function() {

    // set the data
    var data = [
        {x: "White", value: 223553265},
        {x: "Black or African American", value: 38929319},
        {x: "American Indian and Alaska Native", value: 2932248},
        {x: "Asian", value: 14674252},
        {x: "Native Hawaiian and Other Pacific Islander", value: 540013},
        {x: "Some Other Race", value: 19107368},
        {x: "Two or More Races", value: 9009073}
    ];
  
    // create the chart
    var chart = anychart.pie();
  
    // set the chart title
    chart.title("Population by Race for the United States: 2010 Census");
  
    // add the data
    chart.data(data);
  
    // display the chart in the container
    chart.container('container');
    chart.draw();
  
  });
document.addEventListener("DOMContentLoaded", init, false);