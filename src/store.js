import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import nacl from 'tweetnacl';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        address: "",
        account: {
            balance: 0, role: "Member", reputation_received: []
        },
        reports: [
            {
                id: "0",
                title: "help! i got scamedz",
                severity: "LOW",
                content: `lalala`
            },
            {
                id: "1",
                title: "Test Title",
                severity: "HIGH",
                content: "bbbbb"
            }
        ],

    },
    getters: {
        reportById: state => id => _.find(state.reports, report => report.id === id),
        reputation: state => () => _.sumBy(state.account.reputation_received, rep => rep.effect === "positive" ? 1 : -1)
    },
    mutations: {
        'address.set'(state, address) {
            state.address = address;
        },
        'account.load'(state, account) {
            console.log(account);

            state.account = account;
        },
        'reports.load'(state, reports) {
            state.reports = reports;
        }
    },
    actions: {
        async login({dispatch, commit}, address) {
            commit('address.set', address);
            commit('account.load', await perlin.loadAccount(address));

            await dispatch('listScamReports');
        },
        async postScamReport({dispatch, commit}, report) {
            await perlin.postScamReport(report);
        },
        async listScamReports({dispatch, commit}) {
            commit('reports.load', await perlin.listScamReports());
        }
    }
});

class Perlin {
    contract_id = "C-2e9812cc11880f0301f84225bf5e91ebb52b43efb7a1eaf0586635ee6ce8f139";

    api = {
        token: ""
    };

    constructor() {
        this.keys = nacl.sign.keyPair.fromSecretKey(Buffer.from("6d6fe0c2bc913c0e3e497a0328841cf4979f932e01d2030ad21e649fca8d47fe71e6c9b83a7ef02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858", "hex"));

        this.init().catch(err => console.error(err));
    }

    async init() {
        try {
            await this.initSession();
        } catch (err) {
            console.error(err)
        }
    }

    async loadAccount(address) {
        const res =  JSON.parse(atob((await this.waveletRequest("/contract/execute", {
            contract_id: this.contract_id,
            entry_id: "fetch_account_info",
            param: btoa(JSON.stringify({
                account_id: address
            }))
        })).result));

        return res;
    }

    async waveletRequest(endpoint, body, headers) {
        const response = await fetch(`http://${location.hostname}:9000${endpoint}`, {
            method: 'post',
            headers: {
                "X-Session-Token": this.api.token,
                ...headers
            },
            body: JSON.stringify(body)
        })

        return await response.json();
    }

    async safuRequest(endpoint, body, headers) {
        const response = await fetch(`http://${location.hostname}:5050${endpoint}`, {
            method: 'post',
            headers,
            body: JSON.stringify(body)
        })

        return await response.json();
    }

    async listScamReports() {
        let reports = (await this.safuRequest('/all_scam_reports')).reports;

        reports = _.map(reports, report => {
            report.severity = report.taint < 30 ? "LOW" : "HIGH";

            return report;
        })

        console.log(reports);
        return reports;
    }

    async postScamReport(report) {
        await this.safuRequest("/post_scam_report", report);
    }

    async initSession() {
        const time = new Date().getTime();
        const auth = nacl.sign.detached(new Buffer(`perlin_session_init_${time}`), this.keys.secretKey)

        const response = await this.waveletRequest("/session/init", {
                "public_key": Buffer.from(this.keys.publicKey).toString('hex'),
                "time_millis": time,
                "signature": Buffer.from(auth).toString('hex'),
            }
        );

        this.api.token = response.token;

        console.log(`Session token: ${this.api.token}`);
    }

}

const perlin = new Perlin();

export default store;