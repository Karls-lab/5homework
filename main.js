let chart1;

document.addEventListener('DOMContentLoaded', function () {

    // create the flex container for two charts 
    var flexContainer = d3.select("body")
        .append("div")
        .attr("class", "flex-container");

    // CHART 1: CHLOROPLETH MAP
    // create a container for chloropleth map
    var mapContainer = flexContainer
        .append("div")
        .attr("class", "chloroplethMapContainer");

    // Create the Chloropleth Map
    const dataset = "data/California_Unemployment.csv";
    var color_range = ["white", "darkblue"];
    const choroplethMargin = { top: 140, right: 20, left: 20, bottom: 0 };
    const map = new ChoroplethBuilder(mapContainer, dataset, color_range, choroplethMargin);

    // CHART 2: BAR CHART
    // create a container for the bar chart
    var barChartContainer =  flexContainer
        .append("div")
        .attr("class", "barChartContainer");

    const margin = { top: 180, right: 250, left: 20, bottom: 50 };

    var dataset1 = "data/births.csv";
    var xAttribute1 = "California Counties";
    var yAttribute1 = "Births in 2015";

    // Create a button
    var switchButton = flexContainer
        .append("button")
        .text("Switch Dataset")
        .on("click", function () {
            // Toggle between datasets and update the bar chart
            if (dataset1 === "data/births.csv") {
                dataset1 = "data/deaths.csv"; // Change this to the path of your second dataset
                xAttribute1 = "California Counties";
                yAttribute1 = "Deaths in 2015";
            } else {
                dataset1 = "data/births.csv";
                xAttribute1 = "California Counties";
                yAttribute1 = "Births in 2015";
            }
            // Delete the old bar chart
            chart1.svg.remove();
            
            // Update the bar chart based on the current dataset
            chart1 = new BarChartBuilder(barChartContainer, dataset1, xAttribute1, yAttribute1, '', '', margin);
        });

    // Set Parameters for the graph and append to created container
    chart1 = new BarChartBuilder(barChartContainer, dataset1, xAttribute1, yAttribute1, '', '', margin);

});
