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
            <b-form-input
              name="Name"
              v-model="selector.Name"
              placeholder="Enter selector name"
            ></b-form-input>
          </div>
          <div class="col-2">
            <b-button
              variant="outline-primary"
              @click="addSelector"
              :disabled="disabled.selector"
              >Add Selector</b-button
            >
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <b-form-input
              v-model="rule.Property"
              placeholder="Enter property"
            ></b-form-input>
          </div>
          <div class="col-2" style="text-align: center">:</div>
          <div class="col-4">
            <b-form-input
              v-model="rule.Value"
              placeholder="Enter value"
            ></b-form-input>
          </div>
          <div class="col-2">
            <b-button
              variant="outline-primary"
              @click="addRule"
              :disabled="disabled.rule"
              >Add Rule</b-button
            >
          </div>
        </div>
        <CardSelector
          v-for="selector of css_style.Selectors"
          :key="selector.UUID"
          :selector="selector"
          @updateSelector="updateSelector"
          @deleteSelector="deleteSelector"
        />
        <CardRule
          v-for="rule of css_style.Rules"
          :key="rule.UUID"
          :rule="rule"
          @updateRule="updateRule"
          @deleteRule="deleteRule"
        />
        <b-button
          variant="outline-danger"
          :disabled="disabled.delete"
          @click="deleteStyle"
          >Delete Style</b-button
        >
      </div>
      <div v-if="!editing">
        <div
          v-for="(selector, index) of css_style.Selectors"
          :key="selector.UUID"
        >
          {{ selector.Name }}
          <span v-if="index < css_style.Selectors.length - 1">,</span>
          <span
            v-if="index == css_style.Selectors.length - 1"
            style="margin-left: 1em"
            >{</span
          >
        </div>
        <div
          v-for="rule of css_style.Rules"
          :key="rule.UUID"
          style="margin-left: 1em"
        >
          {{ rule.Property }} : {{ rule.Value }};
        </div>
        <div v-if="css_style.Selectors.length">}</div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import CardSelector from "./CardSelector";
import CardRule from "./CardRule";
export default {
  props: ["css_style"],
  components: {
    CardSelector,
    CardRule,
  },
  data: () => ({
    editing: false,
    selector: {
      Name: "",
      Order: 0,
    },
    rule: {
      Property: "",
      Value: "",
      Order: 0,
    },
    disabled: {
      selector: false,
      rule: false,
      delete: false,
    },
  }),
  methods: {
    addSelector() {
      const { UUID } = this.css_style;
      const { Name, Order } = this.selector;
      this.$emit("addSelector", {
        UUID,
        Name,
        Order,
      });
      this.disabled.selector = true;
      this.selector.Name = "";
      setTimeout(() => {
        this.disabled.selector = false;
      }, 500);
    },
    addRule() {
      const { UUID } = this.css_style;
      const { Property, Value, Order } = this.rule;
      this.$emit("addRule", {
        UUID,
        Property,
        Value,
        Order,
      });
      this.disabled.rule = true;
      this.rule.Property = "";
      this.rule.Value = "";
      setTimeout(() => {
        this.disabled.rule = false;
      }, 500);
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    updateSelector(event) {
      this.$emit("updateSelector", event);
    },
    updateRule(event) {
      this.$emit("updateRule", event);
    },
    deleteStyle() {
      if (confirm("Are you sure you want to delete this style?")) {
        const { UUID } = this.css_style;
        this.$emit("deleteStyle", {
          UUID,
        });
        this.disabled.delete = true;
      }
    },
    deleteSelector(event) {
      this.$emit("deleteSelector", event);
    },
    deleteRule(event) {
      this.$emit("deleteRule", event);
    },
  },
  mounted() {
    if (this.css_style) {
      this.selector.Order = this.css_style.Selectors.length;
      this.rule.Order = this.css_style.Rules.length;
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
