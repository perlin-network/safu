<template>
  <div class="w-50 center pt5">
    <div class="box-title">Ethereum Transaction Graph</div>
    <div>
      <div id="mynetwork" style="height: 600px; margin-top: 100px; width: 500px;"></div>
    </div>
  </div>
</template>

<script>
import "vue2vis/dist/vue2vis.css";
import api from "../api.js";

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
export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    let graph = await api.ethTransactionGraph();

    let revMap = {};
    let nodes = new vis.DataSet(
      graph.map((x, i) => {
        revMap[x.address] = i;
        return {
          id: i,
          label: x.address
        };
      })
    );
    let edges = [];
    for (let n of graph) {
      for (let c of n.children) {
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

    var options = {};

    var network = new vis.Network(container, data, options);
  }
};
</script>