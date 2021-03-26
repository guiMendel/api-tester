<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <main>
    <span v-if="message">{{ message }}</span>

    <user
      v-for="user in users"
      :name="user.name"
      :nickname="user.nickname"
      :balance="user.account.balance"
      :key="user.id"
      @click="selectUser(user.id)"
    />
  </main>
</template>

<script>
import User from "../components/User.vue";
import api from "../helpers/api";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    User,
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
  methods: {
    selectUser(id) {
      this.$router.push(`/user/${id}`);
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  /* padding to fit the header buttons */
  padding: 7rem 1rem 2rem;
}

main > * + * {
  margin-top: 1rem;
}

main > span {
  align-self: center;
  font-size: 2rem;
  font-weight: 300;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>