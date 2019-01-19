class MockAPI {
    constructor() {
        this.mockData = {
            accounts: [
                {
                    id: "71e6c9b83a7ef02bae6764991eefe53360a0a09be53887b2d3900d02c00a3858",
                    role: "admin",
                }
            ]
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
}

let currentAPI = new MockAPI();
export default currentAPI;
