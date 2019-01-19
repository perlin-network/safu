import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        address: "0x71e6c9b83a7ef02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858",
        reports: [
            {
                title: "help! i got scamedz",
                severity: "LOW"
            },
            {
                title: "Test Title",
                severity: "HIGH"
            }
        ],

    },
    mutations: {

    },
    actions: {

    }
})