<template lang="html">
  <b-card>
    <b-card-text>
      <router-link :to="{ name: 'Site', params: { uuid: site.UUID } }">{{
        site.Name
      }}</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["site"],
};
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 0.5em;
}
</style>
