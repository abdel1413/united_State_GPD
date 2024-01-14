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
  dataset = [];
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

const drawBars = () => {
  // create a tooltip to display more info
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "orange")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("width", (w - 2 * padding) / dataset.length)
    .attr("height", (d, i) => {
      return yScale(d[1]);
    })
    .attr("x", (d, i) => {
      return xScale(i);
    })
    .attr("y", (d, i) => {
      return h - padding - yScale(d[1]);
    })
    .on("mouseover", (d, i) => {
      tooltip
        .transition()
        .style("visibility", "visible")
        .text(i[0])

        .attr("data-date", i[0]);
      // document.querySelector("#tooltip").setAttribute("data-date", i[0]);
    })
    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
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
