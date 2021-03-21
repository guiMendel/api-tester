<template>
  <main>
    <!-- holds the buttons -->
    <header>
      <router-link to="/new-user">
        <circle-button icon_name="add" size="4rem" color="var(--color-1)" />
      </router-link>

      <router-link to="/api-log">
        <circle-button icon_name="api" size="4rem" color="var(--color-1)" />
      </router-link>
    </header>

    <span v-if="message">{{ message }}</span>

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
import api from "../helpers/api";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    User,
    CircleButton,
  },
  data: () => ({
    message: "",
  }),
  created() {
    // Pega a lista de usuarios na api
    this.message = "Loading users...";
    api
      .fetchUsers()
      .then(({ data }) => {
        this.$store.commit("setUsers", data);
        this.message =
          data.length != 0
            ? ""
            : "No users yet! Create one so that it shows up here 😉";
      })
      .catch((error) => {
        this.message = "Unable to load users. Please, try again later.";
        throw error;
      });
  },
  computed: mapState(["users"]),
};
</script>

<style scoped>
header {
  position: sticky;
  top: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 3rem;
}

main {
  display: flex;
  flex-direction: column;

  padding: 0 2rem;
}

main > * + * {
  margin-top: 1rem;
}

main > span {
  align-self: center;
  font-size: 2rem;
  font-weight: 300;
}
</style>