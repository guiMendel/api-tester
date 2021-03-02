<template>
  <User
    v-for="user in users"
    :name="user.name"
    :nickname="user.nickname"
    :balance="user.account.balance"
    :key="user.id"
  />
</template>

<script>
import User from "./components/User.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    User,
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
