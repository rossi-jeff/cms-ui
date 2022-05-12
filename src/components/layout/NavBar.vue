<template lang="html">
  <b-navbar variant="primary" type="dark">
    <div class="row w-100">
      <div class="col">
        <b-navbar-brand href="/" class="mx-4"
          >Content Management</b-navbar-brand
        >
      </div>
      <div class="col text-end">
        <b-button
          variant="primary"
          v-if="session.SignedIn"
          @click="logout"
          size="sm"
          >Log Out</b-button
        >
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("session/logout");
      if (this.path != "/") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    path() {
      return this.$router.currentRoute.path;
    },
  },
};
</script>
