<template>
  <header>
    <router-link to="/new-user">
      <circle-button icon-name="add" color="var(--color-1)" />
    </router-link>

    <router-link to="/api-log">
      <circle-button icon-name="api" color="var(--color-1)" />
    </router-link>
  </header>
</template>

<script>
import CircleButton from "../components/generic/CircleButton.vue";

export default {
  name: 'MainHeader',
  components: {
    CircleButton,
  },
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;

  padding: 2rem 1rem 0;

  /* background: linear-gradient(rgba(0, 0, 0, 0.1), rgb(255, 255, 255, 0)); */

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 3rem;
}
</style>