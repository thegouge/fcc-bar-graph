async function getData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
  const result = await response.json();

  return result;
}

getData().then((data) => {
  console.log(data.data);
  graphData(data.data);
});

const padding = 50;
const width = 1000;
const height = 461;

function graphData(data) {
  const xScale = d3
    .scaleLinear()
    .domain([0, width])
    .range([padding, width - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.max(data, (d) => d[1]), 0])
    .range([height - padding, padding]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const svg = d3
    .select("section")
    .append("svg")
    .attr("class", "graph")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * 2 + padding)
    .attr("y", (d) => height - padding - d[1] / 50)
    .attr("width", () => width / data.length)
    .attr("height", (d) => yScale(d[1]) - padding)
    .attr("fill", "blue");

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + " , 0)")
    .call(yAxis);
}
