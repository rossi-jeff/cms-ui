<template lang="html">
  <div class="login-form">
    <b-form-group label="Email" id="Email-group">
      <b-form-input
        id="Email"
        v-model="payload.Email"
        type="email"
        placeholder="Enter your email address"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="PassWord" id="PassWord-group">
      <b-form-input
        id="PassWord"
        v-model="payload.PassWord"
        type="password"
        placeholder="Enter your password"
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
