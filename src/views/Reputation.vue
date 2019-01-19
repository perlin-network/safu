<template>
  <Popup :close="this.$props.close">
    <div class="ma5">
      <div class="f2 pb3">Reputation</div>
      <div class="pb3">
        Total reputation for account {{ this.$props.targetAddress }}:
        <span
          v-if="currentRep !== null"
          :style="{color: currentRep >= 0 ? 'green' : 'red'}"
        >{{ currentRep }}</span>
        <span v-if="currentRep === null" :style="{color: 'grey'}">unknown</span>
      </div>

      <div class="pb3">
        <div class="overflow-auto">
          <table class="f6 w-100" cellspacing="0">
            <thead>
              <tr class="stripe-dark">
                <th class="fw6 tl pa3 bg-white">ID</th>
                <th class="fw6 tl pa3 bg-white">Reputation Change</th>
                <th class="fw6 tl pa3 bg-white">Reporter</th>
                <th class="fw6 tl pa3 bg-white">Approver</th>
              </tr>
            </thead>
            <tbody class="lh-copy">
              <tr class="stripe-dark" v-for="rec in repRecords" :key="rec.id">
                <td class="pa3">{{ rec.id }}</td>
                <td class="pa3">{{ rec.change }}</td>
                <td class="pa3">{{ rec.submitter }}</td>
                <td class="pa3">{{ rec.approver }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "./Popup.vue";
import api from "../api.js";

export default {
  components: { Popup },
  props: {
    close: Function,
    targetAddress: String
  },
  data() {
    return {
      currentRep: null,
      repRecords: []
    };
  },
  async mounted() {
    this.repRecords = await api.reputationRecords(this.$props.targetAddress);
    this.currentRep = 0;

    for (let rec of this.repRecords) {
      this.currentRep += rec.change;
    }
  }
};
</script>
