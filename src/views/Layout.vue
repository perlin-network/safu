<template>
  <div>
    <nav class="dt w-100 border-box pv3">
      <router-link class="dtc v-mid black" to="home">
        <h1 class="dib">SAFU</h1>
      </router-link>
      <div class="dtc v-mid w-75 tr">
        <a class="link dim dark-gray f4 mr4 dib" href="#" title="Reports">Reports</a>
        <a class="link dim dark-gray f4 mr4 dib" href="#" title="Admin CP">Admin CP</a>
      </div>
    </nav>

    <div class="cf w-100">
      <div class="fl w-25 pr2">
        <div class="outline bg-white">
          <div class="tc" style="min-height: 375.35px">
            <img src="http://lorempixel.com/512/512/nature">
          </div>

          <div class="pb3 ma3">
            <code
              class="f7 w-100 h-25 nowrap fl bg-black-20 pa2 ws-normal overflow-hidden dib"
            >{{this.$store.state.address}}</code>
          </div>

          <div class="mt4 mb3 pl3 outline pv3">
            <div class="dt w-100">
              <div class="dtc w-50">
                <span class="f4">Reputation</span>
              </div>

              <div class="dtc w-50 pr3 tr">
                <a href="#" class="f3 black-50 dib" @click="openReputation">{{$store.getters.reputation()}}</a>
              </div>
            </div>
          </div>

          <div class="ph3 pb3">
            <button class="bg-white tc pa2 w-100 b--black-40 pointer">Query</button>
          </div>

          <div class="ph3 pb3">
            <button class="bg-white tc pa2 w-100 b--black-40 pointer">Logout</button>
          </div>
        </div>
      </div>

      <div class="fl w-75 pl2">
        <div class="outline bg-white">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-if="showReputation">
      <Reputation :close="closeReputation"/>
    </div>
  </div>
</template>

<script>
import "tachyons/css/tachyons.css";
import Reputation from "./Reputation.vue";

export default {
  name: "layout",
  components: { Reputation },
  methods: {
    openReputation() {
      this.showReputation = true;
    },
    closeReputation() {
      this.showReputation = false;
    }
  },
  data() {
    return {
      showReputation: false
    };
  }
};
</script>