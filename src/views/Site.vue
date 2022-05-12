<template lang="html">
  <div class="site">
    <b-card>
      <b-card-text>
        <h4 v-if="site.Name">Site: {{ site.Name }}</h4>
      </b-card-text>
    </b-card>
    <b-card>
      <b-tabs card>
        <b-tab title="Pages">
          <b-card-text>
            <b-card>
              <b-card-text>
                <div class="row">
                  <div class="col-10">
                    <FormPage :payload="payload.page" />
                  </div>
                  <div class="col-2">
                    <b-button variant="outline-primary" @click="addPage"
                      >Add Page</b-button
                    >
                  </div>
                </div>
              </b-card-text>
            </b-card>
            <CardPage v-for="page of pages" :key="page.Id" :page="page" />
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
import FormPage from "../components/forms/FormPage";
import CardPage from "../components/cards/CardPage";
import CardStyle from "../components/cards/CardStyle";
import {
  baseUrl,
  defaultHeaders
} from "../utils";
export default {
  components: {
    FormPage,
    CardPage,
    CardStyle,
  },
  data: () => ({
    baseUrl,
    defaultHeaders,
    uuid: null,
    site: {},
    pages: [],
    styles: [],
    payload: {
      page: {
        Name: "",
      },
    },
    stylesRendered: true,
  }),
  methods: {
    async loadSite() {
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
      const url = `${baseUrl}/site/${uuid}`;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.site = await results.json();
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
      this.stylesRendered = false;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/site/${uuid}/style`;
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
    async loadPages() {
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
      const url = `${baseUrl}/site/${uuid}/page`;
      const results = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers,
      });
      if (results.ok) {
        this.pages = await results.json();
      }
    },
    async addPage() {
      const {
        baseUrl,
        defaultHeaders,
        uuid
      } = this;
      const {
        Token
      } = this.session;
      const {
        Name
      } = this.payload.page;
      let headers = defaultHeaders;
      headers.Authorization = `Bearer ${Token}`;
      const url = `${baseUrl}/site/${uuid}/page`;
      const results = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          Name,
        }),
        headers,
      });
      if (results.ok) {
        this.payload.page.Name = "";
        this.loadPages();
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
      const url = `${baseUrl}/site/${uuid}/style`;
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
  },
  mounted() {
    this.uuid = this.$route.params.uuid;
    if (this.session.SignedIn) {
      this.loadSite();
      this.loadPages();
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

<style lang="css" scoped>
.card {
  margin-bottom: 0.5em;
}
</style>
