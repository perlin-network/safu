import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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