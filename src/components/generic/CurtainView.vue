<template>
  <div class="curtain" @click.self="$router.go(-1)">
    <div class="curtain-view">
      <h1 v-if="title">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurtainView",
  props: {
    title: String,
  },
};
</script>

<style scoped>
.curtain {
  /* ocupa a tela inteira */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  /* é uma sombra */
  background: rgb(3, 3, 3, 0.6);
  backdrop-filter: blur(2px);

  /* dentro dela vai ter um elemento, a view */
  display: flex;
  align-items: center;
  justify-content: center;

  /* espaços em cima e embaixo */
  padding: 3rem 0;
}

.curtain-view {
  background-color: var(--color-2);
  border-radius: 20px;
  overflow: auto;

  padding: 1rem;
}

h1 {
  font-size: 2.5rem;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
}
</style>