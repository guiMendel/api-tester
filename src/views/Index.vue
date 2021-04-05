<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <main>
    <span v-if="message">{{ message }}</span>

    <div>
      <user
        class="user"
        v-for="(user, index) in userList"
        :name="user.name"
        :nickname="user.nickname"
        :balance="user.account.balance"
        :showDelay="doneDisplaying ? 0 : index * 100"
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
    doneDisplaying: false,
  }),
  computed: {
    ...mapState(["users"]),
    userList() {
      // console.log(Object.values(this.users));
      return Object.values(this.users);
    },
  },
  created() {
    // Pega a lista de usuarios na api
    this.message = "Loading users, please wait while the server heats up...";
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
    // Keeps new users from receiving a delay on display
    setTimeout(() => {
      this.doneDisplaying = true;
    }, 10000);
  },
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
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
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

  div {
    min-height: 100%;
    align-items: center;
  }
}
</style>