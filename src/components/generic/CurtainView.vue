<template>
  <div class="curtain" @click.self="goHome">
    <div
      class="buttons"
      :style="{
        'justify-content': buttons?.length > 0 ? 'space-between' : 'flex-start',
      }"
      @click.self="goHome"
    >
      <circle-button
        icon-name="arrow_back"
        :no-shadow="true"
        @click="goBack"
        :button-color="defaultButtonColor"
        :icon-color="defaultIconColor"
      />
      <circle-button
        v-for="button in buttons"
        :key="button.iconName"
        :icon-name="button.iconName"
        :button-color="button.color[0] ?? defaultButtonColor"
        :icon-color="button.color[1] ?? defaultIconColor"
        :tooltip="button.tooltip"
        @click="button.action"
        :no-shadow="true"
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
  data() {
    return {
      // define as cores padreos dos botoes de controle, em cima
      defaultButtonColor: this.dark ? "var(--darkest)" : "var(--color-2)",
      defaultIconColor: this.dark ? "white" : "inherit",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/");
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
  background-color: var(--darkest);
  color: white;
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