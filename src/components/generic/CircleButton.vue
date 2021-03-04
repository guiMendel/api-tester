// Uma especialização do Button que é sempre circular com um ícone, mas que tem 
// uma tootltip que em hover aparece com um texto
<template>
  <div class="container">
    <transition name="fade">
      <p v-show="show && tooltip" class="tooltip">
        {{ tooltip }}
      </p>
    </transition>
    <Button
      :icon_name="icon_name"
      :size="size"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
    />
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "CircleButton",
  components: {
    Button,
  },
  data() {
    return {
      show: false,
    };
  },
  props: {
    icon_name: String,
    tooltip: String,
    size: String,
  },
  methods: {
    showTooltip() {
      this.show = true;
      // pra esse trem n correr o risco de ficar la pra sempre
      setTimeout(this.hideTooltip, 2000);
    },
    hideTooltip() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
button {
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tooltip {
  color: white;
  font-size: 10;
  max-width: 600px;
  word-wrap: break-word;
  border-radius: 10px;
  margin-right: 0.5rem;
  padding: 1rem;
  background: rgb(24, 24, 24, 0.7);
  /* blur no fundo */
  backdrop-filter: blur(2px);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.15s ease-in-out;
}
</style>