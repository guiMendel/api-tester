<template>
  <button
    :style="`--size: ${size ?? '56px'}`"
    class="smooth-foreground-element"
  >
    <span v-if="icon_name" class="material-icons-round">{{ icon_name }}</span>
    <span v-if="text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    icon_name: String,
    size: String,
  },
};
</script>

<style scoped>
button {
  padding: 0.7rem;
  border-radius: 15px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

span {
  font-size: calc(var(--size) - 1rem);
}

/* Se tiver icone e texto, da um espaco entre eles */
button > span + span {
  margin-left: 0.6rem;
}
</style>