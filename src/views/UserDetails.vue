<template>
  <curtain-view :title="user?.name" stretch>
    <h1>{{ user?.nickname }}</h1>
    <h2>$ {{ user?.account.balance }}</h2>
    <tab-view :tabs="['Actions', 'Details']">
      <template #actions>
        <form>
          colocar umas transitions nesses efeitos de selecao
          <div class="action-options">
            <button
              v-for="action in actions"
              :key="action"
              :class="{ selected: selectedAction === action }"
              @click.prevent="selectAction(action)"
            >
              {{ action }}
            </button>
          </div>

          <select v-show="selectedAction === 'Transfer'">
            <option value="Ok">hahah</option>
            <option value="lol">jooj</option>
          </select>

          <input type="text" placeholder="Amount" />
          <button @click.prevent="submitAction">Submit</button>
        </form>
      </template>
      <template #details>
        <main>
          <span><b>Age</b> {{ user?.age }} </span>
          <span><b>Email</b> {{ user?.email }} </span>
          <span><b>ID</b> {{ user?.id }} </span>
          <span><b>Account ID</b> {{ user?.account.id }} </span>
        </main>
      </template>
    </tab-view>
  </curtain-view>
</template>

<script>
import CurtainView from "../components/generic/CurtainView.vue";
import TabView from "../components/generic/TabView.vue";

const allowedActions = ["Withdraw", "Deposit", "Transfer"];

export default {
  name: "UserDetails",
  components: {
    CurtainView,
    TabView,
  },
  data: () => ({
    actions: allowedActions,
    selectedAction: allowedActions[0],
  }),
  computed: {
    user() {
      const userId = this.$route.params.id;
      return this.$store.getters.getUser(userId);
    },
  },
  methods: {
    submitAction(event) {
      console.log(event);
    },
    selectAction(action) {
      this.selectedAction = action;
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 300;
  font-family: "Source Code Pro", monospace;
  font-size: 1.6rem;
  color: var(--text-light);
  margin-top: -0.8rem;
}

h2 {
  margin: 0.5rem 0 1.5rem;

  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  color: var(--blue);
}

main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  font-size: 1.2rem;
  text-align: start;

  padding: 0 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
}

form > * + * {
  margin-top: 1.2rem;
}

.action-options {
  width: 15rem;
  min-width: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
}

.action-options * {
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  background-color: var(--light-gray);

  width: 100%;
}

.action-options *:first-child {
  border-radius: 20px 20px 0 0;
}

.action-options *:last-child {
  border-radius: 0 0 20px 20px;
}

.selected {
  background-color: var(--blue);
  color: white;
}

input,
select,
form > button {
  width: 10rem;
  padding: 0.5rem;
  text-align: center;
  font-size: 1.2rem;

  /* border: 1px solid var(--light-gray); */
  border: none;
  border-radius: 20px;
}

select {
  width: 100%;
}

form > button {
  background-color: var(--blue);
  color: white;
}

span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>