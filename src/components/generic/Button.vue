<template>
  <button
    :style="`--size: ${size ?? '56px'}`"
    :class="{ 'smooth-foreground-element': !noShadow ?? true }"
  >
    <span v-if="iconName" class="material-icons-round">{{ iconName }}</span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    iconName: String,
    size: String,
    noShadow: Boolean,
  },
};
</script>

<style scoped>
button {
  padding: 0.7rem;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: inherit;
}

span {
  font-size: calc(var(--size) - 1rem);
}

/* Se tiver icone e texto, da um espaco entre eles */
button > span + * {
  margin-left: 0.6rem;
}
</style>