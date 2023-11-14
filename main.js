document.addEventListener('DOMContentLoaded', function () {
    chart1 = null;
    map = null;

    // create the flex container for two charts 
    var flexContainer = d3.select("body")
        .append("div")
        .attr("class", "flex-container");


    // CHART 1: CHLOROPLETH MAP
    var mapContainer = flexContainer
        .append("div")
        .attr("class", "chloroplethMapContainer");
    const dataset = "data/California_Unemployment.csv";
    var color_range = ["white", "darkblue"];
    var original_color = null;
    var highLightCounty = null;
    const choroplethMargin = { top: 140, right: 20, left: 20, bottom: 0 };
    map = new ChoroplethBuilder(mapContainer, dataset, color_range, choroplethMargin);
    map.setCountyHoverCallback(function (countyName) {
        console.log("County is hovere(C): ", countyName); // Replace this with your desired callback logic
        console.log("HighLightCounty (C): ", highLightCounty);
        if (highLightCounty != null) {
            chart1.resetCounty(highLightCounty, original_color);
        }
        original_color = chart1.highLightCounty(countyName);
        highLightCounty = countyName;
    });


    // CHART 2: BAR CHART
    // create a container for the bar chart
    var barChartContainer = flexContainer
    .append("div")
    .attr("class", "barChartContainer");
    const margin = { top: 180, right: 250, left: 20, bottom: 50 };
    var dataset1 = "data/births.csv";
    var xAttribute1 = "CTYNAME";
    var yAttribute1 = "BIRTHS2015";
    var xTitle = "Births";
    var yTitle = "County";

    var original_color = null;
    var highLightCounty = null;

    function createBarChart() {
        chart1 = new BarChartBuilder(barChartContainer, dataset1, xAttribute1, yAttribute1, '', '', margin, xTitle, yTitle);
        chart1.setCountyHoverCallback(function (countyName) {
            console.log("County is hovered (B): ", countyName);
            if (highLightCounty != null) {
                map.resetCounty(highLightCounty, original_color);
            }
            original_color = map.highLightCounty(countyName);
            highLightCounty = countyName;
        });
        return chart1;
    }

    // Create a button
    var switchButton = flexContainer
    .append("button")
    .text("Switch Dataset")
    .on("click", function () {
        // Toggle between datasets and update the bar chart
        if (dataset1 === "data/births.csv") {
            dataset1 = "data/deaths.csv"; // Change this to the path of your second dataset
            xAttribute1 = "CTYNAME";
            yAttribute1 = "DEATHS2015";
            xTitle = "Deaths";
            yTitle = "County";
        } else {
            dataset1 = "data/births.csv";
            xAttribute1 = "CTYNAME";
            yAttribute1 = "BIRTHS2015";
            xTitle = "Births";
            yTitle = "County";
        }
        // Delete the old bar chart
        chart1.svg.remove();
        // Update the bar chart based on the current dataset
        chart1 = createBarChart();
    });

    chart1 = createBarChart(); 

});