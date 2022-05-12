<template>
<div class="home">
  <b-card v-if="!session.SignedIn">
    <b-card-text>
      <FormLogin :payload="payload.login" />
      <b-button variant="outline-primary" @click="login">Sign In</b-button>
    </b-card-text>
  </b-card>
  <b-card v-if="session.SignedIn && sites.length">
    <b-card-text>
      <h4>Sites</h4>
      <CardSite v-for="site of sites" :key="site.Id" :site="site" />
    </b-card-text>
  </b-card>
  <b-card v-if="session.SignedIn">
    <b-card-text>
      <div class="row">
        <div class="col-10">
          <FormSite :payload="payload.site" />
        </div>
        <div class="col-2">
          <b-button variant="outline-primary" @click="addSite">Add Site</b-button>
        </div>
      </div>
    </b-card-text>
  </b-card>
</div>
</template>

<script>
import FormLogin from "../components/forms/FormLogin";
import FormSite from "../components/forms/FormSite";
import CardSite from "../components/cards/CardSite";
import {
  baseUrl,
  defaultHeaders
} from "../utils";
export default {
  name: "Home",
  components: {
    FormLogin,
    FormSite,
    CardSite,
  },
  data: () => ({
    baseUrl,
    defaultHeaders,
    payload: {
      login: {
        Email: "",
        PassWord: "",
      },
      site: {
        Name: "",
      },
    },
    sites: [],
  }),
  methods: {
    async login() {
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Email,
        PassWord
      } = this.payload.login;
      if (Email && PassWord) {
        let headers = defaultHeaders;
        let url = `${baseUrl}/auth/login`;
        const results = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            Email,
            PassWord,
          }),
          headers,
        });
        if (results.ok) {
          const sessionData = await results.json();
          await this.$store.dispatch("session/loginSuccess", sessionData);
          this.loadSites();
        } else {
          await this.$store.dispatch("session/loginFailure");
          console.log(results);
        }
      } else {
        console.log({
          Email,
          PassWord,
        });
      }
    },
    async loadSites() {
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/site`;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.sites = await results.json();
        console.log(this.sites);
      }
    },
    async addSite() {
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      const {
        Name
      } = this.payload.site;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/site`;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Name,
        }),
        headers,
      });
      if (results.ok) {
        this.payload.site.Name = "";
        this.loadSites();
      }
    },
  },
  mounted() {
    if (this.session.SignedIn) {
      this.loadSites();
    }
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 0.5em;
}
</style>
