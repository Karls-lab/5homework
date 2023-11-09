// main.js
document.addEventListener('DOMContentLoaded', function () {
    // create the flex container for two charts 
    var flexContainer = d3.select("body")
        .append("div")
        .attr("class", "flex-container");

    // create a container for chloropleth map
    var mapContainer = flexContainer
        .append("div")
        .attr("class", "chloroplethMapContainer");

        // Append a dummy SVG for future visualization sizing
    var dummySVG = mapContainer 
        .append("svg")
        .attr("width", "100%") // Set the initial width
        .attr("height", "100%"); // Set the initial height

    // create a container for the bar chart
    var barChartContainer =  flexContainer
        .append("div")
        .attr("class", "barChartContainer");

    // Set Parameters for the graph, and append to created container
    const dataset1 = "data/births.csv";
    var xAttribute1 = "STNAME";
    var yAttribute1 = "BIRTHS2016";
    const margin = { top: 80, right: 150, left: 80, bottom: 200 };
    const chart1 = new BarChartBuilder(barChartContainer, dataset1, xAttribute1, yAttribute1, '', '', margin);
});
