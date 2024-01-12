fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data;
    barDrawer(dataset);
  });

const w = 800;
const h = 400;
const padding = 40;

const margins = {
  left: 20,
  right: 20,
  top: 30,
  bottom: 30,
};

//function to pass the dataset
const barDrawer = (dataset) => {
  const minDate = new Date(dataset[0][0]).getFullYear();
  const maxDate = new Date(dataset[dataset.length - 1][0]).getFullYear();

  //create domain and range for x axis
  console.log(h - padding);
  const xScale = d3.scaleLinear();
  xScale.domain([padding, maxDate]);
  xScale.range([w - padding, padding]);

  //domain and range for y axis
  const yScale = d3.scaleLinear();
  yScale.domain([
    0,
    d3.max(dataset, (d) => {
      return d[1];
    }),
  ]);

  yScale.range([h - padding, padding]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("class", "tick")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", w / dataset.length)
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("height", (d, i) => {
      return h - padding - yScale(d[1]);
    })
    .attr("x", (d, i) => {
      return i * 2;

      //return i * 12;
    })
    .attr("y", (d, i) => {
      return yScale(d[1]);
    })

    .style("fill", "#4AACF7")
    .on("mouseover", mouseoverHandler)
    .on("mousemove", mousemoveHandler)
    .on("mouseout", mouseoutHandler);

  //create left and bottom axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
};

const mouseoverHandler = () => {};
const mousemoveHandler = () => {};
const mouseoutHandler = () => {};
