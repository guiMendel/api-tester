<template>
  <curtain-view stretch dark>
    <main>
      <span
        >Method: <b class="method">{{ request?.method }}</b>
      </span>
      <span
        >Path: <b>{{ request?.path }}</b>
      </span>
      <span
        >Status:
        <b
          >{{ request?.response.status }} {{ request?.response.statusText }}
        </b>
      </span>
      <span
        >Timestamp:
        <b>{{ request?.timestamp }} </b>
      </span>
    </main>

    <tab-view
      :tabs="['Response', 'Request']"
      default-message="No body provided"
    >
      <template #response v-if="request?.response.data">
        <json-formatter :object="request?.response.data" />
      </template>
      <template #request v-if="request?.body">
        <json-formatter :object="request?.body" />
      </template>
    </tab-view>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";
import TabView from "../components/generic/TabView.vue";
import JsonFormatter from "../components/JsonFormatter.vue";

export default {
  name: "APIRequest",
  components: {
    CurtainView,
    TabView,
    JsonFormatter,
  },
  data() {
    return {
      index: this.$route.params.index,
    };
  },
  computed: {
    request() {
      return this.$store.state.requests[this.index];
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: var(--dark);
  border-radius: 20px;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
}

main > * + * {
  margin-top: 0.5rem;
}

span {
  display: flex;
  justify-content: space-between;
  width: 100%;

  font-size: 1.3rem;
}

b {
  font-family: "Source Code Pro", monospace;
}

.method {
  text-transform: uppercase;
}
</style>