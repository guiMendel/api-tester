// Uma especialização do Button que é sempre circular com um ícone, mas que tem 
// uma tootltip que em hover aparece com um texto
<template>
  <div class="container">
    <Button
      class="button"
      :icon-name="iconName"
      :size="size"
      :no-shadow="noShadow"
      :style="`
      --background: ${buttonColor ?? 'var(--button-bg)'};
      --text: ${iconColor ?? 'var(--button-text)'}
      `"
    />
    <p v-if="tooltip" class="tooltip" :style="`--size: ${size ?? '56px'}`">
      {{ tooltip }}
    </p>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "CircleButton",
  components: {
    Button,
  },
  props: {
    iconName: String,
    tooltip: String,
    size: String,
    noShadow: Boolean,
    buttonColor: String,
    iconColor: String,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
button {
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--background);
  color: var(--text);
}
.tooltip {
  display: none;
  opacity: 0;
  transition: all 150ms;

  max-height: var(--size);

  color: white;
  font-size: 1.3rem;

  max-width: 15rem;
  word-wrap: break-word;

  border-radius: 10px;

  margin-right: 0.5rem;
  padding: 1rem;

  background: rgb(24, 24, 24, 0.8);

  /* blur no fundo */
  backdrop-filter: blur(2px);
}

@media only screen and (min-width: 1100px) {
  /* keeps button from increasing height when tooltip pops up
  .button {
    margin: 0.2rem 0;
  } */

  .tooltip {
    display: initial;
  }

  .button:hover + .tooltip {
    opacity: 1;
  }
}
</style>