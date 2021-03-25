<template>
  <curtain-view stretch dark>
    <p>
      {{ request?.method }}
    </p>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";

export default {
  name: "APIRequest",
  components: {
    CurtainView,
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