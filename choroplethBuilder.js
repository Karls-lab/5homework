class UtahCountiesMap {
    constructor(container, dataset, width, height) {
        this.width = 0;
        this.height = 0;
        this.fill = d3.scaleLog().range(["white", "darkblue"]);
        this.popData = {};

        this.svg = null;
        this.svg = d3.select("body").append("svg").attr("width", this.width).attr("height", this.height);
    }

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

    async fetchCountyData() {
        try {
            const ut = await d3.json("data/ut-counties.json");
            return topojson.feature(ut, ut.objects.counties);
        } catch (error) {
            console.error("Error fetching county data:", error);
            return null;
        }
    }

    processPopulationData(data) {
        const population = (d) => {
            if (d.STNAME === "Utah") return +d.CENSUS2010POP;
        };
        const populationData = data.filter(d => d.STNAME === "Utah");

        const minPopulation = d3.min(populationData, population);
        const maxPopulation = d3.max(populationData, population);

        populationData.forEach(d => {
            this.popData[d.CTYNAME] = +d.CENSUS2010POP;
        });

        this.fill.domain([minPopulation, maxPopulation]);
    }

    drawMap() {
        this.fetchCountyData().then(ut => {
            if (ut) {
                const projection = d3.geoMercator().scale(1).translate([0, 0]);
                const path = d3.geoPath().projection(projection);

                const bounds = path.bounds(ut);
                const scaleFactor = 0.95 / Math.max((bounds[1][0] - bounds[0][0]) / this.width, (bounds[1][1] - bounds[0][1]) / this.height);
                const translation = [
                    (this.width - scaleFactor * (bounds[1][0] + bounds[0][0])) / 2,
                    (this.height - scaleFactor * (bounds[1][1] + bounds[0][1])) / 2
                ];

                projection.scale(scaleFactor).translate(translation);

                d3.csv("data/co-est2015-alldata.csv").then(data => {
                    this.processPopulationData(data);

                    this.svg.append("g")
                        .attr("class", "counties")
                        .selectAll("path")
                        .data(ut.features)
                        .enter().append("path")
                        .attr("d", path)
                        .style("fill", d => {
                            if (this.popData[d.properties.name] === undefined) return "white";
                            else return this.fill(this.popData[d.properties.name]);
                        })
                        .on("mouseenter", function (d) {
                            d3.select(this).style("fill", "red");
                        })
                        .on("mouseleave", d => {
                            d3.select(this).style("fill", () => {
                                if (this.popData[d.properties.name] === undefined) return "white";
                                else return this.fill(this.popData[d.properties.name]);
                            });
                        });
                });
            }
        });
    }
}

// Initialize and use the class
let map = new UtahCountiesMap(960, 500);
map.drawMap();


