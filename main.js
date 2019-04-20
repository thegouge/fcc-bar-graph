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

const width = 1000;
const height = 500;
const padding = 50;

function graphData(data) {
  const xScale = d3
    .scaleLinear()
    .domain([0, width])
    .range([padding, width - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([padding, height - padding]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 2)
    .attr("y", (d) => height - d[1] / 50)
    .attr("width", 2)
    .attr("height", (d) => yScale(d[1]))
    .attr("fill", "blue");
}
