<template>
  <div class="w-50 center pt5">
    <div class="box-title">Ethereum Transaction Graph</div>
    <div>
      <div id="mynetwork" style="height: 1200px; margin-top: 100px; width: 1000px;"></div>
    </div>
  </div>
</template>

<script>
import "vue2vis/dist/vue2vis.css";
import api from "../api.js";

async function safuRequest(endpoint, body, headers) {
  const response = await fetch(`http://${location.hostname}:5050${endpoint}`, {
    method: "post",
    headers,
    body: JSON.stringify(body)
  });

  return await response.json();
}

async function ethTransactionGraph() {
  return await safuRequest("/eth_graph");
}

/*
// create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'A'},
    {id: 2, label: 'B'},
    {id: 3, label: 'C'},
    {id: 4, label: 'D'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 2, arrows:'to'},
    {from: 2, to: 3, arrows:{
      to: {
        enabled: true,
        type: 'circle'
      }
    }},
    {from: 3, to: 4, arrows:{
      to: {
        enabled: true,
        type: 'bar'
      }
    }},
  ]);
*/

function countChildren(graph, addr, revMap) {
  let c = 0;
  if (graph[revMap[addr]].count !== undefined) return graph[revMap[addr]].count;
  graph[revMap[addr]].count = 0; // cycle

  for (let c in graph[revMap[addr]].children) {
    c += countChildren(graph, c, revMap);
  }
  c += Object.keys(graph[revMap[addr]].children).length;

  graph[revMap[addr]].count = c;
  return c;
}

function countToColor(count) {
  count *= 4096000;
  count += Math.floor(Math.random() * 10000);
  let h = count.toString(16);
  while (h.length < 6) {
    h = "0" + h;
  }
  let ret = "#" + h;
  console.log(ret);
  return ret;
}

export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    let graph = await ethTransactionGraph();
    console.log(graph);

    let revMap = {};

    graph.forEach((x, i) => {
      revMap[x.address] = i;
    });

    let nodes = new vis.DataSet(
      graph.map((x, i) => {
        return {
          id: i,
          label: "",
          color: countToColor(countChildren(graph, x.address, revMap))
        };
      })
    );
    let edges = [];
    for (let n of graph) {
      for (let c in n.children) {
        edges.push({
          from: revMap[n.address],
          to: revMap[c],
          arrows: "to"
        });
      }
    }

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: nodes,
      edges: new vis.DataSet(edges)
    };

    var options = {
      nodes: {
        size: 5
      }
    };

    var network = new vis.Network(container, data, options);
  }
};
</script>