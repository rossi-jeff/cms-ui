<template lang="html">
  <b-card>
    <b-card-text>
      <b-button
        variant="outline-primary"
        size="sm"
        @click="toggleEdit"
        style="margin-bottom: 0.5em"
        >Toggle</b-button
      >
      <div v-if="editing">
        <div class="row">
          <div class="col-10">
            <b-form-textarea
              name="Content"
              v-model="column.Content"
              placeholder="Enter column content"
            ></b-form-textarea>
          </div>
          <div class="col-2">
            <b-button
              variant="outline-primary"
              :disabled="disabled"
              @click="addColumn"
              >Add Column</b-button
            >
          </div>
        </div>
        <CardColumn
          v-for="column of row.Columns"
          :key="column.UUID"
          :column="column"
          @updateColumn="updateColumn"
          @deleteColumn="deleteColumn"
        />
        <b-button
          variant="outline-danger"
          :disabled="disabled.delete"
          @click="deleteRow"
          >Delete Row</b-button
        >
      </div>
      <div v-if="!editing">
        <div class="row" v-if="row.Columns">
          <div
            class="col"
            v-for="column of row.Columns"
            :key="column.UUID"
            :column="column"
          >
            {{ column.Content }}
          </div>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import CardColumn from "./CardColumn";
export default {
  components: {
    CardColumn,
  },
  props: ["row"],
  data: () => ({
    editing: false,
    column: {
      Content: "",
      Order: 0,
    },
    disabled: false,
  }),
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    },
    addColumn() {
      const { Content, Order } = this.column;
      const { UUID } = this.row;
      this.$emit("addColumn", { UUID, Content, Order });
      this.disabled = true;
      this.column.Content = "";
      setTimeout(() => {
        this.disabled = false;
      }, 500);
    },
    updateColumn(event) {
      this.$emit("updateColumn", event);
    },
    deleteRow() {
      const { UUID } = this.row;
      this.$emit("deleteRow", { UUID });
    },
    deleteColumn(event) {
      this.$emit("deleteColumn", event);
    },
  },
  mounted() {
    if (this.row.Columns) {
      this.column.Order = this.row.Columns.length;
    }
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
