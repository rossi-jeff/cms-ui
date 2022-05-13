<template lang="html">
  <div class="page">
    <b-card>
      <b-card-text>
        <strong v-if="page.Site" style="margin-bottom: 0.5em">
          Site:
          <router-link
            :to="{ name: 'Site', params: { uuid: page.Site.UUID } }"
            >{{ page.Site.Name }}</router-link
          >
        </strong>
        <h4>Page: {{ page.Name }}</h4>
      </b-card-text>
    </b-card>
    <b-card>
      <b-tabs card>
        <b-tab title="Content">
          <b-card-text v-if="rowsRendered">
            <b-button
              variant="outline-primary"
              @click="addRow"
              style="margin-bottom: 0.5em"
              >Add Row</b-button
            >
            <CardRow v-for="row of rows" :key="row.UUID" :row="row" @addColumn="addColumn" @updateColumn="updateColumn" />
          </b-card-text>
        </b-tab>
        <b-tab title="Styles">
          <b-card-text v-if="stylesRendered">
            <b-button
              variant="outline-primary"
              @click="addStyle"
              style="margin-bottom: 0.5em"
              >Add Style</b-button
            >
            <CardStyle
              v-for="css_style of styles"
              :key="css_style.UUID"
              :css_style="css_style"
              @addSelector="addSelector"
              @addRule="addRule"
              @updateSelector="updateSelector"
              @updateRule="updateRule"
              @deleteStyle="deleteStyle"
              @deleteSelector="deleteSelector"
              @deleteRule="deleteRule"
            />
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import CardStyle from "../components/cards/CardStyle";
import CardRow from "../components/cards/CardRow";
import {
  baseUrl,
  defaultHeaders
} from "../utils";
export default {
  components: {
    CardStyle,
    CardRow,
  },
  data: () => ({
    baseUrl,
    defaultHeaders,
    uuid: null,
    page: {},
    rows: [],
    styles: [],
    stylesRendered: true,
    rowsRendered: true,
  }),
  methods: {
    async loadPage() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/page/${uuid}`;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.page = await results.json();
      }
    },
    async loadRows() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/page/${uuid}/row`;
      this.rowsRendered = false;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.rows = await results.json();
        this.rowsRendered = true;
      }
    },
    async loadStyles() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      this.stylesRendered = false;
      const url = `${baseUrl}/page/${uuid}/style`;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.styles = await results.json();
        this.stylesRendered = true;
      }
    },
    async addStyle() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/page/${uuid}/style`;
      const Order = this.styles.length;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Order,
        }),
        headers,
      });
      if (results.ok) {
        this.loadStyles();
      }
    },
    async addSelector(event) {
      const {
        UUID,
        Name,
        Order
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/style/${UUID}/selector`;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Name,
          Order,
        }),
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async addRule(event) {
      const {
        UUID,
        Property,
        Value,
        Order
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/style/${UUID}/rule`;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Property,
          Value,
          Order,
        }),
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async updateSelector(event) {
      const {
        Name,
        UUID
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/selector/${UUID}`;
      const results = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({
          Name,
        }),
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async updateRule(event) {
      const {
        UUID,
        Property,
        Value
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/rule/${UUID}`;
      const results = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({
          Property,
          Value,
        }),
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async deleteStyle(event) {
      const {
        UUID
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/style/${UUID}`;
      const results = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async deleteSelector(event) {
      const {
        UUID
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/selector/${UUID}`;
      const results = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async deleteRule(event) {
      const {
        UUID
      } = event;
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/rule/${UUID}`;
      const results = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        setTimeout(() => {
          this.loadStyles();
        }, 200);
      }
    },
    async addRow() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/page/${uuid}/row`;
      const Order = this.rows.length;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Order,
        }),
        headers,
      });
      if (results.ok) {
        this.loadRows();
      }
    },
    async addColumn(event) {
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const { UUID, Content, Order } = event
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/row/${UUID}/column`;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Content, Order,
        }),
        headers,
      });
      if (results.ok) {
        this.loadRows();
      }
    },
    async updateColumn(event) {
      const {
        baseUrl,
        defaultHeaders
      } = this;
      const { UUID, Content } = event
      const {
        Token
      } = this.session;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/column/${UUID}`;
      const results = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({
          Content,
        }),
        headers,
      });
      if (results.ok) {
        this.loadRows();
      }
    }
  },
  mounted() {
    this.uuid = this.$route.params.uuid;
    if (this.session.SignedIn) {
      this.loadPage();
      this.loadRows();
      this.loadStyles();
    }
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
  },
};
</script>

<style lang="css" scoped></style>
