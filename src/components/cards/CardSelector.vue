<template lang="html">
  <b-card>
    <div class="row">
      <div class="col-9">
        <b-form-input
          v-model="Name"
          placeholder="Enter selector name"
        ></b-form-input>
      </div>
      <div class="col-3">
        <b-button
          variant="outline-primary"
          @click="updateSelector"
          :disabled="disabled"
          >Update Selector</b-button
        >
        <b-button
          variant="outline-danger"
          :disabled="disabled"
          @click="deleteSelector"
          >Delete Selector</b-button
        >
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["selector"],
  data: () => ({
    Name: "",
    disabled: false,
  }),
  methods: {
    updateSelector() {
      const { Name } = this;
      const { UUID } = this.selector;
      this.$emit("updateSelector", {
        Name,
        UUID,
      });
      this.Name = this.selector.Name;
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 500);
    },
    deleteSelector() {
      if (confirm(`Delete selector "${this.selector.Name}"?`)) {
        const { UUID } = this.selector;
        this.$emit("deleteSelector", {
          UUID,
        });
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 500);
      }
    },
  },
  mounted() {
    this.Name = this.selector.Name;
  },
};
</script>

<style lang="css" scoped>
.btn {
  margin: 0 0.5em 0.5em 0;
}
</style>
