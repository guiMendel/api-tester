<template>
  <curtain-view stretch dark>
    <p v-if="requests.length == 0">
      Your requests to the API will show up here! Go ahead and make some!
    </p>
    <div class="request-container">
      <request-summary
        v-for="request in requests"
        v-bind="request"
        :key="request.timestamp"
        class="request"
      />
    </div>
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

.request-container {
  display: flex;
  flex-direction: column-reverse;
}

.request + .request {
  margin-bottom: 0.7rem;
}
</style>