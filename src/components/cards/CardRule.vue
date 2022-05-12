<template lang="html">
  <b-card>
    <div class="row">
      <div class="col-4">
        <b-form-input
          v-model="Property"
          placeholder="Enter property"
        ></b-form-input>
      </div>
      <div class="col" style="text-align: center">:</div>
      <div class="col-4">
        <b-form-input v-model="Value" placeholder="Enter value"></b-form-input>
      </div>
      <div class="col-3">
        <b-button
          variant="outline-primary"
          @click="updateRule"
          :disabled="disabled"
          >Update Rule</b-button
        >
        <b-button variant="outline-danger" :disabled="disabled" @click="deleteRule">Delete Rule</b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["rule"],
  data: () => ({
    Property: "",
    Value: "",
    disabled: false,
  }),
  methods: {
    updateRule() {
      const {
        Property,
        Value
      } = this;
      const {
        UUID
      } = this.rule;
      this.$emit("updateRule", {
        UUID,
        Property,
        Value,
      });
      this.Property = this.rule.Property;
      this.Value = this.rule.Value;
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 500);
    },
    deleteRule() {
      if (confirm(`Delete rule "${this.rule.Property}"?`)) {
        const {
          UUID
        } = this.rule;
        this.$emit('deleteRule', {
          UUID
        })
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 500);
      }
    }
  },
  mounted() {
    this.Property = this.rule.Property;
    this.Value = this.rule.Value;
  },
};
</script>

<style lang="css" scoped>
.btn {
  margin: 0 0.5em 0.5em 0;
}
</style>
