<template>
  <curtain-view
    title="Add a New User"
    :buttons="[
      {
        icon_name: 'send',
        color: ['var(--green)', 'white'],
        action: submitUser,
      },
    ]"
  >
    <div class="form-container">
      <em
        >The form can be submited however you like, so that you can test the
        API's response to bad requests</em
      >

      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <!-- as mensagens de erro aparecem se o error -->
      <small v-show="error_message(name, 'name')">{{
        error_message(name, "name")
      }}</small>

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <small v-show="error_message(email, 'email')">{{
        error_message(email, "email")
      }}</small>

      <label for="nickname">Nickname</label>
      <input type="text" id="nickname" v-model="nickname" />
      <small v-show="error_message(nickname, 'nickname')">{{
        error_message(nickname, "nickname")
      }}</small>
      <em class="tip"
        >Your nickname is how other users will be able to look you up!</em
      >

      <label for="age">Age</label>
      <input type="number" id="age" v-model="age" />
      <small v-show="error_message(age, 'age')">{{
        error_message(age, "age")
      }}</small>

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <small v-show="error_message(password, 'password')">{{
        error_message(password, "password")
      }}</small>
    </div>
  </curtain-view>
</template>

<script>
import axios from "axios";
import CurtainView from "../components/generic/CurtainView.vue";

export default {
  name: "NewUser",
  components: {
    CurtainView,
  },
  data: () => ({
    name: "",
    nickname: "",
    age: "",
    password: "",
    email: "",
  }),
  methods: {
    error_message(value, field) {
      if (!value) return "";

      const field_handlers = {
        nickname() {
          // IMPLEMENTAR checagem se eh unico
          return "";
        },
        age: () => (value >= 18 ? "" : "User must be 18 or older"),
        password: () =>
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long",
        // IMPLEMENTAR checagem se eh unico no email
        email: () => (value.match(/.@./) ? "" : "Invalid email address"),
      };

      const handler = field_handlers[field] ?? (() => "");

      return handler();
    },
    // faz a solicitacao de criar usuario para a API
    submitUser() {
      axios
        .post("https://mendel-rocketpay.herokuapp.com/api/users/", {
          name: this.name,
          nickname: this.nickname,
          password: this.password,
          age: this.age,
          email: this.email,
        })
        .then((response) => {
          console.log(response);
          this.$toast.success(
            `Successfully created user ${response.data.user.name}`
          );
        })
        .catch((error) => {
          console.log({ error });
          this.$toast.error(
            `Invalid user. Check the network panel for details`
          );
        });
    },
  },
};
</script>

<style scoped>
em {
  font-weight: 300;
  color: var(--text-light);
  margin-top: 0.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
}

label {
  margin-top: 1rem;
  font-size: 1.3rem;
}

input {
  margin-top: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  background-color: var(--color-1);

  width: 100%;
  padding: 0.5rem 0.5rem;
}

small {
  font-size: 1rem;
  font-style: italic;
  color: var(--text-red)
}
</style>