<template>
  <main>
    <router-link to="/new-user">
      <circle-button
        icon_name="add"
        tooltip="New User"
        size="4rem"
        color="var(--color-1)"
      />
    </router-link>

    <user
      v-for="user in users"
      :name="user.name"
      :nickname="user.nickname"
      :balance="user.account.balance"
      :key="user.id"
    />
  </main>
</template>

<script>
import CircleButton from "../components/generic/CircleButton.vue";
import User from "../components/User.vue";
import axios from "axios";

export default {
  name: "Index",
  components: {
    User,
    CircleButton,
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

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 0 2rem;
}

main > * + * {
  margin-top: 1rem;
}
</style>