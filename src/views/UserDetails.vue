<template>
  <curtain-view :title="user?.name" stretch>
    <h1>{{ user?.nickname }}</h1>
    <main>
      <span><b>Age</b> {{ user?.age }} </span>
      <span><b>Email</b> {{ user?.email }} </span>
      <span><b>ID</b> {{ user?.id }} </span>
    </main>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";

export default {
  name: "UserDetails",
  components: {
    CurtainView,
  },
  computed: {
    user() {
      const userId = this.$route.params.id;
      return this.$store.getters.getUser(userId);
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 300;
  font-style: italic;
  font-size: 1.8rem;
  color: var(--text-light);
  margin: -0.8rem 0 2rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  flex-wrap: wrap;
  gap: 1rem;

  padding: 0 1rem;
  margin-bottom: 1rem;
}

span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  min-width: 7rem;

  font-size: 1.3rem;
}

b {
  font-family: "Source Code Pro", monospace;
}
</style>