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

const width = 500;
const height = 500;

function graphData(data) {
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
    .attr("x", (d) => {
      return Math.floor(Date.parse(d[0]) / 86400000);
    })
    .attr("y", (d) => height - d[1])
    .attr("width", 5)
    .attr("height", (d) => d[1])
    .attr("fill", "blue");
}
