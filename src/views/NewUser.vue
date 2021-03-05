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

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />

      <label for="nickname">Nickname</label>
      <input type="text" id="nickname" v-model="nickname" />
      <em class="tip"
        >Your nickname is how other users will be able to look you up!</em
      >

      <label for="age">Age</label>
      <input type="number" id="age" v-model="age" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
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
        .then(console.log)
        .catch((error) => console.log({error}));
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
</style>