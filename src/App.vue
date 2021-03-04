<template>
  <index />
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import Index from "./views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    axios
      .get("https://mendel-rocketpay.herokuapp.com/api/users/")
      .then(({ data }) => {
        this.users = data;
      })
      .catch(console.error);
  },
};
</script>
