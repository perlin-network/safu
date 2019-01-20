class MockAPI {
    constructor() {
        this.mockData = {
            accounts: [{
                id: "0xc0000001",
                role: "admin",
            },
            {
                id: "0xc0000002",
                role: "vip",
            },
            {
                id: "0xc0000002",
                role: "normal",
            }]
        }
        this.currentAccount = null;
    }

    async listAccounts() {
        return this.mockData.accounts.map(a => {
            return {
                id: a.id,
                role: a.role,
            }
        })
    }

    async login(accountId) {
        console.log(accountId);
        for (let a of this.mockData.accounts) {
            if (a.id == accountId) {
                this.currentAccount = a.id;
                return true;
            }
        }
        return false;
    }

    async submitDispute(dispute) {
        console.log(dispute);
    }

    async reputationRecords(targetAddress) {
        console.log(targetAddress);
        return [
            {
                id: 1,
                change: 12,
                submitter: "0xc0000003",
                approver: "0xc0000001",
            },
            {
                id: 2,
                change: -5,
                submitter: "0xc0000002",
                approver: "0xc0000001",
            }
        ]
    }

    async ethTransactionGraph() {
        return [
            {
                address: "#1",
                parents: [],
                children: ["#2"]
            },
            {
                address: "#2",
                parents: ["#1"],
                children: ["#3", "#4"]
            },
            {
                address: "#3",
                parents: ["#2"],
                children: []
            },
            {
                address: "#4",
                parents: ["#2"],
                children: []
            },
        ]
    }
}

let currentAPI = new MockAPI();
export default currentAPI;
