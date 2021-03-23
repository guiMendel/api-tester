<template>
  <div class="curtain" @click.self="goBack">
    <div
      class="buttons"
      :style="{
        'justify-content': buttons?.length > 0 ? 'space-between' : 'flex-start',
      }"
      @click.self="goBack"
    >
      <circle-button
        icon_name="arrow_back"
        :no_shadow="true"
        @click="goBack"
        button_color="var(--color-2)"
      />
      <circle-button
        v-for="button in buttons"
        :key="button.icon_name"
        :icon_name="button.icon_name"
        :button_color="button.color[0] ?? 'var(--color-2)'"
        :icon_color="button.color[1] ?? 'var(--text)'"
        :tooltip="button.tooltip"
        @click="button.action"
        :no_shadow="true"
      />
    </div>
    <div class="curtain-view" :class="{ dark, stretch }">
      <h1 v-if="title">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CircleButton from "./CircleButton.vue";

export default {
  name: "CurtainView",
  components: {
    CircleButton,
  },
  props: {
    title: String,
    buttons: Array,
    stretch: Boolean,
    dark: Boolean,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* espaços em cima e embaixo */
  padding: 2rem 1rem 3rem;
}

.curtain-view {
  max-height: 100%;

  background-color: var(--color-2);
  border-radius: 20px;
  overflow: auto;

  padding: 2rem 1rem;
}

.dark {
  background-color: var(--dark);
}

.stretch {
  width: 100%;
}

.buttons {
  margin-bottom: 1rem;

  display: flex;
  align-items: center;

  width: 100%;
}
.buttons button {
  box-shadow: 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 1rem 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
}
</style>