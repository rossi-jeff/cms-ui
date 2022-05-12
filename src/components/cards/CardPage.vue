<template lang="html">
  <b-card>
    <b-card-text>
      <router-link :to="{ name: 'Page', params: { uuid: page.UUID } }">{{
        page.Name
      }}</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["page"],
};
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 0.5em;
}
</style>
