<template>
  <curtain-view stretch dark>
    <p v-if="requests.length == 0">
      Your requests to the API will show up here! Go ahead and make some!
    </p>
    <request-summary
      v-for="request in requests"
      v-bind="request"
      :key="request.timestamp"
      class="request"
    />
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";
import RequestSummary from "../components/RequestSummary.vue";
import { mapState } from "vuex";

export default {
  name: "APILog",
  components: {
    CurtainView,
    RequestSummary,
  },
  computed: mapState(["requests"]),
};
</script>

<style scoped>
p {
  font-size: 2rem;
}

.request {
  padding: 1rem 0;
}

.request + .request {
  border-top: 1px solid var(--gray);
}
</style>