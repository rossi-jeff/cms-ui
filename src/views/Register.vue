<template>
  <div class="register">
    <b-card>
      <b-card-text>
        <FormRegister :payload="payload" />
        <b-button variant="outline-primary" @click="register"
          >Register</b-button
        >
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import FormRegister from "../components/forms/FormRegister";
import { baseUrl, defaultHeaders } from "../utils";
export default {
  name: "Register",
  components: {
    FormRegister,
  },
  data: () => ({
    baseUrl,
    defaultHeaders,
    payload: {
      Name: "",
      Email: "",
      PassWord: "",
    },
  }),
  methods: {
    async register() {
      const { payload, baseUrl, defaultHeaders } = this;
      if (payload.Name && payload.Email && payload.PassWord) {
        let headers = defaultHeaders;
        let url = `${baseUrl}/auth/register`;
        const results = await fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(payload),
          headers,
        });
        if (results.ok) {
          console.log(await results.json());
          this.$router.push("/");
        } else {
          console.log(results);
        }
      } else {
        console.log(payload);
      }
    },
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
  },
};
</script>
