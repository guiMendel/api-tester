<template>
  <curtain-view :title="user?.name" stretch>
    <h1>{{ user?.nickname }}</h1>
    <tab-view :tabs="['Actions', 'Details']">
      <template #actions>
        {{ user?.account.balance }}
      </template>
      <template #details>
        <main>
          <span><b>Age</b> {{ user?.age }} </span>
          <span><b>Email</b> {{ user?.email }} </span>
          <span><b>ID</b> {{ user?.id }} </span>
          <span><b>Account ID</b> {{ user?.account.id }} </span>
        </main>
      </template>
    </tab-view>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";
import TabView from "../components/generic/TabView.vue";

export default {
  name: "UserDetails",
  components: {
    CurtainView,
    TabView,
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
  margin: -0.8rem 0 1rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  flex-wrap: wrap;
  gap: 1rem;

  font-size: 1.2rem;
  text-align: start;

  padding: 0 1rem;
}

span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>