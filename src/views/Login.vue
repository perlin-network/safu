<template>
  <div class="box">
    <div class="box-title">Welcome to SAFU</div>
    <div v-if="loaded">
      <v-select
        v-model="loginAccount"
        :options="accounts"
        label="displayName"
        placeholder="Select an account to login"
      ></v-select>
      <br>
      <button
        class="f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple"
        @click="doLogin()"
        v-if="canLogin"
      >Login</button>
      <button
        class="f6 link dim br3 ph3 pv2 mb2 dib white bg-gray"
        @click="doLogin()"
        disabled
        v-if="!canLogin"
      >Login</button>
      <span style="color: red">{{ loginHint }}</span>
    </div>
    <div class="login-form" v-if="!loaded">
      <span>
        <fa-icon icon="spinner"/>&nbsp;Retrieving local accounts
      </span>
    </div>
  </div>
</template>

<script>
import "./Safu.css";
import api from "../api.js";

export default {
  computed: {
    canLogin() {
      if (this.loaded && this.loginAccount && !this.doingLogin) {
        return true;
      } else {
        return false;
      }
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
            window.location = "/home";
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