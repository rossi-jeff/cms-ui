<template lang="html">
  <div class="site-form">
    <b-form-group label="Name" id="Name-group">
      <b-form-input
        id="Name"
        v-model="payload.Name"
        type="text"
        placeholder="Enter site name"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["payload"],
};
</script>

<style lang="css" scoped>
.form-group {
  display: block;
  margin-bottom: 1em;
}
</style>
