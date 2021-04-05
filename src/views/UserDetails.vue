<template>
  <curtain-view
    :title="user?.name"
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
          <!-- gets possible account actions from list and displays as buttons -->
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

          <div class="action-details">
            <!-- input for selecting target to transfer to, when action is Transfer -->
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

            <!-- the amount on which to perform the operation -->
            <input type="text" placeholder="Amount" v-model="amount" />

            <button @click.prevent="submitAction">Submit</button>
          </div>
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
        Transfer: this.transfer,
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
      action(this.$toast);
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
    accountOperation({ initialMessage, apiWrapper, successWrapper }) {
      this.$toast.show(initialMessage);
      apiWrapper()
        .then(successWrapper)
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
    withdraw() {
      this.accountOperation({
        initialMessage: `Withdrawing $${this.amount} from ${this.user.nickname}...`,
        apiWrapper: () =>
          api.accountWithdraw(this.user.account.id, this.amount),
        successWrapper: () => {
          this.$toast.success("Withdrawal complete!");
          this.$store.commit("updateUserBalance", {
            userId: this.user.id,
            value: -this.amount,
          });
        },
      });
    },
    deposit() {
      this.accountOperation({
        initialMessage: `Depositing $${this.amount} to ${this.user.nickname}...`,
        apiWrapper: () => api.accountDeposit(this.user.account.id, this.amount),
        successWrapper: () => {
          this.$toast.success("Deposit complete!");
          this.$store.commit("updateUserBalance", {
            userId: this.user.id,
            value: this.amount,
          });
        },
      });
    },
    transfer() {
      const targetUser = this.users[this.transferTarget];

      this.accountOperation({
        initialMessage: `Transfering $${this.amount} from ${this.user.nickname} to ${targetUser.nickname}...`,
        apiWrapper: () =>
          api.transfer(
            this.user.account.id,
            targetUser.account.id,
            this.amount
          ),
        successWrapper: () => {
          this.$toast.success("Transfer complete!");
          this.$store.commit("updateUserBalance", {
            userId: this.user.id,
            value: -this.amount,
          });
          this.$store.commit("updateUserBalance", {
            userId: this.transferTarget,
            value: this.amount,
          });
        },
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  row-gap: 1.2rem;
  column-gap: 3rem;

  font-size: 1.4rem;
}

.action-options {
  width: clamp(10rem, 25vw, 15rem);
  min-width: 15rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-wrap: wrap;
}

button {
  cursor: pointer;
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

.action-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.selected {
  background-color: var(--blue);
  color: white;
}

input,
select,
.action-details > button {
  width: clamp(10rem, 25vw, 15rem);
  padding: 0.5rem;
  text-align: center;
  font-size: 1.2rem;

  /* border: 1px solid var(--light-gray); */
  border: none;
  border-radius: 20px;
}

.action-details > button {
  background-color: var(--blue);
  color: white;
}

.action-details > button:active {
  filter: brightness(0.8) grayscale(20%);
}

span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media only screen and (min-width: 550px) {
  form {
    padding: 1rem 0;
  }
}
</style>