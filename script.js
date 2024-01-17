const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

//create variables
const w = 800;
const h = 400;
const padding = 40;
let data,
  dataset = [],
  tooltip;
let Gr_product;
let yScale, xScale, xAxisScale, yAxisScale;

const svg = d3
  .select("body")
  .append("div")
  .attr("class", "container")
  .append("h1")
  .attr("id", "title")
  .text("United State GDP")
  .append("svg");

const drawCanvas = (Gr_product) => {
  svg.attr("width", w).attr("height", h);

  const link = svg
    .append("text")
    .attr("x", "50")
    .attr("y", "-50")
    .style("font-size", "1.2rem")
    .text(Gr_product)
    .attr("transform", "rotate(90)");

  svg
    .append("text")
    .attr("x", "500")
    .attr("y", "400")
    .html(
      "More info: <a href='https://www.google.com/search?sca_esv=598539381&q=us+gdp&spell=1&sa=X&ved=2ahUKEwjo79udnt-DAxVjl4kEHXlTDLMQBSgAegQICxAC&biw=1093&bih=526&dpr=1.25'>https://www.google.com/search</a>"
    )
    .attr("target", "_blank")
    .style("font-size", "15px");
};

const generateScales = () => {
  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([0, h - 2 * padding]);

  xScale = d3
    .scaleLinear()
    .domain([0, dataset.length - 1])
    .range([padding, w - padding]);

  //convert date into numeric
  const dateArray = dataset.map((date) => {
    return new Date(date[0]);
  });

  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(dateArray), d3.max(dateArray)])
    .range([padding, w - padding]);

  yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d) => d[1])])
    .range([h - padding, padding]);
};

const mouseoverHandler = (d, i) => {
  tooltip
    .transition()
    .style("visibility", "visible")
    .attr("data-date", i[0])
    .style("opacity", 0.8)
    .text(`Date:${i[0]} $${i[1]} Billions`);
  // .style("top", event.pageY + 5 + "px")
  // .style("left", event.pageX + 10 + "px");
};

//
const mousemoveHandler = (d) => {
  tooltip
    .style("top", event.pageY + 5 + "px")
    .style("left", event.pageX + 10 + "px");

  // tooltip
  //   .style("top", d3.select(this).style("x") + "px")
  //   .style("left", d3.select(this).style("y") + "px");
  // tooltip
  //   .style("top", d3.mouse(this)[1] + 10 + "px")
  //   .style("left", d3.mouse(this)[0] + 15 + "px");
};

const mouseoutHandler = () => {
  tooltip.transition().style("visibility", "hidden").style("opacity", 0);
  //d3.select("opacity", 1);
};

const drawBars = (d) => {
  // create a tooltip to display more info

  tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("data-date", () => d.data[0][0])
    .style("border", "1px solid #000")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("border-radius", "10px")
    .style("visibility", "hidden");

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "blue")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("width", (w - padding) / dataset.length)
    .attr("height", (d, i) => {
      return yScale(d[1]);
    })
    .attr("x", (d, i) => {
      return xScale(i);
    })
    .attr("y", (d, i) => {
      return h - padding - yScale(d[1]);
    })
    .on("mouseover", mouseoverHandler)
    .on("mousemove", mousemoveHandler)
    .on("mouseout", mouseoutHandler);
};

const generateAxis = () => {
  const xAxis = d3.axisBottom(xAxisScale);
  svg
    .append("g")
    .attr("id", "x-axis")
    .call(xAxis)
    .attr("transform", "translate(0, " + (h - padding) + ")");

  const yAxis = d3.axisLeft(yAxisScale);
  svg
    .append("g")
    .attr("id", "y-axis")
    .call(yAxis)
    .attr("transform", "translate(" + padding + ",0)");
};

const req = new XMLHttpRequest();
req.open("GET", url, true);
req.onload = () => {
  data = JSON.parse(req.responseText);

  let string = data.name;

  Gr_product = string.split(",")[0];

  dataset = data.data;

  drawCanvas(Gr_product);
  generateScales();
  drawBars(data);
  generateAxis();
};
req.send();
