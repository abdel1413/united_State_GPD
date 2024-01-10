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

const margins = {
  left: 100,
  right: 20,
  top: 50,
  bottom: 50,
};

//function to pass the dataset
const barDrawer = (dataset) => {
  const minDate = new Date(dataset[0][0]).getFullYear();
  const maxDate = new Date(dataset[dataset.length - 1][0]).getFullYear();
  console.log("dataset", dataset, "length", dataset.length);
  //create domain and range
  const xScale = d3.scaleLinear();
  xScale.domain([0, maxDate]);
  xScale.range([0, w]);

  const yScale = d3.scaleLinear();
  yScale.domain([0, d3.max(dataset, (d) => d[1])]);
  yScale.range([h, 0]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", w / dataset.length)
    .attr("height", (d, i) => {
      const date = d[1];

      return h - yScale(d[1]);
    })
    .attr("x", (d, i) => {
      //console.log("dddd", new Date(d[1]).getFullYear());
      const date = new Date(d[1]).getFullYear();
      //return xScale(new Date(d[0]).getFullYear());

      return i * (w / dataset.length);
    })
    .attr("y", (d, i) => {
      return yScale(d[1]);
    })

    .style("fill", "navy");

  //create left and bottom axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0" + h - padding + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
};
