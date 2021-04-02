<template>
  <curtain-view
    :title="user?.name"
    stretch
    :buttons="[
      {
        iconName: 'delete',
        color: ['var(--text-red)', 'white'],
        action: deleteSelf,
      },
    ]"
  >
    <h1>{{ user?.nickname }}</h1>
    <h2>$ {{ user?.account.balance }}</h2>
    <tab-view :tabs="['Actions', 'Details']">
      <template #actions>
        <form>
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

          <select
            v-show="selectedAction === 'Transfer'"
            v-model="transferTarget"
          >
            <option disabled value="">Transfer to</option>
            <option
              v-for="targetUser in users"
              :value="targetUser.id"
              :key="targetUser.id"
            >
              {{ targetUser.nickname }}
            </option>
          </select>

          <input type="text" placeholder="Amount" v-model="amount" />

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
import { mapState } from "vuex";
import api from "../helpers/api";

const allowedActions = ["Withdraw", "Deposit", "Transfer"];

export default {
  name: "UserDetails",
  components: {
    CurtainView,
    TabView,
  },
  data() {
    return {
      actions: allowedActions,
      selectedAction: allowedActions[0],
      amount: "",
      transferTarget: "",
      actionMapping: {
        Withdraw: this.withdraw,
        Deposit: this.deposit,
      },
    };
  },
  computed: {
    user() {
      const userId = this.$route.params.id;
      return this.$store.getters.getUser(userId);
    },
    ...mapState(["users"]),
  },
  methods: {
    submitAction(event) {
      console.log(event);
      console.log(this.transferTarget);
      const action =
        this.actionMapping[this.selectedAction] ??
        ((toast) => toast.show("Oops, this action is not yet implemented!"));
      action(this.$toast)
    },
    selectAction(action) {
      this.selectedAction = action;
    },
    deleteSelf() {
      if (confirm(`Delete user ${this.user.nickname}?`)) {
        this.$toast.show(`Deleting user ${this.user.nickname}...`);
        api
          .deleteUser(this.user.id)
          .then(() => {
            this.$toast.success(
              `Successfully deleted user ${this.user.nickname}!`
            );
            this.$store.commit("removeUser", this.user.id);
            this.$router.push("/");
          })
          .catch(() => {
            this.$toast.error(
              `Couldn't delete user ${this.user.nickname}, check API log for details`
            );
          });
      }
    },
    withdraw() {
      this.$toast.show(
        `Withdrawing $${this.amount} from ${this.user.nickname}...`
      );
      api
        .accountWithdraw(this.user.account.id, this.amount)
        .then(() => {
          this.$toast.success("Withdrawal complete!");
          this.$store.commit("updateUserBalance", {
            userId: this.user.id,
            value: -this.amount,
          });
        })
        .catch((error) => {
          const message = error?.response?.data?.message;
          if (message) {
            this.$toast.error(`${message}. Check API log for details`);
          } else {
            this.$toast.error(
              `An error occured. Check the console for details`
            );
            console.log({ error });
          }
        });
    },
    deposit() {
      this.$toast.show(
        `Depositing $${this.amount} to ${this.user.nickname}...`
      );
      api
        .accountDeposit(this.user.account.id, this.amount)
        .then(() => {
          this.$toast.success("Deposit complete!");
          this.$store.commit("updateUserBalance", {
            userId: this.user.id,
            value: this.amount,
          });
        })
        .catch((error) => {
          const message = error?.response?.data?.message;
          if (message) {
            this.$toast.error(`${message}. Check API log for details`);
          } else {
            this.$toast.error(
              `An error occured. Check the console for details`
            );
            console.log({ error });
          }
        });
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
  transition: all 150ms;
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

form > button:active {
  filter: brightness(0.8) grayscale(20%);
}

span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>