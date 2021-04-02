<template>
  <curtain-view stretch dark>
    <div class="flex-column">
      <p v-if="requests.length == 0">
        Your requests to the API will show up here! Go ahead and make some!
      </p>
      <span v-else>Select a request to view it's details</span>
      <div class="flex-column">
        <request-summary
          v-for="(request, index) in requests"
          v-bind="request"
          :index="index"
          :key="request.timestamp"
          class="request"
        />
      </div>
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

span {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1rem;
  color: var(--text-light);
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.request + .request {
  margin-top: 0.7rem;
}
</style>