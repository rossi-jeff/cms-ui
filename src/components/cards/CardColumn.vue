<template>
  <b-card>
    <b-card-text>
      <div class="row">
        <div class="col-10">
          <b-form-textarea
            name="Content"
            v-model="Content"
            placeholder="Enter column content"
          ></b-form-textarea>
        </div>
        <div class="col-2">
          <b-button
            variant="outline-primary"
            :disabled="disabled"
            @click="updateColumn"
            >Update Column</b-button
          >
          <b-button
            variant="outline-danger"
            :disabled="disabled.delete"
            @click="deleteColumn"
            >Delete Column</b-button
          >
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["column"],
  data: () => ({
    Content: "",
    disabled: false,
  }),
  methods: {
    updateColumn() {
      const { Content } = this;
      const { UUID } = this.column;
      this.$emit("updateColumn", { UUID, Content });
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 500);
    },
    deleteColumn() {
      const { UUID } = this.column;
      this.$emit("deleteColumn", { UUID });
    },
  },
  mounted() {
    this.Content = this.column.Content;
  },
};
</script>

<style lang="css" scoped>
.row,
.card,
.btn {
  margin-bottom: 0.5em;
}
</style>
