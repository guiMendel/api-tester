<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <main>
    <h1>Rocketpay Users</h1>

    <span v-if="message">{{ message }}</span>

    <div>
      <user
        class="user"
        v-for="user in users"
        :name="user.name"
        :nickname="user.nickname"
        :balance="user.account.balance"
        :key="user.id"
        @click="selectUser(user.id)"
      />
    </div>
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
  /* padding to fit the header buttons */
  padding: 7rem 1rem 2rem;
}

div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

h1 {
  font-weight: 300;
  font-size: 3rem;

  margin: 0 1rem 2rem;
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

@media only screen and (min-width: 550px) {
  div {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .user {
    width: 20rem;
  }
}

@media only screen and (min-width: 1100px) {
  main {
    padding: 2rem 5%;
  }
}
</style>