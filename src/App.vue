<template>
  <!-- o v-slot eh so pra aplicar as trnasicoes -->
  <router-view v-slot="{ Component, route }">
    <!-- Use any custom transition and fallback to `fade` -->
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Index from "./views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
  data: () => ({
    transitionName: "fade",
  }),
  watch: {
    $route(to, from) {
      this.transitionName =
        to.name === "APILog" || from.name === "APILog" ? "slide" : "fade";
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 300ms ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translate(100%);
}
</style>