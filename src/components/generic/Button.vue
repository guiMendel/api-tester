<template>
  <button
    :style="`--size: ${size ?? '56px'}`"
    :class="{ 'smooth-foreground-element': !no_shadow ?? true }"
  >
    <span v-if="icon_name" class="material-icons-round">{{ icon_name }}</span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    icon_name: String,
    size: String,
    no_shadow: Boolean,
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