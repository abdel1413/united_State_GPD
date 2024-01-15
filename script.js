// fetch(
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     const dataset = data.data;

//     barDrawer(dataset);
//   });

// const w = 800;
// const h = 400;
// const padding = 40;

// // const margins = {
// //   left: 20,
// //   right: 20,
// //   top: 30,
// //   bottom: 30,
// // };

// //function to pass the dataset
// const barDrawer = (dataset) => {
//   let dateArr = dataset.map((d) => {
//     return new Date(d[0]);
//   });

//   const minDate = new Date(dataset[0][0]).getFullYear();
//   const maxDate = new Date(dataset[dataset.length - 1][0]).getFullYear();

//   //create domain and range for x axis

//   const xScale = d3.scaleLinear();

//   xScale.domain([d3.min(dateArr), d3.max(dateArr)]);
//   xScale.range([0, w - padding]);

//   const xAxisScale = d3
//     .scaleTime()
//     .domain([d3.min(dateArr), d3.max(dateArr)])
//     .range([0, w - padding]);

//   //domain and range for y axis
//   const yScale = d3.scaleLinear();
//   yScale.domain([
//     0,
//     d3.max(dataset, (d) => {
//       return d[1];
//     }),
//   ]);

//   yScale.range([h - padding, padding]);

//   const svg = d3
//     .select("body")
//     .append("svg")
//     .attr("class", "tick")
//     .attr("width", w)
//     .attr("height", h);

//   svg
//     .selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("width", w - padding)
//     .attr("data-date", (d) => d[0])
//     .attr("data-gdp", (d) => d[1])
//     .attr("height", (d, i) => {
//       return h - padding - yScale(d[1]);
//     })
//     .attr("x", (d, i) => {
//       let s = xScale(new Date(d[0]).getFullYear());
//       let ss = new Date(d[0]).getFullYear();

//       // const dateArr = [...s];
//       // dataset.map((e) => console.log(e[0]));
//       console.log("i", xScale(i));

//       return xScale(i);
//     })
//     .attr("y", (d, i) => {
//       return yScale(d[1]);
//     })

//     .style("fill", "#4AACF7")
//     .on("mouseover", mouseoverHandler)
//     .on("mousemove", mousemoveHandler)
//     .on("mouseout", mouseoutHandler);

//   //create left and bottom axis
//   const xAxis = d3.axisBottom(xAxisScale);
//   const yAxis = d3.axisLeft(yScale);

//   svg
//     .append("g")
//     .attr("id", "x-axis")
//     .attr("transform", "translate(0," + (h - padding) + ")")
//     .call(xAxis);

//   svg
//     .append("g")
//     .attr("id", "y-axis")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(yAxis);
// };

// const mouseoverHandler = () => {};
// const mousemoveHandler = () => {};
// const mouseoutHandler = () => {};

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 800;
const h = 400;
const padding = 40;
let data,
  dataset = [],
  tooltip;
let yScale, xScale, xAxisScale, yAxisScale;
const svg = d3.select("body").append("svg");
const drawCanvas = () => {
  svg.attr("width", w);
  svg.attr("height", h);
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
  //.style("left", event.pageX + 5 + "px")
  //  .style("top", event.pageY + 10 + "px")
  console.log("d", dataset[0][0]);
  console.log(i[0]);

  tooltip
    .transition()
    .style("visibility", "visible")
    .attr("data-date", i[0])
    .style("opacity", 0.8)

    .text(`Date:${i[0]} $${i[1]} Billions`);
  // .style("top", event.pageY + 5 + "px")
  // .style("left", event.pageX + 10 + "px");

  // document.querySelector("#tooltip").setAttribute("data-date", i[0]);
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

const drawBars = () => {
  // create a tooltip to display more info

  tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
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
    .style("fill", "orange")
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

  dataset = data.data;

  drawCanvas();
  generateScales();
  drawBars();
  generateAxis();
};
req.send();
