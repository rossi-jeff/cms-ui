<template lang="html">
  <div class="page-form w-100">
    <b-form-group label="Name" id="Name-group">
      <b-form-input
        id="Name"
        v-model="payload.Name"
        type="text"
        placeholder="Enter page name"
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
