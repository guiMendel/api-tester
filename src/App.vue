<template>
  <!-- o v-slot eh so pra aplicar as trnasicoes -->
  <router-view></router-view>
</template>

<script>
import Index from "./views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>
