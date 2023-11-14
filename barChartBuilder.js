class BarChartBuilder {
    constructor(container, dataset, xAttribute, yAttribute, xunits="", yunits="", margin, xTitle, yTitle) {
        this.container = container;
        this.dataset = dataset;
        this.xAttribute = xAttribute;
        this.yAttribute = yAttribute;
        this.yunits = yunits;
        this.xunits = xunits;
        this.margin = margin;
        this.width = 0;
        this.height = 0;
        this.xTitle = xTitle;
        this.yTitle = yTitle;

        // setup SVG container and initial dimensions
        this.svg = null; 
        this.setUpSVG();
        this.updateSize();
        this.loadAndDrawChart();
    }


    // SET UP SVG CONTAINER USING PARAMETERS
    setUpSVG() {
        // Create the SVG container
        this.svg = this.container
            .append("svg") 
            .attr("viewBox", "0 0 ${this.width} ${this.height}")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("transform-origin", "center")
            .style("width", "100%")
            .style("height", "100%")
            .attr("class", this.container.attr("class"));
    }


    // Update the size of the chart based on the container's dimensions
    // update the margins for the viewbox and the width and height 
    updateSize() {
        this.width = this.container.node().getBoundingClientRect().width - this.margin.left - this.margin.right;
        this.height = this.container.node().getBoundingClientRect().height - this.margin.top - this.margin.bottom;
        this.svg.attr("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`);
        this.loadAndDrawChart();
    }


    // FUNCTION TO LOAD DATABASE
    loadAndDrawChart() {
        d3.csv(this.dataset)
        .then(data => {
            this.processData(data);
            this.updateChart(data);
        })
        .catch(error => {
            console.error("Error loading dataset:", error);
        });
    }


    // PROCESS DATA
    processData(data) {
        data.forEach(d => {
            console.log(d);
            d[this.xAttribute] = d[this.xAttribute];
            d[this.yAttribute] = +d[this.yAttribute];
        });
    }


    // LOGIC TO UPDATE THE CHART MAIN
    updateChart(data) {
        // remove old chart when updated 
        this.svg.selectAll(".bar").remove();
        // update the scales
        const [xScale, yScale] = this.getScales(data);

        this.svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect") // Change "circle" to "rect" for bars
            .attr("class", "bar")
            .attr("data-county", d => d[this.xAttribute])
            // tried switching the x, y and width/height attributes to make it horizontal
            .attr("x", this.margin.right)
            .attr("y", d => this.margin.top + xScale(d[this.xAttribute]) + 5)
            .attr("height", xScale.bandwidth())
            .attr("width", d => yScale(d[this.yAttribute]))
            .style("fill", d => this.getColorXAttribute(d[this.xAttribute]));

        // Update the x-axis labels and y-axis labels 
        this.updateXLabels(yScale);
        this.updateYLabels(xScale);

        // Update the Titles 
        this.updateTitles();

        // Add mouse events
        this.addMouseEvents();
    }


    // FUNCTION TO GET THE COLOR FOR EACH COUNTRY 
    getColorXAttribute(country){
        if (country === 'India'){
            return "#FFA500"; 
        } else if (country == "UnitedStates"){
            return '#0000FF';
        } else if (country == "Russia"){
            return '#FF0000';
        } else if (country == "China"){
            return '#FFD700';
        } else if (country == "Brazil"){
            return '#008000';
        } else if (country == "Canada"){
            return '#C8102E';
        } else if (country == "Nigeria"){
            return '#FFA500';
        } else if (country == "Ukraine"){
            return '#4169E1';
        } else if (country == "Argentina"){
            return '#87CEFA';
        } else if (country == "Australia"){
            return '#FFD700';
        }
    }


    // UPDATE SCALES
    getScales(data) {
        // sort data
        data = data.sort((a, b) => d3.descending(a[this.yAttribute], b[this.yAttribute]));
        // scale ranges 
        var xScale = d3.scaleBand()
            .domain(data.map(d => d[this.xAttribute]))
            .range([0, this.height])
            .padding(0.2);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[this.yAttribute])])
            .range([0, this.width]);
        return [xScale, yScale];
    }


    // UPDATE X LABELS 
    updateXLabels(xScale) {
    // remove old x-axis labels first
        this.svg.selectAll(".x-axis").remove();
        console.log(xScale);

        const xAxis = d3.axisBottom(xScale)
            .ticks(10);
        this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${this.margin.right}, ${this.margin.top})`)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 10)
            .attr("y", 0)
            .attr("font-size", 14)
            .style("text-anchor", "start");
    }


    // UPDATE Y LABELS
    updateYLabels(yScale) { 
        // delete old labels and ticks first
        this.svg.selectAll(".y-axis").remove();

        const yAxis = d3.axisLeft(yScale)
            .ticks(10); // Set the number of ticks you want
        this.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${this.margin.right}, ${this.margin.top})`) // Adjust the translation
            .call(yAxis)
            .selectAll("text")
            // .attr("x", 0) // left or right
            .attr("y", 5) // up or down
            ;
    }


    // UPDATE TITLES
    updateTitles() {
        var title = `${this.xTitle} vs ${this.yTitle}`;
        var xTitle = `${this.yTitle}`;
        var yTitle = `${this.xTitle}`;

        // remove old titles 
        this.svg.selectAll(".title").remove();

        // main title
        this.svg.append("text")
            .attr("class", "title")
            .attr("x", (this.margin.right + this.margin.left + this.width) / 2)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", 28)
            .text(title);

        // x-axis title
        this.svg.append("text")
            .attr("class", "title")
            .attr("x", (this.margin.right + this.margin.left + this.width) / 2)
            .attr("y", this.margin.top - 75)
            .attr("text-anchor", "middle")
            .attr("font-size", 25)
            .text(yTitle);

        // y-axis title
        this.svg.append("text")
            .attr("class", "title")
            .attr("x", -(this.margin.top + this.margin.bottom + this.height) / 2 + 20)
            .attr("y", this.margin.right - 160)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90, 0, 0)")
            .attr("font-size", 25)
            .text(xTitle);
    }
    
    

    // MOUSE EVENTS ****
    addMouseEvents() {
        var original_color = null;
        var self = this;

        this.svg.selectAll(".bar")
            .on("mouseover", function (d) {
                original_color = d3.select(this).style("fill");
                d3.select(this).style("fill", "#e41a1c");

                // Call the callback with the xAttribute (county name)
                const countyName = d.srcElement.__data__[self.xAttribute];
                if (self.countyHoverCallback) {
                    self.countyHoverCallback(countyName);
                }
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", function () {
                    return original_color;
                });
                self.countyHoverCallback(null);
            });
    }

    // UPDATE COLOR OF COUNTY 
    highLightCounty(countyName) {
        console.log("Highlighting bar chart! :): ", countyName);
        var original_color = null;
        // Get the path element for the specified county
        const countyBar = this.svg.select(`rect[data-county="${countyName}"]`);
        console.log(countyBar);
        if (!countyBar.empty()) {
            // Save the original color
            const originalColor = countyBar.style("fill");

            // Change the color to highlight
            countyBar.style("fill", "#e41a1c");
            return originalColor;
        }
    }

    // RESET COLOR OF COUNTY
    resetCounty(countyName, color) {
        // Get the path element for the specified county
        const countyBar = this.svg.select(`rect[data-county="${countyName}"]`);
        if (!countyBar.empty()) {
            // Reset the color
            console.log("Resetting bar chart! :): ", color);
            countyBar.style("fill", color);
        }
    }

    // CALLBACK FUNCTION
    setCountyHoverCallback(callback) {
        this.countyHoverCallback = callback;
        this.addMouseEvents();
    }
    // END MOUSE EVENTS ****
}