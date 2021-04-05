<template>
  <header>
    <router-link to="/new-user">
      <circle-button
        icon-name="add"
        color="var(--color-1)"
        tooltip="Add new user"
      />
    </router-link>

    <router-link to="/api-log">
      <circle-button
        icon-name="api"
        color="var(--color-1)"
        tooltip="Open API Log"
      />
    </router-link>
  </header>
</template>

<script>
import CircleButton from "../components/generic/CircleButton.vue";

export default {
  name: "MainHeader",
  components: {
    CircleButton,
  },
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100vw;

  padding: 2rem 1rem 0;

  /* background: linear-gradient(rgba(0, 0, 0, 0.1), rgb(255, 255, 255, 0)); */

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  margin-bottom: 3rem;

  /* clicks through */
  pointer-events: none;
}

header > a {
  /* catches clicks */
  pointer-events: auto;
}

@media only screen and (min-width: 550px) {
  header {
    justify-content: flex-end;
    padding-right: 2rem;
  }
}
@media only screen and (min-width: 1100px) {
  header {
    right: 0;
    bottom: 0;

    margin-right: 2rem;

    width: max-content;

    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-end;
  }
}
</style>