<template>
    <div class="vh-100 dt pl7 w-100">
        <div class="v-mid dtc">
            <div class="f1 mb4">Welcome to SAFU.</div>

            <div v-if="loaded">


                <div class="dt w-100">
                    <div class="dtc w-75">
                        <v-select
                                v-model="loginAccount"
                                :options="accounts"
                                label="displayName"
                                placeholder="Select an account to login." class="f3"/>
                    </div>

                    <div class="dtc w-25 pl3">
                        <button
                                class="f3 link bw0 br3 ph3 pv2 mb2 dib white"
                                @click="doLogin()"
                                :disabled="!canLogin"
                                :class="canLogin ? ['bg-light-purple', 'pointer'] : ['bg-gray']">
                            Login
                        </button>
                    </div>
                </div>


                <span style="color: red">{{ loginHint }}</span>
            </div>
            <div class="login-form" v-if="!loaded">
      <span>
        <fa-icon icon="spinner"/>&nbsp;Retrieving local accounts
      </span>
            </div>
        </div>
    </div>
</template>

<script>
    import "./Safu.css";
    import api from "../api.js";

    export default {
        computed: {
            canLogin() {
                return this.loaded && this.loginAccount && !this.doingLogin;
            }
        },
        data() {
            return {
                loaded: false,
                loginAccount: null,
                loginHint: "",
                doingLogin: false,
                accounts: [
                    {
                        id: "0x7f7f7f7f",
                        displayName: "(Admin) 0x7f7f7f7f"
                    }
                ],
                async doLogin() {
                    this.doingLogin = true;
                    try {
                        let result = await api.login(this.loginAccount.id);
                        if (result) {
                            this.loginHint = "OK";

                            this.$router.push("/home");
                            // window.location = "/home";
                        } else {
                            this.loginHint = "Failed";
                        }
                    } finally {
                        this.doingLogin = false;
                    }
                }
            };
        },
        async mounted() {
            let accounts = await api.listAccounts();
            this.accounts = accounts.map(a => {
                return {
                    id: a.id,
                    displayName: `(${a.role}) ${a.id}`
                };
            });
            this.loaded = true;
        }
    };
</script>